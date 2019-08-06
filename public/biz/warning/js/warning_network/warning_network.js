let warning_network =  {
    data:function(){
        return{
            tabId:'0',
            totalNum:'',
            currentNum:'',
            shequList:[],
            linechart:[],
            linechartName:[],
            curId_1:0,
            curId_2:0,
            curId_3:0
        }

    },
    template:`<div class="judge-center">
                    <div class="judge-center-header">
                        <div class="judge-center-title"><span class="title-name blueShadow-big-title">异常案件预警</span><span class="title-btn" @click="yichangshuoming"><i class="xb_icon info-circle"></i></span></div>
             
                    </div>

                    <!--中间主体内容-->
                    <div class="judge-center-main ntework-center-main">
                       
                       <div class="abnormal-Box">
    <img src="${baseUrl}/public/biz/warning/image/warning_tlvalueclose.png" class="tlvalue_close">
        <div class="abnormal-Box-title">异常案件预警说明</div>
        <div class="abnormal-Box-main-1">
        <span class="abnormal-or">监控目标 ：</span><span class="abnormal-wr">实时监控全开发区社会治理案件</span>
</div>
        <div class="abnormal-Box-main-2">
        <span class="abnormal-or">预警逻辑 ：</span><span class="abnormal-wr">任意案件有如下情况，将自动报警</span>
</div>
        <div class="abnormal-Box-main-3">
        <div><span class="abnormal-point"></span><span class="abnormal-wr">24内到期</span></div>
        <div><span class="abnormal-point"></span><span class="abnormal-wr">案件已超时</span></div>
        <div><span class="abnormal-point"></span><span class="abnormal-wr">案件被退回返工</span></div>
</div>
    </div>
                       
                        <div class="index_top society_top" >
                            <div class="early_warning">
                                <img class="early_warning_img" src="${baseUrl}/public/biz/warning/image/warn_red_light.png">
                                <img class="early_warning_img2" src="${baseUrl}/public/biz/warning/image/warn_red_bg.png">
                                <div class="early_warning_right society_warning_right">
                                    <div class="early_warning_num">{{currentNum}}</div>
                                    <div class="early_warning_name">当前预警 </div>
                                </div>    
                            </div>
                            <div class="early_warning">
                                <img class="early_warning_img" src="${baseUrl}/public/biz/warning/image/warn_blue_light.png">
                                <img class="early_warning_img2" src="${baseUrl}/public/biz/warning/image/warn_blue_bg.png">
                                <div class="early_warning_right  society_warning_right">
                                    <div class="early_warning_num">{{totalNum}}</div>
                                    <div class="early_warning_name">预警总数 </div>
                                </div>    
                            </div>
                            <div class="early_warning"><div class="early_warning_btn" @click="workPingtai()"></div></div>
                        </div>
                        <div class="society_mid">
                             <div class=" society_tab">
                                  <i class="xb_icon map  font-blue" @click="tabChart(0)"></i>
                                  <i class="xb_icon chart-area"  @click="tabChart(1)"></i>
                             </div> 
                             <div class="society_map map_wapper_mask" id="society_map">
                             </div>   
                             <div class="society_chart">
                                <div class="shiduan-main-3 anjian-main-3">
                    <div class="shiduan-main-3-left">
                        <div class="shiduan-card-title card-title">
                            <h2 class="card-title-big-2 card-title-big">超时案件预警统计</h2>
                            <div class="net-yichang-rank-tab-2 rank-tab-2 rank-tab">
                                <div data-type="0" class="rank-tab-item rank-tab-item-1" @click="shiminDayListClick(0)" :class="{'ac':curId_1==0}">社区</div> 
                                <div data-type="1" class="rank-tab-item rank-tab-item-2" @click="shiminDayListClick(1)" :class="{'ac':curId_1==1}">类型</div>
                            </div>
                        </div>
                        <div class="shiduan-main-3-list-title anjian-main-3-list-title">
                            <span>社区名称</span><span>当前预警数</span><span>总预警数</span>
                        </div>
                        <div class="shiduan-listLine listLine"></div>
                        <div class="shiduan-main-3-list-box anjian-main-3-list-box shimin-shiduan-day"></div>
                    </div>
                    <div class="shiduan-main-3-right" style="width: 44%">
                    <div class="shiduan-card-title card-title">
                        <h2 class="card-title-big-2 card-title-big">返工案件预警统计</h2>
                        <div class="net-yichang-rank-tab-2 rank-tab-2 rank-tab">
                            <div data-type="0" class="rank-tab-item rank-tab-item-1" @click="shiminNightListClick(0)" :class="{'ac':curId_2==0}">社区</div> 
                            <div data-type="1" class="rank-tab-item rank-tab-item-2" @click="shiminNightListClick(1)" :class="{'ac':curId_2==1}">类型</div>
                            </div>
                    </div>
                    <div class="shiduan-main-3-list-title anjian-main-3-list-title">
                    <span>类型名称</span><span>当前预警数</span><span>总预警数</span>
</div>
<div class="shiduan-listLine listLine"></div>
<div class="shiduan-main-3-list-box anjian-main-3-list-box shimin-shiduan-night">

</div>
</div>
</div>
<div class="LineMapTitle">异常案件预警近30天走势<div class="anjian-btn-box"><div class="anjian-btn-left" @click="shiminshiduanLinClick(0)" :class="{'anjianAc':curId_3==0}">总体</div><div class="anjian-btn-min" @click="shiminshiduanLinClick(1)" :class="{'anjianAc':curId_3==1}">超时</div><div class="anjian-btn-right" @click="shiminshiduanLinClick(2)" :class="{'anjianAc':curId_3==2}">返工</div></div></div>
                    <div id="netWork_1"></div>   
                             </div>   
                                
                        </div>
                               
                   
                    </div>
                             
                      </div> `,
    mounted:function(){

        if(window.p!=null){
            window.p.close();
        }
        let _this=this;

        _this.mapObj = new AMap.Map('society_map', {
            center: [120.730148,31.149666],
            dragEnable:false,
            zoomEnable:false,
            keyboardEnable:false,
            defaultCursor:'default',
            zoom: 12.6,
            viewMode:'3D',
            pitch:0,
            mapStyle:'amap://styles/72afe2e680614da5b49ae790fd652f5d',
        });
        _this.mapObj.on('complete',function(){
            $('#society_map').removeClass('map_wapper_mask');
          //  addCluster();

        });
        this.shiminDayList = new cacheData();
        this.shiminDayList.setRule({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/timeoutCases',
            0:{
                post_data:{
                    switchCond:1,
                    caseType: 2
                }
            },
            1:{
                post_data:{
                    switchCond:2,
                    caseType:2
                }
            },
        });
        this.shiminDayListClick(0);
        this.shiminNightList = new cacheData();
        this.shiminNightList.setRule({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/timeoutCases',
            0:{
                post_data:{
                    switchCond:1,
                    caseType: 3
                }
            },
            1:{
                post_data:{
                    switchCond:2,
                    caseType: 3
                }
            },
        });
        this.shiminNightListClick(0);
        this.shiminshiduanLin = new cacheData();
        this.shiminshiduanLin.setRule({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/trendAbnormalCases',
            0:{
                post_data:{
                    screeningCond:0
                }
            },
            1:{
                post_data:{
                    screeningCond:2
                }
            },
            2:{
                post_data:{
                    screeningCond:3
                }
            }
        });
        this.shiminshiduanLinClick(0);
        $('.tlvalue_close').click(function () {
            $('.abnormal-Box').css('display','none')
        });
//预警数
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/numSurvey',
            post_data:{warningType:11},
            fn:function(data){
                _this.totalNum=data.totalNum;
                _this.currentNum=data.num;
            }
        });

        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/numSurvey',
            post_data:{warningType:1},
            fn:function(data){
                _this.totalNum=data.totalNum;
                _this.currentNum=data.num;
            }
        });

