let warning_shiminShiduan =  {
    data:function(){
        return{
            curId_1:0,
            curId_2:0,
            curId_3:0
        }

    },
    template:`<div class="judge-center">
                    <div class="judge-center-header">
                        <div class="judge-center-title">
                        <span class="title-name blueShadow-big-title">高发时段预警</span>
                        <span class="title-btn" @click="tlvalueClick"><i class="xb_icon info-circle"></i></span></div>
                    </div>
                    <!--中间主体内容-->
                    <div class="judge-center-main">
                    <div class="shiminYjPop">
                    <div class="early_warning"><div class="early_warning_btn" @click="workPingtai()"></div></div>
</div>
                    <div class="anjian-main-1">
                    <div class="anjian-main-1-left"><div class="earlyWarning"></div><div class="main-1-title">当前预警</div>
                    <div class="imgRotBox">
                    <img class="anjian-early_warning_img2 early_warning_img" src="${baseUrl}/public/biz/warning/image/warn_red_light.png">
                    <img class="early_warning_img2" src="${baseUrl}/public/biz/warning/image/warn_red_bg.png">
</div>
                    </div>
                    <div class="anjian-main-1-right"><div class="allWarning"></div><div class="main-1-title">预警总数</div>
                    <div class="imgRotBox2"><img class="anjian-early_warning_img2 early_warning_img" src="${baseUrl}/public/biz/warning/image/warn_blue_light.png">
                                <img class="early_warning_img2" src="${baseUrl}/public/biz/warning/image/warn_blue_bg.png"></div>
                    </div>
</div>
                    <div class="shiduan-main-3 anjian-main-3">
                    <div class="shiduan-main-3-left">
                    <div class="shiduan-card-title card-title"><h2 class="card-title-big-2 card-title-big">白天时段</h2><div class="shiduan-rank-tab-2 rank-tab-2 rank-tab"><a data-type="0" class="rank-tab-item rank-tab-item-1" @click="shiminDayListClick(0)" :class="{'ac':curId_1==0}">上午</a> <a data-type="1" class="rank-tab-item rank-tab-item-2" @click="shiminDayListClick(1)" :class="{'ac':curId_1==1}">下午</a></div></div>
                    <div class="shiduan-main-3-list-title anjian-main-3-list-title">
                    <span>时段</span><span>当前预警数</span><span>总预警数</span>
</div>
<div class="shiduan-listLine listLine"></div>
<div class="shiduan-main-3-list-box anjian-main-3-list-box shimin-shiduan-day">
</div>
</div>
                    <div class="shiduan-main-3-right">
                    <div class="shiduan-card-title card-title"><h2 class="card-title-big-2 card-title-big">晚上时段</h2><div class="shiduan-rank-tab-2 rank-tab-2 rank-tab"><a data-type="0" class="rank-tab-item rank-tab-item-1" @click="shiminNightListClick(0)" :class="{'ac':curId_2==0}">夜间</a> <a data-type="1" class="rank-tab-item rank-tab-item-2" @click="shiminNightListClick(1)" :class="{'ac':curId_2==1}">凌晨</a></div></div>
                    <div class="shiduan-main-3-list-title anjian-main-3-list-title">
                    <span>时段</span><span>当前预警数</span><span>总预警数</span>
</div>
<div class="shiduan-listLine listLine"></div>
<div class="shiduan-main-3-list-box anjian-main-3-list-box shimin-shiduan-night">
</div>
</div>
</div>
<div class="LineMapTitle">时段预警近30天走势<div class="anjian-btn-box"><div class="anjian-btn-left" @click="shiminshiduanLinClick(0)" :class="{'anjianAc':curId_3==0}">总体</div><div class="anjian-btn-min" @click="shiminshiduanLinClick(1)" :class="{'anjianAc':curId_3==1}">白天</div><div class="anjian-btn-right" @click="shiminshiduanLinClick(2)" :class="{'anjianAc':curId_3==2}">晚上</div></div></div>
                    <div id="shiduanLine"></div>        
                   
                        </div>
                      </div> `,
    mounted:function(){
        $('.judge-center').off('click').on('click','.shiminshiduan-Pop',function(){
            let total = $(this).data('num');
            if(total==0){
                return false
            }else {
                let type = $(this).data('type');
                let code = $(this).data('id');
                warningPop.detail(type, code)
            }
        });
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/numSurvey',
            post_data:{
                warningType:10
            },
            fn:function(data) {
                $('.earlyWarning').text(data.num);
                $('.allWarning').text(data.totalNum)
            }

        });
        this.shiminDayList = new cacheData();
        this.shiminDayList.setRule({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/statisList',
            0:{
                post_data:{
                    warningType:10,
                    timeType: 1
                }
            },
            1:{
                post_data:{
                    warningType:10,
                    timeType:2
                }
            },
        });
        this.shiminDayListClick(0);
        this.shiminNightList = new cacheData();
        this.shiminNightList.setRule({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/statisList',
            0:{
                post_data:{
                    warningType:10,
                    timeType: 3
                }
            },
            1:{
                post_data:{
                    warningType:10,
                    timeType:4
                }
            },
        });
        this.shiminNightListClick(0);
        this.shiminshiduanLin = new cacheData();
        this.shiminshiduanLin.setRule({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/trendList',
            0:{
                post_data:{
                    warningType:5,
                    timeType: 0
                }
            },
            1:{
                post_data:{
                    warningType:5,
                    timeType:1
                }
            },
            2:{
                post_data:{
                    warningType:5,
                    timeType:2
                }
            }
        });
        this.shiminshiduanLinClick(0);
    },
    methods: {
        workPingtai:function(){
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full community_detail_pop',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    let request_params = {
                        startTime: "",
                        endTime: "",
                        status: "1",
                        type: "10",
                        offset:0,
                    };
                    ajax_jsonp_request({
                        url:common_module_conf.project_conf.show.host+'/api/analysis/warning/list',
                        post_data:request_params,
                        fn:function(data){
                            workdetialpop.init(p.$ow_open_cont,data,request_params,true,false)
                        }
                    })
                }
            })
        },
        tlvalueClick(){
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    quzhiDetail.init(p.$ow_open_cont,10)
                }
            })
        },
        shiminDayListClick(i){
            let that = this;
            that.curId_1 = i;
            this.shiminDayList.getData(i,function(data){
                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="shimin-shiduan-list anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="shiduan-list-2-style anjian-main-3-list-2">${data.list[i].num}</div>
    <div class="shiduan-list-3-style">${data.list[i].totalNum}</div>
    <div class="shiminshiduan-Pop anjian-main-3-list-4" style="top: 14px" 
    data-id="${data.list[i].id}" data-type="${data.list[i].type}" data-num="${data.list[i].totalNum}">
    <span class="anjian-card-full-btn card-full-btn">
    <img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.shimin-shiduan-day').html(tpl);
                for(let i = 0;i<data.list.length;i++){
                    if(data.list[i].totalNum==0){
                        $('.shimin-shiduan-day').find('.shimin-shiduan-list').eq(i).find('.shiminshiduan-Pop').hide()
                    }
                }
            });
        },
        shiminNightListClick(i){
            let that = this;
            that.curId_2 = i;
            this.shiminNightList.getData(i,function(data){
                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="shimin-shiduan-list anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="shiduan-list-2-style anjian-main-3-list-2">${data.list[i].num}</div>
    <div class="shiduan-list-3-style anjian-main-3-list-3">${data.list[i].totalNum}</div>
    <div class="shiminshiduan-Pop anjian-main-3-list-4" style="top: 14px" 
    data-id="${data.list[i].id}" data-type="${data.list[i].type}" data-num="${data.list[i].totalNum}">
    <span class="anjian-card-full-btn card-full-btn"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.shimin-shiduan-night').html(tpl);
                for(let i = 0;i<data.list.length;i++){
                    if(data.list[i].totalNum==0){
                        $('.shimin-shiduan-night').find('.shimin-shiduan-list').eq(i).find('.shiminshiduan-Pop').hide()
                    }
                }
            });
        },
        shiminshiduanLinClick(i){
            let that = this;
            that.curId_3 = i;
            this.shiminshiduanLin.getData(i,function(data){
                let dataList = data.list;
                let dataName = [];
                let dataVal = [];
                for(let i = 0;i<dataList.length;i++ ){
                    dataName.push(dataList[i].name);
                    dataVal.push(dataList[i].value);
                }
                let dataS =[{
                    name:dataName,
                    value:dataVal,
                    lineName:'预警走势'
                }];
                Xchart.LineChart({
                    conId:'shiduanLine',
                    // baifenhao:'%',
                    showY:false,
                    isArea:true,
                    txtColor:'#fff',
                    gridTop:'20%',
                    gridLeft:'1%',
                    isshowhover_perc:true,
                    colorArray:['#56e168'],
                    dataArray: dataS,
                });

            });
        }
    }
};