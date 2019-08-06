

//预警详情
let warning_detail = {
    init($dom,request_params,fromwork) {
        this.$dom = $dom;
        this.request_params = request_params;
        this.fromwork = fromwork; //是否来自工作台
        this.timeCond = this.request_params.timeCond;
        this.time = this.request_params.time;
        this.code = this.request_params.code;
        this.type = this.request_params.type;
        this.id = this.request_params.id;
        this.length=this.request_params.length;
        this.select='';
        this.typeType='';
        this.isCitizen='';
        this.renderCon();
        this.initEvent();
    },
    initEvent() {
        let _this = this;
        let num = 0;
        console.log(this.request_params);
//区分select typetype
        if(this.type==1||this.type==2||this.type==6||this.type==7){
            this.select=0;
            this.typeType=1;
            $('.rank-tab-warningPop').find('.tabChart').eq(0).addClass('ac');
        }else if(this.type==3||this.type==4||this.type==5||this.type==8||this.type==9||this.type==10){
            this.select=1;
            $('.rank-tab-warningPop').hide();
            $('.anjian-pop-btn-map').show();
        }
        if(this.type==1||this.type==2||this.type==3||this.type==4||this.type==5){
            this.isCitizen=0
        }else{
            this.isCitizen=1
        }

        if(this.type==3||this.type==4||this.type==5||this.type==8||this.type==9||this.type==10){this.$dom.find('.warning-detailPop-footer-left').find('.society_title').html('案件高发网格TOP6')}

        if(this.request_params.timeCond==1){
            $('.tabAnjian').eq(0).addClass('ac');
        }else{
            $('.tabAnjian').eq(1).addClass('ac');
        }
//时间超过5条
        if (this.length > 5) { $('.warning-detailPop-timeBtn').show()} else {$('.warning-detailPop-timeBtn').hide();}

        _this.hasread(0);
        _this.refreshData();
        _this.refreshData2();

        //时间轴右侧按钮
        _this.$dom.find('.warning-detailPop-timeBtn.timeBtn-right').click(function () {
            let warning_num = $(this).find('.warning_num').text()/1;

            if(warning_num==0){
                warning_num=0;
            }else{
                warning_num = warning_num -1;
            }
            $(this).find('.warning_num').text(warning_num);
            if(num == (_this.length-5)){
                return;
            }
            num++;

            $(".timeScroll-box").stop().animate({
                left: -num * (200) + "px"
            })
        });
        //时间轴左侧按钮
        _this.$dom.find('.warning-detailPop-timeBtn.timeBtn-left').click(function () {

            if(num == 0){
                return;
            }
            num--;
            $(".timeScroll-box").stop().animate({
                left: -num * (200) + "px"
            })
        });

        //案件环比
        _this.$dom.find('.tabAnjian').click(function () {
            let timeCond = $(this).data('type');
            let index = $(this).index();
            if(_this.fromwork){
                $('.alertPop').css('display','block');
                setTimeout(function(){$('.alertPop').css('display','none')},2000);
            }else {
                ajax_jsonp_request({
                    url: common_module_conf.project_conf.show.host + '/api/analysis/warning/allDetails',
                    post_data: {
                        timeCond: timeCond,
                        code: _this.code,
                        type: _this.type,
                    },
                    fn: function (data) {
                        if (data.timeList.length == 0) {
                            $('.alertPop').css('display', 'block');
                            setTimeout(function () {
                                $('.alertPop').css('display', 'none')
                            }, 2000);
                        } else {
                            $(".timeScroll-box").stop().animate({
                                left: 0 + "px"
                            });
                            num = 0;
                            _this.timeCond = timeCond;
                            _this.time = data.timeList[0].day;
                            _this.refreshData();
                            _this.refreshData2();
                            _this.hasread(0);
                            $('.tabAnjian').removeClass('ac');
                            $('.tabAnjian').eq(index).addClass('ac');
                        }
                    }
                })
            }
        });

        // 调查报告
        _this.$dom.off('click').on('click','.warning-btn-right',function ()  {
            let id=$(this).data('id');
            $('.popBox').show();
            $('.popbox-del').click(function () {
                $(this).parent().hide();
            });
            $('.popbox-btn').click(function () {
                let content=$('.popbox-con').val();
                let index=$('.timeScroll-item-con.ac').parent().index();
                ajax_jsonp_request({
                    url: common_module_conf.project_conf.show.host+'/api/analysis/warning/update',
                    post_data:{
                        id:id,
                        text: content,
                    },
                    fn: function () {
                        _this.retimeList(index);
                    }
                });
                $(this).parent().hide();
            });
        });
        //手动解除
        _this.$dom.on('click','.warning-btn-left',function () {
            let status=$(this).data('status');
            let id=$(this).data('id');
            if(status == 2|| status==3){
                return false
            }else{
                $('.warning-right-judgePops').show();
            }
            $('.judgePop-btn-left').click(function () {
                $(this).parents('.warning-right-judgePops').hide();
            });

            $('.judgePop-btn-right').click(function () {
                let index=$('.timeScroll-item-con.ac').parent().index();
                ajax_jsonp_request({
                    url: common_module_conf.project_conf.show.host+'/api/analysis/warning/update',
                    post_data: {
                        id:id
                    },
                    fn: function () {
                        _this.retimeList(index);
                        refresh_workbench.makeItem();
                    }
                });
                $(this).parents('.warning-right-judgePops').hide();

            })

        });

        //时间列表切换
        _this.$dom.on('click','.timeScroll-item-con',function () {
            let index= $(this).parent().index();
            let time = $(this).data('time');
            let id = $(this).data('id');
            _this.time = time;
            _this.id = id;
            _this.hasread(index);
            _this.refreshData();
            _this.refreshData2();
        });

        //图表切换
        _this.$dom.on('click','.tabChart',function () {
            $('.tabChart').removeClass('ac');
            $(this).addClass('ac');
            let typeType = $(this).data('type');
            _this.typeType = typeType;
            _this.refreshData2();
        });

        _this.$dom.on('click','.anjian-pop-btn-map',function () {
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full community_detail_pop',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    let girdCond = 1;
                    let isCitizen = 1; //市民相关
                    switch( _this.request_params.type){
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            girdCond = 1; //社区
                            isCitizen = 0;
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            girdCond = 2; //基层
                            isCitizen = 1;
                            break;
                    }
                    let request_params_map = {
                        time: _this.request_params.time,
                        code: _this.request_params.code,
                        type: _this.request_params.type,
                        girdCond:girdCond,
                        isCitizen:_this.isCitizen,
                        timeCond:_this.timeCond
                    };

                    warning_detail_map.init(p.$ow_open_cont,request_params_map)
                }
            })
        });

        _this.$dom.on('click','.society_content_btn',function(){
            var data_taskid = $(this).data('taskid');
            var data_status = $(this).data('status');
            var p = pop.view({
                width: 980,
                height: 850,
                hideTitle: true,
                zdy_class: 'case_detail',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    ajax_jsonp_request({
                        url:common_module_conf.project_conf.show.host+'/api/common/cases/detail',
                        post_data:{
                            id:data_taskid
                        },
                        fn:function(data){
                            caseDetailPop(p.$ow_open_cont,data,'',data_status)
                        }
                    });

                }
            })
        });

        _this.$dom.on('click','.anjian-pop-btn',function () {
            let times = $('.timePd').data('time');
            var p = pop.view({
                width: 2600,
                height: 1150,
                hideTitle: true,
                zdy_class: 'general_full caseList_pop',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    ajax_jsonp_request({
                        url: common_module_conf.project_conf.show.host+'/api/index/cases/list',
                        post_data: {
                            "startTime": times,
                            "endTime": times,
                            "bigTypeId": '',
                            "smallTypeId": "",
                            "status": "",
                            'offset': 1
                        },
                        fn: function (data) {
                            caseList.init(p.$ow_open_cont, data, 3,times)
                        }
                    })

                },
            })
        });

    },

    renderCon() {
         let tpl = `<div class="bigPop-head">
                       <div class="bigPop-head-left">
                            <div class="blueShadow-big-title">${this.request_params.name}预警详情</div>
                            <div class="warning-detailPop-tab rank-tab">
                                <a data-type="1" class=" rank-tab-item tabAnjian">案件数量监控<span class="warning-num dayNum"></span></a>
                                <a data-type="2" class=" rank-tab-item tabAnjian">案件环比增幅监控<span class=" warning-num weekNum"></span></a> 
                            </div>                     
                        </div>     
                        <div class="alertPop warning-right-judgePop">暂无数据！</div>                                                     
                    </div>
                    <div class="warning-detailPop-main">
                        <div class="warning-detailPop-time">
                           <img class="time-icon" src="${baseUrl}/public/biz/warning/image/icon_chart_date.svg" width="60">
                            <div class="warning-detailPop-timeBtn timeBtn-left" style="display: none">
                                <i class="xb_icon arrow-circle-left-re"></i>                              
                            </div>
                            <div class="warning-detailPop-timeScroll">
                                <div class="timeScroll-box">
                                </div>
                            </div>
                            <div class="warning-detailPop-timeBtn timeBtn-right" style="display: none">
                                 <i class="xb_icon arrow-circle-right-r"></i>    
                                <p>还有<span class="warning_num">${this.length - 5}</span>条<br>正在预警</p>
                            </div>
                        </div>
                        <div class="warning-detailPop-con">
                            <div class="warning-detail-mid">
                                <div class="warning-detail-left">
                                    <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                    <div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                    <div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                    <div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                    <div class="warning-detail-left-list">
                                    </div>       
                                </div>
                                <div class="warning-detail-right"></div>
                            </div>
                        </div>
                        <div class="warning-detailPop-footer">
                            <div class="warning-detailPop-footer-left">
                            <div class="judge-center-card-warningPop">
                                <div class="anjian-detail"> 
                                <div class="society_title">案件类型TOP6</div>
                                <img class="anjian-pop-btn-map" src="${baseUrl}/public/biz/index/image/home_btn_icon_deep.svg" style="display: none"></div>
                                    <div class="rank-tab-warningPop rank-tab">
                                        <a  class="rank-tab-item tabChart" data-type="1">大类</a>
                                        <a  class="rank-tab-item tabChart" data-type="2">小类</a>
                                    </div>
                                </div>
                            <div class="warning-detail-pop">
                                <div id="acceptTop6" class="card-chart"></div>
                            </div>
                            </div>
                               <div class="warning-detailPop-footer-right"></div>
                        </div>
                           
                    </div>
                    <div class="warning-pop-btn">
                      
                    </div>
                    <div class="popBox" style="display: none">
                        <div class="popbox-title">填写预警调查结果</div>
                        <textarea class="popbox-con"></textarea>
                        <div class="popbox-btn">保存</div>
                        <img src="${baseUrl}/public/biz/warning/image/warning_del.png" class="popbox-del">
                    </div>
                    <div class="warning-right-judgePops " style="display: none">
                        <div class="judgePop-title">手动解除</div>
                        <div class="judgePop-title-war">是否解除该预警？</div>
                        <div class="judgePop-btn">
                            <div class="judgePop-btn-left">取消</div>
                            <div class="judgePop-btn-right">解除预警</div>
                        </div>
                    </div>`;

        this.$dom.html(tpl);


    },

    retimeList(index){
        let _this=this;
        let timeList = '';
        let imgsrc = '';
        if(this.fromwork){
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host + '/api/analysis/warning/newAllDetails',
                async: false,
                post_data: {
                    id:_this.id,
                },
                fn: function (data){
                    if(data.timeList[0].status ==1){
                        imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_red.png`
                    }
                    else{
                        imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_dark.png`
                    }
                    timeList += `<div class="timeScroll-item">
                               <div class="timeScroll-item-con ac timePd" data-time="${data.timeList[0].day}" data-id="${data.timeList[0].id}">
                               <img src="${imgsrc}">${data.timeList[0].name}</div>
                      </div>`;
                    $('.timeScroll-box').html(timeList);
                    if(data.timeList[0].timeCond==1){
                        $('.weekNum').html('0');
                        $('.dayNum').html('1');
                    }else{
                        $('.weekNum').html('1');
                        $('.dayNum').html('0');
                    }
                    _this.refreshAnniu(data.timeList[0].status,data.timeList[0].id,data.timeList[0].result_txt,data.timeList[0].showRelieveTime);
                }
            });

        }else {
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host + '/api/analysis/warning/allDetails',
                async: false,
                post_data: {
                    timeCond: _this.timeCond,
                    code: _this.code,
                    type: _this.type,
                },
                fn: function (data) {
                    let read = '';
                    $.each(data.timeList, function (x, y) {
                        if (y.hasRead == 0) {
                            read = '<div class="border_blue"></div>未查看';
                        } else {
                            read = '';
                        }
                        if (y.status == 1) {
                            imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_red.png`
                        }
                        else {
                            imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_dark.png`
                        }
                        timeList += `<div class="timeScroll-item">
                               <div class="timeScroll-item-con" data-id="${y.id}" data-text="${y.result_txt}" data-time="${y.day}" 
                               data-status="${y.status}" data-read="${y.hasRead}" data-times="${y.showRelieveTime}">
                               <img src="${imgsrc}">${y.name}</div>
                               <span class="timeScroll-item-status">${read}</span>
                      </div>`;
                    });

                    $('.weekNum').html(data.numList.weekNum.num);
                    $('.dayNum').html(data.numList.dayNum.num);

                    $('.timeScroll-box').html(timeList);
                    $('.timeScroll-item').eq(index).find('.timeScroll-item-con').addClass('ac timePd');

                    let status = $('.timeScroll-item').eq(index).find('.timeScroll-item-con').data('status');
                    let text = $('.timeScroll-item').eq(index).find('.timeScroll-item-con').data('text');
                    let id = $('.timeScroll-item').eq(index).find('.timeScroll-item-con').data('id');
                    let times = $('.timeScroll-item').eq(index).find('.timeScroll-item-con').data('times');
                    _this.refreshAnniu(status, id, text, times);

                },

            });
        }
    },
    refreshAnniu(status,id,text,times){
        let anniu=`  <div class="warning-btn-left" data-id='${id}' data-status="${status}">
  <i class="xb_icon check-circle-re"></i>手动解除</div>
                        <div class="warning-btn-right" data-id='${id}' >
                        <i class="xb_icon pencil-alt-re"></i>填写预警调查结果</div>`;
        this.$dom.find('.warning-pop-btn').html(anniu);

        if(text){
            $('.warning-btn-right').html('调查结果:'+text);
            $('.warning-btn-right').css({'background':'none','text-aline':'left','line-height':'25px','word-wrap': 'break-word','text-overflow':'ellipsis'});
            $('.warning-btn-right').unbind('click');
        }else{
            $('.warning-btn-right').html('<i class="xb_icon pencil-alt-re"></i>'+'填写预警调查结果');
            $('.warning-btn-right').css('background','#1476d7');
            $('.warning-btn-right').bind('click');
        }

        if(status==1){
            $('.warning-btn-left').html('<i class="xb_icon check-circle-re"></i>'+'手动解除');
            $('.warning-btn-left').css('background','#1476d7');
            $('.warning-btn-left').bind('click');
        }else if(status==2){
            $('.warning-btn-left').html('已自动解除'+'<br>'+times);
            $('.warning-btn-left').css({'background':'#033152','line-height':'25px'});
            $('.warning-btn-left').unbind('click');
        }else if(status==3){
            $('.warning-btn-left').html('已手动解除'+'<br>'+times);
            $('.warning-btn-left').css({'background':'#033152','line-height':'25px'});
            $('.warning-btn-left').unbind('click');
        }

    },

    renderData1(data) {
        let midLeft = '';
        if(data.instructionsList.length==0) {
            data.instructionsList = [{
                dayName:'',
                data_name:'',
                timeName:'',
                content:'',
            }]
        }

        let warning_des = '';
        if(data.instructionsList[0].statis_type == 1){
            warning_des = data.instructionsList[0].baseContent + `<span class="font-yellow" style="font-weight:bold;margin:0 5px;">${data.instructionsList[0].timeStr}</span>` + '达到警戒线' + `<span class="font-yellow" style="font-weight:bold;margin:0 5px;">${data.instructionsList[0].otherNum}</span>` + '件'
        }else{
            warning_des = data.instructionsList[0].baseContent + `<span class="font-yellow" style="font-weight:bold;margin:0 5px;">${data.instructionsList[0].otherNum}</span>` + '%'
        }

        midLeft = `<div class="warning-detail-item">
                    <div class="warning-detail-title">监控目标：</div>
                    <div class="warning-detail-con">${data.instructionsList[0].data_name}</div></div>
                         <div class="warning-detail-item">
                         <div class="warning-detail-title">预警时间：</div><div class="warning-detail-con">${data.instructionsList[0].timeName}</div></div>
                         <div class="warning-detail-item"><div class="warning-detail-title">预警说明：</div>
                         <div class="warning-detail-con">${warning_des}</div>
                         </div>
                  `;

        $('.warning-detail-left-list').html(midLeft);




        let bottomRight = '';

        bottomRight = `<div class="anjian-detail"> <div class="society_title">社区预警统计</div>
                       <img class="anjian-pop-btn" src="${baseUrl}/public/biz/index/image/home_btn_icon_deep.svg"></div>
             <div class="society_cont tongjiPop">
                 <div class="society_content font-blue font-weight">
                  <div class="society_content_item" style="width: 160px">接报时间</div>
                  <div class="society_content_item">案件类型</div>
                  <div class="society_content_item">案件来源</div>
                  <div class="society_content_item">处理人</div>
                  <div class="society_content_item">状态</div>
                  </div>
                  <div class="society_cont_cont tongjilist">
                  </div>
              </div>`;

        $('.warning-detailPop-footer-right').html(bottomRight);

        let center = '';
        $.each(data.CaseTrackingList, function (x, y) {

            center += ` <div class="society_content tongjiPop">
                         <div class="society_content_item" title="${y.time}" style="width: 160px">${y.time}</div>
                         <div class="society_content_item" title="${y.smallName}">${y.smallName}</div>
                         <div class="society_content_item" title="${y.sourceName}">${y.sourceName   }</div>
                         <div class="society_content_item" title="${y.user_name}">${y.user_name}</div>
                         <div class="society_content_item ${y.status=='结案' ? 'font-green':'' }"  title="${y.status}" style="display: flex">${y.status} 
                         <div class="society_content_btn" data-taskid = ${y.taskid}  data-status = ${y.status}><img src="${baseUrl}/public/biz/index/image/home_btn_icon_deep.svg"></div></div>
                       </div>`;
        });
        $('.tongjilist').html(center);

    },
    renderData2(data) {
        let acceptTop6 = '';
        for (let i = 0; i < data.list.length; i++) {
            let obj = data.list[i];
            var name='';
            if(data.list[i].name){
                name=data.list[i].name
            }else{
                name=data.list[i].three_grid_code
            }
            acceptTop6 += `<div class="echart-item echart-yellow">
                                    <div class="echart-item-rank"><i>${i + 1}</i></div>
                                    <div class="echart-item-name" title="${name}">${name}</div>

                                    <div class="echart-item-con acceptTop${i + 1}">
                                        <div class="echart-item-bar progressColorBar" title="${obj.name}"></div>
                                        <div class="echart-item-value">${obj.value}</div>
                                        <div class="echart-item-percent">(${obj.percent}%)</div>
                                    </div>
                                </div>`;
        }

        $('#acceptTop6').html(acceptTop6);

        for (let i = 0; i < data.list.length; i++) {
            let obj = data.list[i];
            let total = parseInt(data.list[0].value);
            let value = JSON.parse(obj.value);
            let percent = value / total * 100;
            progressBar('.acceptTop' + (i + 1), percent);
        }

    },
    renderData3(data){
        let midRight = '';
        let percent='';
        if(data.percent>0){
            percent='+'+data.percent
        }else{
            percent=data.percent;
        }
        midRight = `  <div class="warning-detail-width"><div class="society_title">${this.request_params.name} 案件接报量</div></div>
                    <div class="warning-detail-cont">
                        <div class="warning-detail-num">${data.reportNum}<span>件</span></div>
                        <div class="warning-detail-num-small">${percent}%
                        <img src="${baseUrl}/public/biz/warning/image/icon_monthly_orange.svg"> </div>
                    </div>
                    <div class="warning-detail-chart" id="warning-detail-chart"></div>
                    <div class="chart-num">${data.endPercent}%</div>
                    <div class="chart-legend">
                         <div class="chart-legend-name">已结案<span>${data.endNum}</span>件</div>
                         <div class="chart-legend-name font-blue">未结案<span>${data.notEndNum}</span>件</div>
                    </div>`;
        $('.warning-detail-right').html(midRight);
        var dataArr=[];
        dataArr.push(data.endNum/1);
        dataArr.push(data.notEndNum/1);
        let chart = echarts.init(document.getElementById("warning-detail-chart"));
        let option = {
            legend: {
                show: true,
                orient: 'vertical',
                top: 'middle',
                itemGap: 10,
                right: 0,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: 'rgba(255,255,255,0.70)',
                    fontSize: 18
                },
                data: ['已结案','未结案']
            },
            grid: {},
            series: [{
                color:['#fec66b','#30b5ff',],
                name: '',
                type: 'pie',
                radius: ['55%', '80%'],
                center: '50%',
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#061d2d',
                        borderWidth: 2
                    }
                },
                data: dataArr
            }
            ]
        };
        chart.setOption(option);
    },

    refreshData(){
        let _this = this;
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/casesRelated',
            post_data: {
                timeCond: _this.timeCond,
                time: _this.time,
                code: _this.code,
                type: _this.type,
                select: _this.select,
                // typeType:_this.typeType,
                isCitizen: _this.isCitizen,
            },
            fn: function (data) {
                _this.renderData1(data)
            }
        });

        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/warning/common/statis',
            post_data:{
                id:_this.id
            },
            fn: function (data) {
                _this.renderData3(data)
            }
        });


    },
    refreshData2() {
        let _this = this;
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/typeTop',
            post_data: {
                timeCond: _this.timeCond,
                time: _this.time,
                code: _this.code,
                type: _this.type,
                select: _this.select,
                typeType:_this.typeType,
                isCitizen: _this.isCitizen,
            },
            fn: function (data) {
                _this.renderData2(data)
            }
        });
    },

    hasread(index){
        let _this=this;
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/hasReadUpdate',
            post_data:{
                code:_this.code,
                time:_this.time,
            },
            fn: function () {
                _this.retimeList(index)
            }
        });
    },

};

