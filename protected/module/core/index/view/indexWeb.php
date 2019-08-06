<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/14
 * Time: 16:32
 */

use module\databook\server\DatabookServer;
use module\setting\platform\enum\PlatformConfigEnum;
use module\setting\platform\server\PlatformConfigServer;

?>
<link href="<?php echo $baseUrl; ?>/public/biz/index/css/index.css" rel="stylesheet">
<link href="<?php echo $baseUrl; ?>/public/biz/index/css/river.css" rel="stylesheet">
<link href="<?php echo $baseUrl; ?>/public/biz/index/css/grid.css" rel="stylesheet">
<link href="<?php echo $baseUrl; ?>/public/biz/index/css/zhifa.css" rel="stylesheet">
<link href="<?php echo $baseUrl; ?>/public/plug/icon/iconfont.css" rel="stylesheet">

<link href="<?php echo $baseUrl; ?>/public/biz/index/xb_old_wujiang/css/deck.css" rel="stylesheet">
<!--zhh-->
<link href="<?php echo $baseUrl; ?>/public/biz/index/xb_old_wujiang/css/mapbox-gl.css" rel="stylesheet">
<link href="<?php echo $baseUrl; ?>/public/biz/index/xb_old_wujiang/css/mapbox-gl.new.css" rel="stylesheet">
<!--<link href="--><?php //echo $baseUrl; ?><!--/public/biz/index/xb_old_wujiang/css/zhifa_map.css" rel="stylesheet">-->

<link href="<?php echo $baseUrl; ?>/public/biz/index/css/colpick.css" rel="stylesheet">
<style>

</style>

<div id="app">
    <div class="index-map" >
        <div class="index-map-layer">
            <img src="<?php echo $baseUrl?>/public/biz/index/image/index_loading.svg">
        </div>
        <div class="index-map-container layer" data-depth="0.1">
            <div class="index-map-box map_wapper_mask" id="home-map"></div>
        </div>
    </div>
    <div class="index-header">
        <div class="header-left"><div class="index-left-icon"><img src="/dsj_wjjkq_web/public/biz/index/image/logo_2.png"><span>江苏有线</span><div class="index-left-icon-line"></div></div><div class="index-left-icon"><img src="/dsj_wjjkq_web/public/biz/index/image/logo_3.png"><span>智慧广电</span><div class="index-left-icon-line"></div></div><div class="index-left-icon"><img src="/dsj_wjjkq_web/public/biz/index/image/logo_1.png"><span>小步创想</span></div></div>
        <div class="header-weather">
            <date-weather></date-weather>
        </div>
                        <section class="nav-page-title">
                            <img src="<?php echo $baseUrl?>/public/biz/index/image/btn_back.png" id="packUpNav">
                            <div>吴江经济技术开发区·</div>
                            <div class="nav-type">社会治理</div>
                        </section>
        <div class="header-center">
            <div class="header-smallNav">
                <div class="header-smallNav-con header-smallNav-con-zhifa">
                    <div class="header-nav-icon header-nav-icon-zhifa"><img src="<?php echo $baseUrl?>/public/biz/index/image/btn_back.png"></div>
                    <div class="header-smallNav-title">红色引擎</div>