//网格

        let cluster='',markers=[];

        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/prickPoint',
            post_data:{type:11},
            fn:function(data){
                let shequgrid=data.communityList;
                jichuGrid.draw(_this.mapObj,shequgrid);
                // for (var i = 0; i < data.list.length; i += 1) {
                //     let points=[data.list[i].lat,data.list[i].lng];
                //     markers.push(new AMap.Marker({
                //         position: points[i],
                //         content: `<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>`,
                //         offset: new AMap.Pixel(-15, -15)
                //     }))
                // }
                warningNetWorkMarker.draw(_this.mapObj,data.list,2);
            }
        });

        //
        // function addCluster(){
        //     cluster = new AMap.MarkerClusterer(_this.mapObj, markers, {gridSize: 200});
        //     console.log(222);
        // }
    },
    methods: {
        yichangshuoming(){
            $('.abnormal-Box').css('display','block')
        },
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
                        type: "11",
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
        net_yichang_pop(){
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    warningNetWorkPopYc.init(p.$ow_open_cont)
                }
            })
        },
        tabChart:function (tabId) {
            let _this=this;
            _this.tabId = tabId;
            if(tabId==0){
                $('.chart-area ').removeClass('font-blue');
                $('.map ').addClass('font-blue');
                $('.society_map').show();
                $('.society_chart').hide();
            }
            else{
                $('.map ').removeClass('font-blue');
                $('.chart-area ').addClass('font-blue');

                $('.society_map').hide();
                $('.society_chart').show();

            }
        },
        shiminDayListClick(i){
            let that = this;
            that.curId_1 = i;
            this.shiminDayList.getData(i,function(data){
                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="shimin-shiduan-list anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="shiduan-list-2-style anjian-main-3-list-2">${data.list[i].currentNum}</div>
    <div class="shiduan-list-3-style">${data.list[i].totalNum}</div>
    <div class="shiminshiduan-Pop anjian-main-3-list-4" style="top: 14px">
    <span class="anjian-card-full-btn card-full-btn netYj" data-id="${data.list[i].big_type_id}" data-name = '${data.list[i].name}'>
    <img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.shimin-shiduan-day').html(tpl);
                $('.netYj').click(function () {
                    let community_name = $(this).data('name');
                    let id=$(this).data('id');
                    var p = pop.view({
                        width: 1780,
                        height: 960,
                        hideTitle: true,
                        zdy_class: 'general_full community_detail_pop',
                        filterContainer: '.filter_dom',
                        content: '',
                        success: function () {
                            let request_params='';
                            if(i==0) {
                                request_params = {
                                    startTime: "",
                                    endTime: "",
                                    status: "1",
                                    type: "11",
                                    community: community_name,
                                    offset: 0,
                                };
                            }else{
                                request_params = {
                                    startTime: "",
                                    endTime: "",
                                    status: "1",
                                    type: "11",
                                    caseType:id,
                                    offset: 0,
                                };
                            }
                            ajax_jsonp_request({
                                url:common_module_conf.project_conf.show.host+'/api/analysis/warning/list',
                                post_data:request_params,
                                fn:function(data){
                                    workdetialpop.init(p.$ow_open_cont,data,request_params,true,false)
                                }
                            })
                        }
                    });
                })
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
    <div class="shiduan-list-2-style anjian-main-3-list-2">${data.list[i].currentNum}</div>
    <div class="shiduan-list-3-style anjian-main-3-list-3">${data.list[i].totalNum}</div>
    <div class="shiminshiduan-Pop anjian-main-3-list-4" style="top: 14px">
    <span class="anjian-card-full-btn card-full-btn netYj"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.shimin-shiduan-night').html(tpl)
            });
        },
        shiminshiduanLinClick(i){
            let that = this;
            that.curId_3 = i;
            this.shiminshiduanLin.getData(i,function(data){
                let dataList = data.trendList;
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
                    conId:'netWork_1',
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
        },

        detailPop:function (type,id) {
            warningPop.detail(type,id)
        }
    }
};

