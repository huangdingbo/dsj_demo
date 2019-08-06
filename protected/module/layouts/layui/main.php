

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>layuiAdmin通用后台管理模板系统（iframe标准版）</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="/dsj_demo/public/biz/layui/layuiadmin/layui/css/layui.css" media="all">
    <link rel="stylesheet" href="/dsj_demo/public/biz/layui/layuiadmin/style/admin.css" media="all">

</head>
<body class="layui-layout-body">

<div id="LAY_app">
    <div class="layui-layout layui-layout-admin">
        <!-- 头部区域 -->
        <?php
            include "header.php";
        ?>

        <!-- 侧边菜单 -->
        <?php
            include "menu.php";
        ?>

        <!-- 页面标签 -->
        <?php
            include "page-label.php";
        ?>

        <!-- 主体内容 -->
        <?php
            include "content.php";
        ?>

        <!-- 辅助元素，一般用于移动设备下遮罩 -->
        <?php
            include "auxi.php";
        ?>

    </div>
</div>

<script src="/dsj_demo/public/biz/layui/layuiadmin/layui/layui.js"></script>
<script>
    layui.config({
        base: '/dsj_demo/public/biz/layui/layuiadmin/' //静态资源所在路径
    }).extend({
        index: 'lib/index' //主入口模块
    }).use('index');
</script>
</body>
</html>


