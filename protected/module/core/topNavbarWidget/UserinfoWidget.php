<?php
/**
 * User: Hermit
 * Date: 2017/7/24
 * Time: 19:30
 */

namespace module\core\topNavbarWidget;


use CC\util\common\widget\widget\Widget;

class UserinfoWidget extends Widget
{

    protected function getCalledCalsss()
    {
        return __CLASS__;
    }

    protected function onBuild()
    {
        $url = \CC::app()->url->genurl('basic/user/userinfo');

        return array(
            'url' => $url
        );
    }

}