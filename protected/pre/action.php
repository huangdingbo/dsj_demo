<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/3/4
 * Time: 14:44
 */
return array(



    /**后台任务**/
    array(
        'httpInterceptors' => array(
            array('group' => '_all', 'interceptor' => 'CC\action\module\common\http\bgtask\BgtaskRunInterceptors',),
        ),
        'actionInterceptors' => array(
            array('group' => 'cmd' ,'url' => '/core/bgtask/run','action' => 'CC\action\module\core\bgtask\CoreBgtaskRunCmdAction'),
            array('group' => 'admin' ,'url' => '/core/bgtask/restart','action' => 'CC\action\module\core\bgtask\CoreBgtaskRestartCmdAction'),
        ),
    ),


    /**core登录退出上传文件 开始**/
    array(
        'httpInterceptors' => array(
            array('group' => 'admin', 'interceptor' => 'CC\action\module\common\http\admin\AdminLoginInterceptors',),

            //api sign session
//            arrays('group' => 'api', 'interceptor' => 'CC\action\module\common\http\api\ApiSignInterceptors',),
//            arrays('group' => 'api', 'interceptor' => 'CC\action\module\common\http\api\ApiSessionInterceptors',),
        ),
        'actionInterceptors' => array(
            array('group' => 'admin,api,xbwqLink,web', 'url' => '/core/upfile/index', 'action' => 'CC\action\module\core\upfile\CoreUpfileIndexAction',),
            array('group' => 'api', 'url' => '/common/upfile/index', 'action' => 'CC\action\module\core\upfile\CoreUpfileIndexAction',),
            array('group' => 'admin', 'url' => '/core/upfile/veideoTranscode', 'action' => 'CC\action\module\core\upfile\CoreUpfileVideoTranscodeAction',),

            array('group' => 'admin', 'url' => '/core/error/index', 'action' => 'CC\action\module\core\error\CoreErrorIndexAdminAction',),
            array('group' => 'admin', 'url' => '/core/index/index', 'action' => 'CC\action\module\core\index\CoreIndexIndexAdminAction',),

            array('group' => 'admin', 'url' => '/core/login/index', 'action' => 'CC\action\module\core\login\CoreLoginIndexAdminAction',),
            array('group' => 'admin', 'url' => '/core/login/logout', 'action' => 'CC\action\module\core\login\CoreLoginLogoutAdminAction',),

        )
    ),


);
