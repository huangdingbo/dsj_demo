<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/26
 * Time: 10:51
 */

namespace module\jump\index\tabWidget;


use CC\util\common\widget\widget\TabWidget;
use module\jump\index\enum\JumpEnum;

class DataEnteringTabWidget extends TabWidget
{

    /**
     * @return array(
     *      array(
     *          'name' => 'title',
     *          'action_str' => 'user/index',
     *          'params' => array(),
     *          'actives' => array(
     *              array('action_str'=>'','params' => [])
     *          )
     *      )
     * )
     */
    protected function getActions()
    {
        return [

            [
                'name' => '景区',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONSTANT_SCENICSPOTS],
            ],

            [
                'name' => '重点人口',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_IMPORTANT_POPULATION],
            ],
            [
                'name' => '自行车停放点',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_BICYCLE],
            ],
            [
                'name' => '疏导点',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_SDD],
            ],
            [
                'name' => '住宅小区',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_VILLAGE],
            ],
            [
                'name' => '户外广告',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_AD],
            ],
            [
                'name' => '党建',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_PARTY],
            ],
            [
                'name' => '矛盾调解',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_MDTJ],
            ],
            [
                'name' => '月度考核',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_SCORE],
            ],
            [
                'name' => '指数评价',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_ZSLX],
            ],
            [
                'name' => '河长制',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_RIVERLAKE],
            ],
            [
                'name' => '执法',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_ZHIFA],
            ],
            [
                'name' => '亿友数据',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_YIYOU],
            ],
            [
                'name' => '网格管理',
                'action_str' => '/jump/index/tab',
                'params' => ['jump' => JumpEnum::CONST_WGGL],
            ]

        ];
    }
}