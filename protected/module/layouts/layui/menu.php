<?php
use \CC\util\common\widget\widget\WidgetBuilder;
use \components\layui\MenuWidget;

$config = include "layui-config.php";
?>

<!-- 侧边菜单 -->
<div class="layui-side layui-side-menu">
    <div class="layui-side-scroll">
        <div class="layui-logo" lay-href="home/console.html">
            <span><?= $config['name']?></span>
        </div>

        <?php
            echo WidgetBuilder::build(new MenuWidget($config['menu']));
        ?>
    </div>
</div>

