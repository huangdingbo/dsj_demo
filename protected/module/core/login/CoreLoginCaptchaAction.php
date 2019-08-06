<?php
/**
 * Created by PhpStorm.
 * User: huang
 * Date: 2019/1/24
 * Time: 15:38
 */

namespace module\core\login;

use biz\Session;
use CRequest;
use module\core\login\server\CaptchaServer;

class CoreLoginCaptchaAction extends \CAction
{
    public function execute(CRequest $request)
    {

        $captcha = new CaptchaServer();


        $captcha->doimg();

        session_start();
        $_SESSION['authnum_session'] = $captcha->getCode();//验证码保存到SESSION中


        return new \CNoneData();
    }
}