//预警详情top6点击
let warning_detail_map = {
    init($dom,request_params_map){
            this.request_params_map = request_params_map;
            this.type = request_params_map.type;
            this.jicengMap = null;
            this.shehuiMap = null;
            this.$dom = $dom;
            this.renderCon();
            this.initEvent();
            console.log(this.request_params_map,this.request_params_map.isCitizen);
    },

    initEvent(){
        let _this = this;

        $('.warningPop_tab_item').click(function(){
           var index = $(this).index();
           $(this).addClass('ac').siblings().removeClass('ac');
            jichuGrid.clear();
           if(index == 0){ //社区网格
               jichuGrid.draw(_this.mapObj,_this.shehuiMap);
           }else{ //基层网格
               jichuGrid.draw(_this.mapObj,_this.jicengMap);
           }

            _this.drawMarker(); //画marker
        });

    },

    renderCon(){
        let tpl = `<div class="warningPop_tab">
        <div class="warningPop_tab_item ${this.request_params_map.girdCond == 1 ? 'ac' :''}" ><span class="tab_item_radio"></span>社区网格</div>
        <div class="warningPop_tab_item ${this.request_params_map.girdCond == 2 ? 'ac' :''}"><span class="tab_item_radio"></span>基层网格</div>
</div> 
        <div id="warningPopMap" class="map_wapper_mask"></div>
        `;
            this.$dom.html(tpl);

        let _this=this;
        _this.mapObj = new AMap.Map('warningPopMap', {
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
            $('#warningPopMap').removeClass('map_wapper_mask');
        });


        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/socialGird',
            post_data:{
                birdType:1 //社区网格
            },
            fn:function(data){
                _this.shehuiMap = data.communityList;
            }
        });
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/socialGird',
            post_data:{
                birdType:0
            },
            fn:function(data){
                _this.jicengMap = data.baseGirdList;
            }
        });

        setTimeout(function(){
            if(_this.request_params_map.girdCond == 1){ //社区网格
                jichuGrid.draw(_this.mapObj,_this.shehuiMap);
            }else{ //基层网格
                jichuGrid.draw(_this.mapObj,_this.jicengMap);

            }
        },1000);


        this.drawMarker();

    },

    drawMarker(){
        let _this = this;
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/mapGird',
            post_data:_this.request_params_map,
            fn:function(data){
                console.log(data);
                warningMarkerCaving.clear();
                warningMarkerCaving.draw(_this.mapObj,data.list);
            }
        });
    }
};


//弹窗地图扎点
let warningMarkerCaving = {

    marker_obj:{},
    draw:function(map,data){
        for(var i in data){
            var obj = data[i];
            var point = [obj.lng,obj.lat];

            let icon= `<img src="${baseUrl}/public/biz/index/image/icons/icon_house_normal.png"  width="30">`;
            this.marker_obj[obj.taskid] = new AMap.Marker({
                position:point,
                content:icon,
                offset:new AMap.Pixel(0,-25)
            });

            this.marker_obj[obj.taskid].setMap(map);
            this.clickEvent(this.marker_obj[obj.taskid],obj.taskid);

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

    clickEvent:function(marker_obj,taskid){
        if(window.p!=null){
            window.p.close();
        }
        marker_obj.on('click', function (e) {
            var p = pop.view({
                width: 980,
                height: 850,
                hideTitle: true,
                zdy_class: 'case_detail',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    ajax_jsonp_request({
                        url:common_module_conf.project_conf.show.host+'/api/common/cases/detail',
                        post_data:{
                            id:taskid
                        },
                        fn:function(data){
                            caseDetailPop(p.$ow_open_cont,data)
                        }
                    });

                }
            })
        })
    },
};


//地图扎点  预警点和消极网格员
let warningMarker = {
    marker_obj:{},
    draw:function(map,data,type,isGridpeople){
        for(var i in data){
            var obj = data[i];
            var point = [obj.lng,obj.lat];
            let icon='';
            if(isGridpeople){
                 icon= `<div class="shequWarning">${data[i].num}</div>
                       <img src="${baseUrl}/public/biz/index/image/icons/icon_house_normal.png"  width="30">`;
            }else{
                 icon= `<div class="shequWarning">${data[i].countNum}</div>
                       <img src="${baseUrl}/public/biz/index/image/icons/icon_house_normal.png"  width="30">`;
            }

            this.marker_obj[obj.id] = new AMap.Marker({
                position:point,
                content:icon,
                offset:new AMap.Pixel(0,-25),
                zIndex:120
            });
            type=obj.type;
            this.marker_obj[obj.id].setMap(map);
            if(data[i].countNum==0){
                this.marker_obj[obj.id].setMap(null);
            }
            this.clickEvent(this.marker_obj[obj.id],obj.code,type,isGridpeople);

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

    clickEvent:function(marker_obj,code,type,isGridpeople){
        if(window.p!=null){
            window.p.close();
        }

        if(isGridpeople){
            marker_obj.on('click', function () {
                gridRank.init(code)
            })
        }
        else {
            marker_obj.on('click', function () {
                warningPop.detail(type, code)
            })
        }
    },


};


//预警详情点击
let warningPop={
    detail:function (type,code) {
        var p = pop.view({
            width: 1780,
            height: 960,
            hideTitle: true,
            zdy_class: 'general_full',
            filterContainer: '.filter_dom',
            content: '',
            success: function () {
                ajax_jsonp_request({
                    url: common_module_conf.project_conf.show.host+'/api/analysis/warning/allDetails',
                    post_data:{
                        type:type,
                        code:code,
                        timeCond:1,
                    },
                    fn:function(data){
                        let request_params = {};
                        if(data.timeList.length==0){
                            ajax_jsonp_request({
                                url: common_module_conf.project_conf.show.host+'/api/analysis/warning/allDetails',
                                post_data:{
                                    type:type,
                                    code:code,
                                    timeCond:2,
                                },
                                fn:function(data2){
                                    request_params.type=type;
                                    request_params.code=code;
                                    request_params.timeCond=2;
                                    request_params.time=data2.timeList[0].day;
                                    request_params.name=data2.timeList[0].dataName;
                                    request_params.id=data2.timeList[0].id;
                                    request_params.length=data2.timeList.length;
                                    warning_detail.init(p.$ow_open_cont,request_params)
                                }
                            });
                        }else{
                            request_params.timeCond=1;
                            request_params.type=type;
                            request_params.code=code;
                            request_params.time=data.timeList[0].day;
                            request_params.name=data.timeList[0].dataName;
                            request_params.id=data.timeList[0].id;
                            request_params.length=data.timeList.length;
                            warning_detail.init(p.$ow_open_cont,request_params)
                        }
                    }
                });



            }
        })
    }
};

//消极网格员排名
let gridRank={
    init:function (code) {
        console.log(2222);
        let _this=this;
        window.p = pop.view({
            width: 1780,
            height: 960,
            hideTitle: true,
            zdy_class: 'general_full',
            filterContainer: '.filter_dom',
            content: '',
            success: function () {
                ajax_jsonp_request({
                    url:common_module_conf.project_conf.show.host+'/api/analysis/warning/negativeRanking',
                    post_data:{
                        code:code,
                    },
                    fn:function(data){
                        _this.popDetail(p.$ow_open_cont,data,code)
                    }
                });
            },
        });
    },
    popDetail:function ($dom,data,code) {
        let tpl='';

        tpl=`<div class='ad_title'>${code}社区消极网格员预警排名</div>
                 <div class='ad_cont common_list shequ-gridRank'>
                    <div class='common_list_head '>
                        <div class='common_list_list' >
                            <div class="common_list_item ">姓名</div>
                            <div class="common_list_item">当前预警数</div>
                            <div class="common_list_item ">总预警数</div>
                            <div class="common_list_item ">上月分数</div>
                            <div class="common_list_item ">历史平均分数</div>
                            <div class="gridpop-detail"></div>
                        </div> 
                    </div>
                    <div class='common_list_cont'>
                    </div>
                 </div>
                `;


        $dom.html(tpl);

        this.makeItem(data,$dom);


        $($dom).off('click').on('click','.gridpop-detail',function () {
            console.log(333);
            let id= $(this).data('id');
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    ajax_jsonp_request({
                        url:common_module_conf.project_conf.show.host+'/api/analysis/warning/negativeDetailsToHead',
                        post_data:{
                            code:id,
                        },
                        fn:function(data){
                            GridPop.init(p.$ow_open_cont,data,id)
                        }
                    });
                }
            });

        })

    },

    makeItem:function (data,$dom) {
        let mid='';
        $.each(data.list,function (i,n) {

            mid += ` <div class='common_list_list'>
                            <div class="common_list_item" title="${n.showName}">${n.showName}</div>
                            <div class="common_list_item" title="${n.num}">${n.num}</div>
                            <div class="common_list_item" title="${n.totalNum}">${n.totalNum}</div>
                            <div class="common_list_item" title="${n.lastMonthScore}">${n.lastMonthScore}</div>
                            <div class="common_list_item" title="${n.avgScore}">${n.avgScore}</div>
                            <div class="gridpop-detail" data-id="${n.name}"><img src="${baseUrl}/public/biz/index/image/home_btn_icon_deep.svg"></div> 
                        </div> `

        });
        $dom.find('.common_list_cont').html(mid);
    },


};

