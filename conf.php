<?php
/**
 * User: fu
 * Date: 14-6-25
 * Time: 下午12:18
 */
return array(
    'db' => array(
        'dsn' => 'mysql:host=127.0.0.1;dbname=test',
        'username' => 'root',
        'password' => '63z0jYLOQ74EidGa1cs4'
    ),
    'params' => array(
		"session_group" => "dsj_wjjkq",
        'monitor_sql'=>false,
        "aaa" => "aaaaaa",
        'interface_url' => 'http://qwxz.xbwq.com.cn/wqinterface',

        'db_sj' => array(
            'dsn' => 'mysql:host=47.97.11.193;dbname=dsj_wjjkq_sj',
            'username' => 'root',
            'password' => 'BigData6771512fa.@'
        ),

        'db_test' => array(
            'dsn' => 'mysql:host=47.97.11.193;dbname=dsj_wjjkq_show',
            'username' => 'root',
            'password' => 'BigData6771512fa.@',
        ),
//
//        'db_sangao' => array(
//            'dsn' => 'mysql:host=192.168.1.35;dbname=zxdsj_sangao',
//            'username' => 'root',
//            'password' => '123456',
//        ),
//
        'base_data_db' => array(
            'dsn' => 'mysql:host=47.97.11.193;dbname=dsj_wjjkq_web',
            'username' => 'root',
            'password' => 'BigData6771512fa.@',
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
