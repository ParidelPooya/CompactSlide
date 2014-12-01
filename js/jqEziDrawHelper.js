
eziDrawHelper = {
    ActiveBoard: function (canvas) {

        if (canvas.FileData.EditMasterPage)
            canvas.ActiveBoard = canvas.FileData.MasterPage;
        else
            canvas.ActiveBoard = canvas.FileData.Pages[canvas.FileData.CurrentPage];
    },

    ChangeCurrentPage: function (canvas, PagePos) {
        canvas.FileData.CurrentPage = PagePos;
        canvas.FileData.SelectedItem = -1;

        eziDrawHelper.ActiveBoard(canvas);
    },

    SortPoints: function (vector) {
        var x1, x2, y1, y2;

        x1 = Math.min(vector.x1, vector.x2);
        y1 = Math.min(vector.y1, vector.y2);

        x2 = Math.max(vector.x1, vector.x2);
        y2 = Math.max(vector.y1, vector.y2);

        vector.x1 = x1;
        vector.y1 = y1;

        vector.x2 = x2;
        vector.y2 = y2;
    },

    PagePropertyHelper: {
        shapes: { visible: false },
        title: { visible: true, type: 'text', desc: 'description' },
        desc: { visible: true, type: 'text', desc: 'description' },
        visible: { visible: false }
    },

    PropertyHelper: {
        src: { visible: false },
        LineSize: { visible: true, type: 'range', desc: 'description', min: 0, max: 50 },

        FillColor: { visible: true, type: 'color', desc: 'description' },
        LineColor: { visible: true, type: 'color', desc: 'description' },
        TextColor: { visible: true, type: 'color', desc: 'description' },
        GradiantColor: { visible: true, type: 'color', desc: 'description' },
        FillType: { visible: true, type: 'select', desc: 'description', options: [['0', 'color'], ['1', 'Radial Gradient'], ['2', 'Linear Gradient']] },

        Text: { visible: true, type: 'text', desc: 'description' },
        TextStyle: { visible: true, type: 'category' },
        TextStyle_font: { visible: true, type: 'text', desc: 'description' },
        TextStyle_textAlign: { visible: true, type: 'text', desc: 'description' },
        TextStyle_textBaseline: { visible: true, type: 'text', desc: 'description' },

        arcControlPoint: { visible: true, type: 'category' },
        arcControlPoint_radius: { visible: true, type: 'text', desc: 'description' },
        arcControlPoint_angle: { visible: true, type: 'text', desc: 'description' },

        CornerRadius: { visible: true, type: 'text', desc: 'description' },

        SubCircle: { visible: true, type: 'category' },
        SubCircle_radius: { visible: true, type: 'text', desc: 'description' },
        SubCircle_angle: { visible: true, type: 'text', desc: 'description' },

        points: { visible: true, type: 'range', desc: 'description', min: 0, max: 50 },
        radius: { visible: true, type: 'range', desc: 'description', min: 0, max: 50 },
        tickness: { visible: true, type: 'range', desc: 'description', min: 0, max: 50 },

        MultiControlPoints: { visible: false }
    },

    HighlightSelectedTools: function (VectorID, SelectedTools) {
        $('.SelectedTools').removeClass('SelectedTools');
        $('#' + VectorID + '_' + SelectedTools).addClass('SelectedTools');
    },

    ResizeContainer: function (container) {

        var containerW = $(window).width() - 268;
        var containerH = $(window).height() - 45;

        var canvas = $("#" + $(container).attr('data-canvasId'));

        var canvasW = canvas.width();
        var canvasH = canvas.height();

        $(container).css('width', containerW);
        $(container).css('height', containerH);

        if (canvasW < containerW)
            $(container).children().css('padding-left', (containerW - canvasW - 30) / 2);
        else
            $(container).children().css('padding-left', 0);

        if (canvasH < containerH)
            $(container).children().css('padding-top', (containerH - canvasH - 30) / 2);
        else
            $(container).children().css('padding-top', 0);

    },

    DrawLine: function (ctx, x1, y1, x2, y2, color) {

        if (typeof color == "undefined")
            color = "rgba(255, 0, 0, 0.3)"

        //ctx.fillStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.fill();
    },

    DrawSmallBox: function (ctx, x, y, color) {

        if (typeof color == "undefined")
            color = "rgba(255, 0, 0, 0.3)"

        ctx.fillStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    },

    DrawSmallPlus: function (ctx, x, y, color) {

        if (typeof color == "undefined")
            color = "rgba(255, 0, 0, 0.3)"

        var r = 10;
        var t = 3;

        ctx.fillStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        ctx.beginPath();

        ctx.moveTo(x - r, y - t);
        ctx.lineTo(x - r, y + t);
        ctx.lineTo(x - t, y + t);
        ctx.lineTo(x - t, y + r);
        ctx.lineTo(x + t, y + r);
        ctx.lineTo(x + t, y + t);
        ctx.lineTo(x + r, y + t);
        ctx.lineTo(x + r, y - t);
        ctx.lineTo(x + t, y - t);
        ctx.lineTo(x + t, y - r);
        ctx.lineTo(x - t, y - r);
        ctx.lineTo(x - t, y - t);

        ctx.stroke();
        ctx.fill();
    },

    DrawSelectedBox: function (ctx, vector, center) {

        var vec = $.extend(true, {}, vector);
        eziDrawHelper.SortPoints(vec);

        eziDrawHelper.DrawSmallBox(ctx, vec.x1 - center.x, vec.y1 - center.y);
        eziDrawHelper.DrawSmallBox(ctx, vec.x1 - center.x, vec.y2 - center.y);
        eziDrawHelper.DrawSmallBox(ctx, vec.x2 - center.x, vec.y1 - center.y);
        eziDrawHelper.DrawSmallBox(ctx, vec.x2 - center.x, vec.y2 - center.y);

        eziDrawHelper.DrawSmallBox(ctx, ((vec.x1 + vec.x2) / 2) - center.x, vec.y1 - center.y - 15, "rgba(0, 255, 0, 0.3)");
        eziDrawHelper.DrawLine(ctx, ((vec.x1 + vec.x2) / 2) - center.x, vec.y1 - center.y, ((vec.x1 + vec.x2) / 2) - center.x, vec.y1 - center.y - 15);
    },

    DrawText: function (ctx, vector, center) {

        if (vector.style.Text.length == 0)
            return;

        ctx.fillStyle = "rgba(" + vector.style.TextColor[0] + "," + vector.style.TextColor[1] + "," + vector.style.TextColor[2] + "," + vector.style.TextColor[3] + ")";

        ctx.font = vector.style.TextStyle.font;
        ctx.textAlign = vector.style.TextStyle.textAlign;
        ctx.textBaseline = vector.style.TextStyle.textBaseline;

        ctx.fillText(vector.style.Text, 0, 0);
    },


    DrawTextOnPath: function (ctx, vector, center) {

        if (vector.style.Text.length == 0)
            return;

        var rtext = 0;

        try {
            rtext = Math.atan((vector.y2 - vector.y1) / (vector.x2 - vector.x1));
        }
        catch (e) { }

        ctx.rotate(rtext);

        ctx.fillStyle = "rgba(" + vector.style.TextColor[0] + "," + vector.style.TextColor[1] + "," + vector.style.TextColor[2] + "," + vector.style.TextColor[3] + ")";

        ctx.font = vector.style.TextStyle.font;
        ctx.textAlign = vector.style.TextStyle.textAlign;
        ctx.textBaseline = vector.style.TextStyle.textBaseline;

        ctx.fillText(vector.style.Text, 0, 0);

        ctx.rotate(-rtext);

    },

    FillGradiant: function (ctx, vector) {

        var cx = (vector.x1 + vector.x2) / 2;
        var cy = (vector.y1 + vector.y2) / 2;

        var grd;
        var c1 = "rgba(" + vector.style.FillColor[0] + "," + vector.style.FillColor[1] + "," + vector.style.FillColor[2] + "," + vector.style.FillColor[3] + ")";
        var c2 = "rgba(" + vector.style.GradiantColor[0] + "," + vector.style.GradiantColor[1] + "," + vector.style.GradiantColor[2] + "," + vector.style.GradiantColor[3] + ")";

        switch (vector.style.FillType) {

            case '0':
                return c1;
            case '1': //'Radial'
                var r = Math.max(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;

                grd = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
                grd.addColorStop(0, c1);
                grd.addColorStop(1, c2);

                return grd;

            case '2': //'Linear Left to right':
                grd = ctx.createLinearGradient(vector.x1 - cx, vector.y1 - cy, vector.x2 - cx, vector.y1 - cy);
                grd.addColorStop(0, c1);
                grd.addColorStop(1, c2);

                return grd;
        }



    }

}





function MoveVector(vectorid, newId, oldId) {
    var elm = document.getElementById(vectorid);
    var vectors = elm.ActiveBoard.shapes;
    var ctx = elm.context;
    var ipos;
    var pos1 = -1;
    var pos2 = -1;

    History_AddTo(elm);

    for (ipos = 0; ipos < vectors.length; ipos++) {
        if (vectors[ipos].uid == oldId)
        { pos2 = ipos; break; }
    }

    var departed = vectors.splice(pos2, 1)[0];

    for (ipos = 0; ipos < vectors.length; ipos++) {
        if (vectors[ipos].uid == newId)
        { pos1 = ipos; break; }
    }

    vectors.splice(pos1, 0, departed);

    ReDrawVector(vectorid);
}

function DeleteVector(vectorid, uid, historyElm) {
    var elm = document.getElementById(vectorid);
    var vectors = elm.ActiveBoard.shapes;
    var ctx = elm.context;
    var ipos;
    var IndexId = -1;

    elm.FileData.SelectedItem = -1;

    History_AddTo(elm);

    for (ipos = 0; ipos < vectors.length; ipos++) {
        if (vectors[ipos].uid == uid)
        { vectors.splice(ipos, 1); break; }
    }

    $(historyElm).parent().remove();
    ReDrawVector(vectorid);
}

function HideVector(vectorid, uid, historyElm) {
    var elm = document.getElementById(vectorid);
    var vectors = elm.ActiveBoard.shapes;
    var ctx = elm.context;
    var ipos;
    var IndexId = -1;

    History_AddTo(elm);

    for (ipos = 0; ipos < vectors.length; ipos++) {
        if (vectors[ipos].uid == uid)
        { vectors[ipos].show = !vectors[ipos].show; break; }
    }

    if (historyElm.hasClass('ElementActive')) {
        historyElm.removeClass('ElementActive');
        historyElm.addClass('ElementInactive');
    }
    else {
        historyElm.removeClass('ElementInactive');
        historyElm.addClass('ElementActive');
    }

    ReDrawVector(vectorid);
}

function SelectVector(vectorid, uid, historyElm) {
    var elm = document.getElementById(vectorid);
    var vectors = elm.ActiveBoard.shapes;
    var ctx = elm.context;
    var ipos;
    var IndexId = -1;

    $('.shapes.ElementSelText').addClass('ElementText').removeClass('ElementSelText');

    if (elm.FileData.SelectedItem != -1 && vectors[elm.FileData.SelectedItem].uid == uid) {
        elm.FileData.SelectedItem = -1;
    }
    else {
        for (ipos = 0; ipos < vectors.length; ipos++) {
            if (vectors[ipos].uid == uid) {
                elm.FileData.SelectedItem = ipos;
                elm.originalSelectedItem = $.extend(true, {}, vectors[ipos]);
                break;
            }
        }

        historyElm.removeClass('ElementText');
        historyElm.addClass('ElementSelText');
    }

    ShowStyle(elm);

    ReDrawVector(vectorid);
}

function ShowStyle(elm) {

    if (elm.param.shapeStyle != null) {
        if (elm.FileData.SelectedItem != -1) {
            $(elm.param.shapeStyle).eziProperties({
                onPropertyChange: function (key, subKey, value) {
                    History_AddTo(elm);

                    if (key == null)
                        elm.ActiveBoard.shapes[elm.FileData.SelectedItem].style[subKey] = value;
                    else
                        elm.ActiveBoard.shapes[elm.FileData.SelectedItem].style[key][subKey] = value;

                    ReDrawVector(elm.id);
                },
                InputProperties: elm.ActiveBoard.shapes[elm.FileData.SelectedItem].style
                , PropertyHelper: eziDrawHelper.PropertyHelper
            });
        }
        else {
            $(elm.param.shapeStyle).html("");
        }
    }

}

function LoadFile(vectorId,FilePos) {

    var SavedFilesString = window.localStorage.getItem("SavedFiles");
    var SavedFiles = [];
    if (SavedFilesString != null)
        SavedFiles = JSON.parse(SavedFilesString);

    var elm = document.getElementById(vectorId);

    elm.FileData = $.extend(true, {}, SavedFiles[FilePos].FileData);

    elm.FileData.SelectedItem = -1;
        
    eziDrawHelper.ActiveBoard(elm);

    ReDrawVector(vectorId);
    ReDrawHistory(vectorId);
    History_Clear(elm);

}

function ReDrawVector(vectorid) {
    var elm = document.getElementById(vectorid);
    var vectors = elm.FileData.Pages;
    var ctx = elm.context;
    var ipos;
    var jpos;

    var zoom = elm.param.zoom;

    ctx.clearRect(0, 0, elm.width, elm.height);

    if (elm.param.SlideMode)
        for (jpos = 0; jpos < elm.FileData.MasterPage.shapes.length; jpos++) {
            if (elm.FileData.MasterPage.shapes[jpos].show)
                DrawingTools[elm.FileData.MasterPage.shapes[jpos].type].draw(ctx, elm.FileData.MasterPage.shapes[jpos], elm.FileData.EditMasterPage && elm.FileData.SelectedItem == jpos, zoom);
        }

    if (!elm.FileData.EditMasterPage)
        for (ipos = 0; ipos < vectors.length; ipos++) {
            if (!vectors[ipos].visible || (elm.param.SlideMode && ipos != elm.FileData.CurrentPage))
                continue;

            for (jpos = 0; jpos < vectors[ipos].shapes.length; jpos++) {
                if (vectors[ipos].shapes[jpos].show)
                    DrawingTools[vectors[ipos].shapes[jpos].type].draw(ctx, vectors[ipos].shapes[jpos], elm.FileData.CurrentPage == ipos && elm.FileData.SelectedItem == jpos, zoom);
            }
        }

        //FileDateToDataUrl(elm.FileData.MasterPage.shapes, vectors[0].shapes);
}

function FileDateToDataUrl(MasterShapes, Shapes) {
    var elm = document.createElement('canvas');
    elm.width = 160;
    elm.height = 120;
    
    var ctx = elm.getContext("2d");

    var ipos;
    var jpos;

    var zoom = 0.2;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, elm.width, elm.height);

    for (jpos = 0; jpos < MasterShapes.length; jpos++) {
        if (MasterShapes[jpos].show)
            DrawingTools[MasterShapes[jpos].type].draw(ctx, MasterShapes[jpos], false, zoom);
    }

    for (jpos = 0; jpos < Shapes.length; jpos++) {
        if (Shapes[jpos].show)
            DrawingTools[Shapes[jpos].type].draw(ctx, Shapes[jpos], false, zoom);
    }

    return elm.toDataURL("image/jpeg", 0.8);
    
    //document.title=elm.toDataURL("image/jpeg", 0.6).length;
    //img.src = elm.toDataURL("image/jpeg", 0.6);
}

