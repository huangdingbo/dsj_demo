<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/25
 * Time: 23:03
 */
?>
<style>.content{padding-top: 0px;}  #app_iframe{width: 100%;}</style>
<iframe leftnav_width="" src="<?php echo $url; ?>" id="app_iframe" frameborder="0"></iframe>
<script>
    $('#app_iframe').attr('leftnav_width',$('.sidebar').width());
    function changeFrameHeight(){
        var ifm = document.getElementById("app_iframe");
        ifm.height = document.documentElement.clientHeight  - 108;
    }
    changeFrameHeight();
    window.onresize = function(){
         changeFrameHeight();
    }
</script>
