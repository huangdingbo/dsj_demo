<?php
/**
 * User: fu
 * Date: 2016/3/17
 * Time: 15:22
 */

$app = CC::createApp(include 'staticconf.php');



\biz\db\DbProtectInterceptor::create(true);


$confs =  include  __DIR__."/action.php";
foreach ($confs as $conf) {
    foreach ($conf['httpInterceptors'] as $httpInterceptor) {
        $app->addHttpInterceptors($httpInterceptor['group'],[$httpInterceptor['interceptor']]);
    }
    foreach ($conf['actionInterceptors'] as $actionInterceptor) {
        $app->addActionInterceptors($actionInterceptor['group'],[$actionInterceptor]);
    }
    if(isset($conf['eventHandlers']) && is_array($conf['eventHandlers'])){
        foreach ($conf['eventHandlers'] as $eventHandler) {
            \CC\event\EventManager::addHandler($eventHandler['name'],$eventHandler['handler']);
        }

    }

}

include __DIR__.'/bgtask.php';


return $app;