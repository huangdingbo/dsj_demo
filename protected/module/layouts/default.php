<?php
/**
 * User: fu
 * Date: 2017/12/9
 * Time: 17:12
 */

use biz\AuthManager;
use CC\action\module\common\auth\AuthType;
use CC\util\common\server\ConfigDataServer;
use CC\util\common\server\dsj\server\BaseConfigEnum;
use CC\util\common\server\SessionAbs;
use module\data\cateData\enum\HotColorEnum;
use module\data\cateData\server\ProjectServer;
use module\setting\platform\enum\PlatformConfigEnum;
use module\setting\platform\server\PlatformConfigServer;
use module\setting\voice\enum\VoiceEnum;

?>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title><?php echo $this->getPageTitle() ?></title>
    <link href="<?php echo $baseUrl; ?>/public/biz/common/css/common.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $baseUrl; ?>/public/biz/common/css/animate.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $baseUrl; ?>/public/biz/plug/icon/iconfont.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $baseUrl; ?>/public/biz/warning/css/warning.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $baseUrl?>/public/biz/plug/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo $baseUrl?>/public/biz/plug/daterangepicker/daterangepicker.css" rel="stylesheet">

    <script src="<?php echo $baseUrl; ?>/public/biz/plug/jquery/jquery.min.js"></script>
    <script src="<?php echo $baseUrl; ?>/public/biz/common/js/vue.js"></script>
    <script src="<?php echo $baseUrl; ?>/public/biz/common/js/vuex.js"></script>

    <script src="http://webapi.amap.com/maps?v=1.4.12&key=a3b3d16e95cfd8d858300d093f839c5f&plugin=AMap.ControlBar,AMap.MouseTool,AMap.PolyEditor,AMap.ControlBar,AMap.Heatmap,AMap.MarkerClusterer"></script>
    <script src="//webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
    <script type="text/javascript" src="http://a.amap.com/jsapi_demos/static/resource/heatmapData.js"></script>

    <script>
        var baseUrl = '<?php echo $baseUrl ?>';
        _userId = '<?php echo  SessionAbs::getUserID() ?>';
        var common_module_conf = {
            project_conf:{
                show:{
                    host:'<?php echo ProjectServer::getHostByIdstr('show') ?>',
                },
                yujing:{
                    host:'<?php echo ProjectServer::getHostByIdstr('yujing') ?>',
                },
                voice:<?php echo (int)ConfigDataServer::queryByName(VoiceEnum::SETKEY, VoiceEnum::NORMAL) ?>
            }
        };
    </script>

</head>
<body>
<?php echo 11111;?>
<?php echo $content ?>




<script src="<?php echo $baseUrl?>/public/biz/plug/daterangepicker/moment.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/plug/daterangepicker/daterangepicker.js"></script>
<script src="<?php echo $baseUrl; ?>/public/biz/plug/echart/echarts.min.js"></script>
<script src="<?php echo $baseUrl; ?>/public/biz/plug/popup/js/popup.js"></script>

<script src="<?php echo $baseUrl; ?>/public/biz/common/js/vue-router.js"></script>
<script src="<?php echo $baseUrl; ?>/public/biz/common/js/chart.js"></script>
<script src="<?php echo $baseUrl; ?>/public/biz/common/js/common.js"></script>
<script src="<?php echo $baseUrl; ?>/public/biz/common/js/module.js"></script>
<script src="<?php echo $baseUrl; ?>/public/biz/judge/js/judge_filter.js"></script>
<script src="<?php echo $baseUrl?>/public/plug/imgview/imgview.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/plug/vivus/pathformer.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/plug/vivus/vivus.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/plug/vivus/_build.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/warning/js/warning_fun.js"></script>



</body>

</html>