function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

function isPixelInsideRectangle(vector, pixel) {

    var center = { x: (vector.x1 + vector.x2) / 2, y: (vector.y1 + vector.y2) / 2 };

    var points = [];
    points.push({
        x: Math.cos(vector.rotate) * (vector.x1 - center.x) - Math.sin(vector.rotate) * (vector.y1 - center.y) + center.x,
        y: Math.sin(vector.rotate) * (vector.x1 - center.x) + Math.cos(vector.rotate) * (vector.y1 - center.y) + center.y
    });

    points.push({
        x: Math.cos(vector.rotate) * (vector.x2 - center.x) - Math.sin(vector.rotate) * (vector.y1 - center.y) + center.x,
        y: Math.sin(vector.rotate) * (vector.x2 - center.x) + Math.cos(vector.rotate) * (vector.y1 - center.y) + center.y
    });

    points.push({
        x: Math.cos(vector.rotate) * (vector.x2 - center.x) - Math.sin(vector.rotate) * (vector.y2 - center.y) + center.x,
        y: Math.sin(vector.rotate) * (vector.x2 - center.x) + Math.cos(vector.rotate) * (vector.y2 - center.y) + center.y
    });

    points.push({
        x: Math.cos(vector.rotate) * (vector.x1 - center.x) - Math.sin(vector.rotate) * (vector.y2 - center.y) + center.x,
        y: Math.sin(vector.rotate) * (vector.x1 - center.x) + Math.cos(vector.rotate) * (vector.y2 - center.y) + center.y
    });


    var area = Math.abs(vector.x1 - vector.x2) * Math.abs(vector.y1 - vector.y2);

    var ABP = TriangleArea(points[0], points[1], pixel);
    var BCP = TriangleArea(points[1], points[2], pixel);
    var CDP = TriangleArea(points[2], points[3], pixel);
    var DAP = TriangleArea(points[3], points[0], pixel);

    return Math.abs(area - ABP - BCP - CDP - DAP) < 1;

}

