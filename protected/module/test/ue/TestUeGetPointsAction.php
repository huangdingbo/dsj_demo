<?php


namespace module\test\ue;


use CC\db\base\select\ListModel;
use CRequest;

class TestUeGetPointsAction extends \CAction
{
    public function execute(CRequest $request)
    {
        $list = ListModel::make('ue_point')
            ->addColumn('flag','3')
//            ->limit(10)
            ->order('time_hour asc')
            ->execute();

        $points = [];

        foreach ($list as $key1 => &$item){
            $time = $item['insert_time'];
            $item['insert_time'] = date('Y-m-d',strtotime($time)) < '2019-08-07' ? date('Y-m-d H:i:s',strtotime("$time +1 day")) : $time;

            $points[$item['insert_time']] = [];
            $item['content'] = json_decode($item['content'],true);

            foreach ($item['content']['list'] as $key2 => &$value){
                if ($value['condition']['roads'] == null){
                    continue;
                }
                foreach ($value['condition']['roads'] as $key3 => &$val){
                    if ($val['status'] == '2' || $val['status'] == '3'){
                        $pointsKey = date('H:i:s',strtotime($item['insert_time']));

                        $points[$item['insert_time']][] = $val;
                    }
                }

            }

        }

//        $points = ksort($points);

        return new \CJsonData(['list' => $points]); // TODO: Change the autogenerated stub
    }
}