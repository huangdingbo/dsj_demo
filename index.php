<?php
/**
 * User: fu
 * Date: 13-12-27
 * Time: 下午4:00
 */
date_default_timezone_set('Asia/Shanghai');
ini_set('display_errors', true);
error_reporting(E_ALL  ^  E_NOTICE );


include __DIR__.'/../CC2/CC.php';


$app = include  __DIR__.'/protected/pre/app.php';

$app->run();




