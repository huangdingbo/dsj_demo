<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/7
 * Time: 16:00
 */

namespace biz;

use CC\action\module\basic\role\enum\RoleTypeEnum;
use CC\action\module\common\auth\AuthRangeNumEnum;
use CC\action\module\common\auth\range\int\AuthRangeOpEnum;
use CC\util\common\server\AuthManagerAbs;
use CC\util\db\enum\UserClassifyEnum;

class AuthManager extends AuthManagerAbs
{

    const ADMIN_USER_MANAGE           = 'ADMIN_USER_MANAGE';
    const WEB_REN_KOU_ZI_LIAO           = 'WEB_REN_KOU_ZI_LIAO';


    /**
     * @return array
     *  array(
     *   array('action'=>'/basic/company/edit','params'=>array(),'user_classify' => array(UserServer::USER_CLASSIFY_SUPER_ADMIN)),
     * )
     */
    protected function getNoCheckConf()
    {
        return [

            ['groups' => 'admin', 'action' => '/basic/noticeCenter/deleteAll'],
        ];
    }

    protected function getUrlsConf()
    {
        return [];
    }

    /**
     * @return array
     *         array(
     *             array(
     *              'name' => '传单管理',
     *              'key' => 'cdgl',
     *              'auth' => array(
     *                  self::AUTH_FLYER_LIST => array(
     *                      'name' => '传单列表',
     *                      'user_classify' => array(UserServer::USER_CLASSIFY_ADMIN,UserServer::USER_CLASSIFY_EMPLOYEE),
     *                      'urls' => array(
     *                           array('groups' => 'admin', 'action' => '/flyer/flyer/index','params' => array()),
     *                      )
     *                  )
     *              )
     *            )
     *         )
     */
    protected function getAuthArrConf()
    {
        $confs = [
            [
                'name' => '基础管理',
                'classify' => 'biz',
                'auth' => [
                    [
                        'name' => '人口信息资料',
                        'auth_type_string' => self::WEB_REN_KOU_ZI_LIAO,
                        'op' => AuthRangeOpEnum::VIEW,
                        'user_classify_default' => [UserClassifyEnum::ADMIN],
                        'user_classify' => [UserClassifyEnum::ADMIN, UserClassifyEnum::USER],
                        'default_range' => [
                            RoleTypeEnum::TYPE_EMPLOYEE => AuthRangeNumEnum::ALL,
                            RoleTypeEnum::TYPE_LEADER => AuthRangeNumEnum::ALL,
                        ],
                        'range' => [
                            ['int' => AuthRangeNumEnum::NONE,'text' => '不允许查看'],
                            ['int' => AuthRangeNumEnum::ALL,'text' => '允许查看'],
                        ],
                    ],
                ],
            ],
            [
                'name' => '后台配置及操作权限',
                'classify' => 'manage',
                'auth' => [
                    [
                        'name' => '人员管理',
                        'auth_type_string' => self::ADMIN_USER_MANAGE,
                        'op' => AuthRangeOpEnum::VIEW,
                        'user_classify_default' => [UserClassifyEnum::ADMIN],
                        'user_classify' => [UserClassifyEnum::ADMIN, UserClassifyEnum::USER],
                        'default_range' => [
                            RoleTypeEnum::TYPE_EMPLOYEE => AuthRangeNumEnum::ALL,
                            RoleTypeEnum::TYPE_LEADER => AuthRangeNumEnum::ALL,
                        ],
                        'range' => [
                            ['int' => AuthRangeNumEnum::ALL],
                        ],
                    ],
                ],
            ],


        ];

        return $confs;
    }


    protected function getCurUserClassify()
    {
        return Session::getUserClassify();
    }
}