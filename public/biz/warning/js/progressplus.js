
(function ($) {
    $.fn.progressplus = function (options) {

        var settings = $.extend(true, {
            data:[],
            barContentWidthPercent:100,
            barWidthPercent:75,
            isShowSequece:true,
            isShowNum:true,
            isShowPercent:true,
            nameKey:"name",
            valueKey:"value",
            overdom:'', //有两个及以上的列表元素div
            isForPercent: false,
        }, options);


        var htmlStr = '';
        var totalNum = 0;
        var maxNum = 0;

        // $.each(settings.data, function(i, n){
        //     totalNum += n[settings.valueKey];
        //     if(n[settings.valueKey] > maxNum){
        //         maxNum = n[settings.valueKey];
        //     }
        // });

        var divisorNum = maxNum;
        if(settings.isForPercent){
            divisorNum = totalNum;
        }

        for (var i = 0; i < settings.data.length; i++) {
            htmlStr += '<div class="progressplus-list">';
            if(settings.isShowSequece){
                htmlStr += '<div class="progressplus-sequece"><i>'+(i+1)+'</i></div>';
            }
            htmlStr += '<div class="progressplus-name">'+settings.data[i][settings.nameKey]+'</div>';
            htmlStr += '<div class="progressplus-bar-content progressplus-bar-content-'+(i+1)+'">';

            var percent = 0;
            if(divisorNum > 0){
                percent = settings.data[i][settings.valueKey] * 100 / divisorNum;
                percent = percent.toFixed(2);
            }

            htmlStr += '<div class="progressplus-bar progressplus-bar-'+(i+1)+'" data-value="'+settings.data[i][settings.valueKey]+'" data-percent="'+percent+'">';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';
        };

        $(this).html(htmlStr);
        $('.progressplus-bar-content').css({width: settings.barContentWidthPercent + '%'});

        if(settings.data.length >0){
            for(var i =0; i<settings.data.length; i++){
                var itemValue = settings.data[i][settings.valueKey];
                maxNum=settings.data[0].value;
                var percent = 0;
                if(maxNum > 0){
                    percent = itemValue/maxNum * 100;
                }
                progressBar('.progressplus-bar-content-'+(i+1), percent);
            }
        }


        function progressBar(dom,percent){

            if(settings.overdom != ''){
                var domBar = $(settings.overdom).find(dom).find(".progressplus-bar");
            }else{
                var domBar = $(dom).find(".progressplus-bar");
            }

            var progreBarW=$(dom).width();
            var progreColorW=progreBarW*(percent/100)*settings.barWidthPercent/100;

            domBar.animate({width:progreColorW},'slow', function(){
                var value = domBar.data('value');
                var percent = domBar.data('percent');
                var otherInfo = '';
                if(settings.isShowNum){
                    otherInfo += value;
                }
                if(settings.isShowPercent){
                    if(otherInfo){
                        otherInfo += '(' + percent + '%)';
                    }else{
                        otherInfo += percent;
                    }
                }
                domBar.parent().append('<span class="progressplus-otherinfo">'+otherInfo+'</span>');
            });
        }



    }

} (jQuery));