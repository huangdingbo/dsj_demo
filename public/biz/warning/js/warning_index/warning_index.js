let warning_index =  {
    data:function(){
        return{
            totality:{
                title:[],
            },

        }

    },
    template:`<div class="judge-center">
                    <div class="judge-center-header">
                        <div class="judge-center-title" style="border-bottom:2px solid #275a85"><span class="title-name blueShadow-big-title">监控预警总体情况</span></div>
             
                    </div>

                    <!--中间主体内容-->
                    <div class="judge-center-main">
                        <div class="index_top" >
                            <div class="early_warning">
                                <img class="early_warning_img early_warning_img-75" src="${baseUrl}/public/biz/warning/image/warn_red_light.png">
                                <img class="early_warning_img2 early_warning_img2-75" src="${baseUrl}/public/biz/warning/image/warn_red_bg.png">
                                <div class="early_warning_right">
                                    <!--<div class="early_warning_num">{{totality.title.currentNum}}</div>-->
                                    <div class="early_warning_num">15</div>
                                    <div class="early_warning_name">当前预警 </div>
                                </div>    
                            </div>
                            <div class="early_warning">
                                <img class="early_warning_img early_warning_img-75" src="${baseUrl}/public/biz/warning/image/warn_blue_light.png">
                                <img class="early_warning_img2 early_warning_img2-75" src="${baseUrl}/public/biz/warning/image/warn_blue_bg.png">
                                <div class="early_warning_right">                        
                                    <div class="early_warning_num">{{totality.title.totalNum}}</div>
                                    <div class="early_warning_name">预警总数 </div>
                                </div>    
                            </div>
                            <div class="early_warning">
                                <img class="early_warning_img early_warning_img-75"src="${baseUrl}/public/biz/warning/image/warn_blue_light.png">
                                <img class="early_warning_img2 early_warning_img2-75" src="${baseUrl}/public/biz/warning/image/warn_blue_bg.png">
                            <div class="early_warning_right">
                                <div class="early_warning_num">{{totality.title.avg}}</div>
                                <div class="early_warning_name">预警数/日 </div>
                            </div>    
                            </div>
                        </div>
                        <div class="index_left">
                            <div class="warning_map map_wapper_mask" id="warning_map" style="height:100%"></div>
                            <div class="warning_map_label">
                                <div class="label_item"><img src="${baseUrl}/public/biz/index/image/icons/icon_house_normal.png">高发社区网格</div>
                                <div class="label_item"><img src="${baseUrl}/public/biz/warning/image/icon_case_new.png">异常案件</div>
                                <div class="label_item"><img src="${baseUrl}/public/biz/warning/image/icon_water_blue.png">用水异常</div>
                            </div>
                        </div>
                        <div class="index_right">
                            <div class="warning_chart" id="warning_chart"></div>
                            <div class="warning_line" id="warning_line"></div>
                        </div>
                               
                   
                        </div>
                        
                        
                        <!--预警工作台-->
                        <!--<div class="warning-right">-->
                        <!---->
                        <!--</div> -->
                                
             </div> `,
    mounted:function(){


        //如有详情弹窗 关闭
        if(window.p!=null){
            window.p.close();
        }
        let _this=this;
        let linechart=[];
        let linechartName=[];
        let radar=[];
        let radarName=[];
        _this.mapObj = new AMap.Map('warning_map', {
            center: [120.730148,31.149666],
            dragEnable:false,
            zoomEnable:false,
            keyboardEnable:false,
            defaultCursor:'default',
            zoom: 12.3,
            viewMode:'3D',
            pitch:0,
            mapStyle:'amap://styles/72afe2e680614da5b49ae790fd652f5d',
        });

        _this.mapObj.on('complete',function(){
            $('#warning_map').removeClass('map_wapper_mask');
        });

        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/totality',
            fn:function(data){
                _this.totality.title.push(data.list[0]);
                _this.totality.title= _this.totality.title[0];

                $.each(data.radarMapList[0],function (x,y) {
                    radar.push(y.value);
                    radarName.push(y.name)
                });
                $.each(data.trendList,function (x,y) {
                    linechart.push(y.value);
                    linechartName.push(y.name)
                });

//雷达图
                let chart1 = echarts.init(document.getElementById("warning_chart"));
                let option = {

                    title: {
                        text: '预警类型分析',
                        target: 'blank',
                        top: '5%',
                        left: '3%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 26,
                            textShadowColor:'#013c80',
                            textShadowBlur:'30',
                            textBorderColor:'#013c80',
                            textBorderWidth:'5',
                            fontWeight: 'bold'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    radar: [{                       // 雷达图坐标系组件，只适用于雷达图。
                        center: ['50%', '50%'],             // 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
                        radius: 160,                        // 圆的半径，数组的第一项是内半径，第二项是外半径。
                        startAngle: 90,                     // 坐标系起始角度，也就是第一个指示器轴的角度。[ default: 90 ]
                        name: {                             // (圆外的标签)雷达图每个指示器名称的配置项。
                            formatter: '{value}',
                            textStyle: {
                                fontSize: 15,
                                color: '#fff'
                            }
                        },
                        nameGap: 15,                        // 指示器名称和指示器轴的距离。[ default: 15 ]
                        splitNumber: 6,                     // (这里是圆的环数)指示器轴的分割段数。[ default: 5 ]
                        shape: 'polygon',                    // 雷达图绘制类型，支持 'polygon'(多边形) 和 'circle'(圆)。[ default: 'polygon' ]
                        axisLine: {                         // (圆内的几条直线)坐标轴轴线相关设置
                            lineStyle: {
                                color: 'rgb(35,65,85)',          // 坐标轴线线的颜色。
                                width: 1,                      	 // 坐标轴线线宽。
                                type: 'solid',                   // 坐标轴线线的类型。
                                opacity: 0.5
                            }
                        },
                        splitLine: {                        // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
                            lineStyle: {
                                color: 'rgb(35,65,85)',            // 分隔线颜色
                                width: 2, 						// 分隔线线宽
                                opacity: 0.5
                            }
                        },
                        splitArea: {                        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                            show: true,
                            areaStyle: {                            // 分隔区域的样式设置。
                                color: ['rgba(21,46,66,1)','rgba(21,46,66,1)'],       // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                            }
                        },
                        indicator: [{               // 雷达图的指示器，用来指定雷达图中的多个变量（维度）,跟data中 value 对应
                            name: '高发区域',                           // 指示器名称
                        }, {
                            name: '高发类型',
                        }, {
                            name: '高发时段',
                        }, {
                            name: '异常案件',
                        }, {
                            name: '消极网格员',
                        },{
                            name: '用水异常',
                        }]
                    }],
                    series:{
                        //    name: '雷达图',             // 系列名称,用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                        center:['50%','50%'],
                        type: 'radar',              // 系列类型: 雷达图
                        tooltip: {
                            trigger: 'item'
                        },
                        symbol:'none',
                        itemStyle: {                // 折线拐点标志的样式。
                            normal: {                   // 普通状态时的样式
                                color:'rgb(208,191,27)',
                            },
                        },
                        areaStyle: {                // 单项区域填充样式
                            normal: {
                                color: 'rgba(255,177,76,1)'       // 填充的颜色。[ default: "#000" ]
                            }
                        },
                        lineStyle: {                // 单项线条样式。
                            normal: {
                                color: 'rgba(255,177,76,1)',
                                opacity: 1           // 图形透明度
                            }
                        },
                        data: [{                    // 雷达图的数据是多变量（维度）的
                            name: '预警',                 // 数据项名称
                            value: radar,        // 其中的value项数组是具体的数据，每个值跟 radar.indicator 一一对应。
                            symbolSize: 5,                      // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                            label: {                    // 单个拐点文本的样式设置
                                normal: {
                                    //show: true,             // 单个拐点文本的样式设置。[ default: false ]
                                    position: 'top',        // 标签的位置。[ default: top ]
                                    distance: 5,            // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                                    color: '#fff',          // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                                    fontSize: 14,           // 文字的字体大小
                                    formatter:function(params) {
                                        return params.value;
                                    }
                                }
                            },
                        }]
                    },
                };
                chart1.setOption(option);

//折线图

                let chart2 = echarts.init(document.getElementById("warning_line"));
                let option2={
                    title: {
                        text: '近30天预警发展趋势',
                        target: 'blank',
                        top: '5%',
                        left: '3%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 26,
                            textShadowColor:'#013c80',
                            textShadowBlur:'30',
                            textBorderColor:'#013c80',
                            textBorderWidth:'5',
                            fontWeight: 'bold'
                        }
                    },
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
                        data:linechartName,
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
                        data:linechart,
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
                chart2.setOption(option2);


            }
        });

//社区网格
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/gird',
            fn:function(data){

                jichuGrid.draw(_this.mapObj,data.communityList);

                warningMarker.draw(_this.mapObj,data.communityList);
                warningMarker.draw(_this.mapObj,data.baseGirdList)

            }
        });








    },
    methods: {

    }
};