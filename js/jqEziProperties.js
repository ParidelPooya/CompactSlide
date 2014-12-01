(function ($) {
    var eziProperties = function () {


        var defaultParam = {};

        var ShowProprtyOnTheFly = function (elm, param, key) {

            InputID = elm.id + "_" + key;
            InputType = Object.prototype.toString.call(param.InputProperties[key]);

            if (InputType == "[object Object]") {

                $(elm).append(
                            "<tr>" +
                            "<td colspan=3 style='border:1px solid #aaaaaa;;background-color:#bbbbbb;font-size:11px;color:#000'>" + key + "</td>" +
                            "</tr>");

                for (var subKey in param.InputProperties[key]) {

                    InputID = elm.id + "_" + key + "_" + subKey;
                    InputValue = param.InputProperties[key][subKey];

                    $(elm).append(
                            "<tr>" +
                            "<td style='border:1px solid #aaaaaa;background-color:#bbbbbb;width:30px;'></td>" +
                            "<td style='border:1px solid #aaaaaa;font-size:11px;color:#000'>" + subKey + "</td>" +
                            "<td style='border:1px solid #aaaaaa'>" +
                                "<input style='border:0px solid white;background-color:transparent;font-size:11px' data-type='" + InputType + "' data-key='" + key + "." + subKey + "' id='" + InputID + "' value='" + InputValue + "'>" +
                            "</td>" +
                            "</tr>");

                    $(document.getElementById(InputID)).change(function () {
                        param.onPropertyChange(
                                    $(this).attr('data-key').split('.')[0],
                                    $(this).attr('data-key').split('.')[1],
                                    this.value)
                    });

                }
            }
            else {

                if (InputType == "[object Array]") {
                    InputValue = param.InputProperties[key].join(',');
                }
                else {
                    InputValue = param.InputProperties[key];
                }

                $(elm).append(
                            "<tr>" +
                            "<td colspan=2 style='border:1px solid #aaaaaa;font-size:11px;color:#000'>" + key + "</td>" +
                            "<td style='border:1px solid #aaaaaa'>" +
                                "<input style='border:0px solid white;background-color:transparent;font-size:11px' data-type='" + InputType + "' data-key='" + key + "' id='" + InputID + "' value='" + InputValue + "'>" +
                            "</td>" +
                            "</tr>");

                $(document.getElementById(InputID)).change(function () {

                    if ($(this).attr('data-type') == "[object Array]") {
                        param.onPropertyChange(null, $(this).attr('data-key'), this.value.split(','))
                    }
                    else {
                        param.onPropertyChange(null, $(this).attr('data-key'), this.value)
                    }

                });
            }

        }


        var ShowProprtyBaseOnHelper = function (elm, param, key) {

            InputID = elm.id + "_" + key;
            InputType = param.PropertyHelper[key].type;

            if (InputType == "category") {

                $(elm).append(
                            "<tr>" +
                            "<td colspan=3 style='border:1px solid #aaaaaa;;background-color:#bbbbbb;font-size:11px;color:#000'>" + key + "</td>" +
                            "</tr>");

                for (var subKey in param.InputProperties[key]) {

                    InputID = elm.id + "_" + key + "_" + subKey;
                    InputValue = param.InputProperties[key][subKey];

                    $(elm).append(
                            "<tr>" +
                            "<td style='border:1px solid #aaaaaa;background-color:#bbbbbb;width:30px;'></td>" +
                            "<td style='border:1px solid #aaaaaa;font-size:11px;color:#000'>" + subKey + "</td>" +
                            "<td style='border:1px solid #aaaaaa'>" +
                                "<input style='border:0px solid white;background-color:transparent;font-size:11px' data-type='" + InputType + "' data-key='" + key + "." + subKey + "' id='" + InputID + "' value='" + InputValue + "'>" +
                            "</td>" +
                            "</tr>");

                    $(document.getElementById(InputID)).change(function () {
                        param.onPropertyChange(
                                    $(this).attr('data-key').split('.')[0],
                                    $(this).attr('data-key').split('.')[1],
                                    this.value)
                    });

                }
            }
            else {
                switch (InputType) {
                    case 'color':
                        ShowColorInputType(elm, param, key);
                        break;
                    case 'select':
                        ShowSelectInputType(elm, param, key);
                        break;
                    case 'range':
                        ShowRangeInputType(elm, param, key);
                        break;
                    default:
                        if (InputType == "array") {
                            InputValue = param.InputProperties[key].join(',');
                        }
                        else {
                            InputValue = param.InputProperties[key];
                        }

                        $(elm).append(
                            "<tr>" +
                            "<td colspan=2 style='border:1px solid #aaaaaa;font-size:11px;color:#000'>" + key + "</td>" +
                            "<td style='border:1px solid #aaaaaa'>" +
                                "<input style='border:0px solid white;background-color:transparent;font-size:11px' data-type='" + InputType + "' data-key='" + key + "' id='" + InputID + "' value='" + InputValue + "'>" +
                            "</td>" +
                            "</tr>");

                        $(document.getElementById(InputID)).change(function () {

                            if ($(this).attr('data-type') == "array") {
                                param.onPropertyChange(null, $(this).attr('data-key'), this.value.split(','))
                            }
                            else {
                                param.onPropertyChange(null, $(this).attr('data-key'), this.value);
                            }

                        });

                        break;
                }

            }

        }


        var ShowColorInputType = function (elm, param, key) {

            var InputValue = param.InputProperties[key];
            var InputID = elm.id + "_" + key;

            $(elm).append(
                "<tr>" +
                "<td colspan=2 style='border:1px solid #aaaaaa;font-size:11px;color:#000'>" + key + "</td>" +
                "<td style='border:1px solid #aaaaaa;background-color:rgba(" + InputValue.join(',') + ")' data-key='" + key + "' id='" + InputID + "'>" +
                "</td>" +
                "</tr>");

            $('#' + InputID).eziColor(
            {
                color: InputValue,
                onColorChange: function (color) {

                    var FillColor = color.split(',');

                    param.onPropertyChange(null, key, FillColor)

                    $('#' + InputID).css("background-color", "rgba(" + color + ")");

                }
            });

        }

        var ShowSelectInputType = function (elm, param, key) {

            var InputValue = param.InputProperties[key];
            var InputID = elm.id + "_" + key;

            var optionsHTML = '';
            var options = param.PropertyHelper[key].options;
            var sel = '';

            for (var ipos = 0; ipos < options.length; ipos++) {

                sel = (InputValue == options[ipos][0]) ? "selected=selected" : "";

                optionsHTML += "<option " + sel + " value='" + options[ipos][0] + "'>" + options[ipos][1] + "</option>";

            }

            $(elm).append(
                            "<tr>" +
                            "<td colspan=2 style='border:1px solid #aaaaaa;font-size:11px;color:#000'>" + key + "</td>" +
                            "<td style='border:1px solid #aaaaaa'>" +
                                "<select style='border:0px solid white;background-color:transparent;font-size:11px' data-type='" + InputType + "' data-key='" + key + "' id='" + InputID + "'>" +
                                    optionsHTML +
                                "</select>" +
                            "</td>" +
                            "</tr>");

            $(document.getElementById(InputID)).change(function () {

                param.onPropertyChange(null, $(this).attr('data-key'), this.value);

            });

        }

        var ShowRangeInputType = function (elm, param, key) {

            var InputValue = param.InputProperties[key];
            var InputID = elm.id + "_" + key;

            $(elm).append(
                            "<tr>" +
                            "<td colspan=2 style='border:1px solid #aaaaaa;font-size:11px;color:#000'>" + key + "</td>" +
                            "<td style='border:1px solid #aaaaaa'>" +
                                "<input type='range' max='" + param.PropertyHelper[key].max + "' min='" + param.PropertyHelper[key].min + "' style='padding:1px' data-type='" + InputType + "' data-key='" + key + "' id='" + InputID + "' value='" + InputValue + "'>" +
                            "</td>" +
                            "</tr>");

            $(document.getElementById(InputID)).change(function () {

                param.onPropertyChange(null, $(this).attr('data-key'), this.value);

            });

        }

        var methods = {
            init: function (options) {

                var param = $.extend({}, defaultParam, options);

                $(this).html("");

                var InputID;
                var InputValue;
                var InputType;

                for (var key in param.InputProperties) {

                    if (!param.InputProperties.hasOwnProperty(key))
                        continue;

                    if (typeof param.PropertyHelper == "undefined") {
                        ShowProprtyOnTheFly(this, param, key);
                    }
                    else if (param.PropertyHelper[key].visible) {
                        ShowProprtyBaseOnHelper(this, param, key);
                    }

                }

            }
        };

        return methods;

    };

    $.fn.eziProperties = function (method) {

        var args = arguments;

        return this.each(function () {
            var state = $(this).data('eziProperties');

            // Method calling logic
            if (state && state[method]) {
                state[method].apply(this, Array.prototype.slice.call(args, 1));
            } else if (typeof method === 'object' || !method) {

                var pt = (new eziProperties(this));
                pt.init.apply(this, args);

                // save state in jquery data
                $(this).data('eziProperties', pt);

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.eziProperties');
            }
        });
    };

})(jQuery);

