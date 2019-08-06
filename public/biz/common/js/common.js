
function borderCorner($dom){
    let tpl = `<div class="panel-corner topLeft">
                    <svg id="" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
                    <path d="M15.4,5.5h-2.9c-5,0-6,1-6,6v4.9H4.6v-4.9C4.6,6,7,3.6,12.5,3.6h2.9V5.5z" fill="#0099df"/>
                </svg>
                </div>
                <div class="panel-corner topRight">
                    <svg version="1.1" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
                    <path d="M14,16.4v-4.9c0-5-1-6-6-6H4.1V3.6H8c5.5,0,7.9,2.5,7.9,7.9v4.9H14z" fill="#0099df"/>
                </svg>
                </div>

                <div class="panel-corner botLeft">
                    <svg version="1.1" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
                    <path d="M6.5,4.1V8c0,5,1,6,6,6h2.9v1.9h-2.9C7,15.9,4.6,13.5,4.6,8V4.1H6.5z" fill="#0099df"/>
                </svg>
                </div>
                <div class="panel-corner botRight">
                    <svg version="1.1" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
                        <path d="M4.1,14H8c5,0,6-1,6-6V4.1h1.9V8c0,5.5-2.5,7.9-7.9,7.9H4.1V14z" fill="#0099df"/>
                    </svg>
                </div>`;
    $dom.append(tpl);
}

//svg圆环
function svgDonut(){
    Vue.component('svg_donut',{
        props:{
            options:Object
        },
        template:`<div class="donut" ref="donut">
                               <svg version="1.1" xmlns="http://www.w3.org/2000/svg"   :width="options.size" :height="options.size" viewBox="0 0 220 220">
                                    <circle class="donut__svg__scrim" r="100" cy="110" cx="110" :stroke-width="options.strokeWidth" :stroke="options.circleColor" fill="none"></circle>

                                    <path id="circlePath" d="M 110 10 a 100 100 0 0 1 0 200 a 100 100 0 0 1 0 -200 Z" fill="none" :stroke="options.animateColor" :stroke-width="options.strokeWidth" stroke-linecap="round" stroke-dasharray="628.4073486328125">
                                        <animate id="circleAnimate" attributeName="stroke-dashoffset" from="628.4073486328125" to="0" dur="3s" repeatDur="" fill="freeze" begin="indefinite" restart="whenNotActive"></animate>
                                    </path>
                                    <g>
                                        <rect x="-15" y="-15" width="30" height="30" fill="url(#tail_1)">
                                            <animateMotion id="tailAnimate"  path="M 110 10 a 100 100 0 0 1 0 200 a 100 100 0 0 1 0 -200 Z" dur="3s" repeatDur="" fill="freeze" rotate="auto" begin="indefinite" restart="whenNotActive"></animateMotion>
                                        </rect>
                                   </g>
                                     <defs>
                                        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="60%" id="tail_1">
                                            <stop stop-opacity="1" stop-color="#fff" offset="30%"/>
                                            <stop stop-opacity="0.5" stop-color="#fff" offset="40%"/>
                                            <stop stop-opacity="0" stop-color="#fff" offset="80%"/>
                                        </radialGradient>
                                       
                                    </defs>
                                </svg>
                                <div class="donut_msg" :style="{color:options.animateColor}">
                                    <div class="donut_per"><span :style="{fontSize:options.fontSize}">{{options.percent}}</span>%</div>
                                    <div class="donut_text">{{options.name}}</div>
                                </div>
                            </div>`,
        mounted:function(){
            let that = this;
            that.runAnimate(that.options.percent, that.$refs.donut);
            setInterval(function(){
                that.runAnimate(that.options.percent, that.$refs.donut);
            },5000)

        },
        methods:{
            runAnimate:function(percent,dom){

                if(percent == 0){
                    percent = 0.1;
                }

                var totalTime = 3;
                var $circleAnimate = $(dom).find('#circleAnimate');
                var $tailAnimate = $(dom).find('#tailAnimate');
                var per = percent/100;
                var durTime = totalTime * per;

                $circleAnimate[0].setAttribute('repeatDur', durTime + 's');
                $tailAnimate[0].setAttribute('repeatDur', durTime + 's');
                $circleAnimate[0].beginElement();
                $tailAnimate[0].beginElement();
            }
        }
    });
}


