<?php
    return [
        //配置项目名称
        "name" => "Demo",
        //配置项目菜单
        "menu" => [
            "items" => [
                [
                    "label" => "主页",
                    "url" => "javascript:;",
                    "child" => [
                        ["label" => "主页一","url" => "https://www.yiichina.com"],
                        ["label" => "主页二","url" => "http://huangdingbo.work/school/frontend/web/index.php?r=site%2Flogin"],
                    ],
                ],

                [
                    "label" => "用户",
                    "url" => "javascript:;",
                    "child" => [
                        ["label" => "网站用户","url" => "https://www.yiichina.com"],
                        ["label" => "后台管理员","url" => "http://huangdingbo.work/school/frontend/web/index.php?r=site%2Flogin"],
                        ["label" => "角色管理","url" => "http://huangdingbo.work/school/frontend/web/index.php?r=site%2Flogin"],
                    ],
                ],

                [
                    "label" => "设置",
                    "url" => "javascript:;",
                    "child" => [
                        [
                            "label" => "系统设置",
                            "url" => "javascript:;",
                            "child" => [
                                ["label" => "网站设置","url" => "https://www.yiichina.com"],
                                ["label" => "邮件服务","url" => "http://huangdingbo.work/school/frontend/web/index.php?r=site%2Flogin"],
                            ],
                        ],

                        [
                            "label" => "我的设置",
                            "url" => "javascript:;",
                            "child" => [
                                ["label" => "基本资料","url" => "https://www.yiichina.com"],
                                ["label" => "修改密码","url" => "http://huangdingbo.work/school/frontend/web/index.php?r=site%2Flogin"],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ]

?>