//消极网格员详情
let GridPop={
    init:function ($dom,data,code) {
        this.$dom = $dom;
        this.data = data;
        this.code = code;
        this.month = this.data.timeList[0].showTime;
        this.Name = this.data.timeList[0].data_name;
        this.time = this.data.timeList[0].time;
        this.transferTime = this.data.timeList[0].transferTime;
        this.id=this.data.timeList[0].id;
        this.index=0;
        this.renderCon();
        this.clickfn();

    },
    clickfn:function(){

        let _this=this;

        _this.hasread();
        _this.refreshData();
        _this.refreshData2();
//个人工作表现弹框
        this.$dom.on('click','.anjian-detail-img',function () {
            $('.grid-Person').show();
            ajax_jsonp_request({
                url:common_module_conf.project_conf.show.host+'/api/analysis/warning/personJobPerformance',
                post_data: {
                    code:_this.code,
                    time:_this.transferTime
                },
                fn:function(data){
                    _this.personDetail(data)
                }
            });
        });


//事件列表切换
        this.$dom.on('click','.timeScroll-item-con',function () {
            $('.timeScroll-item-con').removeClass('ac');
            $('.grid-Person').hide();
            $(this).addClass('ac');
            _this.index=$(this).parent('.timeScroll-item').index();
            _this.time=$(this).data('time');
            _this.transferTime=$(this).data('times');
            _this.id=$(this).data('id');
            _this.month=$(this).data('show');
            _this.hasread(_this.index);
            _this.refreshData();
            _this.refreshData2();
        });
//手动解除
        this.$dom.on('click','.warning-btn-left',function () {
            let status=$(this).data('status');
            if(status==1){
                _this.$dom.find('.warning-right-judgePops').show();
            }else{
                return false;
            }
            $('.judgePop-btn-left').click(function () {
                $(this).parents('.warning-right-judgePops').hide();
            });
            $('body').off('click').on('click','.judgePop-btn-right',function () {
                let index=$('.timeScroll-item-con.ac').parent().index();
                ajax_jsonp_request({
                    url: common_module_conf.project_conf.show.host+'/api/analysis/warning/negativeCaseUpdate',
                    post_data: {
                        id:_this.id,
                    },
                    fn: function () {
                        _this.refreshTimelist(index);
                        refresh_workbench.makeItem();
                    }
                });
                $(this).parents('.warning-right-judgePops').hide();
            })

        });

        this.$dom.on('click','.warning-btn-right',function ()  {
            $('.popBox').show();
            $('.popbox-del').click(function () {
                $(this).parent().hide();
            });
            $('.popbox-btn').click(function () {
                let content=$('.popbox-con').val();
                let index=$('.timeScroll-item-con.ac').parent().index();
                ajax_jsonp_request({
                    url: common_module_conf.project_conf.show.host+'/api/analysis/warning/negativeCaseUpdate',
                    post_data:{
                        id:_this.id,
                        text:content,
                    },
                    fn: function () {
                        _this.refreshTimelist(index);
                    }
                });
                $(this).parent().hide();
            });
        });

    },
    renderCon() {

         let tpl=`<div class="bigPop-head">
                       <div class="bigPop-head-left">
                            <div class="blueShadow-big-title" style="display:flex;">${this.Name} 巡查员  预警详情</div>
                            
                       </div>
                       <div class="bigPop-head-right"><div class="bigPop-head-right-value font-yellow">当前预警/历史预警:</div> </div>     
                   </div>
                   <div class="warning-detailPop-main">
                        <div class="warning-detailPop-time">
                            <img class="time-icon" src="${baseUrl}/public/biz/warning/image/icon_chart_date.svg" width="60">
                                <div class="warning-detailPop-timeBtn timeBtn-left" style="display: none">
                                    <i class="xb_icon arrow-circle-left-re"></i>                              
                                </div>
                                <div class="warning-detailPop-timeScroll">
                                    <div class="timeScroll-box"></div>
                                </div>
                            <div class="warning-detailPop-timeBtn timeBtn-right" style="display: none">
                                <i class="xb_icon arrow-circle-right-r"></i>    
                                <p>还有<span>7</span>条<br>正在预警</p>
                            </div>
                        </div>
                        <div class="gridPop_left">
                            <div class="gridPop_left_top">
                                <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                <div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                <div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                <div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                                <div class="gridPop_left_top_list"></div>    
                            </div>    
                            <div class="gridPop_left_bottom">
                                
                            </div>    
                        </div> 
                        <div class="gridPop_right">
                            
                        </div>   
                   </div>
                <div class="jiechu"></div>    
               
                <div class="popBox" style="display: none">
                    <div class="popbox-title">填写预警调查结果</div>
                    <textarea class="popbox-con"></textarea>
                    <div class="popbox-btn">保存</div>
                    <img src="${baseUrl}/public/biz/warning/image/warning_del.png" class="popbox-del">
                </div>
                <div class="warning-right-judgePops " style="display: none">
                    <div class="judgePop-title">手动解除</div>
                    <div class="judgePop-title-war">是否解除该预警？</div>
                    <div class="judgePop-btn">
                        <div class="judgePop-btn-left">取消</div>
                        <div class="judgePop-btn-right">解除预警</div>
                    </div>
                </div>
                <div class="grid-Person" style="display: none"></div>`;

        this.$dom.html(tpl);



    },

    mainCon(data) {
        let midLeft = '';
        let str=`巡查员 ${data.list[0].data_name}${data.list[0].targetTime}综合评分为<span class="font-yellow">${data.list[0].str1}</span>未达标,
低于该月警戒线<span class="font-yellow">${data.list[0].str2}</span>`;
        midLeft = `<div class="warning-detail-item">
                    <div class="warning-detail-title">监控目标：</div>
                    <div class="warning-detail-con">${data.list[0].targetTime}</div></div>
                         <div class="warning-detail-item">
                         <div class="warning-detail-title">预警时间：</div><div class="warning-detail-con">${data.list[0].showWarningTime}</div></div>
                         <div class="warning-detail-item"><div class="warning-detail-title">预警说明：</div>
                         <div class="warning-detail-con">${str}</div>
                         </div>
                  `;

        this.$dom.find('.gridPop_left_top_list').html(midLeft);

    },
    mainCon2(data){
        let midBottom='';
        midBottom=` 
            <div class="anjian-detail"> <div class="society_title">${this.Name} ${this.month} 实时得分/环比</div>
                                    <img class="anjian-detail-img"  src="${baseUrl}/public/biz/index/image/home_btn_icon_deep.svg">
                                </div>
                                <div class="left_bottom_cont"><div class="left_bottom_num">${data.numList.num}<span>分</span></div>
                                   <div class="left_bottom_present">${data.numList.percent}%
                                   <img style="width: 36px;" src="${baseUrl}/public/biz/warning/image/icon_monthly_orange.svg">
                                   </div>
                                </div>`;

        this.$dom.find('.gridPop_left_bottom').html(midBottom);
    },
    mainCon3(data){
        let total= data.numAndScoreList[0];
        let midRight = '';
        midRight = `
                  <div class="anjian-detail"> <div class="society_title">${this.Name} ${this.month} 工作表现</div></div>
                            <div class="society_cont"><div class="society_content font-blue font-weight">
                                  <div class="society_content_item">日期</div>
                                  <div class="society_content_item">上报量</div>
                                  <div class="society_content_item">自发自处</div>
                                  <div class="society_content_item">作废量</div>
                                  <div class="society_content_item">日均在线时长(小时)</div>
                              </div>
                              <div class="society_cont_cont grid_people_list">
                              </div>
                              <div class="society_bottom_cont font-yellow font-weight">
                                  <div class="society_content" style="border-bottom: none">
                                      <div class="society_content_item">总计</div>
                                      <div class="society_content_item">${total.sb_num}</div>
                                      <div class="society_content_item">${total.zfzc_num}</div>
                                      <div class="society_content_item">${total.zf_num}</div>
                                      <div class="society_content_item">${total.rjzxsc_num}</div>
                                  </div>
                                  <div class="society_content">
                                      <div class="society_content_item">得分</div>
                                      <div class="society_content_item">${total.sb_score}</div>
                                      <div class="society_content_item">${total.zfzc_score}</div>
                                      <div class="society_content_item">${total.zf_score}</div>
                                      <div class="society_content_item">${total.rjzxsc_score}</div>
                                  </div>
                                    </div></div>
              `;

        this.$dom.find('.gridPop_right').html(midRight);

        let mid='';
        $.each(data.list,function (x,y) {
             mid+=`<div class="society_content">
                      <div class="society_content_item">${y.time }</div>
                      <div class="society_content_item">${y.sb_num }</div>
                      <div class="society_content_item">${y.zfzc_num }</div>
                      <div class="society_content_item">${y.zf_num }</div>
                      <div class="society_content_item">${y.rjzxsc_num }(小时)</div>
                  </div>`
        });
        this.$dom.find('.society_cont_cont').html(mid);

    },

    refreshData() {
        let _this=this;
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/negativeDetailsToInstructions',
            post_data: {
                code:_this.code,
                time:_this.time
            },
            fn:function(data){
                _this.mainCon(data)

            }
        });
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/liveScores',
            post_data: {
                code:_this.code,
                time:_this.time
            },
            fn:function(data){
                _this.mainCon2(data)

            }
        });


    },
    refreshData2(){
        let _this=this;
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/jobPerformance',
            post_data: {
                code:_this.code,
                time:_this.transferTime
            },
            fn:function(data){
                _this.mainCon3(data)
            }
        });
    },

    refreshTimelist(){
        let _this=this;

        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/negativeDetailsToHead',
            post_data:{
                code:this.code,
            },
            fn:function(data){
                let timeList='',read='',imgsrc='';
                $.each(data.timeList,function (x,y) {
                    if(y.has_read==0){
                        read='<div class="border_blue"></div>未查看';
                    }else{
                        read='';

                    }
                    if(y.status == 1){
                        imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_red.png`
                    }
                    else{
                        imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_dark.png`
                    }
                    timeList += `<div class="timeScroll-item">
                          <div class="timeScroll-item-con" data-time="${y.time}" data-times="${y.transferTime}" data-id="${y.id}" data-text="${y.result_txt}"
                           data-status="${y.status}" data-jiechu="${y.showRelieveTime}" data-show="${y.showTime}" ><img src="${imgsrc}">${y.showTime}</div>
                          <span class="timeScroll-item-status"> ${read}</span>
                      </div>`;
                });
                $('.timeScroll-box').html(timeList);
                $('.timeScroll-item').eq(_this.index).find('.timeScroll-item-con').addClass('ac');
                let status= _this.$dom.find('.timeScroll-item-con.ac').data('status');
                let text=_this.$dom.find('.timeScroll-item-con.ac').data('text');
                let times=_this.$dom.find('.timeScroll-item-con.ac').data('jiechu');
                let fenshu=data.numList.currentNum.value+'/'+ data.numList.totalNum.value;
                _this.$dom.find('.bigPop-head-right-value').html('当前预警/历史预警：'+fenshu);
                _this.refreshAnniu(status,text,times)
            }
        });
    },
    refreshAnniu(status,text,times){
        let jiechu=`<div class="warning-pop-btn">
                        <div class="warning-btn-left" data-status="${status}"><i class="xb_icon check-circle-re"></i>手动解除</div>
                        <div class="warning-btn-right"><i class="xb_icon check-circle-re"></i>填写预警调查结果</div>
                </div>`;
        $('.jiechu').html(jiechu);


        if(text){
            $('.warning-btn-right').html('调查结果:'+text);
            $('.warning-btn-right').css({'background':'none','text-aline':'left','line-height':'25px','word-wrap': 'break-word','text-overflow':'ellipsis'});
        }else{
            $('.warning-btn-right').html('<i class="xb_icon check-circle-re"></i>'+'填写预警调查结果');
            $('.warning-btn-left').css('background','#1476d7');
        }

        if(status==1){
            $('.warning-btn-left').html('<i class="xb_icon check-circle-re"></i>'+'手动解除');
            $('.warning-btn-left').css('background','#1476d7');
        }else if(status==2){
            $('.warning-btn-left').html('已自动解除'+'<br>'+times);
            $('.warning-btn-left').css({'background':'#033152','line-height':'25px'});
        }else if(status==3){
            $('.warning-btn-left').html('已手动解除'+'<br>'+times);
            $('.warning-btn-left').css({'background':'#033152','line-height':'25px'});
        }

    },
    hasread(){
        let _this=this;
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/allUpdate',
            post_data: {
                id: _this.id,
            },
            fn: function () {
                _this.refreshTimelist();
            }
        })
    },

