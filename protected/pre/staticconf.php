<?php

/**
 * User: fu
 * Date: 2016/3/10
 * Time: 14:30
 */
return array_merge_recursive(include __DIR__ . '/../../conf.php', array(
    'params' => array(//自定义参数
        'bgtask_fail_fn' => function ($id,$msg) {

        },
        'db_collect' => [
            'dsn' => 'mysql:host=10.93.0.48;port=3306;dbname=dsjsj_zhatu',
            'username' => 'dsjsj_zhatu',
            'password' => 'dZmrzr2NfeE8Pypj'
        ]
    ),
    'cc_class_config' => array(
        'response/CRenderData' => array(
            'groupLayouts' => array(
                'admin' => '/layouts/layui/main',
                'web' => '/layouts/simple',
                'api' => '/layouts/mobile',
                'xbwqLink' => '/layouts/simple',
            ),
        ),
        'util/encrypt/Password' => array(
            'way' => 'md5',
        )
    ),
    'di' => array(
        'conf' => include __DIR__.'/di.php',
    ),
    'env' => array(
        'api' => 'api',
        'web' => 'admin,web',
        'cmd' => 'cmd',
        'sign' => array(
            'timesign' => 600,
            'sign_secretkey' => '7m392HuqKkQXXXtTUYFnudP6BVVj57mr',
            'no_sign_action' => array(

            )
        )
    )
));
