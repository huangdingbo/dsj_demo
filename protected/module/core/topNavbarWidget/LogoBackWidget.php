<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/1/9
 * Time: 20:21
 */

namespace module\core\topNavbarWidget;


use CC\util\common\widget\widget\Widget;

class LogoBackWidget extends Widget
{

    protected function onBuild()
    {
        return '<a class="back_a" href="'.\CC::app()->url->genurl('/web/core/index/index').'"><i class="back iconfont icon-xiangzuo1"></i></a><span class="back-is"></span>';
    }
}