function TriangleArea(p1, p2, p3) {

    var a = Math.pow(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2), 0.5);
    var b = Math.pow(Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2), 0.5);
    var c = Math.pow(Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2), 0.5);

    var s = (a + b + c) / 2;

    return Math.pow(s * (s - a) * (s - b) * (s - c), 0.5);
}

function Distance(p1, p2) {
    return Math.pow(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2), 0.5);
}

function actionType(vector, pixel, ControlPoints) {

    var center = { x: (vector.x1 + vector.x2) / 2, y: (vector.y1 + vector.y2) / 2 };

    var RotatedPixel = {
        x: Math.cos(-vector.rotate) * (pixel.x - center.x) - Math.sin(-vector.rotate) * (pixel.y - center.y) + center.x,
        y: Math.sin(-vector.rotate) * (pixel.x - center.x) + Math.cos(-vector.rotate) * (pixel.y - center.y) + center.y
    };

    var points = [
                { x: vector.x1, y: vector.y1 },
                { x: vector.x2, y: vector.y1 },
                { x: vector.x2, y: vector.y2 },
                { x: vector.x1, y: vector.y2 }
            ];

    var RotatePoint = { x: (vector.x1 + vector.x2) / 2, y: vector.y1 - 15 }

    var area = Math.abs(vector.x1 - vector.x2) * Math.abs(vector.y1 - vector.y2);

    var ABP = TriangleArea(points[0], points[1], RotatedPixel);
    var BCP = TriangleArea(points[1], points[2], RotatedPixel);
    var CDP = TriangleArea(points[2], points[3], RotatedPixel);
    var DAP = TriangleArea(points[3], points[0], RotatedPixel);

    var delta = 10;

    if (typeof ControlPoints != "undefined")
        for (var ipos = 0; ipos < ControlPoints.length; ipos++) {

            if (Distance(ControlPoints[ipos], RotatedPixel) < delta)
                return ControlPoints[ipos].ActionType;
        }

    if (Distance(points[0], RotatedPixel) < delta) {
        return ActionTypes.TopLeft;
    }
    else if (Distance(points[1], RotatedPixel) < delta) {
        return ActionTypes.TopRight;
    }
    else if (Distance(points[2], RotatedPixel) < delta) {
        return ActionTypes.BottomRight;
    }
    else if (Distance(points[3], RotatedPixel) < delta) {
        return ActionTypes.BottomLeft;
    }
    else if (Distance(RotatePoint, RotatedPixel) < delta) {
        return ActionTypes.RotateObject;
    }
    else {

        if (Math.abs(area - ABP - BCP - CDP - DAP) < 1) {
            return ActionTypes.MoveObject;
        }
        else
            return ActionTypes.OutsideObject;
    }
}

