<?php


namespace biz\common;


use CC;

class TestDataBaseConnectListenerInterface implements \ConnectListenerInterface
{
    public function onConnect(){
        if(!CC::app()->params['test_database']){
            throw new \CErrorException('请配置基础数据库 test_database');
        }
        return CC::app()->params['test_database'];
    }
}