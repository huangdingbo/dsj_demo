<?php


namespace module\test\big;


use CC\db\base\select\ListModel;
use CRequest;

class TestBigDataAction extends \CAction
{
    public function execute(CRequest $request)
    {
        $list = ListModel::make('case_record')
            ->limit(100)
            ->execute();

        return new \CJsonData(['list' => $list]);
    }
}