//个人表现弹窗
    personDetail(data){
        let mid='';
        let Data= data.list[0];

        let sb_huanbi='',zfzc_huanbi='',zf_huanbi='',zjzxsc_huanbi='',total_hunabi='';

        if(Data.sb_seq>=0){
            sb_huanbi= `<div class="font-green" style="display: flex">+${Data.sb_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_up.svg"> </div>`
        }else {
            sb_huanbi= `<div class="font-orange" style="display: flex">${Data.sb_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_orangedown.png"> </div>`
        }
        if(Data.zfzc_seq>=0){
            zfzc_huanbi= `<div class="font-green" style="display: flex">+${Data.zfzc_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_up.svg"> </div>`
        }else {
            zfzc_huanbi= `<div class="font-orange" style="display: flex">${Data.zfzc_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_orangedown.png"> </div>`
        }
        if(Data.zf_seq>=0){
            zf_huanbi= `<div class="font-green" style="display: flex">+${Data.zf_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_up.svg"> </div>`
        }else {
            zf_huanbi= `<div class="font-orange" style="display: flex">${Data.zf_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_orangedown.png"> </div>`
        }
        if(Data.rjzxsc_seq>=0){
            zjzxsc_huanbi= `<div class="font-green" style="display: flex">+${Data.rjzxsc_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_up.svg"> </div>`
        }else {
            zjzxsc_huanbi= `<div class="font-orange" style="display: flex">${Data.rjzxsc_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_orangedown.png"> </div>`
        }
        if(Data.total_seq>=0){
            total_hunabi= `<div  style="display: flex">+${Data.total_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_up.svg"> </div>`
        }else {
            total_hunabi= `<div  style="display: flex">${Data.total_seq}%<img style="height: 24px" src="${baseUrl}/public/biz/warning/image/icon_monthly_orangedown.png"> </div>`
        }

        mid=`<div class="grid-Person-title">${this.Name} ${this.month} 工作表现</div><div class="grid-Person-close">×</div>
                  <div class="society_cont grid-Person-cont">
                  <div class="society_content font-blue font-weight">
                      <div class="society_content_item">指标</div>
                      <div class="society_content_item">数量</div>
                      <div class="society_content_item">得分</div>
                      <div class="society_content_item">环比</div>
                  </div>
                  <div class="society_cont_cont grid_people_list">
                      <div class="society_content">
                          <div class="society_content_item">上报</div>
                          <div class="society_content_item">${Data.sb_num }</div>
                          <div class="society_content_item">${Data.zfzc_num }</div>
                          <div class="society_content_item">${sb_huanbi}</div>
                      </div>
                      <div class="society_content">
                          <div class="society_content_item">自发自处</div>
                          <div class="society_content_item">${Data.zfzc_num }</div>
                          <div class="society_content_item">${Data.zfzc_score}</div>
                          <div class="society_content_item">${zfzc_huanbi}</div>
                      </div>
                      <div class="society_content">
                          <div class="society_content_item">作废</div>
                          <div class="society_content_item">${Data.zf_num }</div>
                          <div class="society_content_item">${Data.zf_score }</div>
                          <div class="society_content_item">${zf_huanbi }</div>
                      </div>
                      <div class="society_content">
                          <div class="society_content_item">日均在线时长</div>
                          <div class="society_content_item">${Data.rjzxsc_num}</div>
                          <div class="society_content_item">${Data.total_score }</div>
                          <div class="society_content_item">${zjzxsc_huanbi }</div>
                      </div>
                      <div class="society_content font-yellow font-weight">
                          <div class="society_content_item">总分</div>
                          <div class="society_content_item">${Data.sb_num }</div>
                          <div class="society_content_item">${Data.total_score }</div>
                          <div class="society_content_item">${total_hunabi }</div>
                      </div>
                  </div>
              </div>`;

        this.$dom.find('.grid-Person').html(mid);

        $('.grid-Person-close').click(function () {
            $('.grid-Person').hide();
        })

    },
};

//网络预警异常案件预警弹窗
let warningNetWorkPopYc={
    init:function($dom){
        this.$dom = $dom;
        this.renderCond();
        this.renderDataCs(1);
        this.renderDataBe(1);
        this.renderDataRe(1);
    },
    renderCond:function () {
        let tpl = `<div class="net-pop-main anjian-main-3">
                    <div class="shiduan-main-3-left">
                    <div class="shiduan-card-title card-title"><h2 class="card-title-big-2 card-title-big">超时案件预警统计</h2><div class="net-yichang-rank-tab-2 rank-tab-2 rank-tab"><a data-type="0" class="rank-tab-item rank-tab-item-1 main-left main-left-1 ac">社区</a> <a data-type="1" class="rank-tab-item rank-tab-item-2 main-left main-left-2">类型</a></div></div>
                    <div class="shiduan-main-3-list-title anjian-main-3-list-title">
                    <span>社区名称</span><span>当前预警数</span><span>总预警数</span>
</div>
<div class="shiduan-listLine listLine"></div>
<div class="shiduan-main-3-list-box anjian-main-3-list-box  networkPop-1 networkPop">

</div>
</div>
<div class="net-pop-main-mid shiduan-main-3-left">
                    <div class="shiduan-card-title card-title"><h2 class="card-title-big-2 card-title-big">即将超时案件预警统计</h2><div class="net-yichang-rank-tab-2 rank-tab-2 rank-tab"><a data-type="0" class="rank-tab-item rank-tab-item-1 main-min main-min-1 ac">社区</a> <a data-type="1" class="rank-tab-item rank-tab-item-2 main-min main-min-2 ">类型</a></div></div>
                    <div class="shiduan-main-3-list-title anjian-main-3-list-title">
                    <span>社区名称</span><span>当前预警数</span><span>总预警数</span>
</div>
<div class="shiduan-listLine listLine"></div>
<div class="shiduan-main-3-list-box anjian-main-3-list-box  networkPop-2 networkPop">

</div>
</div>
                    <div class="shiduan-main-3-right">
                    <div class="shiduan-card-title card-title"><h2 class="card-title-big-2 card-title-big">返工案件预警统计</h2><div class="net-yichang-rank-tab-2 rank-tab-2 rank-tab"><a data-type="0" class="rank-tab-item rank-tab-item-1 main-right main-right-1 ac">社区</a> <a data-type="1" class="rank-tab-item rank-tab-item-2 main-right main-right-2 ">类型</a></div></div>
                    <div class="shiduan-main-3-list-title anjian-main-3-list-title">
                    <span>社区名称</span><span>当前预警数</span><span>总预警数</span>
</div>
<div class="shiduan-listLine listLine"></div>
<div class="shiduan-main-3-list-box anjian-main-3-list-box networkPop-3 networkPop">

</div>
</div>
</div>`;
        this.$dom.html(tpl);
        let that = this;
        this.$dom.find('.main-left').click(function () {
            $('.main-left').removeClass('ac');
            $(this).addClass('ac');
        });
        this.$dom.find('.main-min').click(function () {
            $('.main-min').removeClass('ac');
            $(this).addClass('ac');
        });
        this.$dom.find('.main-right').click(function () {
            $('.main-right').removeClass('ac');
            $(this).addClass('ac');
        });
        this.$dom.find('.main-left-1').click(function () {
            that.renderDataCs(1)
        });
        this.$dom.find('.main-left-2').click(function () {
            that.renderDataCs(2)
        });
        this.$dom.find('.main-min-1').click(function () {
            that.renderDataBe(1)
        });
        this.$dom.find('.main-min-2').click(function () {
            that.renderDataBe(2)
        });
        this.$dom.find('.main-right-1').click(function () {
            that.renderDataRe(1)
        });
        this.$dom.find('.main-right-2').click(function () {
            that.renderDataRe(2)
        });

    },
    //超時案件
    renderDataCs:function (switchCond) {
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/timeoutCases',
            post_data:{
                switchCond:switchCond,
                caseType: 2
            },
            fn:function(data){
                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="shimin-shiduan-list anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="shiduan-list-2-style anjian-main-3-list-2">${data.list[i].currentNum}</div>
    <div class="shiduan-list-3-style">${data.list[i].totalNum}</div>
    <div class="shiminshiduan-Pop anjian-main-3-list-4" style="top: 14px"><span class="anjian-card-full-btn card-full-btn netYjPop" data-name = '${data.list[i].name}'><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.networkPop-1').html(tpl)
                $('.netYjPop').click(function () {
                    var community_name = $(this).data('name');
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
                                community:community_name,
                                offset:0,
                            };
                            ajax_jsonp_request({
                                url:common_module_conf.project_conf.show.host+'/api/analysis/warning/list',
                                post_data:request_params,
                                fn:function(data){
                                    workdetialpop.init(p.$ow_open_cont,data,request_params)
                                }
                            })
                        }
                    });
                })
            }
        });
    },
    //即將超時
    renderDataBe:function (switchCond) {
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/timeoutCases',
            post_data:{
                switchCond:switchCond,
                caseType: 1
            },
            fn:function(data){
                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="shimin-shiduan-list anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="shiduan-list-2-style anjian-main-3-list-2">${data.list[i].currentNum}</div>
    <div class="shiduan-list-3-style">${data.list[i].totalNum}</div>
    <div class="shiminshiduan-Pop anjian-main-3-list-4" style="top: 14px"><span class="anjian-card-full-btn card-full-btn"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.networkPop-2').html(tpl)


            }
        })
    },
    //返工案件预警统计
    renderDataRe:function (switchCond) {
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/timeoutCases',
            post_data:{
                switchCond:switchCond,
                caseType: 3
            },
            fn:function(data){
                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="shimin-shiduan-list anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="shiduan-list-2-style anjian-main-3-list-2">${data.list[i].currentNum}</div>
    <div class="shiduan-list-3-style">${data.list[i].totalNum}</div>
    <div class="shiminshiduan-Pop anjian-main-3-list-4" style="top: 14px"><span class="anjian-card-full-btn card-full-btn"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.networkPop-3').html(tpl)


            }
        })
    }
};

