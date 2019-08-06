<?php


namespace module\test\big;


use CC\db\base\select\ListModel;
use components\layui\MenuWidget;
use CRequest;

class TestBigDataAction extends \CAction
{
    public function execute(CRequest $request)
    {
        $val = MenuWidget::test();

        var_dump($val);exit;
        $list = ListModel::make('case_record')
            ->limit(100)
            ->execute();

        return new \CJsonData(['list' => $list]);
    }
}