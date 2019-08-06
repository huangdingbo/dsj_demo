let warning_anjianBig =  {
    data:function(){
        return{
            curId_1:0,
            isActive:false,
            shijanData:{},
            bujianData:{},
            eventSortActive:false,
            bujianSortActive:false,
        }

    },
    template:`<div class="anjianBig-judge-center judge-center">
                    <div class="judge-center-header">
                        <div class="judge-center-title"><span class="title-name blueShadow-big-title">高发案件大类预警</span><span class="title-btn" @click="tlvalueClick"><i class="xb_icon info-circle"></i></span></div>
             
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
     
                    <div class="anjian-main-3">
                    <div class="anjian-main-3-left">
                    <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                    <div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                    <div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                    <div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>

                    <div class="anjian-main-3-title">事件</div>
                    <div class="anjian-main-3-list-title">
                    <span>类型名称</span>
                    <span class="current_warning" @click="eventSortFun(0)">当前预警数<i class="sort_icon xb_icon caret-down""></i></span>
                    <span class="total_warning"  @click="eventSortFun(1)">总预警数<i class="sort_icon  xb_icon caret-down""></i></span>
</div>
<div class="listLine"></div>
<div class="anjian-main-3-list-box shehui-shijian">
</div>
</div>
                    <div class="anjian-main-3-right">
                    <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>

                    <div class="anjian-main-3-title">部件</div>
                    <div class="anjian-main-3-list-title">
                     <span>类型名称</span>
                     <span class="bujian_current_warning" @click="bujianSortFun(0)">当前预警数<i class="sort_icon xb_icon caret-down""></i></span>
                    <span class="bujian_total_warning"  @click="bujianSortFun(1)">总预警数<i class="sort_icon  xb_icon caret-down""></i></span>
</div>
<div class="listLine"></div>
<div class="anjian-main-3-list-box shehui-bujian">

</div>
                    
                    </div>
</div>              <div class="LineMapTitle">近30天高发案件大类预警走势<div class="anjian-btn-box"><div class="anjian-btn-left" @click="shehuiDleiClick(0)" :class="{'anjianAc':curId_1==0}">总体</div><div class="anjian-btn-min" @click="shehuiDleiClick(1)" :class="{'anjianAc':curId_1==1}">事件</div><div class="anjian-btn-right" @click="shehuiDleiClick(2)" :class="{'anjianAc':curId_1==2}">部件</div></div></div>
                    <div id="anjianBigLin"></div>        
                   
                        </div>
                                
                      </div>
</div> 
                               `,
    mounted:function(){
        let that = this;
        //下钻弹窗
        $('.judge-center').off('click').on('click','.shehui-shijianPop',function(){
            var type  = $(this).data('type');
            var code  = $(this).data('id');
            warningPop.detail(type,code)
        });
        this.shehuiDleiLin = new cacheData();
        this.shehuiDleiLin.setRule({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/trendList',
            0:{
                post_data:{
                    warningType:3,
                    propertyType: 2
                }
            },
            1:{
                post_data:{
                    warningType:3,
                    propertyType:1
                }
            },
            2:{
                post_data:{
                    warningType:3,
                    propertyType:0
                }
            }
        });
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/numSurvey',
            post_data:{
                warningType:3
            },
            fn:function(data) {
                $('.earlyWarning').text(data.num);
                $('.allWarning').text(data.totalNum)
            }

        });
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/statisList',
            post_data:{
                warningType:3,
                propertyType:1,
            },
            fn:function(data) {
                that.shijanData = data;

                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="anjian-main-3-list-2">${data.list[i].num}</div>
    <div class="anjian-main-3-list-3">${data.list[i].totalNum}</div>
    <div class="shehui-shijianPop anjian-main-3-list-4" style="top: 14px" data-time="${data.list[i].time}"" data-id="${data.list[i].id}" data-type="${data.list[i].type}"><span class="anjian-card-full-btn card-full-btn"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.shehui-shijian').html(tpl);
            }

        });
        ajax_jsonp_request({
            url:common_module_conf.project_conf.show.host+'/api/analysis/warning/statisList',
            post_data:{
                warningType:3,
                propertyType:0,
            },
            fn:function(data) {
                that.bujianData = data;
                let tpl = '';
                for(let i = 0;i<data.list.length;i++){
                    tpl += `<div class="anjian-main-3-list">
    <div class="anjian-main-3-list-1">${data.list[i].name}</div>
    <div class="anjian-main-3-list-2">${data.list[i].num}</div>
    <div class="anjian-main-3-list-3">${data.list[i].totalNum}</div>
    <div class="shehui-shijianPop anjian-main-3-list-4" style="top: 14px" data-id="${data.list[i].id}" data-type="${data.list[i].type}"><span class="anjian-card-full-btn card-full-btn"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
                }
                $('.shehui-bujian').html(tpl)

            }

        });
        this.shehuiDleiClick(0)
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
                        type: "3",
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
                    quzhiDetail.init(p.$ow_open_cont,3)
                }
            })
        },
        shehuiDleiClick(i){
            let that = this;
            that.curId_1 = i;
            this.shehuiDleiLin.getData(i,function(data){
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
                    conId:'anjianBigLin',
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

        eventSortFun(i){
            this.eventSortActive = !this.eventSortActive;
            if(this.eventSortActive){
                if(i == 0){
                    $('.current_warning .sort_icon').removeClass('caret-down').addClass('caret-up');
                }else{
                    $('.total_warning .sort_icon').removeClass('caret-down').addClass('caret-up');
                }
            }else{
                if(i == 0){
                    $('.current_warning .sort_icon').removeClass('caret-up').addClass('caret-down');
                }else{
                    $('.total_warning .sort_icon').removeClass('caret-up').addClass('caret-down');
                }
            }


            this.eventSort(this.eventSortActive,i)

        },

        eventSort(isAsc,isTotal){
            var newdata=this.shijanData.list;
            function ascSort(a,b){
                if(isTotal){
                    return b.totalNum-a.totalNum
                }else{
                    return b.num-a.num
                }

            }

            function desSort(a,b){
                if(isTotal){
                    return a.totalNum-b.totalNum
                }else{
                    return a.num-b.num
                }
            }

            if(isAsc){

                newdata.sort(desSort);
            }else{
                newdata.sort(ascSort);
            }

            let tpl = '';


            for(let i = 0;i<newdata.length;i++){
                var obj = newdata[i];
                tpl += `<div class="anjian-main-3-list">
    <div class="anjian-main-3-list-1">${obj.name}</div>
    <div class="anjian-main-3-list-2">${obj.num}</div>
    <div class="anjian-main-3-list-3">${obj.totalNum}</div>
    <div class="shehui-shijianPop anjian-main-3-list-4" style="top: 14px" data-time="${obj.time}"" data-id="${obj.id}" data-type="${obj.type}"><span class="anjian-card-full-btn card-full-btn"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
            }
            $('.shehui-shijian').html(tpl);
        },

        bujianSortFun(i){
            this.bujianSortActive = !this.bujianSortActive;
            if(this.bujianSortActive){
                if(i == 0){
                    $('.bujian_current_warning .sort_icon').removeClass('caret-down').addClass('caret-up');
                }else{
                    $('.bujian_total_warning .sort_icon').removeClass('caret-down').addClass('caret-up');
                }
            }else{
                if(i == 0){
                    $('.bujian_current_warning .sort_icon').removeClass('caret-up').addClass('caret-down');
                }else{
                    $('.bujian_total_warning .sort_icon').removeClass('caret-up').addClass('caret-down');
                }
            }


            this.bujianSort(this.bujianSortActive,i)

        },

        bujianSort(isAsc,isTotal){
            var newdata=this.bujianData.list;

            function ascSort(a,b){
                if(isTotal){
                    return b.totalNum-a.totalNum
                }else{
                    return b.num-a.num
                }

            }

            function desSort(a,b){
                if(isTotal){
                    return a.totalNum-b.totalNum
                }else{
                    return a.num-b.num
                }
            }

            if(isAsc){

                newdata.sort(desSort);
            }else{
                newdata.sort(ascSort);
            }

            let tpl = '';


            for(let i = 0;i<newdata.length;i++){
                var obj = newdata[i];
                tpl += `<div class="anjian-main-3-list">
    <div class="anjian-main-3-list-1">${obj.name}</div>
    <div class="anjian-main-3-list-2">${obj.num}</div>
    <div class="anjian-main-3-list-3">${obj.totalNum}</div>
    <div class="shehui-shijianPop anjian-main-3-list-4" style="top: 14px" data-id="${obj.id}" data-type="${obj.type}"><span class="anjian-card-full-btn card-full-btn"><img src="/dsj_wjjkq_web/public/biz/index/image/home_btn_icon_deep.svg" width="100%"></span></div>
</div>`
            }
            $('.shehui-bujian').html(tpl)
        }

}





};

