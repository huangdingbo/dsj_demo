<?php
    $config = include "layui-config.php";
?>
<div class="layui-header">
    <!-- 头部区域 -->
    <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item layadmin-flexible" lay-unselect>
            <a href="javascript:;" layadmin-event="flexible" title="侧边伸缩">
                <i class="layui-icon layui-icon-shrink-right" id="LAY_app_flexible"></i>
            </a>
        </li>
<!--        <li class="layui-nav-item layui-hide-xs" lay-unselect>-->
<!--            <a href="#" target="_blank" title="前台">-->
<!--                <i class="layui-icon layui-icon-website"></i>-->
<!--            </a>-->
<!--        </li>-->
        <li class="layui-nav-item" lay-unselect>
            <a href="javascript:;" layadmin-event="refresh" title="刷新">
                <i class="layui-icon layui-icon-refresh-3"></i>
            </a>
        </li>
        <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <input type="text" placeholder="搜索..." autocomplete="off" class="layui-input layui-input-search" layadmin-event="serach" lay-action="template/search.html?keywords=">
        </li>
    </ul>
    <ul class="layui-nav layui-layout-right" lay-filter="layadmin-layout-right">

<!--        <li class="layui-nav-item" lay-unselect>-->
<!--            <a lay-href="app/message/index.html" layadmin-event="message" lay-text="消息中心">-->
<!--                <i class="layui-icon layui-icon-notice"></i>-->
<!---->
<!--                <!-- 如果有新消息，则显示小圆点 -->-->
<!--                <span class="layui-badge-dot"></span>-->
<!--            </a>-->
<!--        </li>-->
        //配色
        <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <a href="javascript:;" layadmin-event="theme">
                <i class="layui-icon layui-icon-theme"></i>
            </a>
        </li>
        //便签
<!--        <li class="layui-nav-item layui-hide-xs" lay-unselect>-->
<!--            <a href="javascript:;" layadmin-event="note">-->
<!--                <i class="layui-icon layui-icon-note"></i>-->
<!--            </a>-->
<!--        </li>-->
        <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <a href="javascript:;" layadmin-event="fullscreen">
                <i class="layui-icon layui-icon-screen-full"></i>
            </a>
        </li>
        <li class="layui-nav-item" lay-unselect>
            <a href="javascript:;">
                <cite>贤心</cite>
            </a>
            <dl class="layui-nav-child">
                <dd><a lay-href="set/user/info.html">基本资料</a></dd>
                <dd><a lay-href="set/user/password.html">修改密码</a></dd>
                <hr>
                <dd  style="text-align: center;"><a href="javascript:;" id="layout">退出</a></dd>
            </dl>
        </li>

        <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <a href="javascript:;" layadmin-event="about"><i class="layui-icon layui-icon-more-vertical"></i></a>
        </li>
        <li class="layui-nav-item layui-show-xs-inline-block layui-hide-sm" lay-unselect>
            <a href="javascript:;" layadmin-event="more"><i class="layui-icon layui-icon-more-vertical"></i></a>
        </li>
    </ul>
</div>

<script>
    $(document).ready(function() {
        $("#layout").on('click',function() {
            $.ajax({
                type: "GET",
                url: "$url",
                data: {},
                dataType: "json",
                success: function(data){

                    if (data.code == 200) {
                        layer.msg('退出成功', {
                            offset: '15px'
                            ,icon: 1
                            ,time: 1000
                        }, function(){
                            location.href = "{$redisUrl}"; //后台主页
                        });
                    } else {
                        layer.msg(data.msg,{offset: '15px',icon: 2 ,time: 1000})
                    }
                }
            });
        });
    });
</script>





