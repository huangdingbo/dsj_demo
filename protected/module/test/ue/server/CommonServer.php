<?php


namespace module\test\ue\server;


use Curl;
use Exception;

class CommonServer
{
    public static function requestApi($url,$params = []){
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