<!--                    <div class="header-smallNav-item-zhifa-warp">-->
<!--                        <router-link to="/dj" class="header-smallNav-item-zhifa">党建</router-link>-->
<!--                        <div class="nav-line"></div>-->
<!--                    </div>-->
                    <router-link class="header-smallNav-item-zhifa-warp" to="/dj">
                        <a class="header-smallNav-item-zhifa">党建</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">团建</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">工会</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">志愿者</a>
                        <div class="nav-line"></div>
                    </div>

                </div>
                <div class="header-smallNav-con header-smallNav-con-zhifa">
                    <div class="header-nav-icon header-nav-icon-zhifa"><img src="<?php echo $baseUrl?>/public/biz/index/image/btn_back.png"></div>
                    <div class="header-smallNav-title">社会治理</div>
                    <router-link class="header-smallNav-item-zhifa-warp" to="/wggl">
                        <a class="header-smallNav-item-zhifa">网格管理</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <router-link class="header-smallNav-item-zhifa-warp" to="/yxts">
                        <a class="header-smallNav-item-zhifa">运行态势</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <router-link class="header-smallNav-item-zhifa-warp" to="/maodun" >
                        <a class="header-smallNav-item-zhifa">矛盾调解</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a href="http://10.93.0.12:2018/#/ybls_house" class="header-smallNav-item-zhifa" target="_blank">一标三实</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">综治工作</a>
                        <div class="nav-line"></div>
                    </div>
                    <router-link class="header-smallNav-item-zhifa-warp" to="/river">
                        <a class="header-smallNav-item-zhifa">河长制</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">三治工作</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">环境保护</a>
                        <div class="nav-line"></div>
                    </div>


                </div>
                <div class="header-smallNav-con header-smallNav-con-zhifa">
                    <div class="header-nav-icon header-nav-icon-zhifa"><img src="<?php echo $baseUrl?>/public/biz/index/image/btn_back.png"></div>
                    <div class="header-smallNav-title">综合执法</div>
                    <router-link class="header-smallNav-item-zhifa-warp" to="/zhifa">
                        <a  class="header-smallNav-item-zhifa">综合态势</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">智慧渣土</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">智慧环卫</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">专业网格</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">安全生产</a>
                        <div class="nav-line"></div>
                    </div>
                    <router-link class="header-smallNav-item-zhifa-warp" to="/guanggao">
                        <a class="header-smallNav-item-zhifa">户外广告</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <router-link class="header-smallNav-item-zhifa-warp" to="/shudao">
                        <a class="header-smallNav-item-zhifa">疏导定位</a>
                        <div class="nav-line"></div>
                    </router-link>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">市容市貌</a>
                        <div class="nav-line"></div>
                    </div>
                </div>

                <div class="header-smallNav-con header-smallNav-con-zhifa">
                    <div class="header-nav-icon header-nav-icon-zhifa"><img src="<?php echo $baseUrl?>/public/biz/index/image/btn_back.png"></div>
                    <div class="header-smallNav-title">民生服务</div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">水电气暖</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">市政管网</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">通讯电力</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">物业管理</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">教育规范</a>
                        <div class="nav-line"></div>
                    </div>
                </div>
                <div class="header-smallNav-con header-smallNav-con-zhifa">
                    <div class="header-nav-icon header-nav-icon-zhifa"><img src="<?php echo $baseUrl?>/public/biz/index/image/btn_back.png"></div>
                    <div class="header-smallNav-title">应急管理</div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">突发事件</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">指挥调度</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">消防安全</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">抗旱防涝</a>
                        <div class="nav-line"></div>
                    </div>
                    <div class="header-smallNav-item-zhifa-warp">
                        <a class="header-smallNav-item-zhifa">村村通</a>
                        <div class="nav-line"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="index-nav">
            <div class="index-nav-box index-nav-box1">
                <div class="nav-box-hover"></div>
                <div class="nav-box-main">
                    <div class="nav-box-icon"><img src="<?php echo $baseUrl?>/public/biz/index/image/zhifa_new/nav_icon_big_1.png"></div>
                    <div class="nav-box-con">
                        <div class="nav-menu-title">红色引擎</div>
                        <router-link to="/dj" class="nav-menu-item nav-item-1"><span class="nav-icon"></span>党建</router-link>
                        <a class="nav-menu-item nav-item-2"><span class="nav-icon"></span>团建</a>
                        <a class="nav-menu-item nav-item-3"><span class="nav-icon"></span>工会</a>
                        <a class="nav-menu-item nav-item-4"><span class="nav-icon"></span>志愿者</a>
                    </div>
                </div>
            </div>
            <div class="index-nav-box index-nav-box2">
                <div class="nav-box-hover"></div>
                <div class="nav-box-main">
                    <div class="nav-box-icon"><img src="<?php echo $baseUrl?>/public/biz/index/image/zhifa_new/nav_icon_big_2.png"></div>
                    <div class="nav-box-con">
                        <div class="nav-menu-title">社会治理</div>
                        <router-link to="/wggl" class="nav-menu-item nav-item-6"><span class="nav-icon"></span>网格管理</router-link>
                        <router-link to="/yxts" class="nav-menu-item nav-item-5"><span class="nav-icon"></span>运行态势</router-link>
                        <router-link to="/maodun" class="nav-menu-item nav-item-7"><span class="nav-icon"></span>矛盾调解</router-link>
                        <a class="nav-menu-item nav-item-8" href="http://10.93.0.12:2018/#/ybls_house" target="_blank"><span class="nav-icon"></span>一标三实</a>
                        <a class="nav-menu-item nav-item-9"><span class="nav-icon"></span>综治工作</a>
                        <router-link to="/river" class="nav-menu-item nav-item-10"><span class="nav-icon"></span>河长制</router-link>
                        <a class="nav-menu-item nav-item-11"><span class="nav-icon"></span>三治工作</a>
                        <a class="nav-menu-item nav-item-12"><span class="nav-icon"></span>环境保护</a>
                    </div>


                </div>
            </div>
            <div class="index-nav-box index-nav-box3">
                <div class="nav-box-hover"></div>
                <div class="nav-box-main">
                    <div class="nav-box-icon"><img src="<?php echo $baseUrl?>/public/biz/index/image/zhifa_new/nav_icon_big_3.png"></div>
                    <div class="nav-box-con">
                        <div class="nav-menu-title">综合执法</div>
                        <router-link to="/zhifa" class="nav-menu-item nav-item-18"><span class="nav-icon"></span>综合执法态势</router-link>
                        <a class="nav-menu-item nav-item-13"><span class="nav-icon"></span>智慧渣土</a>
                        <a class="nav-menu-item nav-item-14"><span class="nav-icon"></span>智慧环卫</a>
                        <a class="nav-menu-item nav-item-15"><span class="nav-icon"></span>专业网格</a>
                        <a class="nav-menu-item nav-item-16"><span class="nav-icon"></span>安全生产</a>
                        <router-link to="/guanggao" class="nav-menu-item nav-item-17"><span class="nav-icon"></span>户外广告</router-link>
                        <router-link to="/shudao" class="nav-menu-item nav-item-19"><span class="nav-icon"></span>疏导点位</router-link>
                        <a class="nav-menu-item nav-item-20"><span class="nav-icon"></span>市容市貌</a>
                    </div>


                </div>
            </div>
            <div class="index-nav-box index-nav-box4">
                <div class="nav-box-hover"></div>
                <div class="nav-box-main">

                    <div class="nav-box-icon"><img src="<?php echo $baseUrl?>/public/biz/index/image/zhifa_new/nav_icon_big_4.png"></div>
                    <div class="nav-box-con">
                        <div class="nav-menu-title">民生服务</div>
                        <a class="nav-menu-item nav-item-21"><span class="nav-icon"></span>水电气暖</a>
                        <a class="nav-menu-item nav-item-22"><span class="nav-icon"></span>市政管网</a>
                        <a class="nav-menu-item nav-item-23"><span class="nav-icon"></span>通讯电力</a>
                        <a class="nav-menu-item nav-item-24"><span class="nav-icon"></span>物业管理</a>
                        <a class="nav-menu-item nav-item-25"><span class="nav-icon"></span>教育规范</a>
                    </div>


                </div>
            </div>
            <div class="index-nav-box index-nav-box5">
                <div class="nav-box-hover"></div>
                <div class="nav-box-main">
                    <div class="nav-box-icon"><img src="<?php echo $baseUrl?>/public/biz/index/image/zhifa_new/nav_icon_big_5.png"></div>
                    <div class="nav-box-con">
                        <div class="nav-menu-title">应急管理</div>
                        <a class="nav-menu-item nav-item-26"><span class="nav-icon"></span>突发事件</a>
                        <a class="nav-menu-item nav-item-27"><span class="nav-icon"></span>指挥调度</a>
                        <a class="nav-menu-item nav-item-28"><span class="nav-icon"></span>消防安全</a>
                        <a class="nav-menu-item nav-item-29"><span class="nav-icon"></span>抗旱防涝</a>
                        <a class="nav-menu-item nav-item-30"><span class="nav-icon"></span>村村通</a>
                    </div>
                </div>
            </div>
    </div>
    <div class="index-container">
        <router-view></router-view>
    </div>