var ActionTypes =
            {
                OutsideObject: [0,false],
                TopLeft: [1,false],
                TopRight: [2,false],
                BottomLeft: [3,false],
                BottomRight: [4,false],
                InsideObject: [5,false],
                RotateObject: [6, false],
                MoveObject:[7,false]
            }

var DrawingModes =
    {
        Draw: 0,
        Select: 1
    }

function FindAngle(vector, move) {

    var center = { x: (vector.x1 + vector.x2) / 2, y: (vector.y1 + vector.y2) / 2 };

    var p0 = { x: (vector.x1 + vector.x2) / 2, y: vector.y1 - 30 };
    var p1 = { x: p0.x + move.x, y: p0.y + move.y };

    var dx = p1.x - center.x;
    var dy = p1.y - center.y;
    var a = Math.atan2(dy, dx);

    var dpx = p0.x - center.x;
    var dpy = p0.y - center.y;
    var b = Math.atan2(dpy, dpx);


    return (2 * Math.PI + a - b) % (2 * Math.PI);

}

function ReDrawHistory(vectorid) {

    var elm = document.getElementById(vectorid);

    if (elm.param.history == null)
        return;

    var vectors = elm.ActiveBoard.shapes;
    var ipos;
    var style;
    var show;
    $(elm.param.history).html("");

    for (ipos = 0; ipos < vectors.length; ipos++) {

        if (ipos == elm.FileData.SelectedItem)
            style = "ElementSelText";
        else
            style = "ElementText";

        if (vectors[ipos].show)
            show = "ElementActive";
        else
            show = "ElementInactive";

        $(elm.param.history).prepend(
            '<a id=\'History_' + vectorid + '_' + vectors[ipos].uid + '\' ondrop="drop(event)" ondragover="allowDrop(event)" ondragstart="drag(event)" class=\'slink\' draggable="true" data-vectorid=\'' +
            vectorid + '\' data-id=\'' + vectors[ipos].uid + '\'>' +
            '<div class=\'ElementDelete\' data-action=\'delete\' title=\'Delete\'></div>' +
            '<div class=\'' + show + '\' data-action=\'hide\' title=\'Show|Hide\' />' +
            '<div class=\'shapes ' + style + '\' data-action=\'select\'>' + vectors[ipos].type + '</div>' +
            '</a>');

    }

}

