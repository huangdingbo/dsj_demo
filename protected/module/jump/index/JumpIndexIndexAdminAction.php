<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/25
 * Time: 23:02
 */

namespace module\jump\index;


use CRequest;
use module\jump\index\enum\JumpEnum;

class JumpIndexIndexAdminAction extends \CAction
{
    public function execute(CRequest $request)
    {
        return new \CRenderData(array(
            'url' => JumpEnum::getValueByIndex($request->getParams('jump')),
        ));
    }
}