</div>
<!--<script src="--><?php //echo $baseUrl?><!--/public/biz/index/js/temporary/colpick.js"></script>-->
<script src="<?php echo $baseUrl?>/public/biz/index/js/index_fun.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/common/js/echarts4-4.2.1.js"></script>
<!--<script src="--><?php //echo $baseUrl?><!--/public/biz/index/xb_old_wujiang/js/libs/stats.min.js"></script>-->
<!--<script src="--><?php //echo $baseUrl?><!--/public/biz/index/xb_old_wujiang/js/libs/MapboxFPS.min.js"></script>-->
<!--<script src="--><?php //echo $baseUrl?><!--/public/biz/index/xb_old_wujiang/js/libs/mapbox-gl.js"></script>-->
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/mapbox-gl.new.js"></script>
<script>
    //threeJs需要的变量
    let threeBox,xbObjects,mapStyle,mapStyle2,xbMap,xbMap2;
    mapboxgl.accessToken = '';
    //var stats = new Stats();
    //stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    //document.body.appendChild( stats.dom );
    //$(stats.dom).css({'left':'1250px',top:'250px',transform:'scale(4.5)','display':'none'})

</script>




<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBMapStyle.js"></script>

<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/http_unpkg.com_@deck.gl_core@~7.0.0_dist.min.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/http_unpkg.com_@deck.gl_layers@~7.0.0_dist.min.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/http_unpkg.com_@deck.gl_geo-layers@~7.0.0_dist.min.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/http_unpkg.com_@deck.gl_aggregation-layers@~7.0.0_dist.min.js"></script>


