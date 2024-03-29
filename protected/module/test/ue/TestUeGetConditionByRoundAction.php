<?php


namespace module\test\ue;


use CC\db\base\select\ListModel;
use CC\db\base\update\UpdateModel;
use CRequest;
use module\test\ue\server\CommonServer;

class TestUeGetConditionByRoundAction extends \CAction
{
    public $center; //圆心
    public $radius; //半径

    public function execute(CRequest $request)
    {
//        $list = ListModel::make('ue_point')
//            ->addColumn('flag','3')
//            ->execute();
//        foreach ($list as $item){
//            UpdateModel::make('ue_point')
//                ->addColumn('id',$item['id'])
//                ->addData([
//                    'time_hour' => date('H:i:s',strtotime($item['insert_time']))
//                ])
//                ->execute();
//        }
//
//        echo 111;exit;
        $list = CommonServer::requestApi('https://restapi.amap.com/v3/traffic/status/circle',[
           'location' => $this->center,
           'radius' => $this->radius,
            'key' => '3275d38f5e03c4c8a1451450207d54aa',
            'extensions' => 'all',
            'level' => '4',
        ]);

        if ($list['infocode'] != '10000'){
            throw new \CErrorException('获取数据失败');
        }

        return new \CJsonData(['list' => $list]); // TODO: Change the autogenerated stub
    }
}