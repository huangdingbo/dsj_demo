<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/1/10
 * Time: 19:25
 */

namespace module\core\home;


use CRequest;

class CoreHomeIndexWebAction extends \CAction
{
    public function execute(CRequest $request)
    {
        return new \CRenderData(array(),'',false);
    }
}