let yuZhiPop= {
    init:function ($dom,type) {
        this.type = type;
        this.$dom= $dom;
        this.content();
        this.clickfn(this.type);
    },
    clickfn:function(tlType){
        this.$dom.find('.rank-tab-item').click(function () {
            $('.rank-tab-item').removeClass('ac');
            $('.quzhi-bottom').removeClass('select');
            $('.quzhi-bottom-list').hide();
            var type=$(this).data('type');
            var select=$('.quzhi-top-list.ac').data('id');
            $('.quzhi-bottom').hide();
            if(type==1){
                $('.rank-tab-item').eq(0).addClass('ac');
                $('.quzhi-bottom').eq(0).show();
                $('.quzhi-bottom').eq(0).addClass('select');
                if(select==1){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(0).show();
                }else if(select==2){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(1).show();
                }else{
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(2).show();
                }
            }else{
                $('.rank-tab-item').eq(1).addClass('ac');
                $('.quzhi-bottom').eq(1).show();
                $('.quzhi-bottom').eq(1).addClass('select');
                if(select==1){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(0).show();
                }else if(select==2){
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(1).show();
                }else{
                    $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(2).show();
                }
            }

        });

        this.$dom.find('.quzhi-top-list').click(function () {
            $('.quzhi-top-list').removeClass('ac');
            $('.quzhi-bottom-list').hide();
            var index=$(this).data('id');
            if(index==1){
                $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(0).show();
                $('.quzhi-top-list').eq(0).addClass('ac')
            }else if(index==2){
                $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(1).show();
                $('.quzhi-top-list').eq(1).addClass('ac')
            }else{
                $('.quzhi-bottom.select').find('.quzhi-bottom-list').eq(2).show();
                $('.quzhi-top-list').eq(2).addClass('ac')
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

                    warningNetWorkYuZhiPop.init(p.$ow_open_cont,tlType)
                }
            })
        });
    },
    content:function () {
        let tpl=`<div class="bigPop-head">
                       <div class="bigPop-head-left">
                            <div class="blueShadow-big-title">高发社区网格预警模型</div>
                       </div>
                       <div class="quzhi-detail rank-tab">
                            <a data-type="1" class=" rank-tab-item ac">数量</span></a>
                            <a data-type="2" class=" rank-tab-item">增幅</span></a> 
                       </div>
                       <div class="quzhi-popDetail">阈值设置</div>  
                    </div>
                    <div class="quzhiPop-con">
                        <div class="quzhi-top">
                            <div class="quzhi-top-list ac" data-id="1">
                                <div class="quzhi-list-title">数据源选取</div>
                                <div class="quzhi-list-cont">针对每个社区，选取历史数据作为模型构建的总数据集合</div>
                                <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                            </div>
                            <div class="quzhi-top-list" data-id="2">
                                <div class="quzhi-list-title">最优分割</div>
                                <div class="quzhi-list-cont">运用大数据聚类算法，将历史数据划分为不同等级，体量相似的数据聚在一起</div>
                                <div class="panel-corner anjian-topLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-topRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boLeft"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
<div class="panel-corner anjian-boRight"><svg id="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20" xml:space="preserve"><path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"></path></svg></div>
                            </div>
                            <div class="quzhi-top-list" data-id="3">
                                <div class="quzhi-list-title">阈值确定</div>
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
                                <div class="society_title">XX社区历史案件量选取</div><div class="quzhi-bottom-day">(日案件)</div> 
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
                                <div class="quzhi-bottom-cont">2</div>
                            </div>
                            <div class="quzhi-bottom-list" style="display: none">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">找到最佳预警阈值</div><div class="quzhi-bottom-day">(日案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont">3</div>
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
                                <div class="quzhi-bottom-cont">2</div>
                            </div>
                            <div class="quzhi-bottom-list">
                                <div class="quzhi-bottom-title"> 
                                <div class="society_title">找到最佳预警阈值</div><div class="quzhi-bottom-day">(自然周案件)</div> 
                                </div>
                                <div class="quzhi-bottom-cont">3</div>
                            </div>
                        </div>
                    </div>
`;

        this.$dom.html(tpl);
    },


};
