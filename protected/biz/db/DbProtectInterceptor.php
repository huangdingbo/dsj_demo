<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/7/10
 * Time: 10:51
 */
namespace biz\db;

use CC\db\IDbAfterQueryInterface;

class DbProtectInterceptor implements \CInterceptors,IDbAfterQueryInterface
{
    private $mThreadId = 0;
    /**
     * @var \mysqli
     */
    private $mMysqliObj;
    private $mCountCache = null;
    
    
    public static function create($use_request_monitor = false){
        $dbProtectedInterceptors = new DbProtectInterceptor();
        if($use_request_monitor){
            \CC::app()->addHttpInterceptors('admin',array($dbProtectedInterceptors));
            \CC::app()->addHttpInterceptors('api',array($dbProtectedInterceptors));
        }
        
        if(\CC::app()->params['monitor_sql'] === true ||
            \CC::app()->request->getParams('monitor_sql') == 1){
            \CC::app()->addManager($dbProtectedInterceptors);
        }
    }

    public function handle(\CRequest $request, \CNext $next)
    {
        $fileName = "protected/runtime/dbprotect/time.log";
        $timeinfo = array();
        if(file_exists($fileName)){
            $json_str = file_get_contents($fileName);
            if(!empty($json_str)){
                $timeinfo = json_decode($json_str,true);
            }
        }else{
            $parentPath = "protected/runtime/dbprotect/";
            if(!file_exists($parentPath)){
                if(mkdir($parentPath) === false){
                    throw new \CErrorException('mkdir runtime/dbprotect fail');
                }
            }
        }
        $last_time = $timeinfo['last_time'];
        $cur_time = time();
        if(!$last_time || $cur_time - $last_time > 300){
            $timeinfo['last_time'] = $cur_time;

            file_put_contents($fileName,json_encode($timeinfo));

            $big_time_count = 0;
            $big_time_process = array();
            $processlist = \CModel::model()->queryAllSql(
                "select * from information_schema.processlist where 1");
            foreach ($processlist as $process){
                $command = $process['COMMAND'];
                if($command != 'Sleep'){
                    $time = $process['TIME'];
                    $info = $process['INFO'];
                    if($info){
                        $info = strtolower($info);
                        $info = trim($info);
                        if(strpos($info,'select') == 0){
                            if((int)$time > 60){
                                $big_time_process[] = $process;
                                $big_time_count++;
                            }
                        }
                    }
                }
            }
            if($big_time_count > 5){
                $process = $big_time_process[0];
                if(self::sendSmsTs(15882473412,'执法服务器监控：数据库异常'.$process['INFO'],"1400029434","1c2ed343a56afbd787f24b13298e361e")){
                    $timeinfo['last_time'] = $cur_time + 1 * 3600;
                    file_put_contents($fileName,json_encode($timeinfo));
                }
            }
        }

        return $next;
    }

