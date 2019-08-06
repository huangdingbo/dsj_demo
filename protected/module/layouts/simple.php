
<?php
/**
 * User: fu
 * Date: 2017/12/9
 * Time: 17:14
 */


echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\LayoutsWidget(

        '数据资源系统',

        $content,
        include "leftnav.php",

        'simple'

)) ?>