<?php
/**
 * User: fu
 * Date: 14-6-25
 * Time: 下午12:18
 */
return array(
    'db' => array(
        'dsn' => 'mysql:host=127.0.0.1;dbname=dsj_demo',
        'username' => 'root',
        'password' => '63z0jYLOQ74EidGa1cs4'
    ),
    'params' => array(
		"session_group" => "dsj_wjjkq",
        'monitor_sql'=>false,
        "aaa" => "aaaaaa",
        'interface_url' => 'http://qwxz.xbwq.com.cn/wqinterface',

        'test_database' => array(
            'dsn' => 'mysql:host=127.0.0.1;dbname=test',
            'username' => 'root',
            'password' => '63z0jYLOQ74EidGa1cs4'
        ),

        'memcache_conf' => array(
            'connect' => array(
                array(
                    'host' => '47.97.11.193',
                    'port' => 11211,
                )
            ),
            'key_pre' => 'wjjkq_deve_dsj_show_case'
        ),
        'db_zf_collect' => [
            'dsn' => 'mysql:host=rr-bp142w42klas7bx90fo.mysql.rds.aliyuncs.com;port=3306;dbname=api',
            'username' => 'zfapi',
            'password' => 'hgvXDMbINqswB8EV5gEh'
        ],
        'db_zf_collect_cms' => [
            'dsn' => 'mysql:host=rr-bp1j8x05138au5qhb.mysql.rds.aliyuncs.com;port=3306;dbname=cms',
            'username' => 'zfapi',
            'password' => 'hgvXDMbINqswB8EV5gEh'
        ],
        //执法api调用接口环境配置，dev为开发，prod为正式
        'zhifaCacheEnvironment' => 'dev',

    ),
    'env' => array(
        'debug' => true,
    ),
);
