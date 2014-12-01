(function ($) {
    var eziColor = function () {

        // locals
        var defaultParam = {};

        var decimalToHex = function (d, padding) {
            var hex = Number(d).toString(16);
            padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

            while (hex.length < padding) {
                hex = "0" + hex;
            }

            return hex;
        }

        var ShowColor = function (color, brightness) {

            var colorArray = [
                [[255, 255, 255], [000, 000, 000]],
                [[202, 240, 253], [2, 54, 73]],
                [[213, 227, 253], [6, 29, 85]],
                [[219, 201, 252], [19, 3, 58]],
                [[243, 200, 252], [47, 4, 61]],
                [[250, 210, 224], [60, 5, 27]],
                [[255, 217, 216], [92, 2, 3]],
                [[255, 226, 215], [90, 26, 4]],
                [[255, 236, 214], [88, 51, 6]],
                [[254, 242, 215], [85, 61, 8]],
                [[253, 252, 223], [101, 97, 17]],
                [[247, 250, 221], [78, 85, 15]],
                [[223, 237, 213], [36, 62, 19]]
            ];

            var r = Math.ceil(colorArray[color][1][0] + (colorArray[color][0][0] - colorArray[color][1][0]) * brightness / 12);
            //r = decimalToHex(r, 2);

            var g = Math.ceil(colorArray[color][1][1] + (colorArray[color][0][1] - colorArray[color][1][1]) * brightness / 12);
            //g = decimalToHex(g, 2);

            var b = Math.ceil(colorArray[color][1][2] + (colorArray[color][0][2] - colorArray[color][1][2]) * brightness / 12);
            //b = decimalToHex(b, 2);

            return r + "," + g + "," + b;

        }

        var methods = {
            init: function (options) {

                var param = $.extend({}, defaultParam, options);

                $(this).attr('data-color', param.color);

                $(this).click(
                    function () {

                        var x = this.getBoundingClientRect().left - 80;
                        var y = this.getBoundingClientRect().top + this.offsetHeight + 2;

                        var csid = this.id + "_colorSelector";

                        var csColorOpacity = $(this).attr('data-color').split(',');
                        var csColor = csColorOpacity[0] + "," + csColorOpacity[1] + "," + csColorOpacity[2];
                        var csOpacity = csColorOpacity[3];

                        if ($("#" + csid).length != 0) {

                            $("#" + csid).attr('data-color', csColor);
                            $("#" + csid).attr('data-opacity', csOpacity);

                            $("#" + csid + "_preview").css('background-color', "rgba(" + csColor + "," + csOpacity + ")");

                            $("#" + csid).show();
                            return;
                        }

                        var cshtml =
                        "<div id='" + csid + "' data-color='" + csColor + "' data-opacity='" + csOpacity + "' style='border:1px solid #aaaaaa;z-index:999;line-height:8px;padding:5px;position:absolute;top:" + y + "px;left:" + x + "px;width:185px;height:245px;background-color:#eeeeee;border-radius: 4px 4px 4px 4px;'>" +
                        "<div style='width:50px;height:20px;background-color:red;border:1px solid black;line-height:10px'><div style='width:25px;height:10px;background-color:white;border:0px;display:inline-block'></div><div style='width:25px;height:10px;background-color:black;border:0px;display:inline-block'></div><div style='width:25px;height:10px;background-color:black;border:0px;display:inline-block'></div><div style='width:25px;height:10px;background-color:white;border:0px;display:inline-block'></div></div>" +
                        "<div id='" + csid + "_preview' style='position:relative;top:-22px;width:50px;height:20px;margin-bottom:-20px;background-color:rgba(" + csColor + "," + csOpacity + ");border:1px solid black'></div>";

                        var colorBoxStyle = "display:inline-block;width:13px;height:13px;margin:0px;border-top:1px solid black;border-left:1px solid black";
                        var colorBoxRightStyle = "display:inline-block;width:13px;height:13px;margin:0px;border-top:1px solid black;border-left:1px solid black;border-right:1px solid black";
                        var colorBoxBottomStyle = "display:inline-block;width:13px;height:13px;margin:0px;border-top:1px solid black;border-left:1px solid black;border-bottom:1px solid black";
                        var colorBoxBottomRightStyle = "display:inline-block;width:13px;height:13px;margin:0px;border:1px solid black";

                        var style;
                        var cellColor;

                        for (var ipos = 0; ipos < 13; ipos++) {
                            for (var jpos = 0; jpos < 13; jpos++) {

                                if (jpos == 12) {
                                    if (ipos == 12)
                                        style = colorBoxBottomRightStyle;
                                    else
                                        style = colorBoxRightStyle;
                                }
                                else {
                                    if (ipos == 12)
                                        style = colorBoxBottomStyle;
                                    else
                                        style = colorBoxStyle;
                                }
                                cellColor = ShowColor(ipos, jpos);
                                cshtml += "<div data-type='cell' data-color='" + cellColor + "' style='" + style + ";background-color:rgba(" + ShowColor(ipos, jpos) + ",1)'></div>";
                            }
                        }
                        cshtml += "<div style='margin-top:4px;font-family:tahoma;font-size:12px'>Opacity:</div>" +
                            "<div id='" + csid + "_opacity' style='margin-top:7px;margin-left:" + (csOpacity * 185 - 5) + "px;width:10px;height:20px;border:1px solid black'></div>" +
                            "<div id='" + csid + "_opacityScroll' data-type='opacity' style='position:relative;top:-18px;width:181px;height:12px;line-height:10px;border:1px solid black;background:linear-gradient(to right, rgba(255,255,255,0.7) , rgba(0,0,0,0.7));'></div>";

                        cshtml += "</div>";

                        $(document.body).append(cshtml);


                        $(document).mouseup(function (e) {
                            var container = $("#" + csid);

                            if (!container.is(e.target) // if the target of the click isn't the container...
                            && container.has(e.target).length === 0) // ... nor a descendant of the container
                            {
                                container.hide();
                            }

                            if (container.has(e.target).length !== 0) {
                                if (typeof $(e.target).attr('data-type') != "undefined") {
                                    switch ($(e.target).attr('data-type')) {
                                        case 'cell':
                                            var color = $(e.target).attr('data-color');
                                            var opacity = container.attr('data-opacity');

                                            container.attr('data-color', color);
                                            $("#" + csid + "_preview").css("background-color", "rgba(" + color + "," + opacity + ")");

                                            container.hide();
                                            param.onColorChange(color + "," + opacity);
                                            break;
                                        case 'opacity':
                                            var opacity = (e.pageX - e.target.parentElement.offsetLeft - e.target.offsetLeft);
                                            $("#" + csid + "_opacity").css("margin-left", (opacity - 5) + "px");

                                            var color = container.attr('data-color');

                                            opacity = Math.ceil(100 * opacity / 185) / 100;
                                            if (opacity < 0.05)
                                                opacity = 0;
                                            else if (opacity > 0.95)
                                                opacity = 1;

                                            container.attr('data-opacity', opacity);
                                            $("#" + csid + "_preview").css("background-color", "rgba(" + color + "," + opacity + ")");

                                            container.hide();
                                            param.onColorChange(color + "," + opacity);
                                            break;
                                    }
                                }
                            }
                        });


                    });
            }
        };

        return methods;

    };

    $.fn.eziColor = function (method) {

        var args = arguments;

        return this.each(function () {
            var state = $(this).data('eziColor');

            // Method calling logic
            if (state && state[method]) {
                state[method].apply(this, Array.prototype.slice.call(args, 1));
            } else if (typeof method === 'object' || !method) {

                var pt = (new eziColor(this));
                pt.init.apply(this, args);

                // save state in jquery data
                $(this).data('eziColor', pt);

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.eziColor');
            }
        });
    };

})(jQuery);

