(function ($) {
    var eziDraw = function () {
        
        // locals
        var defaultParam = {
            SlideMode: true,
            LineColor: [0, 0, 0, 1],
            TextColor: [0, 0, 0, 1],
            FillColor: [255, 255, 255, 1],
            LineSize: 1,
            DrawingTool:'line',
            history:null,
			tools:null,
            pages:null,
            shapeStyle:null,
            menu:null,
            InitialWidth:800,
            InitialHeight:600,
            zoom:1
        };

        var methods = {
            init: function (options) {

                var param = $.extend(true,{},defaultParam, options);

                this.Mode=DrawingModes.Draw;
                this.canvas = $(this);
                this.context = this.getContext('2d');
                this.param = param;
                this.drawing = false;
                this.ShapeChange = false;
                
                this.FileData={
                    Pages:[$.extend(true, {}, EziDrawTemplate.SimpleGreen.PageTemplate)],

                    PageTemplate:$.extend(true, {}, EziDrawTemplate.SimpleGreen.PageTemplate),
                    FirstPageTemplate:$.extend(true, {}, EziDrawTemplate.SimpleGreen.FirstPageTemplate),

                    MasterPage:$.extend(true,{}, EziDrawTemplate.SimpleGreen.MasterTemplate),

                    CurrentPage:0,
                    SelectedItem:-1,
                    EditMasterPage:false
                    };
                

                eziDrawHelper.ActiveBoard(this);

                this.originalSelectedItem=null;
                this.history={position:0,data:[]};


                if(param.menu!=null)
                {
                    DrawToolbar(this);
                }

                if(param.shapeStyle!=null)
                {

                }


				var ipos;
                if(param.tools!=null)
				{
				 	for(var key in DrawingTools)		
    			 	{
                        if(key=='picture')
                            continue;

					 	$(param.tools).append('<div title=\'' + key + '\' id=\'' + this.id + '_' + key + '\' class=\'ToolsIcon\' data-drawingtool=\'' + key + '\' data-vectorid=\'' + this.id + '\'>' + DrawingTools[key].icon + '</div>');					
					}

                    $(param.tools).bind('click',function(e){

                        if(typeof $(e.target.parentNode).attr('data-vectorid')!="undefined")
                        {
                            var VectorID=$(e.target.parentNode).attr('data-vectorid');
                            var SelectedTools=$(e.target.parentNode).attr('data-drawingtool');

                            eziDrawHelper.HighlightSelectedTools(VectorID,SelectedTools);

                            document.getElementById(VectorID).param.DrawingTool=SelectedTools;
                            document.getElementById(VectorID).Mode=DrawingModes.Draw;
                        }
                    });

 				}
								
                if(param.history!=null)
                {

                    $(param.history).bind('click',function(e){

                        if(typeof $(e.target).attr('data-action')!="undefined")
                        {
                            switch($(e.target).attr('data-action'))
                            {
                                case 'delete':
                                    DeleteVector(
                                        $(e.target.parentNode).attr('data-vectorid'),
                                        $(e.target.parentNode).attr('data-id'),
                                        $(e.target));
                                    break;
                                case 'hide':
                                    HideVector(
                                        $(e.target.parentNode).attr('data-vectorid'),
                                        $(e.target.parentNode).attr('data-id'),
                                        $(e.target));
                                    break;
                                case 'select':/// <reference path="jqEziDrawHelper.js" />

                                    var VectorID=$(e.target.parentNode).attr('data-vectorid');
    
                                    document.getElementById(VectorID).Mode=DrawingModes.Select;
                                    eziDrawHelper.HighlightSelectedTools(VectorID,'select');

                                    SelectVector(
                                        $(e.target.parentNode).attr('data-vectorid'),
                                        $(e.target.parentNode).attr('data-id'),
                                        $(e.target));
                                    break;
                            }

                        }
                    });
                }

                if(param.pages!=null)
                {
                    DrawPagesToolbar(this);
                }

                var w=(param.InitialWidth*param.zoom) + "px"; 
                var h=(param.InitialHeight*param.zoom) + "px";

                var container=this.parentElement.parentElement;

                $(container).append('<div class="CanvasSize CanvasOverlay" style="position:relative;padding-top:0px !important;">' +
                    '<canvas class="CanvasSize" oncontextmenu="return false" id="' + this.id + 'guide" style="margin:0px"></canvas>');

                $(container).attr("data-canvasId",this.id);

                $(".CanvasSize").css("width",w);
                $(".CanvasSize").css("height",h);

                $(".CanvasSize").attr("width",w);
                $(".CanvasSize").attr("height",h);

                $(".CanvasOverlay").css("margin-top","-" + h);

                $(window).resize(function () {
                    eziDrawHelper.ResizeContainer(container);
                });

                eziDrawHelper.ResizeContainer(container);

                ReDrawPages(this.id);
                ReDrawHistory(this.id);
                ReDrawVector(this.id);

                var guide=document.getElementById(this.id + 'guide');
                guide.canvas= $(this);
                guide.context = guide.getContext('2d');
                guide.actionType=ActionTypes.OutsideObject;


                $(guide).bind('mousedown touchstart', 
                    function(e){
                        this.drawing = true;

                        this.startX=e.pageX - this.canvas.offset().left;
                        this.startY=e.pageY - this.canvas.offset().top;

                        var elm=this.canvas[0];
                        if(elm.Mode==DrawingModes.Select && elm.FileData.SelectedItem!=-1)
                        {
                                var at=DrawingTools[elm.originalSelectedItem.type].actionType(elm.originalSelectedItem,{x:this.startX/this.canvas[0].param.zoom,y:this.startY/this.canvas[0].param.zoom});
                                this.actionType=at[0];

                                if(this.actionType!=ActionTypes.OutsideObject)
                                {
                                    History_AddTo(this.canvas[0]);
                                }

                                if(at[1]) //if this action change properties of shapes immediately (without moving control points)
                                {
                                    DrawingTools[elm.originalSelectedItem.type].ControlPointClick(elm.ActiveBoard.shapes[elm.FileData.SelectedItem],this.actionType);
                                    ReDrawVector(this.canvas[0].id);
                                } 

                        }
                    }
                );

                $(guide).bind('mousemove touchmove', 
                    function(e){
                        if(this.drawing)
                        {
                            this.endX=e.pageX - this.canvas.offset().left;
                            this.endY=e.pageY - this.canvas.offset().top;

                            var elm=this.canvas[0];

                            if(elm.Mode==DrawingModes.Select && elm.FileData.SelectedItem!=-1)
                            {
                                var SelItm=elm.ActiveBoard.shapes[elm.FileData.SelectedItem];
                                
                                var xc=this.endX-this.startX;
                                var yc=this.endY-this.startY;

                                var Rotated=RotatedRectangle({
                                        TopLeft: {x:elm.originalSelectedItem.x1,y:elm.originalSelectedItem.y1},
                                        TopRight: {x:elm.originalSelectedItem.x2,y:elm.originalSelectedItem.y1},
                                        BottomLeft: {x:elm.originalSelectedItem.x1,y:elm.originalSelectedItem.y2},
                                        BottomRight:{x:elm.originalSelectedItem.x2,y:elm.originalSelectedItem.y2}
                                    },SelItm.rotate);

                                switch(this.actionType)
                                {   
                                    case ActionTypes.TopLeft[0]:
                                        Rotated.TopLeft.x+=xc;
                                        Rotated.TopLeft.y+=yc;
                                        Rotated=RotatedRectangle(Rotated,-SelItm.rotate);

                                        SelItm.x1=Rotated.TopLeft.x;
                                        SelItm.y1=Rotated.TopLeft.y;
                                        SelItm.x2=Rotated.BottomRight.x;
                                        SelItm.y2=Rotated.BottomRight.y;

                                        break;
                                    case ActionTypes.TopRight[0]:
                                        Rotated.TopRight.x+=xc;
                                        Rotated.TopRight.y+=yc;

                                        Rotated.TopLeft.y+=yc;
                                        Rotated.BottomRight.x+=xc;

                                        Rotated=RotatedRectangle(Rotated,-SelItm.rotate);

                                        SelItm.x1=Rotated.BottomLeft.x;
                                        SelItm.y1=Rotated.TopRight.y;
                                        SelItm.x2=Rotated.TopRight.x;
                                        SelItm.y2=Rotated.BottomLeft.y;

                                        break;
                                    case ActionTypes.BottomRight[0]:
                                        Rotated.BottomRight.x+=xc;
                                        Rotated.BottomRight.y+=yc;
                                        Rotated=RotatedRectangle(Rotated,-SelItm.rotate);

                                        SelItm.x1=Rotated.TopLeft.x;
                                        SelItm.y1=Rotated.TopLeft.y;
                                        SelItm.x2=Rotated.BottomRight.x;
                                        SelItm.y2=Rotated.BottomRight.y;

                                        break;
                                    case ActionTypes.BottomLeft[0]:
                                        Rotated.BottomLeft.x+=xc;
                                        Rotated.BottomLeft.y+=yc;

                                        Rotated.TopLeft.x+=xc;
                                        Rotated.BottomRight.y+=yc;

                                        Rotated=RotatedRectangle(Rotated,-SelItm.rotate);

                                        SelItm.x1=Rotated.BottomLeft.x;
                                        SelItm.y1=Rotated.TopRight.y;
                                        SelItm.x2=Rotated.TopRight.x;
                                        SelItm.y2=Rotated.BottomLeft.y;
                                        break;
                                    case ActionTypes.MoveObject[0]:
                                        SelItm.x1=elm.originalSelectedItem.x1+xc;
                                        SelItm.y1=elm.originalSelectedItem.y1+yc;
                                        SelItm.x2=elm.originalSelectedItem.x2+xc;
                                        SelItm.y2=elm.originalSelectedItem.y2+yc;

                                        break;
                                    case ActionTypes.RotateObject[0]:
                                        var RotatePointMove={ x: this.endX-(elm.originalSelectedItem.x1 + elm.originalSelectedItem.x2) / 2, y: this.endY - (elm.originalSelectedItem.y1 - 30) };
                                        SelItm.rotate=FindAngle(elm.originalSelectedItem,RotatePointMove);
                                        break;
                                    default:
                                        if(this.actionType!=ActionTypes.OutsideObject[0])
                                            DrawingTools[elm.originalSelectedItem.type].applyControlPointMovement(SelItm,{x:this.endX/this.canvas[0].param.zoom,y:this.endY/this.canvas[0].param.zoom,ActionType:this.actionType})
                                        break;
                                }

                                ReDrawVector(this.canvas[0].id);

                            }
                            else{

                                var style=$.extend(true,{},DrawingTools[this.canvas[0].param.DrawingTool].style, 
                                { LineSize: this.canvas[0].param.LineSize, LineColor: this.canvas[0].param.LineColor.slice(0), FillColor: this.canvas[0].param.FillColor.slice(0) }
                                );

                                var z=this.canvas[0].param.zoom;

                                var vector={
                                    type:this.canvas[0].param.DrawingTool,
                                    uid:0,
                                    x1:this.startX/z,
                                    y1:this.startY/z,
                                    x2:this.endX/z,
                                    y2:this.endY/z,
                                    style:style,
                                    rotate:0
                                };

                                var ctx=this.context;
                                ctx.clearRect(0, 0, this.width, this.height);
                                DrawingTools[this.canvas[0].param.DrawingTool].draw(ctx,vector,false,z);

                            }

                        }
                    }
                );


                $(guide).bind('mouseup touchend click', 
                    function(e){
                        if(!this.drawing)
                            return;

                        this.drawing = false;

                        this.context.clearRect(0, 0, this.width, this.height);

                        this.endX=e.pageX - this.canvas.offset().left;
                        this.endY=e.pageY - this.canvas.offset().top;

                        if(this.canvas[0].Mode==DrawingModes.Select)
                        {
                            var elm=this.canvas[0];

                            if(this.actionType==ActionTypes.OutsideObject[0])
                            {
                                var vec=elm.ActiveBoard.shapes;

                                for(var ipos=vec.length-1;ipos>=0;ipos--)
                                {
                                    if(DrawingTools[vec[ipos].type].isPixelInside(vec[ipos],{x:this.endX/this.canvas[0].param.zoom,y:this.endY/this.canvas[0].param.zoom}))
                                    {
                                        elm.FileData.SelectedItem=ipos;     
                                        elm.originalSelectedItem=$.extend(true, {}, vec[elm.FileData.SelectedItem]);
 
                                        ShowStyle(elm);
                                        ReDrawVector(elm.id);
                                        break;
                                    }
                                }
                                this.actionType=ActionTypes.OutsideObject[0];

                                return;
                            }
                            else
                            {
                                this.actionType=ActionTypes.OutsideObject[0];

                                var elm=this.canvas[0];
                                if(elm.FileData.SelectedItem==-1)
                                {
                                    elm.originalSelectedItem=null;
                                }
                                else
                                {
                                    elm.originalSelectedItem=$.extend(true, {}, elm.ActiveBoard.shapes[elm.FileData.SelectedItem]);
                                }
                                return;
                            }
                        }

                        if(this.startX==this.endX && this.startY==this.endY)
                            return;

                                    History_AddTo(this.canvas[0]);

                        var ctx=this.canvas[0].context;

                            var style=$.extend(true,{},DrawingTools[this.canvas[0].param.DrawingTool].style, 
                            { LineSize: this.canvas[0].param.LineSize, LineColor: this.canvas[0].param.LineColor.slice(0), FillColor: this.canvas[0].param.FillColor.slice(0) }
                            );

                                var z=this.canvas[0].param.zoom;

                        var vector={
                            show:true,
                            type:this.canvas[0].param.DrawingTool,
                            uid:Math.floor((Math.random()*900000000000)+100000000000),
                            x1:(Math.floor(10*this.startX)/10)/z,
                            y1:(Math.floor(10*this.startY)/10)/z,
                            x2:(Math.floor(10*this.endX)/10)/z,
                            y2:(Math.floor(10*this.endY)/10)/z,
                            style:style,
                            rotate:0
                        };

                        var elm=this.canvas[0];
                        elm.ActiveBoard.shapes.push(vector);

                        DrawingTools[elm.param.DrawingTool].draw(ctx,vector,false,z);

                        if($(elm.param.history)!=null)
                        {
                            var style='';

                                if (ipos == elm.FileData.SelectedItem)
                                    style = "ElementSelText";
                                else
                                    style = "ElementText";

                            $(elm.param.history).prepend(
                                '<a id=\'History_' + elm.id + '_' +  vector.uid + '\' ondrop="drop(event)" ondragover="allowDrop(event)" ondragstart="drag(event)" class=\'slink\' draggable="true" data-vectorid=\'' + elm.id + '\' data-id=\'' + vector.uid + '\'>' + 
                                    '<div class=\'ElementDelete\' data-action=\'delete\' title=\'Delete\'></div>' +
                                    '<div class=\'ElementActive\' data-action=\'hide\' title=\'Show|Hide\' />' +
                                    '<div class=\'shapes ' + style + '\' data-action=\'select\'>' + vector.type +  '</div>' +
                                    '</a>'
                            );

                        }
                        
                    }
                );

                return this;
            },

        };

        return methods;

    };

    $.fn.eziDraw = function (method) {

        var args = arguments;

        return this.each(function () {
            var state = $(this).data('eziDraw');

            // Method calling logic
            if (state && state[method]) {
                state[method].apply(this, Array.prototype.slice.call(args, 1));
            } else if (typeof method === 'object' || !method) {

                var pt = (new eziDraw(this));
                pt.init.apply(this, args);

                // save state in jquery data
                $(this).data('eziDraw', pt);

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.eziDraw');
            }
        });
    };

})(jQuery);

