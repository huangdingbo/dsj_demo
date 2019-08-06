<?php
namespace biz\db;

/**
 * User: fu
 * Date: 2017/12/11
 * Time: 23:12
 */
class DbShowConnectListenerInterface implements \ConnectListenerInterface
{

    /**
     * @return false | array
     */
    public function onConnect()
    {
        return \CC::app()->params['db_show'];
    }
}