function RotateVector(angle, vector) {

    return {
        x: Math.cos(angle) * (vector.x) - Math.sin(angle) * (vector.y),
        y: Math.sin(angle) * (vector.x) + Math.cos(angle) * (vector.y)
    };
}


function RotatedRectangle(original, rotate) {

    var center = { x: (original.TopLeft.x + original.BottomRight.x) / 2, y: (original.TopLeft.y + original.BottomRight.y) / 2 };

    return {
        TopLeft: {
            x: Math.cos(rotate) * (original.TopLeft.x - center.x) - Math.sin(rotate) * (original.TopLeft.y - center.y) + center.x,
            y: Math.sin(rotate) * (original.TopLeft.x - center.x) + Math.cos(rotate) * (original.TopLeft.y - center.y) + center.y
        },
        TopRight: {
            x: Math.cos(rotate) * (original.TopRight.x - center.x) - Math.sin(rotate) * (original.TopRight.y - center.y) + center.x,
            y: Math.sin(rotate) * (original.TopRight.x - center.x) + Math.cos(rotate) * (original.TopRight.y - center.y) + center.y
        },
        BottomLeft: {
            x: Math.cos(rotate) * (original.BottomLeft.x - center.x) - Math.sin(rotate) * (original.BottomLeft.y - center.y) + center.x,
            y: Math.sin(rotate) * (original.BottomLeft.x - center.x) + Math.cos(rotate) * (original.BottomLeft.y - center.y) + center.y
        },
        BottomRight:
        {
            x: Math.cos(rotate) * (original.BottomRight.x - center.x) - Math.sin(rotate) * (original.BottomRight.y - center.y) + center.x,
            y: Math.sin(rotate) * (original.BottomRight.x - center.x) + Math.cos(rotate) * (original.BottomRight.y - center.y) + center.y
        }
    }
}