//阈值说明
let quzhiDetail= {
    init:function ($dom,type) {
        this.$dom = $dom;
        this.type = type;
        this.content();
        this.clickfn();
    },
    clickfn:function(){
        let xx=this.type;

        this.$dom.find('.quzhi-detail .rank-tab-item').click(function () {
            $('.quzhi-detail .rank-tab-item').removeClass('ac');
            $(this).addClass('ac');
            $('.quzhi-bottom-list').hide();
            $('.quzhi-bottom').hide();
            $('.quzhi-bottom').removeClass('select');
            let type=$(this).data('type');
            let id=$('.quzhi-top-list.ac-boxshadow').data('id');
            if(type==1){
                $('.quzhi-bottom').eq(0).show();
                $('.quzhi-bottom').eq(0).addClass('select');
                if(id==0){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(0).show();
                }else if(id==1){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(1).show();
                }else{
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(2).show();
                }
            }else{
                $('.quzhi-bottom').eq(1).show();
                $('.quzhi-bottom').eq(1).addClass('select');
                if(id==0){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(0).show();
                }else if(id==1){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(1).show();
                }else{
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(2).show();
                }
            }

        });

        this.$dom.find('.quzhi-top-list').click(function () {
            $('.quzhi-top-list').removeClass('ac-boxshadow');
            $(this).addClass('ac-boxshadow');
            $('.quzhi-bottom-list').hide();
            var index=$(this).data('id');
            if(index==0){
                $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(0).show();
            }else if(index==1){
                $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(1).show();
            }else{
                $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(2).show();
            }
        });

        this.$dom.find('.quzhi-popDetail').click(function () {
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    warningNetWorkYuZhiPop.init(p.$ow_open_cont,xx)
                }
            })
        });
    },
    content:function () {
        let yuZtitle = '';
        let yuZcontent = '';
        let trpes = this.type;
        if(trpes == 1 || trpes == 6){
            yuZtitle = '高发社区网格预警模型';
            yuZcontent = '社区';
        }else if(trpes == 2 || trpes == 7){
            yuZtitle = '高发基层网格预警模型';
            yuZcontent = '基层';
        }else if(trpes == 3 || trpes == 8){
            yuZtitle = '高发案件大类预警模型';
            yuZcontent = '案件大类'
        }else if(trpes == 4 || trpes == 9){
            yuZtitle = '高发案件小类预警模型';
            yuZcontent = '案件小类'
        }else if(trpes == 5 || trpes == 10){
            yuZtitle = '案件高发时段预警模型';
            yuZcontent = '时段'
        }
        let tpl=`<div class="bigPop-head">
                       <div class="bigPop-head-left">
                            <div class="blueShadow-big-title">${yuZtitle}</div>
                       </div>
                       <div class="quzhi-detail rank-tab">
                            <a data-type="1" class="rank-tab-item-yz rank-tab-item ac">数量</span></a>
                            <a data-type="2" class="rank-tab-item-yz rank-tab-item">增幅</span></a> 
                       </div>
                       <div class="quzhi-popDetail">阈值设置</div>  
                    </div>
                    <div class="quzhiPop-con">
                        <div class="quzhi-top">
                           
                            <div class="quzhi-top-list ac-boxshadow" data-id="0">
                                <div class="quzhi-list-title" style="color:#FACD89">数据源选取 <img src="${baseUrl}/public/biz/warning/image/warn_sel_one.png" class="numBgImg"></div>
                                <div class="quzhi-list-cont">针对每个${yuZcontent}，选取历史数据作为模型构建的总数据集合</div>
                                <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                            </div>
                            <img src="${baseUrl}/public/biz/warning/image/warn_icon_arrowr.png" class="right_log">
                            <div class="quzhi-top-list" data-id="1">
                                <div class="quzhi-list-title">最优分割 <img src="${baseUrl}/public/biz/warning/image/warn_sel_two.png" class="numBgImg"></div>
                                <div class="quzhi-list-cont">运用大数据聚类算法，将历史数据划分为不同等级，体量相似的数据聚在一起</div>
                                <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                            </div>
                            <img src="${baseUrl}/public/biz/warning/image/warn_icon_arrowr.png" class="right_log">
                            <div class="quzhi-top-list" data-id="2">
                                <div class="quzhi-list-title">阈值确定 <img src="${baseUrl}/public/biz/warning/image/warn_sel_three.png" class="numBgImg"></div>
                                <div class="quzhi-list-cont">体量最大群落下限为初步阈值，在此基础上，结合经验微调阈值到最优</div>
                                <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                            </div>
                        </div>
                        <div class="quzhi-bottom select">
                            <div class="quzhi-bottom-list">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">XX${yuZcontent}历史案件量选取</div><div class="quzhi-bottom-day">(日案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont">
                                    <div class="quzhi-bottom-img">
                                        <img src="${baseUrl}/public/biz/warning/image/warn_box_fileone.png">
                                        <div class="quzhi-bottom-img-name">前一月案件</div>
                                    </div>
                                    <div class="quzhi-bottom-img">
                                        <img src="${baseUrl}/public/biz/warning/image/warn_box_filetwo.png">
                                        <div class="quzhi-bottom-img-name">近半年案件</div>
                                    </div>
                                    <div class="quzhi-bottom-img">
                                        <img src="${baseUrl}/public/biz/warning/image/warn_box_filefore.png">
                                        <div class="quzhi-bottom-img-name">全部历史案件</div>
                                    </div>
                                </div>
                            </div>
                            <div class="quzhi-bottom-list" style="display: none">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">分割成若干数据群落</div><div class="quzhi-bottom-day">(日案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont"><div class="quzhi-bottom-cont"><img src="${baseUrl}/public/biz/warning/image/warn_sandian_def.png"></div></div>
                            </div>
                            <div class="quzhi-bottom-list" style="display: none">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">找到最佳预警阈值</div><div class="quzhi-bottom-day">(日案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont"><div class="quzhi-bottom-cont"><img src="${baseUrl}/public/biz/warning/image/warn_sandian_sel.png"></div></div>
                            </div>
                        </div>
                        <div class="quzhi-bottom" style="display: none">
                           <div class="quzhi-bottom-list">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">XX社区历史案件量选取</div><div class="quzhi-bottom-day">(自然周案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont">
                                    <div class="quzhi-bottom-img">
                                        <img src="${baseUrl}/public/biz/warning/image/warn_box_filetwo.png">
                                        <div class="quzhi-bottom-img-name">近半年案件</div>
                                    </div>
                                    <div class="quzhi-bottom-img">
                                        <img src="${baseUrl}/public/biz/warning/image/warn_box_filefore.png">
                                        <div class="quzhi-bottom-img-name">全部历史案件</div>
                                    </div>
                                </div>
                            </div>
                            <div class="quzhi-bottom-list">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">分割成若干数据群落</div><div class="quzhi-bottom-day">(自然周案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont"><div class="quzhi-bottom-cont"><img src="${baseUrl}/public/biz/warning/image/warn_sandian_def.png"></div></div>
                            </div>
                            <div class="quzhi-bottom-list">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">找到最佳预警阈值</div><div class="quzhi-bottom-day">(自然周案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont"><div class="quzhi-bottom-cont"><img src="${baseUrl}/public/biz/warning/image/warn_sandian_sel.png"></div></div>
                            </div>
                        </div>
                    </div>
`;

        this.$dom.html(tpl);
    },


};



//预警阈值弹窗
let warningNetWorkYuZhiPop={
    init:function($dom,type){
        this.$dom = $dom;
        this.type = type;
        this.tlParams = {
            type:type,
            month:''
        };
        this.DateMonth();
        this.tlValueAjax(this.tlParams);
        this.renderCond(this.type);
        // this.renderData();
        this.clickfn(this.type);
        this.DateMonth();
    },
    //给month赋值为当前月份
    DateMonth:function(){
        let date = new  Date();
        let dateMonth = date.getMonth() + 1;
        var year = date.getFullYear();
        let dateMonthAj = '';
        if(dateMonth < 10){
            dateMonthAj = '0' + dateMonth
        }else {
            dateMonthAj = dateMonth
        }
        this.tlParams.month = `${year}-${dateMonthAj}`;
    },
    clickfn:function(typeC){
        // this.$dom.find('.tlValue-main-item').click(function () {
        let that = this;
        this.$dom.on('click','.tlValueItemClick',function () {
            let vlId = ($(this).data('id'));
            let xx={
                type:typeC,
                id:vlId,
                month:that.tlParams.month
            };
            var p = pop.view({
                width: 1780,
                height: 960,
                hideTitle: true,
                zdy_class: 'general_full',
                filterContainer: '.filter_dom',
                content: '',
                success: function () {
                    quzhiCommunity.init(p.$ow_open_cont,xx)
                },
                closefn:function () {
                    let xxx={
                        month:'',
                        type:typeC,
                    };
                    warningNetWorkYuZhiPop.tlValueAjax(xxx);
                }
            })
        })
        // })
    },
    renderCond:function (typeC) {
        let tlValue = '';
        if(this.type == 1 || this.type == 6){
            tlValue = '社区'
        }else if(this.type == 2 || this.type == 7){
            tlValue = '基层'
        }else if(this.type == 3 || this.type == 8){
            tlValue = '大类'
        }else if(this.type == 4 || this.type == 9){
            tlValue = '小类'
        }else if(this.type == 5 || this.type == 10){
            tlValue = '时段'
        }
        //时间函数，获取当前时间
        let date = new  Date();
        let dateMonth = date.getMonth() + 1;
        var year = date.getFullYear();
        let tpl = `
        <div class="tlValue-warp">
        <div class="bigPop-head">
        <div class="bigPop-head-left">
        <div class="blueShadow-big-title">各${tlValue}预警阈值 - ${year}年<span class="tlValue-monthNum">${dateMonth}月</span>
        </div>
        </div>
        <div class="bigPop-head-right">
        <div class="filtrate-select"><div class="filtrate-select-input">                      
        <span class="icon_arrow icon_arrow_down"></span>
        </div></div>
</div>
        <div class="timeScreen">
        <div class="zhengSanjiao"></div>
        <img src="${baseUrl}/public/biz/warning/image/warning_tlvalueclose.png" class="tlvalue_close">
        <div class="timeScreen-title">${year}</div>
        <div class="timeScreen-month-box quzhi-month-box">
        <div class="timeScreen-month" data-month="${year}-01">1月</div><div class="timeScreen-month" data-month="${year}-02">2月</div>
        <div class="timeScreen-month" data-month="${year}-03">3月</div><div class="timeScreen-month" data-month="${year}-04">4月</div>
        <div class="timeScreen-month" data-month="${year}-05">5月</div><div class="timeScreen-month" data-month="${year}-06">6月</div>
        <div class="timeScreen-month" data-month="${year}-07">7月</div><div class="timeScreen-month" data-month="${year}-08">8月</div>
        <div class="timeScreen-month " data-month="${year}-09">9月</div><div class="timeScreen-month" data-month="${year}-10">10月</div>
        <div class="timeScreen-month" data-month="${year}-11">11月</div><div class="timeScreen-month" data-month="${year}-12">12月</div>
        </div>
</div>
</div>
        <div class="tlValue-main">
        <div class="tlValue-main-item-box">
       

</div>
</div>
        `;
        let that = this;
        this.$dom.html(tpl);
        //给日期框本月添加选中效果
        let monthAddClass = this.$dom.find('.timeScreen-month');
        for(let i = 0;i < monthAddClass.length;i ++){
            if(monthAddClass.eq(i).text() == dateMonth + '月'){
                monthAddClass.eq(i).addClass('timeBgcolor')
            }
        }
        this.$dom.find('.tlvalue_close').click(function () {
            $('.timeScreen').hide();
        });
        this.$dom.find('.filtrate-select').click(function () {
            $('.timeScreen').toggle();
        });
        this.$dom.find('.timeScreen-month').click(function () {
            $('.timeScreen-month').removeClass('timeBgcolor');
            $(this).addClass('timeBgcolor');

            that.tlParams.month = $(this).data('month');

            $('.tlValue-monthNum').text($(this).text());

            let clickAlParams = {
                type:typeC,
                month:$(this).data('month')
            };

            warningNetWorkYuZhiPop.tlValueAjax(clickAlParams)
        })
    },
    tlValueAjax:function (ajaxFn) {
        //显示除时段外的内容
        let that = this;
        if(that.type == 1 || that.type == 2 || that.type == 3 || that.type == 4 || that.type == 6 || that.type == 7 || that.type == 8 || that.type == 9){
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host+'/api/analysis/threshold/warningThreshold',
                post_data:ajaxFn,
                fn:function(data){
                    let tpl = '';
                    for(let i = 0;i<data.list.length;i++){
                        tpl += `
        <div class="tlValueItemClick tlValue-main-item" data-id="${data.list[i].id}">
        <div class="tlValue-item-title">${data.list[i].name}</div>
        <div class="tlValue-item-content">
        <div class="tlValue-item-content-left">
        <div class="tlVaule-item-content-left-titile">数量阈值</div>
        <div class="tlVaule-item-content-left-num">${data.list[i].num}</div>
</div>
        <div class="tlValue-item-content-right">
        <div class="tlVaule-item-content-right-titile">增幅阈值</div>
        <div class="tlVaule-item-content-right-num">${data.list[i].growthNum}%</div>
</div>
</div>
</div> 
`
                    }

                    $('.tlValue-main-item-box').html(tpl)
                }
            });
        //    显示时段的内容
        }else if(that.type == 5 || that.type == 10){
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host+'/api/analysis/threshold/warningThreshold',
                post_data:ajaxFn,
                fn:function(data){
                    let tpl = '';
                    for(let i = 0;i<data.list.length;i++){
                        tpl += `
        <div class="tlValueItemClick tlValueSd-item" data-id="${data.list[i].id}">
       <div class="tlValueSd-item-title">${data.list[i].name}</div>
        <div class="tlValueSd-item-num">${data.list[i].num}</div>
</div>

`
                    }

                    $('.tlValue-main-item-box').html(tpl);
                }
            });
        }

    }

};
//两个时段

