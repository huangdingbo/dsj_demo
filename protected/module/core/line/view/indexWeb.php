<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2017/12/14
 * Time: 16:32
 */
use module\data\cateData\server\CataDataServer;
use module\judged\nav\server\JudgeNavServer;

?>

<link href="<?php echo $baseUrl; ?>/public/biz/line/css/line.css" rel="stylesheet">


<div class="filter_dom">
    <div class="layout-top">
        <div class="layout-top-layer"></div>
        <div class="layout-top-con">
            <div class="top-title">条线数据报表</div>
            <div class="top-menu">
                <div class="top-menu-con"></div>
            </div>
            <div class="header-right">
                <div class="header-right-w"></div>
               <div class="header-switch-w"></div>

            </div>
        </div>
    </div>

    <div class="grid-container">



    </div>
</div>



<script type="text/javascript">

    var shijian_host = common_module_conf.project_conf.shijian.host;

    var line_conf = {
        index_line_url:<?php echo json_encode($index_line_url) ?>,
        module_conf:{
            shehui:{
                shehui_1:{
                    url:shijian_host + "/api/synthesize/index/totalInfo",
                    pop_url:shijian_host + "/api/synthesize/detail/totalInfo"
                },
                shehui_2:{
                    url:shijian_host + "/api/synthesize/index/hotMap",
                    pop_url:shijian_host + "/api/synthesize/detail/hotMap",
                    get_top_url:shijian_host + '/api/common/typedata/getTop',
                },
                shehui_3:{
                    url:shijian_host + "/api/synthesize/index/totalPersonAndGrid",
                    pop_url:shijian_host + "/api/synthesize/detail/totalPersonAndGrid",
                    pop_info_url:shijian_host + "/api/synthesize/detail/gridDetail"
                },
                shehui_4:{
                    url:shijian_host + "/api/synthesize/index/typeAcceptInfo",
                    pop_url:shijian_host + "/api/synthesize/detail/typeAcceptInfo"
                },
                shehui_5:{
                    url:shijian_host + "/api/synthesize/index/gridManagerCaseCount",
                    pop_url:shijian_host + "/api/synthesize/detail/gridManagerCaseCount"
                },
                shehui_6:{
                    url:shijian_host + "/api/synthesize/index/sourceInfo",
                    pop_url:""
                },
                shehui_7:{
                    url:shijian_host + "/api/synthesize/index/patrollerReport",
                    pop_url:shijian_host + "/api/synthesize/index/patrollerReport",
                },
                shehui_8:{
                    url:shijian_host + "/api/synthesize/index/gridManagerCaseCount",
                    pop_url:shijian_host + "/api/synthesize/detail/gridManagerCaseCount",
                },
            },

            shiming:{
                shiming_1:{
                    url:shijian_host + "/api/citizenhotline/index/totalInfo",
                },
                shiming_2:{
                    url:shijian_host + "/api/citizenhotline/index/hotMap",
                    pop_url:shijian_host + "/api/citizenhotline/detail/hotMap",
                    get_top_url:shijian_host + '/api/common/typedata/getTop',
                },
                shiming_3:{
                    url:shijian_host + "/api/citizenhotline/index/exceptionInfo",
                    pop_url:shijian_host + "/api/citizenhotline/detail/exceptionInfo"
                },
                shiming_4:{
                    url:shijian_host + "/api/citizenhotline/index/trendInfo",
                    pop_url:shijian_host + "/api/citizenhotline/index/trendInfo"
                },
                shiming_5:{
                    url:shijian_host + "/api/citizenhotline/index/keywordInfo",
                    pop_url:shijian_host + "/api/citizenhotline/index/keywordInfo"
                },
                shiming_6:{
                    url:shijian_host + "/api/citizenhotline/index/sourceInfo",
                    pop_url:""
                },
                shiming_7:{
                    url:shijian_host + "/api/citizenhotline/index/typeAcceptInfo",
                    pop_url:shijian_host + "/api/citizenhotline/detail/typeAcceptInfo"
                }

            },
            hedao:{
                hedao_msg:{
                    url:common_module_conf.project_conf.hedao.host+"/api/river/information/stat"
                },
                hedao_map:{
                    url:common_module_conf.project_conf.hedao.host+"/api/river/information/points"
                },
            },
            renkou:{
                renkou_1:{
                    url:common_module_conf.project_conf.chengshi.host+"/api/population/index/stat"
                },
                renkou_2:{
                    url:common_module_conf.project_conf.chengshi.host+"/api/house/index/stat",
                },
                renkou_3:{
                    url:common_module_conf.project_conf.renkou.host+"/api/people/info/distri",
                    cata_data_conf:<?php echo json_encode(CataDataServer::getList('108,401,113,114,110,109,402,301')) ?>
                },
                renkou_4:{
                    url:common_module_conf.project_conf.renkou.host+"/api/people/impt/stat"
                },
                person_list:{
                    url:common_module_conf.project_conf.renkou.host+"/api/people/info/list"
                },
                person_detail:{
                  url:common_module_conf.project_conf.renkou.host+"/api/people/info/detail"
                },
                grid_detail:{
                    url:common_module_conf.project_conf.renkou.host+"/api/grid/info/detail"
                }
            },

            jump_to_judge:{
                url:'<?php echo $this->genurl('/judged/index/index')?>'
            },

            hw:{
                hw_1:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=1"
                },
                hw_2:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=2"
                },
                hw_3:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=3"
                },
                hw_4:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=4"
                },
                hw_5:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=5"
                },
                hw_6:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=6"
                },
                hw_7:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=7"
                },
                hw_8:{
                    url:common_module_conf.project_conf.huanwei.host+"/web/index/line/num?type=8"
                }
            },
            zhifa:{
                zhifa_1:{
                    url:common_module_conf.project_conf.zhifa.host+"/web/index/line/num?type=1"
                },
                zhifa_2:{
                    url:common_module_conf.project_conf.zhifa.host+"/web/index/line/num?type=6"
                },
                zhifa_3:{
                    url:common_module_conf.project_conf.zhifa.host+"/web/index/line/num?type=4"
                },
                zhifa_4:{
                    url:common_module_conf.project_conf.zhifa.host+"/web/index/line/num?type=3"
                },
                zhifa_5:{
                    url:common_module_conf.project_conf.zhifa.host+"/web/index/line/num?type=2"
                },
                zhifa_6:{
                    url:common_module_conf.project_conf.zhifa.host+"/web/index/line/num?type=5"
                }

            },
            zhatu:{
                zhatu_1:{
                    url:common_module_conf.project_conf.zhatu.host+"/api/line/company/countStat"
                },
                zhatu_2:{
                    url:common_module_conf.project_conf.zhatu.host+"/api/line/worksite/stat"
                },
                zhatu_3:{
                    url:common_module_conf.project_conf.zhatu.host+"/api/line/muck/distri"
                },
                zhatu_4:{
                    url:common_module_conf.project_conf.zhatu.host+"/api/line/car/countStat"
                },
                zhatu_5:{
                    url:common_module_conf.project_conf.zhatu.host+"/api/line/company/carRank"
                },
                zhatu_6:{
                    url:common_module_conf.project_conf.zhatu.host+"/api/line/breakRule/companyRank"
                },
                zhatu_7:{
                    url:common_module_conf.project_conf.zhatu.host+"/api/line/breakRule/carRank"
                }
            },
            ludeng:{
                ludeng_1:{
                    url:common_module_conf.project_conf.ludeng.host+"/api/lamp/index/index"
                },
            },


        },
        show_module:<?php echo (int)$this->show_module ?>,

    };
</script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/plug/keyword/tagcanvas.min.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_shehui.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_shiming.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_hedao.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_renkou.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_zhifa.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_hw.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_zhatu.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line_ludeng.js"></script>
<script type="text/javascript" src="<?php echo $baseUrl; ?>/public/biz/line/js/line.js"></script>

