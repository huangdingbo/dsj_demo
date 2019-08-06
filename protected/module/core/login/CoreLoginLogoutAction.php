<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/30
 * Time: 19:18
 */

namespace module\core\login;


use CC\util\common\server\Cookie;
use CC\util\common\server\SessionAbs;
use CRequest;

class CoreLoginLogoutAction extends \CAction
{
    public function execute(CRequest $request)
    {
        SessionAbs::logout();
        Cookie::set('core_login_account_remember',null);

        return new \CRedirectData('/web/core/index/index',['__logout' => 1 ]);

    }
}