<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/3/4
 * Time: 18:02
 */

if($app->url->getModule() == 'core' && $app->url->getController() == 'index' && $app->url->getAction() == 'index' && \biz\Session::isLogin()){

}
