<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/15
 * Time: 11:17
 */

namespace module\core\line;


use biz\url\UrlConf;
use CRequest;

class CoreLineIndexWebAction extends \CAction
{
    public $show_module;
    public function getPageTitle()
    {
        return '吴江经济技术开发区首页';
    }

    public function execute(CRequest $request)
    {
        return new \CRenderData(array(
            'index_line_url' => UrlConf::getIndexLineUrl(2),
            'show_module' => $this->show_module,
        ));
    }
}