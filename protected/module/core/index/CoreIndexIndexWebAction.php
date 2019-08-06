<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/14
 * Time: 16:31
 */

namespace module\core\index;


use biz\url\UrlConf;
use CRequest;
use module\setting\platform\enum\PlatformConfigEnum;
use module\setting\platform\server\PlatformConfigServer;

class CoreIndexIndexWebAction extends \CAction
{
    public function getPageTitle()
    {
//        $config = PlatformConfigServer::get(PlatformConfigEnum::PLATFORM_NAME);
//        return $config ? $config : '太湖新城首页';

        return '吴江经济技术开发区';

    }

    public function execute(CRequest $request)
    {


        return new \CRenderData(array(
//            'index_line_url' => UrlConf::getIndexLineUrl(),
        ));
    }
}