//阈值设置
let quzhiCommunity={
    init:function ($dom,request_params) {
        this.$dom=$dom;
        this.param={
            type:request_params.type,
            code:request_params.id,
            month:request_params.month,
            moduleType:3,
            switchingCond:1,
        };
        this.paramChart={
            type:request_params.type,
            code:request_params.id,
            month:request_params.month,
        };
        this.month=request_params.month;
        this.year = '';
        this.yuzhi='';
        this.yuzhi2='';
        this.id='';
        this.shequName = '';
        this.tab=1;
        this.content();
        this.clickfn();
    },
    clickfn:function(){
        let _this=this;

        //时间函数，获取当前时间
        let date = new Date();
        let mon=date.getMonth() + 1;
        this.year = date.getFullYear();//获取当前年

        if(mon<10){
            mon='0'+mon;
        }else{
            mon=mon;
        }
        _this.refresh(this.param,this.paramChart);

        let month =date.getFullYear()+'-'+ mon ;
        let month2=$('.timeScreen-month.timeBgcolor').data('month');
//改变地区
        $('.quzhi-screen-shequ').click(function () {
            $('.quzhi-shequ-list').toggle();
            $('body').off('click').on('click','.shequ-list-item',function () {
                $(this).parent('.quzhi-shequ-list').hide();
                let code=$(this).data('id');
                let html=$(this).html()+'预警模型';
                $('.quzhi-sheQu').html(html);
                _this.param.code=code;
                _this.paramChart.code=code;
                _this.refresh(_this.param,_this.paramChart);
            });
        });

//改变月份
        this.$dom.find('.quzhi-screen-month').click(function () {
            $('.quzhi-month-list').toggle();
        });
        this.$dom.find('.tlvalue_close').click(function () {
            $(this).parent().hide()
        });
        this.$dom.find('.timeScreen-month').click(function () {
            $('.timeScreen-month').removeClass('timeBgcolor');
            $(this).addClass('timeBgcolor');
            month=$(this).data('month');
            _this.yuzhi='';
            _this.param.month=month;
            _this.paramChart.month=month;
            $(this).parents('.quzhi-month-list').hide();
            let showDate =month.replace(/-/g, '年');
            let year = showDate.substring(0,5);
            let mon = showDate.substring(5,7);
            if(mon<10){
                mon=mon.slice(1)+'月'
            }else {
                mon=mon+'月'
            }
            showDate=year+mon;
            $(this).parents('.bigPop-head-left').find('.quzhi-month').html(showDate);
            _this.refresh(_this.param,_this.paramChart);
        });


//日 周切换

        this.$dom.find('.rank-tab-item').click(function () {
            $(this).siblings().removeClass('ac');
            $(this).addClass('ac');
            let switchingCond = $(this).data('type');
            _this.yuzhi='';
            _this.param.switchingCond=switchingCond;
            _this.tab=switchingCond;
            _this.refresh(_this.param,_this.paramChart,switchingCond);
        });

        this.$dom.off('click').on('click','.quzhiPop-right-bottom-cont',function () {
            _this.yuzhi=$(this).val();
        });
        this.$dom.off('.click').on('click',function (e) {
            if(month==month2){
                let exclude = _this.$dom.find('.tip_box_right');
                _this.yuzhi2=$('.quzhiPop-right-bottom-cont').val();
                if(_this.yuzhi2!=_this.yuzhi&&_this.yuzhi!=''&&!exclude.is(e.target) && exclude.has(e.target).length === 0){
                    $('.tip_box').show();
                }
            }else{
                $('.tip_box').hide();
            }
            if($('.elect-loading').is(':visible')){
                $('.tip_box').hide();
            }
        });

        this.$dom.find('.tip_box_right').click(function(){
            _this.showLoading();
        });
        this.$dom.find('.tip_box_left').off('click').click(function(e){
            _this.$dom.find('.tip_box').hide();
            _this.$dom.find('.quzhiPop-right-bottom-cont').val(_this.yuzhi)
        });

    },

    timer(status,fn) {
        var hour, minute, second;//时 分 秒
        hour = minute = second = 0;//初始化
        var millisecond = 0;//毫秒
        var that = this;

        var yujing_num =  that.$dom.find('.quzhiPop-right-bottom-cont').val();
        function start()//开始
        {
            that.loading_percent = 0;
            that.loading_ok = false;
            that.loading_ok_fn = null;
            that.timer_id = setInterval(time,500);
        }

        function time()//计时
        {
            millisecond = millisecond + 50;
            if (millisecond >= 1000) {
                millisecond = 0;
                second = second + 1;
            }
            if (second >= 60) {
                second = 0;
                minute = minute + 1;
            }
            if (minute >= 60) {
                minute = 0;
                hour = hour + 1;
            }

            var minutestr = minute < 10 ? '0' + minute : minute;
            var secondstr = second < 10 ? '0' + second : second;
            var millisecondstr  = millisecond;
            if (millisecond < 10) {
                millisecondstr = '00' + millisecond;
            } else if (millisecond < 100) {
                millisecondstr  = '0' + millisecond;
            }
            that.$dom.find('.elect-loading .time_val').text(minutestr + ':' + secondstr + '.' + millisecondstr);
            that.loading_percent = that.loading_percent + parseInt(Math.random() * 3,10);

            var monthArr = [];
            that.$dom.find('.timeScreen-month').each(function(){
                monthArr.push($(this).data('month'))
            });



            that.$dom.find('.elect-loading-percent').text(that.loading_percent+'%');
            var data_i = parseInt(monthArr.length * Math.random() * 3);
            if(data_i >= monthArr.length){
                data_i =  monthArr.length - 1;
            }
            that.$dom.find('.count-data').text(monthArr[data_i]);


        }


        ajax_jsonp_request({
            url:common_module_conf.project_conf.yujing.host+'/api/warning/common/recalculate',
            post_data:{
                id:that.id,
                threshold:yujing_num,
            },
            fn: function () {
                clearInterval(that.timer_id);
                that.refresh(that.param,that.paramChart);
                that.yuzhi='';
                that.yuzhi2='';
                that.$dom.find('.elect-loading').hide();
            }
        });

        function stop()//暂停
        {
            that.loading_ok = true;
            that.loading_ok_fn = fn;
        }

        if (status) {
            start();
        } else {
            stop();
        }
    },
    showLoading(){
        this.$dom.find('.tip_box').hide();
        this.$dom.find('.elect-loading').show();
        this.timer(1);
    },

    content:function () {
        let date2 = new Date();
        this.year = date2.getFullYear();//获取当前年
        let date = this.month.replace(/-/g, '年');
        let year = date.substring(0,5);
        let mon = date.substring(5,7);
        let dateMonth=mon/1;
        if(mon<10){
            mon=mon.slice(1)+'月'
        }else {
            mon=mon+'月'
        }
        let showDate=year+mon;

        let tpl=`<div class="bigPop-head" >
                       <div class="bigPop-head-left" style="display:flex;">
                            <div class="blueShadow-big-title quzhi-sheQu">预警模型</div>
                            <div class="quzhi-screen quzhi-screen-shequ"><i class="xb_icon caret-down"></i>
                                <div class="quzhi-shequ-list" style="display: none"></div>
                            </div>
                            <div class="blueShadow-big-title quzhi-month">${showDate}</div>
                            <div class="quzhi-screen quzhi-screen-month"><i class="xb_icon caret-down"></i>
                               
                            </div>
                            <div class="timeScreen quzhi-month-list">
                                        <img src="${baseUrl}/public/biz/warning/image/warning_tlvalueclose.png" class="tlvalue_close">
                                        <div class="zhengSanjiao"></div>
                                        <div class="timeScreen-title">${this.year}</div>
                                        <div class="timeScreen-month-box quzhi-month-box">
                                            <div class="timeScreen-month ${dateMonth==1 ? 'timeBgcolor':''}" data-show="1" data-month="${this.year}-01">1月</div>
                                            <div class="timeScreen-month ${dateMonth==2 ? 'timeBgcolor':''}" data-show="2" data-month="${this.year}-02">2月</div>
                                            <div class="timeScreen-month ${dateMonth==3 ? 'timeBgcolor':''}" data-show="3" data-month="${this.year}-03">3月</div>
                                            <div class="timeScreen-month ${dateMonth==4 ? 'timeBgcolor':''}" data-show="4" data-month="${this.year}-04">4月</div>
                                            <div class="timeScreen-month ${dateMonth==5 ? 'timeBgcolor':''}" data-show="5" data-month="${this.year}-05">5月</div>
                                            <div class="timeScreen-month ${dateMonth==6 ? 'timeBgcolor':''}" data-show="6" data-month="${this.year}-06">6月</div>
                                            <div class="timeScreen-month ${dateMonth==7 ? 'timeBgcolor':''}" data-show="7" data-month="${this.year}-07">7月</div>
                                            <div class="timeScreen-month ${dateMonth==8 ? 'timeBgcolor':''}" data-show="8" data-month="${this.year}-08">8月</div>
                                            <div class="timeScreen-month ${dateMonth==9 ? 'timeBgcolor':''}" data-show="9" data-month="${this.year}-09">9月</div>
                                            <div class="timeScreen-month ${dateMonth==10 ? 'timeBgcolor':''}" data-show="10" data-month="${this.year}-10">10月</div>
                                            <div class="timeScreen-month ${dateMonth==11 ? 'timeBgcolor':''}" data-show="11" data-month="${this.year}-11">11月</div>
                                            <div class="timeScreen-month ${dateMonth==12 ? 'timeBgcolor':''}" data-show="12" data-month="${this.year}-12">12月</div>
                                        </div>
                                </div>
                       </div>
                       <div class="quzhi-shequ rank-tab">
                            <a data-type="1" class="rank-tab-item rank-tab-item-yz ">数量</span></a>
                            <a data-type="2" class="rank-tab-item rank-tab-item-yz ">增幅</span></a> 
                       </div>
                    </div>
                    <div class="quzhiPop-con" style="display:flex;">
                        <div class="quzhiPop-left">
                            <div class="quzhiPop-left-top">
                                <div class="society_title">一、模型概述</div>
                                <div class="quzhiPop-left-top-cont"></div>
                            </div>
                            <div class="quzhiPop-left-bottom">
                                <div class="society_title">二、阈值微调</div>
                                <div class="quzhiPop-left-bottom-cont"></div>
                            </div>
                        </div>
                        <div class="quzhiPop-right">
                            <div class="quzhiPop-right-top">
                                <div class="quzhiPop-right-top-title">
                                    <div class="">模型参照数据</div>
                                    <div class="filtrate-month"><span>历史全部案件</span>
                                    </div>
                                </div>
                                <div class="quzhiPop-right-top-cont"></div>
                            </div>
                            <div class="quzhiPop-right-bottom"></div>
                        </div>
                    </div>
                <div class="tip_box">
                    <div class="tip_box_title">提示</div>
                    <div class="tip_box_cont">如更改模型的参照数据或微调阈值，则本月内的全部巡查员的预警均将重新计算。</div>
                    <div class="tip_box_bot">
                        <div class="tip_box_left">取消</div>
                        <div class="tip_box_right">确定</div> 
                    </div>
                </div>
                <div class="elect-loading" style="display:none;">
                                    <div class="elect-loading-bg"><img src="${baseUrl}/public/biz/decision/image/pic_scanning_white.png"></div>                                   
                                    <div class="elect-loading-bg2"><img src="${baseUrl}/public/biz/decision/image/pic_scanning_white.png"></div>                                   
                                    <div class="elect-loading-bg3"><img src="${baseUrl}/public/biz/decision/image/pic_scanning_white.png"></div>                                   
                                    <div class="elect-loading-bg4"><img src="${baseUrl}/public/biz/decision/image/pic_scanning_white.png"></div>                                   
                                    <div class="elect-loading-msg">
                                        <label>正在计算：</label><span class="count-data"></span>
                                    </div>
                                    <div class="elect-loading-time">
                                        <label>已用时：</label><span class="time_val">00:00.000</span>
                                    </div>
                                    <div class="elect-loading-percent">0%</div>
                                </div>
                    
`;
        this.$dom.html(tpl);

        let shequList='';
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/threshold/warningThreshold',
            post_data: {
                type:this.param.type,
                month:this.param.month,
            },
            fn: function (data) {
                $.each(data.list,function (x,y) {
                    shequList+=`<div class="shequ-list-item" data-id="${y.id}">${y.name}</div>`
                });
                $('.quzhi-shequ-list').html(shequList)
            }

        });


    },
    recontent:function(data){
        let _this=this;
        _this.id=data.list[0].id;
        let leftTop='',rightTop='';
        let baifenhao='';
        let danwei='';
        let monthNum='';
        let week='';
        if(this.tab==2){
            baifenhao='%';
            danwei='';
            monthNum='';
            week='周';
            this.$dom.find('.rank-tab-item-yz').eq(1).addClass('ac')
        }else{
            monthNum=data.instructionsGt60.dateTime;
            danwei='件';
            baifenhao='';
            week='日';
            this.$dom.find('.rank-tab-item-yz').eq(0).addClass('ac')
        }



        $('.quzhi-sheQu').html(data.list[0].name+'预警模型');
        leftTop=`<div class="quzhiPop-name">${this.shequName} 历史全部案件 - ${week}案件量 最优分割结果</div>
                    <div class="leftTop-table">
                        <div class="table-list"><div class="table-name">${week}案件量<br>（单位件）</div>
                            <div class="leftTop-table1" style="display: flex"></div></div> 
                        <div class="table-list"><div class="table-name">出现的次数</div>
                            <div class="leftTop-table2" style="display: flex"></div></div>
                        <div class="table-list"><div class="table-name" style="border-bottom: none">占总天数的比例</div>
                            <div class="leftTop-table3" style="display: flex"></div>
                        </div>
                    </div>`;
        this.$dom.find('.quzhiPop-left-top-cont').html(leftTop);

        let month=data.instructionsGt60.dateTime;
        var dataArr=JSON.parse(data.list[0].data);
        let table1='',table2='',table3='';
        $.each(dataArr,function (x,y) {
            table1+=`<div class="table-item">${y.rangeStr}${baifenhao}</div>`;
            table2+=`<div class="table-item">${y.num}</div>`;
            table3+=`<div class="table-item">${y.percent}%</div>`
        });
        this.$dom.find('.leftTop-table1').html(table1);
        this.$dom.find('.leftTop-table2').html(table2);
        this.$dom.find('.leftTop-table3').html(table3);
        //给列表最后一项添加color
        this.$dom.find('.leftTop-table1').find('.table-item').last().css('color','#d49e4e');
        this.$dom.find('.leftTop-table2').find('.table-item').last().css('color','#d49e4e');
        this.$dom.find('.leftTop-table3').find('.table-item').last().css('color','#d49e4e');
        rightTop=`<div class="quzhiPop-name">层级分类结果显示:</div>
                    <div class="quzhiPop-right-list"><span class="border_yellow"></span>${monthNum}有${data.instructionslt60.lt60DayNum}天 案件量在${data.instructionslt60.thresholdValue}${danwei}${baifenhao}以下，占比${data.instructionslt60.lt60Percent}%；</div>
                    <div class="quzhiPop-right-list"><span class="border_yellow"></span>${monthNum}有${data.instructionsGt60.gt60DayNum}天 案件量在${data.instructionslt60.thresholdValue}${danwei}${baifenhao}以上，占比${data.instructionsGt60.gt60Percent}%；</div>
                    <div class="quzhiPop-right-result">采用最优分割后体量最大群落的下限值作为阈值，所以初步把 ${data.instructionslt60.thresholdValue}${danwei}${baifenhao} 作为江陵中心站日案件量的报警阈值。</div>`
        $('.quzhiPop-right-top-cont').html(rightTop);



    },

    rechart:function(data){
        let week='';
        let baifenhao='';
        if(this.tab==2){
            baifenhao='%';
            week='周';
        }else{
            baifenhao='';
            week='日';
        }
        let yuzhi=data.numList.thresholdValue;
        let leftBottom='',rightBottom='';
        let nameArr=[];
        let valArr=[];
        $.each(data.list,function (x,y) {
            nameArr.push(x);
            valArr.push(y)
        });
        leftBottom=`<div class="quzhiPop-name">${this.shequName} 历史全部案件 </span> - ${week}案件量走势图</div>
        <div class="left-bottom-chart" id="left-bottom-chart"></div>`;
        this.$dom.find('.quzhiPop-left-bottom-cont').html(leftBottom);

        let myChart=echarts.init(document.getElementById('left-bottom-chart'));
        var option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var res = params[0].name+ week +' : ' + params[0].value + "件";
                    return res;
                },
            },
            grid:{
                left:20,
            },
            color: ['#01dafe', '#58e569', '#f0a54a'],
            dataZoom: {
                type: 'inside',
                start: 0,
                end: 100
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        baseline: 'top',
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#81959f',
                        width: 2
                    }
                },
                data: nameArr,
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show:false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#81959f',
                    }
                },
                splitLine: {
                    show: false,
                }
            },
            series: {
                type: 'line',
                data: valArr,
                itemStyle:{
                    normal:{
                        color:'rgb(80,220,100)',
                        lineStyle:{
                            width:6,
                        },
                    },
                },
                markLine: {
                    itemStyle : {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                            },
                        },
                    },
                    data: [
                        {
                            type: 'average',
                            name: '平均值',
                            itemStyle :{
                                normal: {
                                    color: 'rgb(140,150,160)',
                                    lineStyle:{
                                        width:2,
                                    },
                                    label:{
                                        formatter: function (params) {
                                            var res = params.name +' : ' + params.value + "件";
                                            return res;
                                        },
                                        fontSize:'16px',
                                    },
                                },
                            }
                        },
                        {
                            type: 'max',
                            name: '最大值',
                            itemStyle :{
                                normal: {
                                    color: 'rgb(140,150,160)',
                                    lineStyle:{
                                        width:2,
                                    },
                                    label:{
                                        formatter: function (params) {
                                            var res = params.name +' : ' + params.value + "件";
                                            return res;
                                        },
                                        fontSize:'16px',
                                    },
                                },
                            }
                        },
                        {
                            type: 'min',
                            name: '最小值',
                            itemStyle :{
                                normal: {
                                    color: 'rgb(140,150,160)',
                                    lineStyle:{
                                        width:2,
                                    },
                                    label:{
                                        formatter: function (params) {
                                            var res = params.name +' : ' + params.value + "件";
                                            return res;
                                        },
                                        fontSize:'16px',
                                    },
                                },
                            }
                        },
                        {
                            yAxis: yuzhi,
                            name: '报警阈值',
                            itemStyle:{
                                normal: {
                                    color: '#cd4130',
                                    lineStyle:{
                                        width:4,
                                    },
                                    label:{
                                        formatter: function (params) {
                                            var res = params.name +' : ' + params.value + "件";
                                            return res;
                                        },
                                        fontSize:'16px',
                                    },
                                },
                            },
                        },

                    ],

                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(64,216,84,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(79,242,240,0.3)'
                        }])
                    }
                },
                symbolSize: 10,//拐点大小
            }
        };
        myChart.clear();
        myChart.setOption(option);

        rightBottom=`<div class="quzhiPop-name">自定义报警阈值</div>
            <div class="" style="display:flex;"> 
            <input class="quzhiPop-right-bottom-cont" value="${data.numList.thresholdValue}">
            <div class="quzhiPop-danwei">${baifenhao}</div></div>`;

        this.$dom.find('.quzhiPop-right-bottom').html(rightBottom)

    },

    refresh:function (param,paramChart) {
        let _this=this;
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/threshold/warningModel',
            post_data: param,
            fn: function (data) {
                if(data.list.length==0){
                    $('.quzhiPop-con').hide()
                }else {
                    $('.quzhiPop-con').show();
                    _this.shequName = data.list[0].name;
                    _this.recontent(data)
                }
            }
        });

        if(this.tab==2){
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host+'/api/analysis/threshold/thresholdFineTuningToGrowth',
                post_data: paramChart,
                fn: function (data) {
                    _this.rechart(data)
                }
            });
        }else{
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host+'/api/analysis/threshold/thresholdFineTuning',
                post_data: paramChart,
                fn: function (data) {
                    _this.rechart(data)
                }
            })

        }

    },



};