    public function onAftereQuery($sql, $params, &$other_params)
    {
        if(\CC::app()->params['monitor_sql'] ||
            \CC::app()->request->getParams('monitor_sql') == 1){
            if(strpos($sql,'performance_schema') !== false ||
                strpos($sql,'information_schema') !== false ||
                strpos($sql,'select connection_id()') !== false){
                return;
            }
            if($this->mThreadId == 0){
                $this->mMysqliObj = new \mysqli("10.132.34.136","xbwq","Ggl5ap6xIY7D3rvP","performance_schema",3306);
                $connection_id_arr = \CModel::model()->querySql('select connection_id()');
                $connection_id = $connection_id_arr['connection_id()'];

                $result = $this->mMysqliObj->query("select * from performance_schema.threads where PROCESSLIST_ID = '".$connection_id."'");
                $threads_info = $result->fetch_array(MYSQLI_ASSOC);
                $this->mThreadId = $threads_info['THREAD_ID'];
            }


            $mysqli_result = $this->mMysqliObj->query("select * from performance_schema.events_statements_current where THREAD_ID = '".$this->mThreadId."'");
            $results = $mysqli_result->fetch_array(MYSQLI_ASSOC);
            $examined = $results['ROWS_EXAMINED'];
            $sent = $results['ROWS_SENT'];
            $bSuspicous = false;
            if($sent == 0){
                if($examined > 1000){
                    $bSuspicous = true;
                }
            }else{
                $bSuspicous = ($examined / $sent) > 20;
            }
            if($bSuspicous ||
                $results['NO_INDEX_USED'] == 1 ||
                $results['NO_GOOD_INDEX_USED'] == 1){
                $sqlString = \CModel::getLastSql();
                $pos = strpos($sqlString,'Params:');
                if($pos > 0){
                    $sqlString = substr($sqlString,0,$pos - 1);
                }
                $pos = strpos($sqlString,'SQL:');
                if($pos >= 0){
                    $sqlString = substr($sqlString,4);
                }
                $sql = $sqlString;
                $id = md5($sql);
                $queryResult = $this->mMysqliObj->query("select id from tool.t_query_info where id='".$id."'");
                if(!empty($queryResult->fetch_array(MYSQLI_ASSOC))){
                    return;
                }
                $insert_sql = "insert into tool.t_query_info(`id`,`action`, `TIMER_WAIT`, `LOCK_TIME`, `SQL_TEXT`, `CURRENT_SCHEMA`, `ROWS_AFFECTED`, `ROWS_SENT`, `ROWS_EXAMINED`, `CREATED_TMP_DISK_TABLES`, `CREATED_TMP_TABLES`, `SELECT_FULL_JOIN`, `SELECT_FULL_RANGE_JOIN`, `SELECT_RANGE`, `SELECT_RANGE_CHECK`, `SELECT_SCAN`, `SORT_MERGE_PASSES`, `SORT_RANGE`, `SORT_ROWS`, `SORT_SCAN`, `NO_INDEX_USED`, `NO_GOOD_INDEX_USED`) values ('%s','%s',%f,%f,\"%s\",'%s',%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d)";
                $schema = $results['CURRENT_SCHEMA'];
                if(empty($schema)){
                    $connectParams = \CC::app()->db->getConnect();
                    $dsn = $connectParams['dsn'];
                    $pos = strpos($dsn,'dbname=');
                    if($pos > 0){
                        $schema = substr($dsn,$pos + 7);
                    }
                }
                $insert_sql = sprintf($insert_sql,$id,\CC::app()->url->getActionStr(),round($results['TIMER_WAIT'] / 1000000000,2),
                                round($results['LOCK_TIME'] / 1000000000,2),$sql,$schema,
                                $results['ROWS_AFFECTED'],$results['ROWS_SENT'],$results['ROWS_EXAMINED'],
                                $results['CREATED_TMP_DISK_TABLES'],$results['CREATED_TMP_TABLES'],
                                $results['SELECT_FULL_JOIN'],$results['SELECT_FULL_RANGE_JOIN'],
                                $results['SELECT_RANGE'],$results['SELECT_RANGE_CHECK'], $results['SELECT_SCAN'],
                                $results['SORT_MERGE_PASSES'],$results['SORT_RANGE'],$results['SORT_ROWS'], $results['SORT_SCAN'],
                                $results['NO_INDEX_USED'],$results['NO_GOOD_INDEX_USED']);
                //file_put_contents("protected/runtime/test1.log",$insert_sql);
                $results = $this->mMysqliObj->query($insert_sql);
                if($results === false){
                    throw new \CErrorException('监控查询需要tool数据库的访问权限');
                }
//                $path = "protected/runtime/test1/";
//                if(!file_exists($path)){
//                    mkdir($path);
//                }
//                $results['SQL'] = $sql;
//                file_put_contents("protected/runtime/test1/test1".$this->mIndex++.'.log',
//                    json_encode($results));
            }
        }
    }

    private function getCount($table){
        $parentPath = "protected/runtime/countcache/";
        if(!file_exists($parentPath)){
            if(mkdir($parentPath) === false){
                throw new \CErrorException('mkdir runtime/countcache fail');
            }
        }
        $path = $parentPath."count.log";
        if($this->mCountCache === null){
            $processLock = new SemProcessLock();
            $processLock->Lock();
            try{
                if(file_exists($path)){
                    $this->mCountCache = json_decode(file_get_contents($path),true);
                }else{
                    $this->mCountCache = array();
                }
            }finally{
                $processLock->unLock();
            }
        }
        if(!isset($this->mCountCache[$table])){
            $processLock = new SemProcessLock();
            try{
                $processLock->Lock();
                $sql = sprintf("select count(*) as cnt from %s",$table);
                $mysqli_result = $this->mMysqliObj->query($sql);
                $result = $mysqli_result->fetch_array(MYSQLI_ASSOC);
                $this->mCountCache[$table] = $result['cnt'];
                file_put_contents($path,json_encode($this->mCountCache));
            }finally{
                $processLock->unLock();
            }
        }
        return $this->mCountCache[$table];
    }

    public static function sendSmsTs($phone, $msg, $appid = ' ', $appkey = ' ')
    {
        $msg = sprintf('%s【执法3.0】', $msg);
        //验证码：{1}，10分钟内输入有效。
        $random = mt_rand(1, 1000);
        $target = "https://yun.tim.qq.com/v3/tlssmssvr/sendsms?sdkappid=".$appid."&random=".$random;
        $sig = md5($appkey . $phone);
        $json = '{
            "tel" :{
                    "nationcode":"86",
                    "phone" : "' . $phone . '"
            },
            "type":"0",
            "msg":"' . $msg . '",
            "sig":"' . $sig . '",
            "extend":"",
            "ext":""
        }';
        $gets = \Curl::instance()->post($target, $json);
        $getarr = json_decode($gets, true);
        if (is_array($getarr)) {
            $ok = $getarr['result'] === "0";
            if (!$ok) {
                \CC::log($gets, 'phone');
            }
            return $ok;
        }
        return false;
    }

}

interface ProcessLock{
    public function Lock();

    public function unLock();
}

class SemProcessLock implements ProcessLock{
    private $mSemId = null;

    public function Lock()
    {
        if($this->mSemId === null){
            $key = ftok(__FILE__,'t');
            $this->mSemId = sem_get($key);
            sem_acquire($this->mSemId);
        }
    }

    public function unLock()
    {
        if($this->mSemId){
            sem_release($this->mSemId);
            sem_remove($this->mSemId);
            $this->mSemId = null;
        }
    }

}