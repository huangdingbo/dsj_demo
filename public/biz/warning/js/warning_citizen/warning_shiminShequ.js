



let warning_shiminShequ =  {
    data:function(){
        return{

            totalNum:'',
            currentNum:'',
            shequList:[],
            linechart:[],
            linechartName:[],
        }

    },
    template:`<div class="judge-center">
                    <div class="judge-center-header">
                        <div class="judge-center-title"><span class="title-name blueShadow-big-title">高发社区网格预警</span>
                        <span class="title-btn" @click="yuzhi()"><i class="xb_icon info-circle"></i></span></div>
             
                    </div>

                    <!--中间主体内容-->
                    <div class="judge-center-main">

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
                                <div class="society_chart_left">
                                    <div class="society_title">社区预警统计</div>
                                    <div class="society_cont">
                                        <div class="society_content font-blue font-weight">
                                            <div class="society_content_item">社区名称</div>
                                            <div class="society_content_item">当前预警数</div>
                                            <div class="society_content_item">总预警数</div>
                                        </div>
                                        <div class="society_cont_cont">
                                            <div class="society_content" v-for="(item,index) in shequList">
                                                <div class="society_content_item">{{item.name}}</div>
                                                <div class="society_content_item" :class="{'font-yellow':item.num>0}">{{item.num}}</div>
                                                <div class="society_content_item">{{item.totalNum}}</div>
                                                <div class="society_content_btn" :data-id="item.id" :data-type="item.type" @click="detailPop(item.type,item.id)"><img src="${baseUrl}/public/biz/index/image/home_btn_icon_deep.svg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="society_chart_right">
                                    <div class="society_title">高发社区预警近30天走势</div>
                                    <div class="society_line" id="society_line"></div>
                                </div>
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
            zoom: 12.4,
            viewMode:'3D',
            pitch:0,
            mapStyle:'amap://styles/72afe2e680614da5b49ae790fd652f5d',
        });

        _this.mapObj.on('complete',function(){
            $('#society_map').removeClass('map_wapper_mask');
        });
//预警数
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/numSurvey',
            post_data:{warningType:6},
            fn:function(data){
                _this.totalNum=data.totalNum;
                _this.currentNum=data.num;
            }
        });

//列表
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/statisList',
            post_data:{warningType:6},
            fn:function(data){
                _this.shequList=data.list;
            }
        });

// 折线图



        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/trendList',
            post_data:{warningType:6},
            fn:function(data){
                $.each(data.list,function (x,y) {
                    _this.linechart.push(y.value);
                    _this.linechartName.push(y.name);

                });
            }


        });

//网格
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/socialGird',
            post_data:{birdType:1},
            fn:function(data){

                let shequgrid=data.communityList;

                jichuGrid.draw(_this.mapObj,shequgrid,{type:0,isGridView:true});
                warningMarker.draw(_this.mapObj,data.communityList,6);
            }
        });

        textMarker.draw(_this.mapObj,textArr[0])


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
                        type: "6",
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
        tabChart:function (tabId) {
            let _this=this;

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

                //折线图

                let chart2 = echarts.init(document.getElementById("society_line"));
                let option2={
                    tooltip:{
                        trigger: 'axis',
                        formatter: function (params) {
                            var res = params[0].name +' : ' + params[0].value + "件";
                            return res;
                        }
                    },
                    xAxis: {
                        splitLine:{show: false},//去除网格线
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize:20,
                                baseline: 'top'
                            }
                        },
                        axisLine: {
                            lineStyle:{
                                color:'#fff',
                                width:2
                            }
                        },
                        data:  _this.linechartName,
                    },
                    yAxis: [{
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show:false
                        },
                        splitLine:{show: false},//去除网格线
                        type:'value',
                        axisLabel: {
                            show: false,
                            formatter: '{value} %'
                        }
                    }],
                    series: [{
                        data:_this.linechart,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    width:5,
                                    color:'rgb(80,220,100)',
                                }
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(25, 92, 98)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(23, 87, 61)'
                                }])
                            }
                        },
                        symbolSize: 10,//拐点大小
                        type:'line',
                    }]
                };
                chart2.clear(option2);
                chart2.setOption(option2);
            }
        },


        detailPop:function (type,id) {
            warningPop.detail(type,id)

        },
        yuzhi:function () {
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    quzhiDetail.init(p.$ow_open_cont,6)
                }
            })
        },

    }
};