
DrawingTools = {

    picture:
    {
        actionType: function (vector, pixel) {
            return actionType(vector, pixel);
        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { src: '', FillColor: [255, 255, 255, 1], LineSize: 1, LineColor: [0, 0, 0, 1], TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '',
        draw: function (ctx, vector, selected, zoom) {
            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var img = new Image();
            img.onload = function () {
                ctx.scale(zoom, zoom); ctx.translate(cx, cy);
                ctx.rotate(vector.rotate);

                ctx.globalAlpha = vector.style.FillColor[3];
                ctx.drawImage(img, vector.x1 - cx, vector.y1 - cy, vector.x2 - vector.x1, vector.y2 - vector.y1);
                ctx.globalAlpha = 1;

                eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

                if (selected) {
                    eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
                }

                ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);

            }
            img.src = vector.style.src;
        }
    },

    line:
    {
        actionType: function (vector, pixel) {
            return actionType(vector, pixel);
        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, LineColor: [0, 0, 0, 1], TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA6ElEQVRYhe3Vry/EcRzH8cfd+bEbM2Njc4GAcEUU/Q02STLNJFNNpMoXRRKNpF2ikNjcxpjsLxA+9Xv1+wruGd/psX0+n/eHUf+9VsVsBdP4rQPQrJhN4QrdOgDD2sE31pKIPXwqRxLrAAN0kogjvGExiTjBC+aTiDM8YjaJuEBf2ROxenhAOwVo4BJ3mEwhmrjGDcZTiDHcKmu76k+ppQncK0fSSCHayqXspQCUZ9lXnmmsGTzhPImYwzNOk4gFvOI4iVjCOw6TiGV8YD+JWMUXdpOILn6wnURsKHdiM4lYx5bgyh5V2R8taSDImk0wwQAAAABJRU5ErkJggg==" />',
        draw: function (ctx, vector, selected, zoom) {
            //ctx.fillStyle = vector.FillColor;

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.beginPath();
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";
            ctx.moveTo(vector.x1 - cx, vector.y1 - cy);
            ctx.lineTo(vector.x2 - cx, vector.y2 - cy);
            ctx.closePath();
            ctx.stroke();

            eziDrawHelper.DrawTextOnPath(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSmallBox(ctx, vector.x1 - cx, vector.y1 - cy);
                eziDrawHelper.DrawSmallBox(ctx, vector.x2 - cx, vector.y2 - cy);
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);

        }
    },

    arc:
    {
        actionType: function (vector, pixel) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var lineAngle = 0;

            try {
                lineAngle = Math.atan((vector.y2 - vector.y1) / (vector.x2 - vector.x1));
            }
            catch (e) { }

            var LineLength = 0;
            try {
                LineLength = Math.pow(Math.pow(vector.y2 - vector.y1, 2) + Math.pow(vector.x2 - vector.x1, 2), 0.5);
            }
            catch (e) { }

            var controlPoint = {
                x: cx + LineLength * vector.style.arcControlPoint.radius * Math.sin(vector.style.arcControlPoint.angle - lineAngle) / 2,
                y: cy + LineLength * vector.style.arcControlPoint.radius * Math.cos(vector.style.arcControlPoint.angle - lineAngle) / 2,
                ActionType: [10, false]
            };

            return actionType(vector, pixel, [controlPoint]);
        },
        applyControlPointMovement: function (vector, controlPoint) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var lineAngle = 0;

            try {
                lineAngle = Math.atan((vector.y2 - vector.y1) / (vector.x2 - vector.x1));
            }
            catch (e) { }

            vector.style.arcControlPoint.angle = Math.atan2(controlPoint.x - cx, controlPoint.y - cy) + lineAngle;

            var LineLength = 0;
            try {
                LineLength = Math.pow(Math.pow(vector.y2 - vector.y1, 2) + Math.pow(vector.x2 - vector.x1, 2), 0.5);
            }
            catch (e) { }

            var ControlPointLength = Math.pow(Math.pow(cy - controlPoint.y, 2) + Math.pow(cx - controlPoint.x, 2), 0.5);

            vector.style.arcControlPoint.radius = 2 * ControlPointLength / LineLength;

        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, arcControlPoint: { radius: 0.1, angle: 0 }, LineColor: [0, 0, 0, 1], TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/ElEQVRYhe3WLUsEQRjA8d+db+ALYhAODpOIVsFgMxqVA8FgvXaY/QyX7gvYRLBYxKYYBYMGq4geGjQZRIMIhtGie2DQecr+Ycs+YX7sDMNSVlYWXKXgXT82sYZ3POAWRzjB638DYAD1z6eGGSxjAac4wDZe/hLzm8awgj3py2xhNDfiqzns4BGtKATM4gz7GI9CDKKDa+mchNWQtmQ+ErGKe0xHIpq4wmQkoo3dSMAwbrAUiWjgEn2RiGNsRALWcRgJGMETJoqGOfbmTbqYhnD+fVjNACCdg8WiQS5AF1ORgDvp5yYM0O21Vq4LooJnXGRa70dVwbdhWc8+ABWvJGqoPYYDAAAAAElFTkSuQmCC" />',
        draw: function (ctx, vector, selected, zoom) {
            //ctx.fillStyle = vector.FillColor;

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.beginPath();
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            var lineAngle = 0;

            try {
                lineAngle = Math.atan((vector.y2 - vector.y1) / (vector.x2 - vector.x1));
            }
            catch (e) { }

            var LineLength = 0;
            try {
                LineLength = Math.pow(Math.pow(vector.y2 - vector.y1, 2) + Math.pow(vector.x2 - vector.x1, 2), 0.5);
            }
            catch (e) { }


            var controlPoint = {
                x: LineLength * vector.style.arcControlPoint.radius * Math.sin(vector.style.arcControlPoint.angle - lineAngle) / 1,
                y: LineLength * vector.style.arcControlPoint.radius * Math.cos(vector.style.arcControlPoint.angle - lineAngle) / 1
            };


            ctx.moveTo(vector.x1 - cx, vector.y1 - cy);
            ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, vector.x2 - cx, vector.y2 - cy);

            ctx.stroke();

            eziDrawHelper.DrawTextOnPath(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSmallBox(ctx, controlPoint.x / 2, controlPoint.y / 2, "rgba(255, 0, 255, 0.3)");

                eziDrawHelper.DrawSmallBox(ctx, vector.x1 - cx, vector.y1 - cy);
                eziDrawHelper.DrawSmallBox(ctx, vector.x2 - cx, vector.y2 - cy);
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);

        }
    },


    MultiPointCurve:
    {
        actionType: function (vector, pixel) {

            var mcp = [];

            mcp.push({ x: vector.x1, y: vector.y1 });

            if (vector.style.MultiControlPoints.length == 0) {
                mcp.push({ x: vector.x1, y: vector.y2 });
                mcp.push({ x: vector.x2, y: vector.y1 });
            }
            else {
                for (var jpos = 0; jpos < vector.style.MultiControlPoints.length; jpos++) {
                    mcp.push({ x: vector.style.MultiControlPoints[jpos].x, y: vector.style.MultiControlPoints[jpos].y });
                }
            }

            mcp.push({ x: vector.x2, y: vector.y2 });

            var controlPoints = [];

            for (var jpos = 0; jpos < mcp.length; jpos++) {
                if (jpos % 3 == 0) {

                }
                else if (jpos % 3 == 1) {
                    mcp[jpos].x = mcp[jpos - 1].x + (mcp[jpos].x - mcp[jpos - 1].x) / 3;
                    mcp[jpos].y = mcp[jpos - 1].y + (mcp[jpos].y - mcp[jpos - 1].y) / 3;
                }
                else if (jpos % 3 == 2) {
                    mcp[jpos].x = mcp[jpos + 1].x + (mcp[jpos].x - mcp[jpos + 1].x) / 3;
                    mcp[jpos].y = mcp[jpos + 1].y + (mcp[jpos].y - mcp[jpos + 1].y) / 3;
                }

                if (jpos != 0 && jpos != mcp.length - 1)
                    controlPoints.push({ x: mcp[jpos].x, y: mcp[jpos].y, ActionType: [jpos + 10 - 1, false] });
            }

            controlPoints.push({ x: vector.x1, y: vector.y2, ActionType: [999, true] });

            return actionType(vector, pixel, controlPoints);
        },
        ControlPointClick: function (vector, ActionType) {

            var mcp = [];

            mcp.push({ x: vector.x1, y: vector.y1 });

            if (vector.style.MultiControlPoints.length == 0) {
                vector.style.MultiControlPoints.push({ x: vector.x1, y: vector.y2 });
                vector.style.MultiControlPoints.push({ x: vector.x2, y: vector.y1 });
            }

            for (var jpos = 0; jpos < vector.style.MultiControlPoints.length; jpos++) {
                mcp.push({ x: vector.style.MultiControlPoints[jpos].x, y: vector.style.MultiControlPoints[jpos].y });
            }

            mcp.push({ x: vector.x2, y: vector.y2 });

            var ipos = mcp.length - 3 - 1;
            var jpos = mcp.length - 1;

            var p = { x: (mcp[ipos].x + mcp[jpos].x) / 2, y: (mcp[ipos].y + mcp[jpos].y) / 2 };

            var last = vector.style.MultiControlPoints.splice(vector.style.MultiControlPoints.length - 1, 1);

            vector.style.MultiControlPoints.push({ x: p.x - 30, y: p.y - 30 });
            vector.style.MultiControlPoints.push({ x: p.x, y: p.y });
            vector.style.MultiControlPoints.push({ x: p.x + 30, y: p.y + 30 });

            vector.style.MultiControlPoints.push(last[0]);
        },
        applyControlPointMovement: function (vector, controlPoint) {

            var mcp = [];

            mcp.push({ x: vector.x1, y: vector.y1 });

            if (vector.style.MultiControlPoints.length == 0) {
                vector.style.MultiControlPoints.push({ x: vector.x1, y: vector.y2 });
                vector.style.MultiControlPoints.push({ x: vector.x2, y: vector.y1 });
            }

            for (var jpos = 0; jpos < vector.style.MultiControlPoints.length; jpos++) {
                mcp.push({ x: vector.style.MultiControlPoints[jpos].x, y: vector.style.MultiControlPoints[jpos].y });
            }


            mcp.push({ x: vector.x2, y: vector.y2 });

            var ipos = controlPoint.ActionType - 10 + 1;


            if (ipos % 3 == 0) {
                var ch = {
                    x: vector.style.MultiControlPoints[ipos - 1].x - controlPoint.x,
                    y: vector.style.MultiControlPoints[ipos - 1].y - controlPoint.y
                };

                vector.style.MultiControlPoints[ipos - 2].x -= ch.x;
                vector.style.MultiControlPoints[ipos - 2].y -= ch.y;

                vector.style.MultiControlPoints[ipos].x -= ch.x;
                vector.style.MultiControlPoints[ipos].y -= ch.y;

                vector.style.MultiControlPoints[ipos - 1].x = controlPoint.x;
                vector.style.MultiControlPoints[ipos - 1].y = controlPoint.y;
            }
            else if (ipos % 3 == 1) {
                vector.style.MultiControlPoints[ipos - 1].x = mcp[ipos - 1].x + (controlPoint.x - mcp[ipos - 1].x) * 3;
                vector.style.MultiControlPoints[ipos - 1].y = mcp[ipos - 1].y + (controlPoint.y - mcp[ipos - 1].y) * 3;
            }
            else if (ipos % 3 == 2) {
                vector.style.MultiControlPoints[ipos - 1].x = mcp[ipos + 1].x + (controlPoint.x - mcp[ipos + 1].x) * 3;
                vector.style.MultiControlPoints[ipos - 1].y = mcp[ipos + 1].y + (controlPoint.y - mcp[ipos + 1].y) * 3;
            }

            //vector.style.MultiControlPoints = mcp.splice(1, mcp.length - 2); //$.extend(true, [], mcp);

        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, MultiControlPoints: [], LineColor: [0, 0, 0, 1], TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABIUlEQVRYhe3WTSsFURjA8d+9XLolNiIbJImN5K2ukvIBfAV8AAsbVmx9E2trW6X4AthZ2bAgRbp0Lc5sR8fcMVOaf81qnvOc/3mZZx4qKvKlB3M4QzNmQG/OAoeYTATec879I9PYxxXmhZ0ojAlc4ziZvK+oiWvYwSlOFLzqOvZwi1UMZE1UyzjuCEM4T55CWcClcNZZF5CZJg6wVMbksI3xPBP+5uZO4RN3+MpTIpZdNPJOWo+Mm8FbmQIbeE0kCqeBewz7g5sfswMruEAbnTIEXoQvIC22q12JEXjGDWZT3ne6kYgReBIal02h2UiTyERMIerHB1oYSWTWsIV1oRfIXJhiBNpC9RsUSvEoFvEodEAPSUxhLGNMST+jior/xzc3myjge0DQ9QAAAABJRU5ErkJggg==" />',
        draw: function (ctx, vector, selected, zoom) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.beginPath();
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            var mcp = [];   // $.extend(true, [], vector.style.MultiControlPoints);

            mcp.push({ x: vector.x1 - cx, y: vector.y1 - cy });

            if (vector.style.MultiControlPoints.length == 0) {
                mcp.push({ x: vector.x1 - cx, y: vector.y2 - cy });
                mcp.push({ x: vector.x2 - cx, y: vector.y1 - cy });
            }
            else {
                for (var jpos = 0; jpos < vector.style.MultiControlPoints.length; jpos++) {
                    mcp.push({ x: vector.style.MultiControlPoints[jpos].x - cx, y: vector.style.MultiControlPoints[jpos].y - cy });
                }
            }

            mcp.push({ x: vector.x2 - cx, y: vector.y2 - cy });

            ctx.moveTo(mcp[0].x, mcp[0].y);
            for (var jpos = 1; jpos < mcp.length - 2; jpos = jpos + 3) {
                ctx.bezierCurveTo(mcp[jpos].x, mcp[jpos].y, mcp[jpos + 1].x, mcp[jpos + 1].y, mcp[jpos + 2].x, mcp[jpos + 2].y);
            }

            ctx.stroke();

            eziDrawHelper.DrawTextOnPath(ctx, vector, { x: cx, y: cy });

            if (selected) {
                for (var jpos = 0; jpos < mcp.length; jpos++) {
                    if (jpos % 3 == 0) {
                        eziDrawHelper.DrawSmallBox(ctx, mcp[jpos].x, mcp[jpos].y, "rgba(255, 0, 0, 0.3)");
                    }
                    else if (jpos % 3 == 1) {

                        var p = { x: mcp[jpos - 1].x + (mcp[jpos].x - mcp[jpos - 1].x) / 3, y: mcp[jpos - 1].y + (mcp[jpos].y - mcp[jpos - 1].y) / 3 };

                        eziDrawHelper.DrawSmallBox(ctx, p.x, p.y, "rgba(255, 0, 255, 0.3)");
                        eziDrawHelper.DrawLine(ctx, mcp[jpos - 1].x, mcp[jpos - 1].y, p.x, p.y, "rgba(255, 0, 255, 0.3)");
                    }
                    else if (jpos % 3 == 2) {
                        var p = { x: mcp[jpos + 1].x + (mcp[jpos].x - mcp[jpos + 1].x) / 3, y: mcp[jpos + 1].y + (mcp[jpos].y - mcp[jpos + 1].y) / 3 };

                        eziDrawHelper.DrawSmallBox(ctx, p.x, p.y, "rgba(255, 0, 255, 0.3)");
                        eziDrawHelper.DrawLine(ctx, mcp[jpos + 1].x, mcp[jpos + 1].y, p.x, p.y, "rgba(255, 0, 255, 0.3)");
                    }

                    eziDrawHelper.DrawSmallPlus(ctx, vector.x1 - cx, vector.y2 - cy, "rgba(155, 155, 0, 0.3)");
                }
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);

        }
    },

    rect:
    {
        actionType: function (vector, pixel) {
            return actionType(vector, pixel);
        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, LineColor: [0, 0, 0, 1], FillColor: [255, 255, 255, 1], GradiantColor: [255, 55, 55, 1], FillType: '0', TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS4xLjIiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMyPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4zMjwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogICAgICAgICA8ZGM6c3ViamVjdD4KICAgICAgICAgICAgPHJkZjpCYWcvPgogICAgICAgICA8L2RjOnN1YmplY3Q+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxMy0wNi0zMFQxNTowNjozMjwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAyLjI8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cv0vN/cAAAFUSURBVFgJ7Za9roMwDIWdpLCzsyO17/8ovRIjr8BQVOLEN24XkLBbCBULliLxk4Qvx84hhojgyLBHfpy/fQKcClykImyahmKMwC0nrLXArW1bszSPCOC9h/v9b2nM6me321UcIwI8HgMMwxNyfcIYA+M4rgcIIQC3PQC0NIoKsEHiTgDaIkQA1iwgQsy0aptSgBjWp8Bd7EsBTT5x1smL1y5YrP93J1EBHsM7YRcA5yZI80sRgLuhTynYwQd4J0ihAnjcR4HNRcgAIeQ5oXMWKG4oQpbMpxSwF+REjC4Vs7wIPQWpCPMBIhRFIa5BBeAizAWgSLC5CDHVgGYi4rImL4hk+bmbrkByMExu+Mv4AIAHA6QdwD+krFBMiOdVFeAC1AroG7BPcxjJpeq6pr7v1cPEHIDS2eH9ZApdliVUVQVd1y36sQgwn/x3d+ex/FTgcAX+AQ+ssuTrplrAAAAAAElFTkSuQmCC" />',
        draw: function (ctx, vector, selected, zoom) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.fillStyle = eziDrawHelper.FillGradiant(ctx, vector);
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            ctx.beginPath();
            ctx.moveTo(vector.x1 - cx, vector.y1 - cy);
            ctx.lineTo(vector.x2 - cx, vector.y1 - cy);
            ctx.lineTo(vector.x2 - cx, vector.y2 - cy);
            ctx.lineTo(vector.x1 - cx, vector.y2 - cy);
            ctx.lineTo(vector.x1 - cx, vector.y1 - cy);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);

        }
    },
    rrect:
    {
        actionType: function (vector, pixel) {


            var r = parseInt(Math.min(Math.abs(vector.x1 - vector.x2) * vector.style.CornerRadius, Math.abs(vector.y1 - vector.y2) * vector.style.CornerRadius), 10);

            var controlPoint = { x: vector.x1 + r, y: vector.y1 + r, ActionType: [10, false] };

            return actionType(vector, pixel, [controlPoint]);
        },
        applyControlPointMovement: function (vector, controlPoint) {

            vector.style.CornerRadius = Math.min(Math.abs(vector.x1 - controlPoint.x), Math.abs(vector.y1 - controlPoint.y)) / Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2));

        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, CornerRadius: 0.05, LineColor: [0, 0, 0, 1], FillColor: [255, 255, 255, 1], GradiantColor: [255, 55, 55, 1], FillType: '0', TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAm0lEQVRYhe2WsRGDMBAEd+jBKapEQycqxO6KOigD5DJw4HPIwItncPA7o/D2T0r0EATBPhkYgQqsB09VJp8d/gQWoADJkEvKzHI0kSV4tAqUnWl8iZHvLc5S5DJTgd6hQJLLzOowfNfVOQ5pIgpEgSgQBf66wBvbF7xFkstcYAIGhwKDXGZu3wcAXhIUbF9zj8NG9OPWnTAILucDrOIx5ga3sDYAAAAASUVORK5CYII=" />',
        draw: function (ctx, vector, selected, zoom) {

            var vec = $.extend(true, {}, vector);
            eziDrawHelper.SortPoints(vec);

            var r2d = Math.PI / 180;

            var r = parseInt(Math.min(Math.abs(vector.x1 - vector.x2) * vector.style.CornerRadius, Math.abs(vector.y1 - vector.y2) * vector.style.CornerRadius), 10);

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.fillStyle = eziDrawHelper.FillGradiant(ctx, vector);
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            ctx.beginPath();
            ctx.moveTo(vec.x1 + r - cx, vec.y1 - cy);
            ctx.lineTo(vec.x2 - r - cx, vec.y1 - cy);
            ctx.arc(vec.x2 - r - cx, vec.y1 + r - cy, r, r2d * 270, r2d * 360, false);
            ctx.lineTo(vec.x2 - cx, vec.y2 - r - cy);
            ctx.arc(vec.x2 - r - cx, vec.y2 - r - cy, r, r2d * 0, r2d * 90, false);
            ctx.lineTo(vec.x1 + r - cx, vec.y2 - cy);
            ctx.arc(vec.x1 + r - cx, vec.y2 - r - cy, r, r2d * 90, r2d * 180, false);
            ctx.lineTo(vec.x1 - cx, vec.y1 + r - cy);
            ctx.arc(vec.x1 + r - cx, vec.y1 + r - cy, r, r2d * 180, r2d * 270, false);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSmallBox(ctx, vector.x1 + r - cx, vector.y1 + r - cy, "rgba(255, 0, 255, 0.3)");

                eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    },


    elipse:
    {
        actionType: function (vector, pixel) {
            return actionType(vector, pixel);
        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, LineColor: [0, 0, 0, 1], FillColor: [255, 255, 255, 1], GradiantColor: [255, 55, 55, 1], FillType: '0', TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA70lEQVRYhe3VMUoDURCH8V9MYxPYJhBIJanFCDmHKbVNnd4LeArJGWw8gpWFELSwlVQh2tjYWzgBDcJzyT4W5H2wze7MN/9l2TcUCoVCy3Rq1B7hDBOcoI8qnr3jFU94wC1emgo5xT02uMYMpxjgMK5B3JtFzSZ6pvsMHuIOS19v3q3R242eZTiGdYcfY41L9T7TLp1wrMP5JyqscL7H4F0uwlmlCuEKiwaHb1mEO8kzxhkCjMOd5AO9DAF64f7BwS+FK4wyBBiFOxngBvMMAebhTtL6X0DL58CWVk/C72TdBU1uwzc8yrANC4XC/+YTt0Y2+dF7LX4AAAAASUVORK5CYII=" />',
        draw: function (ctx, vector, selected, zoom) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            var w = Math.abs(vector.x2 - vector.x1);
            var h = Math.abs(vector.y2 - vector.y1);

            var xa = Math.min(vector.x1, vector.x2);
            var ya = Math.min(vector.y1, vector.y2);
            var xb = Math.max(vector.x1, vector.x2);
            var yb = Math.max(vector.y1, vector.y2);

            var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = xa + w,           // x-end
            ye = ya + h,           // y-end
            xm = xa + w / 2,       // x-middle
            ym = ya + h / 2;       // y-middle


            ctx.beginPath();

            ctx.fillStyle = eziDrawHelper.FillGradiant(ctx, vector);
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            ctx.moveTo(xa - cx, ym - cy);
            ctx.bezierCurveTo(xa - cx, ym - oy - cy, xm - ox - cx, ya - cy, xm - cx, ya - cy);
            ctx.bezierCurveTo(xm + ox - cx, ya - cy, xe - cx, ym - oy - cy, xe - cx, ym - cy);
            ctx.bezierCurveTo(xe - cx, ym + oy - cy, xm + ox - cx, ye - cy, xm - cx, ye - cy);
            ctx.bezierCurveTo(xm - ox - cx, ye - cy, xa - cx, ym + oy - cy, xa - cx, ym - cy);
            //ctx.closePath();
            ctx.stroke();
            ctx.fill();

            eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    },

    mcircle:
    {
        actionType: function (vector, pixel) {
            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / (2 + 2 * vector.style.SubCircle.radius);
            var r2 = r * vector.style.SubCircle.radius;

            var controlPoint = { x: cx + r2, y: cy, ActionType: [10, false] };

            return actionType(vector, pixel, [controlPoint]);
        },
        applyControlPointMovement: function (vector, controlPoint) {
            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / (2 + 2 * vector.style.SubCircle.radius);

            vector.style.SubCircle.radius = (controlPoint.x - cx) / r;

        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, LineColor: [0, 0, 0, 1], FillColor: [255, 255, 255, 1], GradiantColor: [255, 55, 55, 1], FillType: '0', SubCircle: { radius: .95, angle: 25 }, TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACAElEQVRYhe3Wu2sUURTH8c9mE0SDJggGX6CCFkEsJZ2PrUQFNaWuKUUhtpaC4j9gLVYJlrFKY0ghCGJn46uxUDGxEsRYuHG1uGdhssxkZ0wiCPnCZXbunPO7j73n3MMmm6yNG9H+Cfcwmnk/hS9YjN8dRsN2XdmJpRhsBhexgEa0heibCZul8Fk3zmIOWzGJ55jIfJ+IvsmwmQufntQK+vfjKFpYxlVplbdLTvgu9mAK/RjAK3wq6W8MPzGPp5jFgbLOYTsbvvOhNVbBXx++YqSKUwEjodVXNFAebWn2jUzfduzFNmlbs9RQx44crUZotctOYABNKZw634fxA5/judzl8xu/8C1Hrx5azdBelVvSYXuCc5n+7hVX5bwUGQsxRiHjUhx3H7iiaKnCQSlxXepleBOvMVRhArWMTZ7tMN6Gdime4UrmfUtZxwKaoVmKvB2or3ECQ3ijxA6MSwelStIpyyE5Z6A7DA/H84GVUbBWzoRmG0d6GXfywDtcXofBj+GlgjyQl4hamJb+s9zsVZF9eB+arbJORXfB3ySkXVa5C4oEj2MQj6Rt+y6VXh9KDjqC+9gtpejB0HzRbdirHliWtq1qPXBHurimYgH9KtYD3fSqiE7gIa6pWBGVJVsTPrayJjyNj7gQ3zakJiS/Kl6MdjLTvyFVcRHXo23y//IHkKZsnwBgkWcAAAAASUVORK5CYII=" />',
        draw: function (ctx, vector, selected, zoom) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.fillStyle = eziDrawHelper.FillGradiant(ctx, vector);
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";
            ctx.lineWidth = vector.style.LineSize;

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / (2 + 2 * vector.style.SubCircle.radius);
            var angle;

            var r2 = r * vector.style.SubCircle.radius;
            var a2;

            var x;
            var y;

            var step = 6 / (r ^ 1);
            var first = true;

            ctx.beginPath();

            for (var i = 0.0; i < 360.0; i += step) {
                angle = i * Math.PI / 180;
                a2 = (vector.style.SubCircle.angle * i * Math.PI) / 180;

                x = cx + r * Math.cos(angle) + r2 * Math.sin(a2);
                y = cy + r * Math.sin(angle) + r2 * Math.cos(a2);

                if (first) {
                    ctx.moveTo(x - cx, y - cy);
                    first = false;
                }
                else {
                    ctx.lineTo(x - cx, y - cy);
                }
            }
            ctx.stroke();
            //ctx.fill();

            eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSmallBox(ctx, r2, 0, "rgba(255, 0, 255, 0.3)");
                eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    },
    polygon:
    {
        actionType: function (vector, pixel) {
            return actionType(vector, pixel);
        },
        isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, LineColor: [0, 0, 0, 1], FillColor: [255, 255, 255, 1], GradiantColor: [255, 55, 55, 1], FillType: '0', points: 5, TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABUElEQVRYhe3WoUsDYRzG8c+mRTCtWFwZhgUVDILJJnZXNPgPKEa7fdFitxgUzFaDQRAETU4EBVG0Wy2/geC2u713W9q3vNz7/p7n99y99x7HhAnpbOI+xrEyjTZesR9jO+ZHzgJucYlazNXi+jbWR8YuvrDXZ30v1nfLbjyLUzxgKaN2CY9RP1tG81V0cIKZnJqZqO+EPplDfGIrUb8V+sNhhXO4wjXqic271MPnKnwzWcQ7jjBVsHmXqfB7D/+BzONb+Wd6Onzn8xTfYKPkABvh+49qj7kLtEoO0ArfXDTwoXe4FKrh1xhGdIf1kgKsh19P+t1lmdsw1OPv0sQbKgWbV8KnmSJ+xFrBAGvh05dBL1oZ29DCeap4Gc8FAzyHTzJPWEnUroR+IFlnvcg25Hr7s775FzjDS0KAHWxnFeU5Zsfy/4z85QcHCboJE8bLL2k8OdXl54LPAAAAAElFTkSuQmCC" />',
        draw: function (ctx, vector, selected, zoom) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.fillStyle = eziDrawHelper.FillGradiant(ctx, vector);
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;
            var angle;

            var x;
            var y;

            var step = 360 / vector.style.points;
            var first = true;

            ctx.beginPath();

            for (var i = 0.0; i < 360.0; i += step) {
                angle = i * Math.PI / 180;

                x = cx + r * Math.cos(angle);
                y = cy + r * Math.sin(angle);

                if (first) {
                    ctx.moveTo(x - cx, y - cy);
                    first = false;
                }
                else {
                    ctx.lineTo(x - cx, y - cy);
                }
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

    },
    star:
    {
        actionType: function (vector, pixel) {
            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var r = vector.style.radius * Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;

            return actionType(vector, pixel, [{ x: cx, y: cy + r, ActionType: [10, false]}]);
        },
        applyControlPointMovement: function (vector, controlPoint) {
            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;

            vector.style.radius = (controlPoint.y - cy) / r;

        }, isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, LineColor: [0, 0, 0, 1], FillColor: [255, 255, 255, 1], GradiantColor: [255, 55, 55, 1], FillType: '0', points: 5, radius: 0.5, TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABqElEQVRYhe3Vv2oUURTH8Y+7m9EgQmqbJIUaiF0ICCkslASSInb7AiGQXshL5AlCrGxMk0aQKG4gWKWQNJtCU6xG8QG0EwWLOQvDkuzOn3XT7BcOc+fM+Z37m5k7dxgzphqPI66NVkRpahW0S5iJWCrb5EYFA++wH+Mmliv0KswjdDAR0YncyHiDzcz5ZuRGwiIukGRySeQW/+fEE5iTvvutS65vxbW5qM1F7yKsYxb3Iu5nxnfxFW/xHL97tAl2sIJp/MB5xOfMuIO/Vxm4ExMsYA+fMsIv+JPzxhrSz7Nr/gE28DEM/uonvo1jvFBtn+hSi17H0TsXk9Id7qX0tZSlHj1a0bMQt3CIV9JHWpRGaA9xs4Qe6cJ6jQMFVnbUHoQ2GVA7kEY02y2g2Q1NmSd3KU9xVKD+KDQDybvKH+KsgIGz0AzVQLuAgfYoDNSwHtHbp435nL1z8RNTmfNnMcmHiHbkukyFZihM41uMn+AEp1jN1KxG7iRq4HtoK7Mm/Se04tjsU9uMmvdxXBuGgW3pv35Dvm25HrUXoa3MgnK7WRLaMWP68g+IhU/UY09nWwAAAABJRU5ErkJggg==" />',
        draw: function (ctx, vector, selected, zoom) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.fillStyle = eziDrawHelper.FillGradiant(ctx, vector);
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;
            var angle;

            var x;
            var y;

            var step = 360 / vector.style.points;
            var first = true;

            ctx.beginPath();

            for (var i = 0.0; i < 360.0; i += step) {
                angle = i * Math.PI / 180;

                x = cx + r * Math.cos(angle);
                y = cy + r * Math.sin(angle);

                if (first) {
                    ctx.moveTo(x - cx, y - cy);
                    first = false;
                }
                else {
                    ctx.lineTo(x - cx, y - cy);
                }

                angle = (i + step / 2) * Math.PI / 180;
                x = cx + vector.style.radius * r * Math.cos(angle);
                y = cy + vector.style.radius * r * Math.sin(angle);
                ctx.lineTo(x - cx, y - cy);

            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSmallBox(ctx, 0, r * vector.style.radius, "rgba(255, 0, 255, 0.3)");
                eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

    },
    plus:
    {
        actionType: function (vector, pixel) {
            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;
            var t = r * vector.style.tickness;

            var controlPoint = { x: cx + t, y: cy + t, ActionType: [10, false] };

            return actionType(vector, pixel, [controlPoint]);
        },
        applyControlPointMovement: function (vector, controlPoint) {
            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;

            //var r2 = r * vector.style.radius2;
            var r2 = controlPoint.x - cx;

            vector.style.tickness = r2 / r;

        }, isPixelInside: function (vector, pixel) {
            return isPixelInsideRectangle(vector, pixel);
        },
        style: { LineSize: 1, LineColor: [0, 0, 0, 1], FillColor: [255, 255, 255, 1], GradiantColor: [255, 55, 55, 1], FillType: '0', tickness: 0.1, TextColor: [0, 0, 0, 1], Text: '', TextStyle: { font: 'bold 12px tahoma', textAlign: 'center', textBaseline: 'middle'} },
        icon: '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8klEQVRYhe3TsS4FQRSA4e9yKSQSjVokFAoqCe8i4n1ovIKIZ/AIWg0aEh6A0Ci4axV3kpuwZ8OO2Ij5mzNn5+zMnz1nKRQK3TjACDUq7P+2wAXW03oj5Z2YypCoUhxlnJEl8CMUgd4FhsHzeaxhEOzP4S2t65Rvt9xzhaemjeiCGzyYTPpHbrGLV8zgGEtB7RALWG0R/ET9neKc83qfgagF17gXt+AOe3jBLI60t2ARy9FmE5vGQxhxghVcpriFnaC2TnWhXROPOGsReDb5eoOUt9WH9D4DReBPC0ynGA3yl+j68inOjf+ACoc5EoXC/+YdQHMmid9oIfYAAAAASUVORK5CYII=" />',
        draw: function (ctx, vector, selected, zoom) {

            var cx = (vector.x1 + vector.x2) / 2;
            var cy = (vector.y1 + vector.y2) / 2;

            ctx.scale(zoom, zoom); ctx.translate(cx, cy);
            ctx.rotate(vector.rotate);

            ctx.fillStyle = eziDrawHelper.FillGradiant(ctx, vector);
            ctx.lineWidth = vector.style.LineSize;
            ctx.strokeStyle = "rgba(" + vector.style.LineColor[0] + "," + vector.style.LineColor[1] + "," + vector.style.LineColor[2] + "," + vector.style.LineColor[3] + ")";

            var r = Math.min(Math.abs(vector.x1 - vector.x2), Math.abs(vector.y1 - vector.y2)) / 2;
            var t = r * vector.style.tickness;

            var angle;

            var x;
            var y;

            var step = 360 / vector.style.points;
            var first = true;

            ctx.beginPath();

            ctx.moveTo(-r, -t);
            ctx.lineTo(-r, t);
            ctx.lineTo(-t, t);
            ctx.lineTo(-t, r);
            ctx.lineTo(t, r);
            ctx.lineTo(t, t);
            ctx.lineTo(r, t);
            ctx.lineTo(r, -t);
            ctx.lineTo(t, -t);
            ctx.lineTo(t, -r);
            ctx.lineTo(-t, -r);
            ctx.lineTo(-t, -t);

            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            eziDrawHelper.DrawText(ctx, vector, { x: cx, y: cy });

            if (selected) {
                eziDrawHelper.DrawSmallBox(ctx, t, t, "rgba(255, 0, 255, 0.3)");
                eziDrawHelper.DrawSelectedBox(ctx, vector, { x: cx, y: cy });
            }

            ctx.scale(zoom, zoom); ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

    }


}

