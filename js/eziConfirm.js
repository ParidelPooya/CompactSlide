var RenderMode = { auto: 1, vertical: 2, horizontal: 3, manual:4 };

(function ($) {
    var eziConfirm = function () {
        
        // locals
        var defaultParam = {
            Title: "Are You Sure?",
            Desc: "",
            CloseButton: true,
            ClassName: "",
            Width: 320,
            Height: 60,
            RenderMode: RenderMode.horizontal, 
            Cols: 1,
            ButtonDefault :
                { Width: 100, Height: 18, ClassName: '', AutoClose:true, FireGlobalFunction: false, FireFunction: function () { } },
            Button:   
                [
                    { Title: "Yes", FireGlobalFunction: true },
                    { Title: "No", ClassName: 'red' }
                ],
            FireFunction: function () {},
            Direction: 'ltr'
        };

        var methods = {
            init: function (ConfirmParameter) {

                param = defaultParam;
                param = $.extend({},param, ConfirmParameter);

                var no = parseInt(Math.random()*10000,10);

                var MarginLeft = -(25 + param.Width / 2);
                var MarginTop = -(param.Height / 2);

                if (param.RenderMode == 1) {
                    param.Cols = Math.round(Math.pow(param.Button.length, 0.5));
                }
                else if (param.RenderMode == 3) {
                    param.Cols = param.Button.length;
                }

                var ModalWindowHtml =
                "<div id='ConfirmWindow" + no + "' style='width:" + (param.Width + 40) + "px;height:" + (param.Height + 40) + "px;margin-left:" + MarginLeft + "px;margin-top:" + MarginTop + "px' " +
                "class='popup_block " + param.ClassName + "'>" +
                "   <div class='popup_title' style='direction:" + param.Direction + ";margin-left:20px;width:" + param.Width + "px;z-index:1001;position:absolute;'>" + param.Title + "</div>";

                if(param.CloseButton)
                    ModalWindowHtml +=
                        "<div onclick=\"$('#ConfirmWindow" + no + "').remove()\" style='margin-left:" + 
                        (param.Direction=="ltr"? (-MarginLeft - 45):(MarginLeft) ) + 
                        "px;margin-top:" + (MarginTop) + "px' class='popup_close' />";

                ModalWindowHtml +="   <div style='direction:" + param.Direction + ";width:" + param.Width + "px;height:" + param.Height + "px;margin-left:" + MarginLeft + "px;margin-top:" + MarginTop + "px' class='popup_inside' >" +
                param.Desc + "<br/><table style='margin-left:auto;margin-right:auto;'>";

                var BtnParam;
                var OnClickCode = '';

                for (var ipos = 0; ipos < param.Button.length; ipos++) {

                    var BtnParam = param.ButtonDefault;
                    BtnParam = $.extend({},BtnParam, param.Button[ipos]);

                    if (ipos % param.Cols == 0)
                        ModalWindowHtml += "<tr>";

                    ModalWindowHtml += "<td><div id='ConfirmWindow" + no + "Btn" + ipos + "' class='popup_btn " + BtnParam.ClassName + "' style='width:" + BtnParam.Width + "px;Height:" + BtnParam.Height + "px'>" + BtnParam.Title + "</div></td>";

                    if (ipos % param.Cols == param.Cols - 1 || ipos==param.Button.length-1)
                        ModalWindowHtml += "</tr>";

                }

                ModalWindowHtml += "</table></div></div>";

                $(this).append(ModalWindowHtml);

                for (var ipos = 0; ipos < param.Button.length; ipos++) {

                    var BtnParam = param.ButtonDefault;
                    BtnParam = $.extend({},BtnParam, param.Button[ipos]);

                    if (BtnParam.FireGlobalFunction) {
                        $("#ConfirmWindow" + no + "Btn" + ipos).click(param.FireFunction);
                    }
                    else {
                        $("#ConfirmWindow" + no + "Btn" + ipos).click(BtnParam.FireFunction);
                    }
                    if(BtnParam.AutoClose)
                        $("#ConfirmWindow" + no + "Btn" + ipos).click(function () { $("#ConfirmWindow" + no).remove() });
                }

                return this;
            },
            AddNode: function (o) {}
        };

        return methods;

    };

    $.fn.eziConfirm = function (method) {

        var args = arguments;

        return this.each(function () {
            var state = $(this).data('eziConfirm');

            // Method calling logic
            if (state && state[method]) {
                state[method].apply(this, Array.prototype.slice.call(args, 1));
            } else if (typeof method === 'object' || !method) {

                var pt = (new eziConfirm(this));
                pt.init.apply(this, args);

                // save state in jquery data
                $(this).data('eziConfirm', pt);

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.eziConfirm');
            }
        });
    };
})(jQuery);