<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/geoTransUtil.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/dat.gui.min.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/three.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/gunzip.min.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/XBMLoader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/XBCameraSync.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/inflate.min.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/OBJLoader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/FBXLoader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/MTLLoader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/Water.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/Sky.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/EffectComposer.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/RenderPass.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/ShaderPass.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/UnrealBloomPass.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/CopyShader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/LuminosityHighPassShader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/MapControls.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/DRACOLoader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/Lensflare.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/uil.min.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/Reflector.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/Refractor.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/Water2.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/SSAARenderPass.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/MaskPass.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/FXAAShader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/FXAAShader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/SMAAShader.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/libs/SMAAPass.js"></script>


<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBMapObject.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBLngLatXYConvert.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBObjects.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBMovingObject.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBWeather.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBMarker.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBPeople.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBWater.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBDrawLine.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBMapControl.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBDeckGL.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBTripsLayer.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBTraffic.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBCar.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBOBJExporter.js"></script>

<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBThreeBox.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/control.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/xb_old_wujiang/js/XBFloors.js"></script>



<script src="<?php echo $baseUrl?>/public/biz/index/js/river_pop.js"></script>

<script src="<?php echo $baseUrl?>/public/biz/index/js/index_party.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/js/index_social1.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/js/index_social2.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/js/zhifa_pop.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/js/index_zhifa.js"></script>

<script src="<?php echo $baseUrl?>/public/biz/index/js/index_pop.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/index/js/index_grid.js"></script>



<script src="<?php echo $baseUrl?>/public/biz/judge/js/judge_fun.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/decision/DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/plug/tree/x-tree.js"></script>
<script src="<?php echo $baseUrl?>/public/biz/common/laydate/laydate.js"></script>

<style>
    /*.amap-icon{display: none;}*/
    .amap-marker-label{border: none;background-color: transparent;font-size: 20px;}