//预警工作台列表

let workdetialpop={
    init:function($dom,data,request_params,fromTip,formWork,fromindex) {
        this.$dom = $dom;
        this.request_params = request_params;
        this.fromindex = fromindex; //从运行态势预警 点过来
        this.fromTip = fromTip;  //从预警提醒 点过来
        this.formWork = formWork; //工作台点击 传true默认全部

        this.renderHead(data);
        this.initEvent();
    },
    initEvent:function(){
        let _this=this;
        _this.$dom.on('click','.title_list_detail',function () {

            let id,type,code,status,stass;
            id = $(this).data('id');
            type  = $(this).data('type');
            code  = $(this).data('code');
            status = $(this).data('status');
            stass = $(this).data('cont');
            if(type==11){
                ajax_jsonp_request({
                    url: common_module_conf.project_conf.show.host+'/api/analysis/warning/prickPoint',
                    post_data:{type:11},
                    fn:function(data) {
                        let dataL = data.list;
                        let subType = '';
                        let isTime = '';
                        for (var i in dataL) {
                            let bgColorStyle = '';
                            let imgIcom = '';
                            if (dataL[i].sta == '超时') {
                                bgColorStyle = '#F7574D';
                                subType = 2;
                                isTime = 1;
                                imgIcom = 'icon_case_new.png';
                            } else if (dataL[i].sta == '返工') {
                                bgColorStyle = '#FF00FF';
                                subType = 3;
                                imgIcom = 'icon_case_willtimeout.png';
                            } else if (dataL[i].sta == '即将超时') {
                                bgColorStyle = '#ff9900';
                                isTime = 1;
                                subType = 1;
                                imgIcom = 'icon_case_rework.png';
                            }
                        }

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
                                        id:code,
                                        subType:subType,
                                        isTime:isTime
                                    },
                                    fn:function(data){
                                        //这里判断是超时还是即将超时用的是stass，所以subType不传
                                        caseDetailPopNet(p.$ow_open_cont,data,code,'',status,stass)
                                    }
                                });

                            },
                            closefn:function () {
                                workdetialpop.refreshData()
                            }
                        })
                    }
                });
            }else if(type==12){
                var p = pop.view({
                    width: 1780,
                    height: 960,
                    hideTitle: true,
                    zdy_class: 'general_full',
                    filterContainer: '.filter_dom',
                    content: '',
                    success: function () {
                        ajax_jsonp_request({
                            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/negativeDetailsToHead',
                            post_data:{
                                code:code,
                            },
                            fn:function(data){
                                GridPop.init(p.$ow_open_cont,data,code)
                            }
                        });
                    },
                    closefn:function () {
                        workdetialpop.refreshData()
                    }
                });
            }else {
                var p = pop.view({
                    width: 1780,
                    height: 960,
                    hideTitle: true,
                    zdy_class: 'general_full',
                    filterContainer: '.filter_dom',
                    content: '',
                    success: function () {
                        ajax_jsonp_request({
                            url: common_module_conf.project_conf.show.host + '/api/analysis/warning/newAllDetails',
                            async: false,
                            post_data: {
                                id:id,
                            },
                            fn:function (data){
                                console.log(data);
                                let request_params = {
                                    code:data.timeList[0].code,
                                    id:data.timeList[0].id,
                                    name:data.timeList[0].dataName,
                                    time:data.timeList[0].day,
                                    timeCond:data.timeList[0].timeCond,
                                    type:data.timeList[0].type,
                                };
                                warning_detail.init(p.$ow_open_cont, request_params,true)

                            },
                            closefn:function () {
                                workdetialpop.refreshData()
                            }
                        });
                    }
                });
            }
        });

        let id='';

        _this.$dom.on('click','.title_list_status',function () {

            id  = $(this).data('id');
            $('.warning-right-judgePops').show();
            $('.judgePop-btn-left').click(function () {
                $(this).parents('.warning-right-judgePops').hide();
            });
        });

        _this.$dom.on('click','.judgePop-btn-right',function () {
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host+'/api/analysis/warning/update',
                post_data: {
                    id:id
                },
                fn: function () {
                    _this.refreshData();
                }
            });
            $(this).parents('.warning-right-judgePops').hide();
        })


    },

    renderHead:function(data) {
        let _this = this;
        let tpl = '';
         tpl = `<div class='bigPop-head bigPop-head-yjgongzuotai'>
                            <div class="bigPop-head-left">
                                <div class="blueShadow-big-title">预警工作台</div> </div>
                            <div class="bigPop-head-right">
                                <div class="filtrate_list filtrate_list_list">
                                    <div class="fontSz_adjust ">预警分类</div>
                                    <div class="filtrate-select filtrate-list">
                                    </div>
                                </div>
                                <div class="filtrate_list filtrate_list_category" style="display: none">
                                    <div class="fontSz_adjust">预警分类</div>
                                    <div class="filtrate-select filtrate-category">
                                    </div>
                                </div>
                                <div class="filtrate_list">
                                    <div class="fontSz_adjust">预警时间</div>
                                    <div class="filtrate-select filtrate-timeRange">
                                    </div>
                                </div>
                                <div class="filtrate_list">
                                    <div class="fontSz_adjust">状态</div>
                                    <div class="filtrate-select filtrate-state">
                                    </div>
                                </div>
                                <div class="filtrate_list filtrate_list_shequ">
                                    <div class="fontSz_adjust">社区</div>
                                    <div class="filtrate-select filtrate-shequ">
                                    </div>
                                </div>
                                <div class="filtrate_list filtrate_list_anjian">
                                     <div class="fontSz_adjust">案件类型</div>
                                     <div class="filtrate-select filtrate-anjiantype">
                                     </div>
                                </div>
                                
                            </div>
                       </div>
                       
                       <div class='bigPop-con'>
                             <div class="common_list">
                                 <div class='common_list_head'>
                                    <div class='common_list_list'>
                                        <div class="common_list_item">名称</div>
                                        <div class="common_list_item">预警时间</div>
                                        <div class="common_list_item" style="width: 30%">预警说明</div>
                                        <div class="common_list_item" style="width: 10%">状态</div>
                                        <div class="common_list_item">操作</div>
                                    </div>
                                </div>
                                <div class='common_list_cont'>
                                </div>
                                <div class="page" style="padding:50px;">
                                    <div class="page_num">100/1000</div>
                                    <div class="page_list">
                                        <div class="page_prev"> 上一页</div>
                                        <div class="page_next"> 下一页</div>
                                    </div>
                                </div>
                             </div>
                        </div>
                       <div class="warning-right-judgePops " style="display: none">
                                <div class="judgePop-title">手动解除</div>
                                <div class="judgePop-title-war">是否解除该预警？</div>
                                <div class="judgePop-btn">
                                    <div class="judgePop-btn-left">取消</div>
                                    <div class="judgePop-btn-right">解除预警</div>
                                </div>
                        </div>`;
        this.$dom.html(tpl);


        if(this.fromTip==true){
            this.request_params.status=1;
        }
        if(this.formWork==true){
            this.request_params.type=0;
        }

        if(this.fromindex==true){
            $('.filtrate_list_list').hide();
            $('.filtrate_list_category').show();
        }

        this.refreshData();

        if(_this.request_params.type==11){
            $('.filtrate_list_shequ').show();
            $('.filtrate_list_anjian').show();
        }else if(_this.request_params.type==12){
            $('.filtrate_list_shequ').show();
            $('.filtrate_list_anjian').hide();
        }else{
            $('.filtrate_list_shequ').hide();
            $('.filtrate_list_anjian').hide();
        }



        $('.page_prev').hide();

        if(_this.request_params.hasmore){
            $('.page_next').show();
        }else{
            $('.page_next').hide();
        }

        $('.page_next').click(function () {
            _this.request_params.offset= (_this.request_params.offset+1)/1;
            _this.refreshData();
        });

        $('.page_prev').click(function () {
            _this.request_params.offset= (_this.request_params.offset-1)/1;
            _this.refreshData()
        });


//分类
        classifyFilter.init($('.filtrate-list'),data, function (type) {
            _this.request_params.offset=0;
            _this.request_params.type = type;
            _this.refreshData()
        },_this.request_params.type);

        datePicker.init($('.filtrate-timeRange'), function (startTime,endTime) {
            _this.request_params.offset=0;
            _this.request_params.startTime = startTime;
            _this.request_params.endTime = endTime;
            _this.refreshData()
        });
        statusFilter.init($('.filtrate-state'),data, function (status) {
            _this.request_params.offset=0;
            _this.request_params.status = status;
            _this.refreshData()
        },_this.fromTip,_this.formWork);



        shequFilter.init($('.filtrate-shequ'),data, function (community) {
            _this.request_params.offset=0;
            _this.request_params.community = community;
            _this.refreshData()
        }, _this.request_params.community);

        anjiantypeFilter.init($('.filtrate-anjiantype'),data, function (caseType) {
            _this.request_params.offset=0;
            _this.request_params.caseType = caseType;
            _this.refreshData()
        },_this.request_params.caseType);

        categoryFilter.init($('.filtrate-category'),data, function (subType) {
            _this.request_params.offset=0;
            _this.request_params.subType = subType;
            _this.refreshData()
        },_this.request_params.subType);

    },


    makeItem:function(data){
        let mid ='';
        let status='';
        let className='';
        $.each(data.list,function (x,y) {
            if(data.list[x].status=='预警中'){
                status="手动解除";
                className='font-yellow'
            }else{
                status='';
                className='';
            }
            mid+=`<div class='common_list_list'>
                      <div class="common_list_item" title="${y.name}">${y.name}</div>
                      <div class="common_list_item" title="${y.time}">${y.time}</div>
                      <div class="common_list_item" style="width: 30%" title="${y.content}">${y.content}</div>
                      <div class="common_list_item ${className}"  style="width: 10%" title="${y.status}">${y.status}</div>
                      <div class="common_list_item" style="display: flex">
                            <div class="title_list_sta">
                                <div class="title_list_status font-green" data-id="${y.id}" >${status}</div>
                            </div>
                            <div class="title_list_detail font-blue" data-id="${y.id}" data-type="${y.type}" 
                            data-code="${y.code}"  data-status="${y.status}" data-cont="${y.content}"> 详情</div> 
                      </div>
                  </div> `
        });

        $('.common_list_cont').html(mid);

    },

    refreshData:function(){
        let _this = this;
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/list',
            post_data: _this.request_params,
            fn: function (data) {
                _this.data = data;
                _this.request_params.hasmore=data.hasmore;
                if(_this.request_params.hasmore==true){
                    $('.page_next').show();
                }else{
                    $('.page_next').hide();
                }
                if(_this.request_params.offset==0){
                    $('.page_prev').hide();
                }else{
                    $('.page_prev').show();
                }
                let num=data.num;
                let totalNum=data.totalNum;
                $('.page_num').html(num +'/'+ totalNum);
                _this.makeItem(data);
            },
        })
    },
};


