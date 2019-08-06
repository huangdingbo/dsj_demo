<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/26
 * Time: 10:39
 */

namespace module\jump\index\enum;


use CC\util\common\server\dsj\enum\CateDataEnum;
use CC\util\db\Enum;
use module\data\cateData\server\ProjectServer;

class JumpEnum extends Enum
{

    const WEB = 16;
    const CONSTANT_SCENICSPOTS = 18;
    const CONSTANT_ASSESSMENT = 19;
    const CONST_IMPORTANT_POPULATION = 20;
    const CONST_BICYCLE = 21;
    const CONST_SDD = 22;
    const CONST_VILLAGE = 23;
    const CONST_AD = 24;
    const CONST_PARTY = 25;
    const CONST_MDTJ = 26;
    const CONST_SCORE = 27;
    const CONST_ZSLX = 28;
    const CONST_RIVERLAKE = 29;
    const CONST_ZHIFA = 30; //执法
    const CONST_YIYOU = 31; //亿友
    const CONST_WGGL = 32; //网格管理


    protected function initAddDatas()
    {

        $this->add(self::WEB, ProjectServer::getHostByIdstr('web').'/admin/setting/population/index');
        $this->add(self::CONSTANT_SCENICSPOTS, ProjectServer::getHostByIdstr('show').'/admin/setting/constant/index?type=2');
        $this->add(self::CONSTANT_ASSESSMENT, ProjectServer::getHostByIdstr('show').'/admin/setting/assessment/index');
        $this->add(self::CONST_IMPORTANT_POPULATION, ProjectServer::getHostByIdstr('show').'/admin/setting/impopulation/index');
        $this->add(self::CONST_BICYCLE, ProjectServer::getHostByIdstr('show').'/admin/setting/bicycle/index');
        $this->add(self::CONST_SDD, ProjectServer::getHostByIdstr('show').'/admin/setting/sdd/index');
        $this->add(self::CONST_VILLAGE, ProjectServer::getHostByIdstr('show').'/admin/setting/village/index');
        $this->add(self::CONST_AD, ProjectServer::getHostByIdstr('show').'/admin/setting/ad/index');
        $this->add(self::CONST_PARTY, ProjectServer::getHostByIdstr('show').'/admin/setting/party/index');
        $this->add(self::CONST_MDTJ, ProjectServer::getHostByIdstr('show').'/admin/setting/mdtj/index');
        $this->add(self::CONST_SCORE, ProjectServer::getHostByIdstr('show').'/admin/setting/score/index');
        $this->add(self::CONST_ZSLX, ProjectServer::getHostByIdstr('show').'/admin/setting/evaluate/index');
        $this->add(self::CONST_RIVERLAKE, ProjectServer::getHostByIdstr('show').'/admin/setting/rvlk/index');
        $this->add(self::CONST_ZHIFA, ProjectServer::getHostByIdstr('show').'/admin/setting/zhifa/index');
        $this->add(self::CONST_YIYOU, ProjectServer::getHostByIdstr('show').'/admin/setting/yiyou/index');
        $this->add(self::CONST_WGGL, ProjectServer::getHostByIdstr('show').'/admin/setting/jzjs/index');

    }
}