//异常预警提醒
let yichangTixing = {
    init:function ($dom) {
        this.$dom=$dom;
        this.content();
    },
    content:function () {
    let tpl = `
    <div class="abnormal-Box">
    <img src="${baseUrl}/public/biz/warning/image/warning_tlvalueclose.png" class="tlvalue_close">
        <div class="abnormal-Box-title">异常案件预警说明</div>
        <div class="abnormal-Box-main-1">
        <span class="abnormal-or">监控目标 ：</span><span class="abnormal-wr">实时监控全开发区社会治理案件</span>
</div>
        <div class="abnormal-Box-main-2">
        <span class="abnormal-or">预警逻辑 ：</span><span class="abnormal-wr">任意案件有如下情况，将自动报警</span>
</div>
        <div class="abnormal-Box-main-3">
        <div><span class="abnormal-point"></span><span class="abnormal-wr">24内到期</span></div>
        <div><span class="abnormal-point"></span><span class="abnormal-wr">案件已超时</span></div>
        <div><span class="abnormal-point"></span><span class="abnormal-wr">案件被退回返工</span></div>
</div>
    </div>
    `;
        this.$dom.html(tpl);
        this.$dom.find('.tlvalue_close').click(function () {
            $('.abnormal-Box').hide();
        })
    }
};