//异常案件详情
function caseDetailPopNet($dom,data,taskid,subType,stutasNum,cont){
    let dataList = data.caseRecordItem;
    let dataStatus = data.otherList;
    let dataTime = data.timeStr;
    let timeDom = '';
    if(subType == 2 || cont == "案件超时预警"){
        timeDom = `
        <div class="net_status_box">
            <div class="net_status">已超时</div>
            <div class="net_time">
                <span class="net_time_bg_day net_time_bg">${dataTime.day? dataTime.day:'00'}</span>
                <span class="net_time_day">天</span>
            </div>
            <div class="net_time">
                <span class="net_time_bg">${dataTime.hour}</span>
                <span class="net_time_day">小时</span>
            </div>
            <div class="net_time">
                <span class="net_time_bg">${dataTime.min}</span>
                <span class="net_time_day">分钟</span>
            </div>
            </div>
        `

    }else if(subType == 1 || cont == "案件即将超时预警"){
        timeDom = `
        <div class="net_status_box">
            <div class="net_status" style="color: #FACD89">即将超时</div>

            <span class="net_time_day" style="padding-left: 30px">剩余</span>
             <div class="net_time">
                <span class="net_time_bg_day net_time_bg">${dataTime.day? dataTime.day:'00'}</span>
                <span class="net_time_day">天</span>
            </div>
            <div class="net_time">
                <span class="net_time_bg">${dataTime.hour}</span>
                <span class="net_time_day">小时</span>
            </div>
            <div class="net_time">
                <span class="net_time_bg">${dataTime.min}</span>
                <span class="net_time_day">分钟</span>
            </div>
            </div>
        `
    }else if(subType == 3 || cont == '返工'){
        timeDom= `<div class="net_status_box">
            <div class="net_status" style="color: #ffffff">已返工</div>
           
            <div class="net_time_day" style="padding-left: 30px;color: #FACD89">1</div>
            
            <div class="net_time_day" style="padding-left: 30px">次</div>
            </div>`
    }

    let dealDom = '';
    // var data = data.caseRecordItem;
    $.each(dataList.case_deal_list,function(i,n){
        dealDom += `<div class="pop-zhihuichuzhi">
                            <span>${n.operate_name}</span>
                            <span>${n.user_name}</span>
                            <span title="${n.dept_name}">${n.dept_name}</span>
                            <span><div class="note" title="${n.note}">${n.note}</div></span>
                            <span>${n.insert_time}</span>
                        </div>`
    });

    var pics='';
    var attr_img=dataList.pics.split(",");
    var picArr = [];
    for(var i=0;i<attr_img.length;i++){
        var obj=attr_img[i];
        obj = `http://${obj}`;
        picArr.push(obj);
        pics += `<img class="case-detail-img" src="${obj}" alt="">`
    }

    let myDate = new Date();
    let myHours = myDate.getHours();
    let myMinutes = myDate.getMinutes();
    let mygetSeconds = myDate.getSeconds();
    if(myHours < 10){
        myHours = '0'+ myDate.getHours()
    }else if(myMinutes < 10){
        myMinutes = '0' + myDate.getMinutes();
    }else if(mygetSeconds < 10){
        mygetSeconds = '0' + myDate.getSeconds()
    }
    let stuTime = myHours + ':' + myMinutes + ':' + mygetSeconds;

    let tpl = `<div class="case-detail case-detail-network">
        <div class="case-detail-title">
        
        ${timeDom}
            
            
            
        </div>
        <div class="case-detail-top-network-box">
        <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
        <div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
        <div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
        <div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
        <div class="case-detail-top">
            <div class="case-detail-item">
                <span class="detail-name">任务编号：</span>
                <span class="detail-value">${dataList.taskid}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">案件编号：</span>
                <span class="detail-value">${dataList.case_sn}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">问题来源：</span>
                <span class="detail-value">${dataList.source_name}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">发现时间：</span>
                <span class="detail-value">${dataList.create_time}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name" style="color: #f1c684">当前状态：</span>
                <span class="detail-value" style="color: #f1c684">${dataList.case_status_name}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">结案时间：</span>
                <span class="detail-value">${dataList.end_time}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">案件类型：</span>
                <span class="detail-value">${dataList.property_name}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">村（社区）：</span>
                <span class="detail-value">${dataList.community}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">网格：</span>
                <span class="detail-value">${dataList.grid_code}</span>
            </div>
            <div class="case-detail-item">
                <span class="detail-name">坐标：</span>
                <span class="detail-value">${dataList.lng}，${dataList.lat}</span>
            </div>
            <div class="case-detail-item full-width">
                <span class="detail-name">地址：</span>
                <span class="detail-value">${dataList.location}</span>
            </div>
            <div class="case-detail-item full-width" style="display:flex;">
                <span class="detail-name" style="width:100px;">问题描述：</span>
                <span class="detail-value" title="${dataList.case_description}">${dataList.case_description}</span>
            </div>
        </div>
        <div class="case-detail-middle">
            <div class="case-detail-three">
                <div class="case-detail-item">
                    <span class="detail-name">受理人员：</span>
                    <span class="detail-value">${dataList.case_accept_lian.accept_person}</span>
                </div>
                <div class="case-detail-item">
                    <span class="detail-name">受理时间：</span>
                    <span class="detail-value">${dataList.case_accept_lian.accept_time}</span>
                </div>
                <div class="case-detail-item">
                    <span class="detail-name">受理意见：</span>
                    <span class="detail-value">${dataList.case_accept_lian.accept_note}</span>
                </div>
            </div>
            <div class="case-detail-three">
                <div class="case-detail-item">
                    <span class="detail-name">立案人员：</span>
                    <span class="detail-value">${dataList.case_accept_lian.lian_person}</span>
                </div>
                <div class="case-detail-item">
                    <span class="detail-name">立案时间：</span>
                    <span class="detail-value">${dataList.case_accept_lian.lian_time}</span>
                </div>
                <div class="case-detail-item">
                    <span class="detail-name">立案意见：</span>
                    <span class="detail-value">${dataList.case_accept_lian.lian_note}</span>
                </div>
            </div>
        </div>
        </div>

        <div class="case-detail-box netwrok-case-detail-box">
            <h3 style="padding-left: 20px">指挥处置</h3>
            <div class="case-detail-table">
                <div class="netwrokTbody">
                    <div>
                        <div class="zhihuizhongxin-head">
                            <span style="width:10%;">操作</span>
                            <span style="width:15%;">人员</span>
                            <span style="width:25%;">所属部门</span>
                            <span style="width:25%;">意见</span>
                            <span style="width:15%;">时间</span>
                        </div>
                    </div>
                    <div class="zhihuizhongxin-main">
                        ${dealDom}                  
                    </div>
                </div>
            </div>
        </div>
        <div class="case-detail-box-all">
        <div class="case-detail-box">
            <h3>核查结案</h3>
            <div class="case-detail-box-con">
                <div class="case-detail-box-examine">
                    <div class="case-detail-item">
                        <span class="detail-name">结案人员：</span>
                        <span class="detail-value">${dataList.case_end_info.end_person}</span>
                    </div>
                    <div class="case-detail-item">
                        <span class="detail-name">结案部门：</span>
                        <span class="detail-value">${dataList.case_end_info.end_dept_name}</span>
                    </div>
                   
                </div>
                <div class="case-detail-box-examine">
                    <div class="case-detail-item">
                        <span class="detail-name">结案评判：</span>
                        <span class="detail-value detail-value-right-hide" title="${dataList.case_end_info.end_result}">${dataList.case_end_info.end_result}</span>
                    </div>
                    <div class="case-detail-item">
                        <span class="detail-name">结案时间：</span>
                        <span class="detail-value" title="${dataList.case_end_info.end_time}">${dataList.case_end_info.end_time}</span>
                    </div>
                </div>
                <div class="case-detail-item">
                        <span class="detail-name">结案意见：</span>
                        <span class="detail-value detail-value-right-hide" title="${dataList.case_end_info.end_note}">${dataList.case_end_info.end_note}</span>
                    </div>
            </div>
        </div>
        <div class="case-detail-box case-detail-box-img">
            <h3>上报图片</h3>
            <div class="case-detail-box-con">
                ${pics}
            </div>
        </div>
        <div class="case-detail-box case-detail-box-img" style="padding-top: 60px">
            <h3>结案图片</h3>
            <div class="case-detail-box-con">
                ${pics}
            </div>
        </div>
        </div>
        <div class="warning-pop-btn">
                        <div class="warning-btn-left"><i class="xb_icon check-circle-re"></i>手动解除</div>
                        <div class="warning-btn-right"><i class="xb_icon pencil-alt-re"></i>填写预警调查结果</div>
                        <span class="stuTime">${getNowFormatDate(1)} ${stuTime}</span>
                    </div>
            </div>
                <div class="popBox" style="display: none">
                    <div class="popbox-title">填写预警调查结果</div>
                    <textarea class="popbox-con"></textarea>
                    <div class="popbox-btn">保存</div>
                    <img src="${baseUrl}/public/biz/warning/image/warning_del.png" class="popbox-del">
                </div>
                <div class="warning-right-judgePops " style="display: none">
                    <div class="judgePop-title">手动解除</div>
                    <div class="judgePop-title-war">是否解除该预警？</div>
                    <div class="judgePop-btn">
                        <div class="judgePop-btn-left">取消</div>
                        <div class="judgePop-btn-right">解除预警</div>
                    </div>
                </div>
    </div>`;
    $dom.html(tpl);

    //如果没有图片，就隐藏上报图片一栏
    if(dataList.pics == ''){
        $('.case-detail-box-img').hide();
    }
    if(dataStatus.result_txt == ""){

    }else {
        $dom.find('.warning-btn-right').text(`调查结果:${dataStatus.result_txt}`).css('background','transparent')
    }
    if(dataStatus.showTime == "预警未解除"){

    }else {
        $('.warning-pop-btn div:first-child').css('line-height','2');
        $('.stuTime').css('display','block').text(dataStatus.showTime)
    }
    if(dataStatus.status == 3){
        $('.warning-btn-left').text('已手动解除');
        $('.warning-btn-left').css('background','#033152');
        $('.warning-btn-left').unbind('click')
    }
    //当天数大于99时，更换背景图片
    if(dataTime.day > 99){
        $('.net_time_bg_day').css('background',`url(${baseUrl}/public/biz/warning/image/warn_box_numt.png) no-repeat`);
    }
    $dom.find('.warning-btn-left').click(function () {
        $('.warning-right-judgePops').show();
        $dom.on('click','.judgePop-btn-left',function () {
            $('.warning-right-judgePops').hide();
        });
        $dom.on('click','.judgePop-btn-right',function () {
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host+'/api/analysis/warning/abnormalCaseUpdate',
                post_data:{
                    id: taskid,
                },
                fn: function () {
                }
            });
            $('.warning-right-judgePops').hide();
            $('.warning-btn-left').html('已手动解除');
            $('.warning-btn-left').css('background','#033152');
            $('.warning-btn-left').unbind('click');
            $('.stuTime').css('display','block');
            $('.warning-pop-btn div:first-child').css('line-height','2')
        });
    });
    //判断是否是已解除事件
    if(stutasNum == '已自动解除' || $('.warning-btn-left').text() == '已手动解除'){

        $dom.find('.warning-btn-left').css('background','rgb(3, 49, 82)').text(stutasNum);
        $('.warning-btn-left').unbind('click');
    }
    $dom.on('click','.warning-btn-right',function () {
        $('.popBox').show();
        $dom.on('click','.popbox-del',function () {
            $(this).parent().hide();
        });
        $dom.on('click','.popbox-btn',function () {
            let nowTime = getNowFormatDate(1);
            let content=$('.popbox-con').val();
            $dom.find('.warning-btn-right').text(`调查结果:${content}`).css('background','transparent');
            $dom.find('.stuTime').text(`${nowTime}  ${stuTime}`);
            $('.warning-btn-left').html('已手动解除');
            $('.warning-btn-left').css('background','#033152');
            $('.warning-btn-left').unbind('click');
            $('.stuTime').css('display','block');
            $('.warning-pop-btn div:first-child').css('line-height','2')
            ajax_jsonp_request({
                url: common_module_conf.project_conf.show.host+'/api/analysis/warning/abnormalCaseUpdate',
                post_data:{
                    id:taskid,
                    text: content,
                },
                fn: function (data) {
                }
            });
            $(this).parent().hide();
        });

    });
    $('body').on('click','.case-detail-img',function(){
        $.imgView({
            imgs:picArr,
            hasThumb:true,
            imgClassName:'jkq_imgview'
        });
    })

}

//刷新工作台列表
let refresh_workbench =  {
    makeItem:function(){
        ajax_jsonp_request({
            url: common_module_conf.project_conf.show.host+'/api/analysis/warning/workbench',
            fn: function (data) {
                let warningList = '';
                let imgsrc = '';
                let jiechu = '';
                let boderStyle='';
                for (let i = 0; i < data.list.length; i++) {
                    if (data.list[i].status == '已手动解除') {
                        imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_dark.png`;
                        jiechu = '已手动解除';
                        boderStyle = 'border: none;background-color:transparent;color:#b4b4b4'
                    } else if(data.list[i].status == '已自动解除'){
                        imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_dark.png`;
                        jiechu = '已自动解除';
                        boderStyle = 'border: none;background-color:transparent;color:#b4b4b4'
                    } else {
                        imgsrc = `${baseUrl}/public/biz/warning/image/warn_badge_red.png`;
                        jiechu = '手动解除';
                        boderStyle = ''
                    }
                    warningList += `
                        <div class="warning-right-list">
                        <img src="${imgsrc}" class="warning-list-logo">
                        <div class="warning-right-list-time list-pos">${data.list[i].time}</div>
                        <div class="warning-right-list-title list-pos" data-cont="${data.list[i].content}" data-id="${data.list[i].id}" data-type="${data.list[i].type}"
                            data-code="${data.list[i].code}"  data-status="${data.list[i].status}">${data.list[i].content}</div>
                        <div class="warning-right-btn list-pos" style="${boderStyle}">${jiechu}</div>
                        </div>
                        `;
                }
                $('.warning-right-list-wap').html(warningList);
            }
        });
    },

};
