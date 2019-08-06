/**
 * Created by fu.
 * Date: 2015/4/21
 * Time: 20:37
 */
/**
 *
 * @return
 *
 * {
 *      setTitle(title),
 *      close(),
 *      setContent(data),
 *      $open_widget,
 *      showLoad(),
 *      hideLoad(),
 *      disabledCo
 *
 *      nfirm(),
 *      undisabledConfirm(),
 *
 * }
 */
;(function(){
    var $win = $(window);

    var $doc = $(document);
    var defaultOptions = {
        hideConfirm: false,
        width: null,
        height: null,
        confirm: function () {
        },
        title: '',
        zdy_class:'',
        url: '',
        content: '',
        btnString:'',
        closestats:'close', //close，hide
        hideTitle:false,
        hideClose:false,
        posLeft:null,
        posTop:null,
        has_shade:true,
        appendEle:'body',
        is_auto_height:false,
        isFromR:false, //是否从右边滑动
        isPopView:false,//判断弹窗是否view,为计算高度
        closefn:function(){},
        success: function () {
        },
        filterContainer:'',
    };
    var pop_up_num = 0;
    var cur_js_path = (function(){
            var js=document.scripts;
            js=js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/"));
            return js;
        })();
    /**
     this.setTitle()
     this.setContent()
     this.hide()
     this.show()
     this.close()
     this.$open_widget
     this.$ow_open_tit
     this.$ow_open_cont
     this.$ow_open_box
     this.$ow_open_close
     this.$lw_opening
     *
     * @param o
     * @constructor
     */
    window.C = function(o)
    {
        var id = '#c'+new Date().getTime();
        C.zIndex += 50;
        this.options = $.extend({},defaultOptions,o);
        this.options['id'] = id;
        this.options['zIndex'] = C.zIndex;
        this.is_loaded = false;
        this.is_open = true;
        this.init();
        this.appendEle_overflow = '';
    };
    C.zIndex = 1000;
    C.prototype.init = function(){
        var zdy_class = this.options['zdy_class'];
        var $appendEle = $(this.options.appendEle);
        this.appendEle_overflow = $appendEle.css('overflow');
        $appendEle.css({overflow:'hidden'});
        if (this.options.filterContainer){
            $(this.options.filterContainer).addClass('filter_style');
        }
        var is_big_box = false;
        if (this.options.width == null){
            this.options.width = $win.width() * 0.9;
            is_big_box = true;
        }
        if (this.options.height == null){
            this.options.height = $win.height() * 0.8;
        }
        var m  = {};
        var _this = this;
        m.init = function(){
            this.initstring();
            this.bindEvent();
            this.initPosition();
            _this.setTitle(_this.options.title);
            this.initContent();
        };
        var $open_widget;
        m.initstring = function()
        {
            var max_height = _this.options.height;
            var max_heightR=$win.height()-94;
            if(_this.options.isFromR == true){
                max_height=max_heightR
            }
            let btnString = m.getBtnString();
            $open_widget = $('<div class="open_widget '+zdy_class+'" id="'+_this.options.id+'">' +
                                    '<div class="ow_open_box" style="display: none;">' +
                                        '<div class="ow_open_close close" style="position: absolute;z-index:2;right: 10px;top: 10px;font-family: arial, sans-serif; cursor:pointer; display: inline-block; width: 30px; height: 30px; font-size: 50px; color: #d6eaff; line-height: 30px; text-align: center; ">×</div>' +
                                        '<div class="ow_open_tit_center_wapper" style="height: 50px;line-height: 50px;padding-left: 10px;  color: #d6eaff;text-align: center;"><div class="ow_open_tit_center" style="display: inline-block;"></div></div>' +
                                        '<div class="ow_open_tit" style="height: 50px;line-height: 50px;padding-left: 10px;position:absolute;top:0; font-size: 25px;font-weight: bold;color: #d6eaff;"></div>' +
                                        '<div class="ow_open_cont" style="max-height: '+max_height+'px;min-height:70px;overflow:auto;"></div>' +
                                        '<div class="ow_open_btn_w clearfix" style="text-align: right;background:#f7f9fa;padding:5px 8px 5px 0;border-top:1px solid #e3e8ec;">' +
                                         btnString +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="lw_opening" style="background: url('+cur_js_path+'/images/loading@2x.gif)   no-repeat center rgba(0,0,0,.8);background-size: 32px; width: 40px; height: 40px; border-radius: 5px;"></div><div class="lw_has_shade"></div>' +
                                 '</div>');
            $(_this.options.appendEle).append($open_widget);
            _this.$open_widget = $open_widget;
            _this.$ow_open_tit = $open_widget.find('.ow_open_tit');
            _this.$ow_open_cont = $open_widget.find('.ow_open_cont');
            _this.$ow_open_box = $open_widget.find('.ow_open_box');
            _this.$ow_open_close = $open_widget.find('.ow_open_close');
            _this.$lw_opening = $open_widget.find('.lw_opening');
            _this.$ow_open_btn_w = $open_widget.find('.ow_open_btn_w');
            _this.$ow_open_tit_center = $open_widget.find('.ow_open_tit_center');
            _this.$ow_open_tit_center_wapper = $open_widget.find('.ow_open_tit_center_wapper');
            _this.$lw_has_shade = $open_widget.find('.lw_has_shade');

            if (!is_big_box){
                _this.$ow_open_box.addClass('ow_open_box_small');
            }
            if (!btnString){
                _this.$ow_open_btn_w.hide();
            }
            var cont_height = _this.options.height;
            if (!_this.options.hideTitle){
                cont_height = cont_height - 50;
            }
            if(!_this.options.is_auto_height){
                _this.$ow_open_cont.css({'height':cont_height});
            }
            _this.$ow_open_cont.css({'max-height':cont_height});

            if(_this.options.isFromR == true){
                _this.$ow_open_cont.css('height',max_heightR);
                $('.btnCenter').css('marginRight','43%')
            }
            if(_this.options.isPopView == true){
                _this.$ow_open_cont.css({'height':$win.height()-51,'max-height':$win.height()-51})
            }

            if(_this.options.hideTitle){
                _this.$ow_open_tit.hide();
                _this.$ow_open_tit_center_wapper.hide();
            }
            if(_this.options.hideClose){
                _this.$ow_open_close.hide();
            }
            if(_this.options.closestats == 'hide'){
                _this.$ow_open_close.hide();
            }
            if (!_this.options.has_shade){
                _this.$lw_has_shade.hide();
                _this.$lw_has_shade.hide();
            }
        };
        m.getBtnString = function(){
            return _this.options.btnString;
        };
        m.bindEvent = function(){
            _this.$ow_open_close.click(function(){
                if(_this.options.closestats == 'hide'){
                    _this.hide();
                }else{
                    _this.close();
                }
            });
            _this.$open_widget.delegate('form input','keydown',function(e){
                if(e.keyCode == 13){
                    return false;
                }
            });

            setInterval(function () {
                if(_this.is_loaded) {
                    // _this.resetPos();
                }
            },200);
            // _this.$open_widget.on('DOMSubtreeModified',function(){
            //     if(_this.is_loaded){
            //         setTimeout(function(){
            //             _this.resetPos();
            //         },100);
            //     }
            // });
            $(window).resize(function(){
                _this.resetPos();
            });
        };
        m.initPosition = function(){
            var doc_width = $doc.width();
            var doc_height = $doc.height();
            var winhalf = ($win.height()) / 2;
            var pl, pt;
            var pos = _this.getPos();
            pl = pos.left;
            pt = $doc.scrollTop() - 40 / 2 + winhalf;
            //外框
            $open_widget.css({
                // width: doc_width,
                // height: doc_height,
                zIndex: _this.options.zIndex,
                position: 'absolute',
                left: 0,
                top: 0
            }).show();

            //背景阴影
            $open_widget.find('.lw_has_shade').css({
                width: doc_width,
                height: doc_height,
                zIndex: _this.options.zIndex + 1,
                background: '#000',
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0.6
            });

            //加载中。。
            var $lw_opening = $open_widget.find('.lw_opening');
            $lw_opening.css({
               left: $doc.scrollLeft() + (($win.width() - 40) / 2),
               top: pt,
               position: 'absolute',
               zIndex: _this.options.zIndex + 2
            });


            //弹窗


            if(_this.options.isFromR == true){
                var $ow_open_box = $open_widget.find('.ow_open_box').css({
                    position: 'absolute',
                    right: -pl,
                    zIndex: _this.options.zIndex + 3,
                    width: _this.options.width,
                    border:'1px solid #fff',
                    background: 'rgba()',
                    opacity: 0,
                    height:$win.height()
                    // bottom:0
                });
            }else{
                var $ow_open_box = $open_widget.find('.ow_open_box').css({
                    position: 'absolute',
                    left: pl,
                    zIndex: _this.options.zIndex + 3,
                    background: '#02132f',
                    width: _this.options.width,
                    opacity: 0
                });
                if(!_this.options.is_auto_height){
                    $ow_open_box.css({
                        height:_this.options.height,
                    })
                }
            }


        };
        m.initContent = function(){
            if(!_this.options.url){
                _this.$lw_opening.hide();
                _this.setContent(_this.options.content);
                m.anim();
            }else{
                $.ajax({
                    url: _this.options.url,
                    type: 'get',
                    success: function (data) {
                        _this.setContent(data);
                        _this.$lw_opening.hide();
                        m.anim();

                    },
                    error: function () {
                        _this.close();
                        Tip('操作失败!', 'error');
                    }
                });

            }
        };
        m.anim = function(){

            var pt = _this.getPos().top;
            if(_this.options.isFromR == true){
                _this.$ow_open_box.css({top:pt});
                _this.$ow_open_box.show().animate({right:0, opacity: 1}, 300, 'linear', function () {
                    if (typeof _this.options.success == 'function') {
                        _this.options.success();
                        _this.is_loaded = true;
                        pop_up_num++;
                    }
                });
            }else {
                _this.$ow_open_box.css({top: pt - 90});
                _this.$ow_open_box.show().animate({top: pt, opacity: 1}, 300, 'easeOutBack', function () {
                    if (typeof _this.options.success == 'function') {
                        _this.options.success();
                        _this.is_loaded = true;
                        pop_up_num++;
                        // _this.$ow_open_cont.css('height',_this.$ow_open_cont.css('height'));
                    }
                });
            }
        };
        m.init();
    };
    C.prototype.resetPos = function()
    {
        var pos = this.getPos();
        var pt = pos.top;
        var pl = pos.left;
        var pl_r=$doc.scrollLeft()+($win.width() - this.$ow_open_box.width());
        if(this.options.isFromR == true){
            this.$ow_open_box.css({top: pt,left:pl_r});
            this.$ow_open_box.show().css({top: pt,left:pl_r});
        }else{
            this.$ow_open_box.css({top: pt - 90, left:pl});
            this.$ow_open_box.show().css({top: pt, left:pl});

            this.$open_widget.find('.lw_has_shade').css({
                width:$doc.width(),
                height:$doc.height()
            });
        }
    };
    C.prototype.getPos = function () {
        var pl = this.options.posLeft;
        if (pl === null) {
            pl = $doc.scrollLeft() + ($win.width() - this.options.width) / 2;
        }
        var pt = this.options.posTop;
        if (pt === null){
            var winhalf = ($win.height()) / 2;
            pt = $doc.scrollTop() - parseInt(this.$ow_open_box.height() / 2) + winhalf;
            if(pt < 0){
                pt = 0;
            }
        }

        return {
            left:pl,
            top:pt
        };
    },
    C.prototype.setTitle = function(title){
        this.$ow_open_tit.html(title);
    };
    C.prototype.setContent = function(content){
        this.$ow_open_cont.html(content);
    };
    C.prototype.close = function(){
        if (!this.is_open){
            return;
        }
        console.log(pop_up_num);
        if (pop_up_num <= 1){
            $(this.options.appendEle).css({overflow:this.appendEle_overflow});
        }
        if (this.options.filterContainer){
            $(this.options.filterContainer).removeClass('filter_style');
        }
        this.$open_widget.remove();
        this.options.closefn();
        this.is_open = false;
        pop_up_num--;
    };
    C.prototype.hide = function()
    {
        $(this.options.appendEle).css({overflow:this.appendEle_overflow});
        this.$open_widget.hide();
    };
    C.prototype.show = function()
    {
        this.$open_widget.hide();
    };

    function c_confirm(content,fn,cancelfn,title)
    {
        var c = new C({
            title:title?title:'提示',
            width:300,
            content:'<div style="padding: 10px">'+content+'</div>',
            btnString:'<div style="float: right;" class="btnCenter">' +
                            '<button class="btn btn-grey btn-sm cancel" style="float:left;margin: 5px;">'+'取消</button>' +
                            '<button style="margin: 5px;float:left;" class="btn btn-sm btn-primary confirm">'+'确认</button>' +
                        '</div>',
            closefn:cancelfn
        });
        c.$open_widget.find('.cancel').click(function(){
            c.close();
            if(typeof cancelfn == 'function'){
                cancelfn();
            }
        });
        c.$open_widget.find('.confirm').click(function(){
            c.close();
            if(typeof fn == 'function'){
                fn();
            }
        });
        return c;
    }

    function c_alert(content)
    {
        var c = new C({
            width:300,
            content:'<div style="padding: 10px">'+content+'</div>',
            btnString:'<div style="float: right;" class="btnCenter">' +
                            '<button style="margin: 5px;float:left;" class="btn btn-sm btn-primary confirm">确定</button>' +
                        '</div>'
        });
        c.$open_widget.find('.confirm').click(function(){
            c.close();
        });
        return c;
    }
    function c_editOpen(options)
    {
        var buttonstr = '';
        if (options && options.buttons){
            for(var i in buttons){
                var button = buttons[i];
                buttonstr += '<button class="btn '+button.classname+'">'+ button.name+'</button>';
            }
        }
        var dc = $.extend({
                    url:options.url,
                    btnString:'<div style="float: right;" class="btnCenter">' +
                                    '<span style="float: left;height: 38px; display: none;  width: 30px; background: url('+cur_js_path+'/images/loading_b.gif) no-repeat center;" class="ow_loading"></span>' +
                                    '<button class="btn btn-sm btn-grey cancel" style="float:left;margin: 5px;">取消</button>' +
                                    '<button style="margin: 5px;float:left;" class="btn btn-sm btn-primary confirm ">确定</button>' +
                                '</div>'
                },options);
        var c = new C(dc);
        var $ow_loading = c.$open_widget.find('.ow_loading');
        c.$open_widget.find('.cancel').click(function(){
            c.close();
        });
        var $confirm = c.$open_widget.find('.confirm');
        $confirm.click(function(){
            if(typeof options.beforefn == 'function'){
                if(!options.beforefn()){
                    return false;
                }
            }
            var exec_request = function () {
                $ow_loading.show();
                $confirm.addClass('disabled');
                var action = c.$open_widget.find('form').attr('action');
                $.ajax({
                    url: action?action:options.url,
                    type: 'post',
                    dataType: 'json',
                    data: c.$open_widget.find('form').serialize(),
                    success: function (data) {
                        if (data.ok) {
                            c.close();
                            if(options.successAfter){
                                options.successAfter(data);
                            }
                            if(typeof options.success === "function"){
                                options.success(data);
                            }
                        } else {
                            $confirm.removeClass('disabled');
                            $ow_loading.hide();
                            Tip(data.error, 'error');
                        }
                    },
                    error: function () {
                        $ow_loading.hide();
                        $confirm.removeClass('disabled');
                        Tip('操作失败!', 'error');
                    }
                });
            };
            if(c.$open_widget.validation){
                $(c.$open_widget).validation(function() {
                    exec_request();
                });
            }else{
                exec_request();
            }

        });
        return c;
    }
    function c_view(options)
    {
       return new C(options);
    }
    function c_open(option)
    {
        var defaultoption = {};
        defaultoption.btn1 = {
            name:'取消',
            color:'grey',
            fn:function(){c.close();}
        };
        defaultoption.btn2 = {
            name:'确定',
            color:'primary',
            fn:function(){}
        };
        option = $.extend(true,defaultoption,option);

        option.btnString = '<div style="float: right;" class="btnCenter">' +
                                    '<span style="float: left;height: 50px; display: none;" class="ow_loading"></span>' +
                                    '<button class="btn btn-sm btn-'+option.btn1.color+' cancel" style="float:left;margin: 5px;">'+option.btn1.name+'</button>' +
                                    '<button style="margin: 5px;float:left;" class="btn btn-sm  btn-'+option.btn2.color+' confirm">'+option.btn2.name+'</button>' +
                                '</div>';
        var c = new C(option);
        c.$open_widget.find('.cancel').click(function(){
            option.btn1.fn();
        });
        c.$open_widget.find('.confirm').click(function(){
            option.btn2.fn();
        });
        return c;
    }

    /**
     options选项内容
     {
         hideConfirm: false,
         width: 600,
         height: 400,
         confirm: function () {
         },
         title: '提示',
         url: '',
         content: '',
         btnString:'',
         closestats:'close', //close，hide
         hideTitle:false,
         closefn:function(){},
         success: function () {
         }
     }

     */
    window.pop = {
        view:function(options){
            return c_view(options);
        },
        confirm:function(content,fn,cancelfn,title){
            return c_confirm(content,fn,cancelfn,title);
        },
        alert:function(content){
            return c_alert(content);
        },
        open:function(option){
             return c_open(option);
        },
        /**
         * beforefn:function(){}
         * buttons:[{"name":"ss","classname":"","callback":function(){}}]
         * @param options
         */
        editOpen:function(options){
            return c_editOpen(options);
        }
    };

})();
