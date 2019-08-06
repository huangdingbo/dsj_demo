<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/7
 * Time: 16:00
 */

namespace module\core\login\handler;


use CC\action\module\core\login\loginHandler\ILoginAfterHandler;
use module\data\cateData\server\ProjectServer;

class OtherWebSessionLogin implements ILoginAfterHandler
{
    public function onLoginAfter($user, $params)
    {
//        $res1=\Curl::instance()->post(ProjectServer::getHostByIdstr('huanwei').'/web/index/line/num?type=1');
//        $res2= \Curl::instance()->post(ProjectServer::getHostByIdstr('zhifa').'/web/index/line/num?type=1');
    }


}