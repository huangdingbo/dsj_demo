<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="renderer" content="webkit">
    <title>大数据登录系统</title>
    <meta name="description" content="用户登录"/>
    <!-- basic styles -->
    <link rel="shortcut icon" href="favicon.ico"/>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <?php echo \CC\util\common\server\AssetManager::instance()->getBaseCssJs() ?>
    <?php echo \CC\util\common\server\AssetManager::instance()->getCssJs(array(
        '/public/common/widget/module/core/login/css/loginwq.css',
        '/public/biz/web/login/css/login.css',
    )) ?>

</head>
<body>

<div class="main-content   <?php echo $is_login?'hide':'' ?>" >
    <div class="top_nav">
        <div class="main_c">
            <a class="logo" href=""></a>
            <div class="call">
                <span class="call_icon"></span>
                <span class="call_w">
                    <span class="call_us">联系我们</span>
                    <span class="tell_num">400-0668377</span>
                </span>
            </div>
        </div>
    </div>
    <div class="main_c">
        <div class="tit1">
            <div class="t1">吴江经济技术开发区·网格化社会治理</div>
            <div class="t2">数据分析研判中心</div>
        </div>
        <div class="form_w clearfix">

            <form action="" class="form_act" method="post">
                <div class="login_tit">
                    大数据登录系统
                </div>
                <fieldset>
                    <div class="block clearfix">
                                    <span class="block input-icon  ">
                                        <input class="form-control input_user req the-padding-left" data-name="账号" placeholder="账号"
                                               type="text" value="<?php echo \CC\util\common\server\Cookie::get('core_login_account_account') ?>" name="account" id="account"/>
                                    </span>
                    </div>
                    <div class="block clearfix">
                                <span class="block input-icon ">
                                    <input class="form-control req input_pwd the-padding-left" data-name="密码" placeholder="密码"
                                           type="password" value="" name="pass" id="pass"/>
                                </span>
                    </div>
                    <div class="yanzheng_box">
                        <input type="text" name="validate" value="" size=10 />

                        <img  title="点击刷新" src="<?=\CC::app()->getBaseUrl();?>/web/core/login/captcha" align="absbottom" onclick="this.src='<?=\CC::app()->getBaseUrl();?>/web/core/login/captcha?'+Math.random();">
                    </div>
                    <div class="block clearfix rememver_w">
                                <span class="block input-icon ">
                                     <label><input type="checkbox" name="remember" value="1"/> 记住密码</label>
                                </span>
                    </div>

                    <div class="space"></div>
                     <?php if($error_msg):?>
                    <div class="error" style="padding-left:25px;"><?php echo $error_msg ?></div>
                     <?php endif;?>
                    <div class="block sub_block">
                        <button type="submit" class="login_btn btn-danger btn-block">登 &nbsp;录</button>
                    </div>
                    <div class="space-4"></div>
                </fieldset>
            </form>
        </div>
    </div>
    <div class="copyright">
        &copy;2018 小步创想 All Right Reserved
    </div>
</div>

<script>

    $(function(){
        var itemWidth = $('.system-con').width()/4;
        var itemHeight = $('.system-con').height()/3;
        $('.system-item-box').each(function(){
            var w = $(this).data('width');
            var h = $(this).data('height');
            var x = $(this).data('x');
            var y = $(this).data('y');
            $(this).css({
                'width':itemWidth * w - 30,
                'height':itemHeight * h - 30,
                'top':itemHeight * y,
                'left':itemWidth * x
            });

        });

    });


    function showSystem(){
        $('.system-index').addClass('show');
        $('.main-content').addClass('hide');


    };

    $(function () {

        //开始，结束请求
        $('.form_act').submit(function () {
            var $this = $(this);
            var ok = true;
            $('.req').each(function () {
                if ($(this).val() == '' && ok) {
                    Tip($(this).data('name') + t('tips_cant_empty'), 'error');
                    ok = false;
                    $(this).focus();
                }
            });
            if (ok) {
                login($this);
            }
            return false;
        });
        function login($this) {
            $.ajax({
                url: $this.attr('action'),
                type: 'post',
                dataType: 'json',
                data: $this.serialize(),
                success: function (data) {
                    if (!data['ok']) {
                        Tip(data['error'], 'error');
                    } else {
                        location.href = data.url;
                    }
                },
                error: function () {
                    Tip(t('tips_err_server'), 'error');
                }
            });

        }
    });



</script>

</body>
</html>