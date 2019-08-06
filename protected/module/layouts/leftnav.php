<?php

use module\jump\index\enum\JumpEnum;
$base_url_conf = [
//    [
//        'name' => '平台结构设置',
//        'url' => '/setting/platform/index',
//    ],
//            [
//                'name' => '演示模式管理',
//                'url' => '/setting/demo/index',
//            ],
    [
        'name' => '预警推送',
        'url' => '/setting/voice/save',
    ],

        ];
if(\biz\AuthManager::instance()->checkAuth(\biz\AuthManager::ADMIN_USER_MANAGE)){
    $base_url_conf = array_merge([ [
                    'name' => '人员管理',
                    'url' => '/basic/user/index',
                ],
                [
                    'name' => '权限管理',
                    'url' => '/basic/role/index',
                ],],$base_url_conf);
}
return [
    [
        'name' => '  数据管理',
        'url' => '/synthesize/command/index',
        'sub_nav' => [
           /* [
                'name' => '数据治理',
                'url' => '/setting/index/index',
                'params' => ['jump' => JumpEnum::SHU_JU_ZHI_LI]
            ],*/
            [
                'name' => '数据录入管理',
                'url' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONSTANT_SCENICSPOTS]
            ],
//            [
//                'name' => '数据采集管理',
//                'url' => '/jump/index/index',
//                'params' => ['jump' => JumpEnum::SHU_JU_CAI_JI]
//            ],
//            [
//                'name' => '市民案件关键词管理',
//                'url' => '/jump/index/index',
//                'params' => ['jump' => JumpEnum::AN_JIAN_GUAN_JIAN_CI]
//            ],

        ],
    ],
//    [
//        'name' => ' 分析研判管理',
//        'sub_nav' => [
//            [
//                'name' => '专项研判管理',
//                'url' => '/judged/navManager/index',
//            ],
//
//        ]
//    ],
//    [
//        'name' => ' 实时预警管理',
//        'sub_nav' => [
//            [
//                'name' => '预警项管理',
//                'url' => '/jump/index/index',
//                'params' => ['jump' => JumpEnum::YU_JING_XIANG_GUAN_LI]
//            ],
//
//        ]
//    ],
//
//    [
//        'name' => ' 简报管理',
//        'sub_nav' => [
//            [
//                'name' => '工作动态管理',
//                'url' => '/setting/report/index',
//            ],
//
//        ]
//    ],


   /* [
        'name' => ' 数据全书管理',
        'url' => '/setting/index/index',
        'params' => ['jump' => JumpEnum::SHU_JU_QUAN_SHU]
    ],*/
  /*  [
        'name' => ' 简报管理',
        'url' => '/setting/index/index',
        'params' => ['jump' => JumpEnum::JIAN_BAO_GUAN_LI]
    ],*/
    [
        'name' => ' 基础设置',
        'sub_nav' => $base_url_conf
    ],

];