</style>
<script>

    (function () {
        let tooltip_temp_template = {
            template:'<div></div>'
        };
        const ToastConstructor =  Vue.extend(tooltip_temp_template);

        let Mask = {
                template:`
                        <!-- 带有遮罩层的模态窗   -->
                    <transition name="pt-fadeinout">
                        <div ref="pts" class="pt-tooltips" :style="'z-index:'+(zIndex?zIndex:1000)">
                            <div class="pt-tooltips-Mask"></div>
                            <div class="pt-tooltips-content" >
                                <div class="pt-tooltips-holder" :class="{'pt-tooltips-holder-nomask':!mask}">
                                    <div class="pt-block-top-right" v-if="mask"></div>
                                    <div class="pt-block-bottom-right" v-if="mask"></div>
                                    <div class="pt-tooltips-background">
                                        <div class="pt-tooltips-close" @click="close">×</div>
                                        <slot></slot>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>`,
                    props:['type','zIndex','styles'],
                    data:function () {
                        return {
                            mask:true,
                            radomId:'',
                            closebox:{}
                        }
                    },
                    created:function(){
                        if(this.type=='nomask'){this.mask=false;}
                    },
                    mounted:function(){
                        let that = this;

                        window.closePopWindow = function () {//暴露一个关闭方法给GIS
                            that.close();
                        };

                        this.radomId = (Math.random()*10000000).toFixed(0).toString()
                        this.closebox[this.radomId]=function () {
                            let e = event||window.event
                            if(e.keyCode) {
                                if(e.keyCode == 27) {
                                    that.close()
                                }
                            }
                        }
                        window.document.addEventListener('keydown',this.closebox[this.radomId]);
                        this.$once('hook:beforeDestroy',()=>{
                            window.document.removeEventListener('keydown',this.closebox[this.radomId]);
                        })
                        if(this.styles){
                            let data = this.styles;
                            for (let i in data){
                                this.setStyle(i,this.styles[i])
                            }
                        }
                    },
                    beforeDestroy:function(){
                    },
                    methods:{
                        close:function () {
                            window.document.removeEventListener('keydown',this.keybord)
                            this.$destroy(true);
                            try{
                                this.$el.parentNode.removeChild(this.$el);
                            }catch(err){
                                console.log('tooltips is already closed')
                            }

                        },
                        setStyle:function (className,classNode) {/*手动设置弹窗某个class得style*/
                            let target = this.$el.querySelector('.'+className);
                            if(className=='pt-tooltips'){
                                target=this.$refs.pts;
                            }
                            if(target){
                                for(let i in classNode){
                                    target.style[i]=classNode[i];
                                }
                            }
                        }
                    }
                };
                Vue.component('Tooltip',Mask);/*全局注册tooltip组件，使用组件式调用*/
                function showToast(options){
                    /*传入参数    {render:(h)=>{
                                    h(component)
                              }}*/
                    const toastDom = new ToastConstructor({
                        el : document.createElement('div'),
                        render:function (h) {/*h相当于createElement，但是又有区别，传入h备用*/
                            /*h即createElement ，三个参数
                            * 1. VNode，也可是component，
                            * 2. option，即component的参数，data、props等
                            * 3. slot，即component的子元素
                            *
                            * 注意事项：传props必须要外层有render函数才可使用
                            * */
                            return h(Mask,{props:options.tooltipprops?options.tooltipprops:''},[/*h返回Vnode代码，$slots即插入位置*/
                            h(options.render,{props:options.props?options.props:''}, this.$slots.default),/*创建弹窗内容，插入到上级文件即mask的slot中*/
                            ])
                        }
                    })
                    //在body中动态创建一个div元素，后面自动会把它替换成整个vue文件内的内容
                    document.body.appendChild(toastDom.$el);
                    return toastDom.$children[0]
                }

        function registryTooltips (){
            //把$Tooltips这个方法添加到uve的原型中，可以直接调用，当调用的时候就是执行函数内的内容
            Vue.prototype.$Tooltips = showToast;
        }
        registryTooltips()
    })();
    (function () {
        function setStyle(op){
            if(op.styles){
                //创建唯一id
                let id = randomId(10);
                //递归添加id
                setDomId(op.$el,id);
                generateCssSheet(op.styles,id)
                op.$once('hook:beforeDestroy', () => {
                    let dom = document.getElementsByClassName(id);
                    for(let i of dom){
                        dom.remove();
                    }
                })
            }
        }
        function generateCssSheet(style,id) {
            let cssString = '';

            for(let i in style){
                let name = i;
                if(name.includes(",")){
                    name = name.split(",");
                    for(let j in name){
                        name[j] = name[j].split(' ');
                        for(let k in name[j]){
                            if(name[j][k].includes(":")){
                                let temp = name[j][k].split(":")
                                name[j][k] = temp[0]+'['+id+']:'+temp[1];
                            }else{
                                name[j][k]+='['+id+']';
                            }
                        }
                        name[j] = name[j].join(" ");
                    }
                    name = name.join(",")
                }else{
                    name = name.split(' ');
                    for(let i in name){
                        if(name[i].includes(":")){
                            let temp = name[i].split(":")
                            name[i] = temp[0]+'['+id+']:'+temp[1];
                        }else{
                            name[i]+='['+id+']';
                        }
                    }
                    name = name.join(" ");
                }

                let stys='{';
                for(let o in style[i]){
                    stys+=o+':'+style[i][o]+';'
                }
                stys+="}";
                cssString+=name+stys;
            }
            let styledom = document.createElement('style');
            styledom.setAttribute('rel','stylesheet')
            styledom.type = 'text/css';
            styledom.innerHTML=cssString;
            styledom.className=id;
            let dom = document.getElementsByClassName(id);
            for(let i of dom){
                dom.remove();
            }
            document.getElementsByTagName('HEAD').item(0).appendChild(styledom);
        }
        async function setDomId(dom,id) {
            dom.setAttribute(id,'')
            for(let item of dom.children){
                setDomId(item,id)
            }
        }
        function randomId(num){
            var returnStr = "",
                charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for(var i=0; i<num; i++){
                if(i==0){returnStr+='P';continue}
                var index = Math.round(Math.random() * (charStr.length-1));
                returnStr += charStr.substring(index,index+1);
            }
            return returnStr;
        }
        Vue.prototype.$setStyle = setStyle;
    })()
    window.onload = function(){


        let router = new VueRouter({
            routes:[
                {
                    path: '/',
                    redirect:'/yxts',
                    component: page_yxts
                },
                {
                    path: '/yxts',
                    component: page_yxts
                },
                {
                    path: '/wggl',
                    component: page_wggl
                },
                {
                    path: '/dj',
                    component: page_dangjian
                },
                {
                    path: '/shudao',
                    component: page_shudao
                },
                {
                    path: '/guanggao',
                    component: page_guanggao
                },
                {
                    path: '/maodun',
                    component: page_maodun
                },
                {
                    path:'/river',
                    component:page_river,
                },
                {
                    path:'/jingji',
                    component: page_jingji,
                },
                {
                    path:'/zhifa',
                    component:page_zhifa,
                }
            ]
        });
        const store = new Vuex.Store({
            state:{
                goWhereIndex:'',
                ZhiFaLeftZhongJingOndata:1,
                ZhiFaLeftZhongJingData:null,
                AnQingFenXiZhongJingOndata:1,
                AnQingFenXiZhongJingData:null,
                weixingtu:{
                    "id": "mapbox-satellite",
                    "type": "raster",
                    "source": "weixing",
                    "maxzoom": 16,
                    "layout": {},
                    "paint": {
                        "raster-hue-rotate": 120,
                        "raster-saturation": -1,
                        "raster-fade-duration": 400,
                        "raster-opacity": ["interpolate", ["linear"],
                            ["zoom"], 12.95, 0.28, 13, 0.28, 14, 0
                        ]
                    }
                },
                land:{
                    "id": "land",
                    "type": "background",
                    "paint": {
                        "background-color": ["interpolate", ["linear"],
                            ["zoom"], 13.95, "hsl(216, 51%, 14%)", 14, "#131416"
                        ],
                        "background-opacity": ["interpolate", ["linear"],
                            ["zoom"], 13.95, 1, 14, 1
                        ]
                    }
                },
                reagon:[
                    {
                        "id": "自贡_水系_region",
                        "type": "fill",
                        "metadata": {
                            "mapbox:group": "826c4350dacde14756fd11e95250e745"
                        },
                        "source": "jkq",
                        "source-layer": "polygon",
                        "filter": ["match", ["get", "waterway"],
                            ["riverbank"], true, false
                        ],
                        "layout": {},
                        "paint": {
                            "fill-outline-color": "hsla(0, 0%, 0%, 0)",
                            "fill-opacity": ["interpolate", ["linear"],
                                ["zoom"], 14, 0.75, 14.1, 0.75
                            ],
                            "fill-color": "hsl(206, 100%, 5%)"
                        },
                        "source_layer": ""
                    },
                    {
                        "id": "自贡_岛屿_region copy 4",
                        "type": "fill",
                        "metadata": {
                            "mapbox:group": "826c4350dacde14756fd11e95250e745"
                        },
                        "source": "jkq",
                        "source-layer": "polygon",
                        "filter": ["match", ["get", "waterway"],
                            ["riverbank"], true, false
                        ],
                        "layout": {},
                        "paint": {
                            "fill-color": ["interpolate", ["exponential", 1.06],
                                ["zoom"], 13, "hsl(0, 0%, 7%)", 14, "hsl(0, 0%, 0%)"
                            ],
                            "fill-opacity": ["interpolate", ["linear"],
                                ["zoom"], 14, 0.25, 14.1, 0.25
                            ],
                            "fill-outline-color": "hsla(0, 0%, 0%, 0)",
                            "fill-pattern": "bw"
                        },
                        "source_layer": ""
                    },
                    {
                        "id": "自贡_岛屿_region copy 1",
                        "type": "fill",
                        "metadata": {
                            "mapbox:group": "826c4350dacde14756fd11e95250e745"
                        },
                        "source": "jkq",
                        "source-layer": "polygon",
                        "filter": ["match", ["get", "natural"],
                            ["wetland", "water"], true, false
                        ],
                        "layout": {},
                        "paint": {
                            "fill-color": "#000e19",
                            "fill-opacity": ["interpolate", ["linear"],
                                ["zoom"], 14, 0.75, 14.1, 0.75
                            ],
                            "fill-outline-color": "hsla(200, 100%, 49%, 0)"
                        },
                        "source_layer": ""
                    },
                    {
                        "id": "自贡_岛屿_region copy 2",
                        "type": "fill",
                        "metadata": {
                            "mapbox:group": "826c4350dacde14756fd11e95250e745"
                        },
                        "source": "jkq",
                        "source-layer": "polygon",
                        "filter": ["match", ["get", "natural"],
                            ["wetland", "water"], true, false
                        ],
                        "layout": {},
                        "paint": {
                            "fill-color": ["interpolate", ["exponential", 1.06],
                                ["zoom"], 13, "hsl(0, 0%, 7%)", 14, "hsl(0, 0%, 0%)"
                            ],
                            "fill-opacity": ["interpolate", ["linear"],
                                ["zoom"], 14, 0.25, 14.1, 0.25
                            ],
                            "fill-outline-color": "hsla(0, 0%, 0%, 0)",
                            "fill-pattern": "bw"
                        },
                        "source_layer": ""
                    }
                ],
                latlngbox:{
                    zfts:{
                        center:[120.68157500581765,31.14555342231364],
                        pitch:56.99999999999996,
                        zoom:12.776230503193231,
                        speed:0.8,
                        bearing:1.1368683772161603e-13
                    },
                    zfdw:{
                        center:[120.74590191940365,31.142889996721607],
                        pitch:53.99999999999997,
                        zoom:12.776230503193231,
                        speed:0.8,
                        bearing:5.151080265106657
                    },
                    aqfx:{
                        center:[120.71561711809431,31.144739301357077],
                        pitch:54.99999999999997,
                        zoom:12.776230503193231,
                        speed:0.8,
                        bearing:1.6983257623627426
                    }
                },
                gridList:{
                    isLeftCk:0,
                    isBtmCk_1:true,
                    isBtmCk_2:false,
                    personList:'',
                    gangWeiMarkerBox:[],
                    JcClick:{
                        code:'WJ0117161',
                        id:'鱼行'
                    }
                }
            },
            mutations:{
                ChangeZhiFaLeftZhongJingOndata:function (state,n) {
                    state.ZhiFaLeftZhongJingOndata = n;
                },
                ChangeAnQingFenXiZhongJingOndata:function (state,n) {
                    state.AnQingFenXiZhongJingOndata = n;
                },
                ChangeZhiFaLeftZhongJingData:function (state,n){
                    state.ZhiFaLeftZhongJingData = n;
                },
                ChangeAnQingFenXiZhongJingData:function (state,n){
                    state.AnQingFenXiZhongJingData = n;
                }
            }
        });

        new Vue({
            router,
            el:'#app',
            store,
            components:{
              'date-weather':{
                  data:function(){
                      return{
                          isClick:false,
                          date:'',
                          week:'',
                          time:'',
                          weatherData:{

                          }
                      }

                  },
                  template:`<div class="header-right">
                                <div class="header-right-dateWeather">
                                    <div class="header-right-time">{{time}}</div>
                                    <div class="header-right-date" >{{date}}</div>
                                </div>
                                <div class="header-right-2">
                                    <!--<div class="header-right-time">{{week}}</div>-->
                                    <div class="header-right-weather"><img :src="weatherData.weather_icon">{{weatherData.temperature}}</div>
                                </div>
                                <div class="heanav-box-hoverder-right-3"><p>PM2.5</p><p>{{weatherData.aqi}}</p></div>
                      </div>`,
                  mounted:function(){
                      let that = this;
                      setInterval(function(){
                          that.date = that.getCurrentDate();
                          that.week = that.getCurrentWeek();
                          that.time = that.getCurrentTime();
                      },1000);

                      ajax_jsonp_request({
                          url:baseUrl+'/api/data/weather',
                          fn:function(data){
                              that.weatherData = {
                                  aqi:data.aqi,
                                  weather_curr:data.weather_curr,
                                  temperature:data.temperature,
                                  wind:data.wind,
                                  weather_icon:`${baseUrl}/public/biz/common/image/war_`+data.weatid+'.png',
                              }
                          }
                      })
                  },
                  methods:{

                      getCurrentDate(){
                          var date=new Date(), str='',time='';


                          str +=date.getFullYear()+'年';
                          str +=date.getMonth()+1+'月';
                          str +=date.getDate()+'日';

                          return str
                      },
                      getCurrentWeek(){
                          var date=new Date();
                          var week = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
                          var today = week[date.getDay()];
                          return today;
                      },
                      getCurrentTime(){
                          var date=new Date();
                          var h=date.getHours();       //获取当前小时数(0-23)
                          var m=date.getMinutes();     //获取当前分钟数(0-59)
                          var s=date.getSeconds();
                          if(m < 10){
                              m = '0'+m;
                          }

                          if(s < 10){
                              s = '0'+s;
                          }
                          var time = h +':'+ m + ':' + s;
                          return time;
                      }
                  }
              }
            },
            mounted:function(){
                //主页地图
                window.map = new AMap.Map('home-map', {
                    resizeEnable: true,
                    dragEnable:false,
                    zoomEnable:false,
                    keyboardEnable:false,
                    defaultCursor:'default',
                    zoom: 13.2,
                    viewMode:'3D',
                    pitch:32,
                    center:[120.720148,31.149166],
                    mapStyle:'amap://styles/6e8c09643b31d51335207af741e0b197'
                });
                //主页图片图层(地图)
                window.imageLayer = new AMap.ImageLayer({
                    url: baseUrl+'/public/biz/index/image/map_bg_1.jpg',
                    bounds: new AMap.Bounds(
                        [120.383591,31.043596],
                        [121.071392,31.278544]

                    )
                });
                window.imageLayer.setMap(map);
                //主页图片图层(河道)
                window.imageLayer2 = new AMap.ImageLayer({
                    url: baseUrl+'/public/biz/index/image/map_bg_2.png',
                    bounds: new AMap.Bounds(
                        [120.383591,31.043596],
                        [121.071392,31.278544]

                    )
                });
                //地图加载完成后执行的回调
                window.map.on('complete',function() {
                    $('.index-map-layer').remove();

                    $('#home-map').removeClass('map_wapper_mask');
                    $('.index-map-container').addClass('zoomIn');
                    $('.index-map-container').css('opacity','1');

                    ajax_jsonp_request({
                        url:common_module_conf.project_conf.show.host+'/api/index/index/gridServey',
                        post_data:{
                            isOnlyThree:0
                        },
                        fn:function(data){
                            socialGrid.draw(map,data.threeGridInfo.list);
                        }
                    });
                });

                this.navFun();
                // $('.header-smallNav-item-zhifa.router-link-active').next().show()
                // $('.header-smallNav-item-zhifa-warp').on('click',function () {
                //     $('.nav-line').hide();
                //     setTimeout(()=>{
                //         console.log($(this).find('.router-link-active'))
                //         if($(this).find('.router-link-active').length == 0){
                //             $('.nav-line').hide();
                //         }else {
                //             $(this).find('.nav-line').show();
                //         }
                //     },10)
                // })
            },
            methods: {
                navFun: function () {
                    let index = $('.nav-menu-item.router-link-active').parents('.index-nav-box').index();
                    $('.header-smallNav-con').eq(index).addClass('ac').siblings().removeClass('ac');

                    // $('.index-nav-box').click(function(){
                    //     let text = $(this).find('.nav-menu-title').text();
                    //     let index = $(this).index();
                    //     $('.header-smallNav-con').eq(index).addClass('ac').siblings().removeClass('ac');
                    //     $('.header-center-title .center-titleName').text('开发区一张图·'+ text + '专题');
                    // });
                    //
                    $('.header-nav-icon').click(function () {
                        if(window.p!=null){
                            window.p.close();
                        }

                        //从经济运行态势 跳到其他一张图时 清空扎点
                        if(!$.isEmptyObject(drawMarker.marker_obj[10])){
                            drawMarker.clear(10)
                        }

                        $(this).toggleClass('ac');
                        if ($(this).hasClass('ac')) {
                            $('.index-container,.index-map').addClass('filter_style');
                            $('.index-container').css('z-index',1);
                            $('.index-nav').css('transform', 'translateY(0)');
                            $('.header-smallNav').hide();
                            setTimeout(()=>{
                                $('.nav-page-title').css('display','flex')
                            },1000)

                        } else {
                            $('.index-nav').css('transform', 'translateY(-140%)');
                            $('.index-container,.index-map').removeClass('filter_style');
                            $('.index-container').css('z-index','auto');
                            $('.header-smallNav').show();

                        }
                    });
                    $('#packUpNav').on('click',function () {
                        $('.index-nav').css('transform', 'translateY(-140%)');
                        $('.index-container,.index-map').removeClass('filter_style');
                        $('.index-container').css('z-index','auto');
                        $('.header-smallNav').show();
                        $('.nav-page-title').hide()
                        $('.header-nav-icon').removeClass('ac');
                    })
                    let se = $('.nav-menu-item.router-link-active').parent().find('.nav-menu-title').text();
                    $('.nav-type').text(se)

                    $('.nav-menu-item').click(function(){
                        $('.index-nav').css('transform', 'translateY(-140%)');
                        $('.index-container,.index-map').removeClass('filter_style');
                        $('.index-container').css('z-index','auto');
                        $('.header-nav-icon').removeClass('ac');
                        $('.header-smallNav').show();
                        setTimeout(()=>{
                            let index = $('.nav-menu-item.router-link-active').parents('.index-nav-box').index();
                            $('.header-smallNav-con').eq(index).addClass('ac').siblings().removeClass('ac');
                        },50);
                        $('.nav-page-title').hide()

                        let title = $(this).parent().find('.nav-menu-title').text()
                        $('.nav-type').text(title)
                    });

                    // $('.index-nav').click(function(e){
                    //     let exclude = $(this).find('.index-nav-box');
                    //     if (!exclude.is(e.target) && exclude.has(e.target).length === 0 ) {
                    //         window.location.href=`${baseUrl}/web/core/index/index#/jingji`;
                    //         $('.header-center-title .center-titleName').text('吴江经济技术开发区·经济总体运行态势');
                    //         $('.index-nav').css('transform', 'translateY(-140%)');
                    //         $('.index-container,.index-map').removeClass('filter_style');
                    //         $('.index-container').css('z-index','auto');
                    //         $('.header-nav-icon').removeClass('ac');
                    //     }
                    // })
                }
            }

        });


    }
    $('.header-smallNav-item-zhifa-warp').on('click',function () {
        $('.nav-line').hide()
        $(this).find('.nav-line').show()
    })

</script>
