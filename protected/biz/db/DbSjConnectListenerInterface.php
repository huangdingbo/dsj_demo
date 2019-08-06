<?php
/**
 * Created by PhpStorm.
 * User: aubert
 * Date: 2017/12/16
 * Time: 17:02
 */

namespace biz\db;


class DbSjConnectListenerInterface implements \ConnectListenerInterface
{

    /**
     * @return false | array
     */
    public function onConnect()
    {
        return \CC::app()->params['db_sj'];
    }
}