<?php


namespace module\test\ue;


use CRequest;
use Curl;
use Exception;

/**
 * Class TestUeGetRoadConditionAction
 * @package module\test\ue
 * ue根据成都市道路名获取道路状况
 */
class TestUeGetRoadConditionAction extends \CAction
{
    public $name;

    public function execute(CRequest $request)
    {

        $json = "";
        $i = 1;

        while(1){

            $i++;

            try{

                $json = Curl::instance()->get("https://restapi.amap.com/v3/traffic/status/road",array(
                    "key" => "3275d38f5e03c4c8a1451450207d54aa",
                    "name" => $this->name,
                    "adcode" => '510100',
                    'extensions' => 'all',
                ));

            }catch(Exception $e){

                if($i < 4){
                    continue;
                }
            }

            break;
        }

        $list = json_decode($json,true);


        return new \CJsonData(['list' => $list]);
    }
}