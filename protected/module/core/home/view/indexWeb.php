<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="renderer" content="webkit">
    <title>吴江经济技术开发区·智慧管理中心</title>
    <meta name="description" content="用户登录"/>
    <!-- basic styles -->
    <link rel="shortcut icon" href="favicon.ico"/>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <?php use module\setting\platform\enum\PlatformConfigEnum;
    use module\setting\platform\server\PlatformConfigServer;

    echo \CC\util\common\server\AssetManager::instance()->getBaseCssJs() ?>
    <?php echo \CC\util\common\server\AssetManager::instance()->getCssJs(array(
        '/public/common/widget/module/core/login/css/loginwq.css',
        '/public/biz/web/login/css/nav.css'
    )) ?>

</head>
<body>
<div class="system-wrapper">
    <video src="<?php echo $baseUrl?>/public/biz/web/login/video/bgvideo" autoplay="autoplay" loop="loop"  muted="muted" style="position: absolute;left: 0;top: 0" width="3840" height="1296"></video>
    <div class="system-header">
        <div class="header-left">
            <img src="<?php echo $baseUrl?>/public/biz/common/image/nav_logo.png" style="margin-top:-7px;">

        </div>
        <div class="header-right">
            <div class="header-left-data">2018年8月15日  12:18</div>
            <div class="header-notice"><img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_notification.png"></div>
            <div class="header-setting"><img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_setting.png"></div>
            <div class="header-user">
                <img class="user-icon" src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_user.png">
                <span class="user-name">指挥中心调度员</span>
                <img class="user-arrow" src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_icon_down.png">
            </div>
        </div>
    </div>

    <div class="system-index"  id="scene">
        <div class="system-title">
            <div class="system-title-name">
                <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_title_light.png" class="system-title-light-top">
                <img class="system-logo" src="<?php echo $baseUrl?>/public/biz/web/login/images/index_logo.png">
                <span class="name-img">吴江经济技术开发区·智慧管理中心</span>
                <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_title_light.png" class="system-title-light-bottom">
            </div>
        </div>
        <div class="system-con" >
            <div class="system-con-side">
                <a class="system-item-box item-box-m item-box-png1" href="BingoLink://">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_zf.png">
                    <span class="system-name">智慧执法</span>
                </a>
                <a class="system-item-box item-box-m item-box-png1">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_md.png">
                    <span class="system-name">矛盾调解 </span>
                </a>
                <a class="system-item-box item-box-m item-box-png2">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_hw.png">
                    <span class="system-name">智慧环卫</span>
                </a>

            </div>
            <div class="system-con-middle">
                <a class="system-item-box item-box-b" href="<?php echo $baseUrl?>/web/core/index/index?showNav=1">
                    <img  src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_dsj.png">
                    <span class="system-name" >数据分析研判中心</span>
                </a>

                <a class="system-item-box item-box-s">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_1.png">
                    <span class="system-name">智慧渣土</span>
                </a>
                <a class="system-item-box item-box-s" href="http://10.93.0.12:2018/#/login">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_6.png">
                    <span class="system-name">一标三实</span>

                </a>
                <a class="system-item-box item-box-s">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_river.png">
                    <span class="system-name">河长制</span>
                </a>
            </div>

            <div class="system-con-side">
                <a class="system-item-box item-box-m item-box-png1" href="http://58.211.78.91:1000/citygridys/Logon.aspx">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_zh.png">
                    <span class="system-name">社会综合治理</span>
                </a>

                <a class="system-item-box item-box-m item-box-png1" href="http://www.wujiangsafety.com/login.jsp?error=1">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_grid.png">
                    <span class="system-name">企业专属网格平台</span>
                </a>
                <a class="system-item-box item-box-m" href="http://10.93.0.20:8001/project-cg/index.htm">
                    <img src="<?php echo $baseUrl?>/public/biz/web/login/images/index_icon_3.png">
                    <span class="system-name">综合执法案卷平台</span>
                </a>
            </div>


        </div>


    </div>

<!--    <div class="system-element">-->
<!--        <img class="element-img element-1 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element1.png">-->
<!--        <img class="element-img element-2 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element1.png">-->
<!--        <img class="element-img element-3 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element1.png">-->
<!--        <img class="element-img element-4 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element1.png">-->
<!--        <img class="element-img element-5 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element1.png">-->
<!--        <img class="element-img element-6 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element3.png">-->
<!--        <img class="element-img element-7 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element3.png">-->
<!--        <img class="element-img element-8 layer"  src="--><?php //echo $baseUrl?><!--/public/biz/web/login/images/index_element2.png">-->
<!--    </div>-->

</div>




<script src='<?php echo $baseUrl?>/public/biz/web/login/js/particles.min.js'></script>
<script src='<?php echo $baseUrl?>/public/biz/web/login/js/index.js'></script>

<script>
    nowtime();
    $(function () {
        setInterval('nowtime()',1000)
    });
    function nowtime(){
        var hour ,min , sec;
        var now=new Date();
        hour = now.getHours();
        min = now.getMinutes();
        sec = now.getSeconds();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        $('.header-left-data').html(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日" + "  " + hour + ":" + min + ":" + sec );
    }

</script>

</body>
</html>