/*进度条*/
function progressBar(dom,percent){
    let domBar = $(dom).find(".progressColorBar");
    let progreBarW=$(dom).width() * 0.58;
    let progreColorW=progreBarW*(percent/100);

    domBar.animate({width:progreColorW},'slow');
}

function progressBarByJSP(dom,percent,coefficient=0.78){
    let domBar = $(dom).find(".progressColorBar");
    let progreBarW=$(dom).width() * coefficient;
    let progreColorW=progreBarW*(percent/100);
    domBar.animate({width:progreColorW},'slow');
}
//create by zl
function progressBarByWJ(dom,percent){
    let domBar = $(dom).find(".progressColorBar");
    domBar.animate({width:percent},'slow');

}

function progressLine(dom,percent){
    var domBar = $(dom).find(".progressColorLine");

    var progreBarW=$(dom).width()*0.85;
    var progreColorW=progreBarW*(percent/100);

    domBar.animate({width:progreColorW},'slow');
}

/**
 *
 * @param options
 * {
 *      "url":"",
 *      "fn":"",
 *      "err_fn":""
 * }
 */
function ajax_jsonp_request(options) {
    var datatype = 'json';
    var default_options = {
        url:"",
        fn:function () {

        },
        post_data:{
        },
        err_fn:function () {
        },
        $dom:null
    };
    options = $.extend(default_options,options);

    if (options.$dom){
        options.$dom.addClass('loading');
    }
    $.ajax({

        url: options.url,
        type: 'post',
        dataType: datatype,
        data: options.post_data,
        crossDomain: true,
        jsonp:'jsoncallback',
        success: function (data) {

            if (options.$dom){
                options.$dom.removeClass('loading');
            }
            if (datatype == 'json') {
                if (data.ok) {
                    options.fn(data);
                } else {
                    console.error(data.error, options.url);
                    options.err_fn(data);
                }
            } else {
                options.fn(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
            if (options.$dom){
                options.$dom.removeClass('loading');
            }
            if(XMLHttpRequest.readyState == 0){
                console.error('未初始化', options.url);
                return;
            }
            console.error(XMLHttpRequest.responseText, options.url);
            options.err_fn();

        }
    });
}
function chartPos(outDom,chartDom,divide_x,divide_y,is_need_padding,padding){
    padding = padding || 10;
    if(typeof is_need_padding === "undefined")
    {
        is_need_padding = true;
    }
    if(!is_need_padding){
        padding = 0;
    }
    var chart_w = $(outDom).width();

    var chart_h = $(outDom).height();
    var item_w = chart_w/divide_x;
    var item_h = chart_h/divide_y;


    $(chartDom).each(function(){
        var coordinate_x = $(this).data('coordinate_x');
        var coordinate_y = $(this).data('coordinate_y');
        var width = $(this).data('width');
        var height = $(this).data('height');
        $(this).css({
            'width':item_w * width - padding,
            'height':item_h * height - padding,
            'top':item_h * coordinate_y,
            'left':item_w * coordinate_x
        });

    });
}

function getBrowserVersion() {
    var uaMatch;
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/msie ([\d.]+)/) != null) {
        //ie6--ie9
        uaMatch = userAgent.match(/msie ([\d.]+)/);
        return 'IE' + uaMatch[1];
    } else if (userAgent.match(/(trident)\/([\w.]+ )/)) {
        uaMatch = userAgent.match(/trident\/([\w.]+)/);
        switch (uaMatch[1]) {
            case "4.0":
                return "IE8";
                break;
            case "5.0":
                return "IE9";
                break;
            case "6.0":
                return "IE10";
                break;
            case "7.0":
                return "IE11";
                break;
            default:
                return "undefined";
        }
    }
    return "undefined";
}
function css(el,option) {
    for(let i in option){
        el.style[i]=option[i];
    }
}
//获取浏览器缩放比例
function detectZoom (){
    var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio){
        ratio = Math.round(ratio * 100);
    }

    return ratio;
};

