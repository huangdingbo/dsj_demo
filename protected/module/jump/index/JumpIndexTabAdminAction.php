<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/26
 * Time: 10:50
 */

namespace module\jump\index;


use CRequest;
use module\jump\index\enum\JumpEnum;

class JumpIndexTabAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        return new \CRenderData(array(
            'tab' => $request->getParams('tab'),
            'url' => JumpEnum::getValueByIndex($request->getParams('jump',JumpEnum::CONSTANT_SCENICSPOTS)),
        ));
    }
}