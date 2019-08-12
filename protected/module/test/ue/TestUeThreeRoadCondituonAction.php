<?php


namespace module\test\ue;


use CC\db\base\insert\InsertModel;
use CRequest;
use Curl;
use Exception;

class TestUeThreeRoadCondituonAction extends \CAction
{
    private $flag = '3';
    private $map = [
        '东三环路一段',
        '东三环路二段',
        '东三环路三段',
        '东三环路四段',
        '东三环路五段',
        '南三环路一段',
        '南三环路二段',
        '南三环路三段',
        '南三环路四段',
        '南三环路五段',
        '西三环路一段',
        '西三环路二段',
        '西三环路三段',
        '西三环路四段',
        '西三环路五段',
        '北三环路一段',
        '北三环路二段',
        '北三环路三段',
        '北三环路四段',
        '北三环路五段',

        '一环路东一段',
        '一环路东二段',
        '一环路东三段',
        '一环路东四段',
        '一环路东五段',
        '一环路西一段',
        '一环路西二段',
        '一环路西三段',
        '一环路西四段',
        '一环路西五段',
        '一环路南一段',
        '一环路南二段',
        '一环路南三段',
        '一环路南四段',
        '一环路南五段',
        '一环路北一段',
        '一环路北二段',
        '一环路北三段',
        '一环路北四段',
        '一环路北五段',

        '二环高架路',
        '二环路东一段',
        '二环路东二段',
        '二环路东三段',
        '二环路东四段',
        '二环路东五段',
        '二环路西一段',
        '二环路西二段',
        '二环路西三段',
        '二环路西四段',
        '二环路西五段',
        '二环路南一段',
        '二环路南二段',
        '二环路南三段',
        '二环路南四段',
        '二环路南五段',
        '二环路北一段',
        '二环路北二段',
        '二环路北三段',
        '二环路北四段',
        '二环路北五段',

        '中环路青羊大道段',
        '中环路武阳大道段',
        '中环路科园大道段',
        '中环路紫瑞大道段',
        '中环路火车南站西路段',
        '中环路火车南站东路段',
        '中环路高攀东路段',
        '中环路锦绣大道段',
        '中环路建材路段',
        '中环路双店路段',
        '中环路崔家店路段',
        '中环路二仙桥东路段',
        '中环路二仙桥西路段',
        '中环路八里庄路段',
        '中环路昭觉寺横路段',
        '中环路双荆路段',
        '中环路洞子口路段',
        '中环路金府路段',
        '中环路同和路段',
        '中环路一品天下大街段',
        '成温高架路',
        '清江东路',
        '十二桥路',
        '金河路',
        '人民西路',
        '人民东路',
        '总府路',
        '大慈寺路',
        '东风路',
        '水碾河路',
        '成洛大道',
        '槐树店路',
        '双庆路',
        '新华大道双林路',
        '三槐树路',
        '玉沙路',
        '德盛路',
        '文武路',
        '江汉路',
        '通锦桥路',
        '马家花园路',
        '沙湾路',
        '交大路',
        '蓉都大道将军碑路',
        '昭觉寺南路',
        '中环路八里庄路段',
        '中环路昭觉寺横路段',
        '中环路二仙桥东路段',
        '中环路二仙桥西路段',
        '中环路崔家店路段',
        '崔家店路',
        '万年路',
        '成华大道',
        '十里店路',
        '杉板桥路',
        '成华大道新鸿路',
        '猛追湾街',
        '府青路三段',
        '府青路二段',
        '府青跨线桥',
        '府青路一段',
        '红星路一段',
        '红星路二段',
        '红星路三段',
        '红星路四段',
        '复兴桥',
        '新南路',
        '磨子桥',
        '科华北路',
        '科华中路',
        '科华南路',
        '晋阳路',
        '龙腾西路',
        '龙腾中路',
        '龙腾东路',
        '大石西路',
        '大石东路',
        '小南街',
        '长顺上街',
        '长顺下街',
        '宁夏街',
        '北较场西路',
        '五丁路',
        '北站西二路',
        '蓉北商贸大道一段',
        '五块石路',
        '王贾路',
        '武侯大道双楠段',
        '佳灵路',
        '高升桥路',
        '武侯祠大街',
        '通祠路',
        '文翁路',
        '顺江路',
        '龙舟路',
        '净居寺路',
        '静安路',
        '成龙大道',
        '双成五路',


    ];

    public function execute(CRequest $request)
    {
        $exec_time = '';
        $midHour = 60 * 30;
        $beginTime = '';
        while (1){
            $current = date('Y-m-d H:i:s');

            if ($beginTime == ''){
                $oneDayAfter = date('Y-m-d H:i:s',strtotime("$current +1 day"));
            }else{
                $oneDayAfter = date('Y-m-d H:i:s',strtotime("$beginTime +1 day"));
            }

            if ($beginTime != '' && $current >= $oneDayAfter){
                break;
            }

            if ($exec_time == ''){
                $data = $this->getData();

                if (!$data){
                    break;
                }

                $data = json_encode($data);

                $id = InsertModel::make('ue_point')
                    ->addData([
                        'content' => $data,
                        'insert_time' => date('Y-m-d H:i:s'),
                        'flag' => $this->flag,
                    ])
                    ->execute();

                if ($id){
                    $exec_time = time();
                    $beginTime = date('Y-m-d H:i:s');
                }
            }else{
                if (time() > ($exec_time + $midHour)){
                    $data = $this->getData();

                    if (!$data){
                        break;
                    }

                    $data = json_encode($data);

                    $id = InsertModel::make('ue_point')
                        ->addData([
                            'content' => $data,
                            'insert_time' => date('Y-m-d H:i:s'),
                            'flag' => $this->flag,
                        ])
                        ->execute();
                    if ($id){
                        $exec_time = time();
                    }
                }
            }
//            sleep(30);
        }

        return new \CJsonData([]);
    }

    private function getData(){
        $list = [];
        foreach ($this->map as $key => $item){
            //拿所有的点
            $currentPoints = $this->requestApi('http://restapi.amap.com/v3/road/roadname',[
                "key" => "3275d38f5e03c4c8a1451450207d54aa",
                "keywords" => $item,
                "city" => '510100',
            ]);

            if ($currentPoints['infocode'] != '10000') continue;

            foreach ($currentPoints['roads'] as $val){

                if ($val['name'] == $item){

                    $list[$key]['points'] = $val['polylines'];
                }
            }

            //拿道路状态
            $condition = $this->requestApi('https://restapi.amap.com/v3/traffic/status/road',[
                "key" => "3275d38f5e03c4c8a1451450207d54aa",
                "name" => $item,
                "adcode" => '510100',
                'extensions' => 'all',
            ]);
            if ($condition['infocode'] != '10000') continue;

            $list[$key]['condition'] = $condition['trafficinfo'];

            $list[$key]['name'] = $item;
        }

//        $allPoints =  $currentPoints = $this->requestApi('http://restapi.amap.com/v3/road/roadname',[
//            "key" => "3275d38f5e03c4c8a1451450207d54aa",
//            "keywords" => '一环路',
//            "city" => '510100',
//        ]);
//
//        $allPoints = $allPoints['roads'];
//
//        return ['list' => $list,'allPoints' => $allPoints];

        return ['list' => $list];
    }

    public function requestApi($url,$params = []){
        $json = "";
        $i = 1;

        while(1){

            $i++;

            try{

                $json = Curl::instance()->get($url,$params);

            }catch(Exception $e){

                if($i < 4){
                    continue;
                }
            }

            break;
        }

        $res = json_decode($json,true);


        return $res;
    }
}