//扎点
let warningNetWorkMarker = {

    marker_obj:{},
    draw:function(map,data){
        this.isTime = '';
        this.subType = '';
        for(var i in data){
            var obj = data[i];
            var point = [obj.lng,obj.lat];
            let bgColorStyle = '';
            let imgIcom = '';
            if(data[i].sta == '超时'){
                bgColorStyle = '#F7574D';
                this.subType = 2;
                this.isTime = 1;
                imgIcom = 'icon_case_new.png';
            }else if(data[i].sta == '返工'){
                bgColorStyle = '#FF00FF';
                this.subType = 3;
                imgIcom = 'icon_case_willtimeout.png';
            }else if(data[i].sta == '即将超时'){
                bgColorStyle = '#ff9900';
                this.isTime = 1;
                this.subType = 1;
                imgIcom = 'icon_case_rework.png';
            }
            let icon= `
            <div class="shequWarning networWarning" style="background-color:${bgColorStyle}">${data[i].sta}</div>
            <img src="${baseUrl}/public/biz/warning/image/${imgIcom}"  width="30">`;
            this.marker_obj[i] = new AMap.Marker({
                position:point,
                content:icon,
                offset:new AMap.Pixel(0,-25)
            });

            this.marker_obj[i].setMap(map);
            this.clickEvent(this.marker_obj[i],obj.taskid,this.subType);
        }
    },

    clear:function(){
        $.each(this.marker_obj,function(i,n){
            n.setMap(null)
        })
    },
    show:function(map){
        $.each(this.marker_obj,function(i,n){
            n.setMap(map)
        })
    },
    hide:function(){
        $.each(this.marker_obj,function(i,n){
            n.hide()
        })
    },

    clickEvent:function(marker_obj,taskid,subType){
        if(window.p!=null){
            window.p.close();
        }
        let that = this;
        marker_obj.on('click', function (e) {
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'case_detail network_detail',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    ajax_jsonp_request({
                        url:common_module_conf.project_conf.show.host+'/api/common/cases/detail',
                        post_data:{
                            id:taskid,
                            subType:subType,
                            isTime:that.isTime
                        },
                        fn:function(data){
                            caseDetailPopNet(p.$ow_open_cont,data,taskid,subType)
                        }
                    });

                }
            })
        })
    },
}



