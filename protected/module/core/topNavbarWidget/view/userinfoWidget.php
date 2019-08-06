<a href="<?php echo $url; ?>" class="top_user_switch top_user_switch_user_info">个人资料</a>
<?php   if($_SESSION['sin_server_from'] == 'qgyd'):?>
<script type="text/javascript">
    $(function () {
        $('.top_user_switch_user_info').hide();
        $('.header_user_quit').hide();
    });
</script>
<?php endif; ?>
