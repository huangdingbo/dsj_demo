<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/25
 * Time: 17:53
 */

use module\core\topNavbarWidget\LogoBackWidget;
use module\core\topNavbarWidget\UserinfoWidget;

echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\LayoutsWidget(
        '吴江经济技术开发区',
        $content,
        include 'leftnav.php',
        '',
        [
            'home_url' => \CC::app()->action->genurl('/core/index/index'),
            'breadcrumbs' => $this->getBreadcrumbs(),
            'widget' => [

            ],
            'left_nav_options' => [
                'has_home_nav' => false,
            ],
            'personage_widget' => [
                new UserinfoWidget(),
            ],
            'no_avatar' => false,
            'logo_widgets' => [
                new LogoBackWidget(),
            ]
        ]
));