function DrawPagesToolbar(canvas) {

    var html;
    html =
        "<img style='width:16px;height:16px' class='PagesMenu MenuItem' id='" + canvas.id + "PagesNew' data-vectorid=\'" + canvas.id + "\' title='New' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACH0lEQVRIiWP8//8/Ay0BE01Np4kF//79o5UFXz5/qa6oCPT337dnL1yQES0O/v379+PHD0YGRmJM/M/wn4WFhY2NjYGB4ePHj8X5hUIiQrKyskcPH1mxZjVEDQuanrLikpMnTrBzcBBjwa9fvzw9PStrqj9+/FiYl3/82LHm1tYN69f7Bwbg9IGbk3NjS7OqqipxPmDg4uL6/ft3bla2jIyMppZmbVVNRVVlZk42kiJU4OnqdvPmzf9Eg/fv3oUFh1RVVN69ezc4IHDOrNloCrBEMloywAPevHmTlpyiqqaWlJKcn5vr7eOdnJqCpob8VPT69ev0lFQNLa2EpMT83Nzg4JDE5GRMZWRa8Orlq/TkFF1dndi42Pyc3LCwsISkRKwqybHg5YsXacnJ+oaGUTHR+Tm5kVGRcQkJuBSjJ1OC4PWr1+mpacampqFhoXm5ebFxcdExMXjUk+yDKZMnq6qqBoUE5+fmxccnQEz/+PHj2jVrsJabpFnw5MnjHdu3//79q6SwMCU1JTI6CiL+5vXrqZMnY7WAtCBavXL1p0+fuLi5+yZM1NTShIszMjKysrJi1UKaBc4uzt4+3mrq6sRrIc0CPX19ktQzDMkKZ9SCQW/B////OTk5STWFk5MTV/sKPR/8Z2BoaWwSFRUlyYJ37979+/ePkRFLUwG9Tj5x/MTFC+cZGUkLuv///+nq6VlZWxO2gOpg+KWioWcBALetE/h0iqNiAAAAAElFTkSuQmCC' />" +
        "<img style='width:16px;height:16px' class='PagesMenu MenuItem' id='" + canvas.id + "PagesDuplicate' data-vectorid=\'" + canvas.id + "\' title='Duplicate' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAApklEQVRIie2WzQ2AIAyFi3EQSJgPGQWZz0Q3wQPGQEir8nNA/U4kaB+ljwJzzkFLhqbRXyEwYhPWzNaY7LhKT0prAGBYkSUX2dE9y7YCkUH40VPCxfVf5F/groA1s+RCclHifVqgctyT6BzkuZ7mNUXuWOCi2ZX3VDQD382zUXryg+M+8Cv9qk3py7XCFtH/9rBFNNE5KHd9ypFBLdenoO+iWvRf5B1/7zYYRjrs7wAAAABJRU5ErkJggg==' />";

    if (canvas.param.SlideMode) {
        html += "<img style='width:16px;height:16px' class='PagesMenu MenuItem' id='" + canvas.id + "PagesMaster' data-vectorid=\'" + canvas.id + "\' title='Show Master Page' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFaUlEQVRIidVWX0hTbRh/3abzrLm5asuY7Ozfxchp5t1MLwpJKCvDgwgqZFAYBF4F3XSVRHR12EV/BM+WF1lq1iymmItgsWFF4moFNVZbJ8Xy5OBsh/Nn2/tdnDGH2fTj+/rg+10dnvd5fs/7/p7nPc9bAiEEfxKSP8r+XySQbdOPZdlYLJZMJgEAO3bsMJvNZWVl/04CCKHf73c6nfF4vKWlBUIYCASsVmtXV1dLS0tJScnW8cXx5s2bgwcPjoyMMAwjWhiGGR8fb2tre/Xq1ZbhW9cgkUgsLCyo1ery8nLRIpfLy8vLnz17RtP035bo/fv3Xq83FosBAKxWq91uf/ToEcMwvb29TU1NBoMBABCPx/1+P8Mw9+7d0+l08Xg8GAxSFKVQKOrq6k6cOKFWq/OEJfl7kEqlLl++TBAEiqIajQYA8PPnz0+fPgmCcO3aNbPZPDs7G4lExMRHjhwhSdLpdC4vL6tUKhRFFQoFz/Pfvn3LZDK3bt06evToxhrMzs5KpVKCIFKplGihafr27duVlZXz8/Ob6nv27Nn9+/cvLi7mLSRJdnd3m0wmQRBEy7pEJEnu2rVLLpevrKwgCKLVar9//87zvEwm43k+Fot9+PDh8+fPEEKz2VxbW6vX60tLSwVB4DiOoqhMJpPNZldXV3fu3KnValmWVSqVOYlmZmampqYSiYRWq/3x44cgCNFoVKPRCIJgs9lsNtvS0tLHjx81Go1UKhX3xXGczWZrbm72+/3BYDCdTicSCYPBoFAoksmkRCJRqVRdXV2tra0AQlhRUQEA0Gq1Pp9veXk5GAxOTEyMjo76fD6KomZmZhAEuXnz5tramsi+trbmcrnERoIQvnv3zuPxjI+PP3/+/PXr1w8fPhRLWFFRkZOIpmkMw1iWPX78eGNj4/nz50+ePCmT5dRTKBSZTGZ1dZWm6crKSgBAMpn8+vVrNpuVSqUAgJqampqamnQ6/fjx46tXrwYCgUOHDsnl8omJiVyRAQButxtCGAqF+vv7q6qqjEbj4OBgJBIRt+x0OlEUra6uNhqNJpOpuroaRVGn0ymuRiKRwcFBo9FYVVXV398fCoUghHfu3MmRiwnu3r1b2Ak4jtfX11sslp6enhcvXoiyTE9PDw8PDw8Pe71eUS6/39/T02OxWOrr63EcJ0kyTzI0NLSeAEGQycnJDS1I07TL5XI4HDqdbmBgwOv15tuXZdknT56cO3fuwIEDjY2NLpeLpukN4aOjowiC5Gpgt9vhL2NHqVSePn26u7v75cuXPp/P7XbfuHHDYrGIDS2VSvft2zc2NoaiaGlp6a9/iLKyMrvdvl6DoaGhTa9SHtFo9Pr167t3796zZw+O4/ny/A55iXKtkv+R/Q4mk+nixYuBQABCODAwUNy5ELkE6XR6O95iX24H+XEkAwBIJJLFxUWO4+RyefEwBEG2w86y7MLCgvgtAQD09vZOT0+3trYSBFE8kmGYVCpVxCEej4+NjTkcDq/Xe+bMmdwJ3G73ly9f3r5963K5Jicnjx07durUKZ1OJ5FsHEcmk2lT3mw2u7S09ODBg1AoRJLkhQsXDh8+nHMuLD1FUSMjI83NzUqlEsMwj8fDcVyhA4ZhGIYVWjiO83g8GIapVKq2trb79++vrKwUOmwyk1Op1NzcXEdHh16vb2hoIAiCoihxqbOzs7OzM78bgiAaGhr0en1HR8fc3FwymfyVrdjQD4fDly5d2rt3r8Fg6OvrC4fD7e3t7e3t4XC4r6/PZrNZrdYrV65Eo9EiJFu/KiiKwnG8qalJXQCHw4HjeP5k/yiBCJ7nnz59WldXV1tbOzU1xfP8NgPXh/4fwv//8fsXSaDMrXRP5YIAAAAASUVORK5CYII=' />";
        html += "<img style='width:16px;height:16px;display:none' class='MasterPagesMenu MenuItem' id='" + canvas.id + "PagesReturnFromMaster' data-vectorid=\'" + canvas.id + "\' title='Hide Master Page' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACb0lEQVRIie2VP0jjYBjGv9wVW0gTzGRLhi6ihSxWRYe6lFLsEChIwMVCWyiCm0tpTSn+QwyOLi0IFQeXTlm6tBCKg0ss2kqHZAlKBUE0ZimpJLmhh+Q8G4sod0Of7Xu/h/x4n/dNAhmGAb5TP7716UPAEGDW/f19JBKp1+vfAri6ukokEpeXl91u9+sBLMuur68nk8mFhYXPvJVGf728vBweHi4uLnIcZxjG2tpao9Gw8L8rWz/ww8PD/v4+DMPHx8culwsAAMNwrVaTJEnXdV3XIQhCUdTn82EYZtEA9G7X19fXqVRqamoql8s5HI5XpKqqAABVVdvtdqvV4nn+8fGRJEmKohAEGTQilmUDgUCxWOwddV23yPDi4iIWi5Ek2S+9twBBEAiCKBQKg6es6/rR0RFJkoIg/H37c3Nz09wQhmE2m43jOKfTOT4+br0gv1OGoOnpaU3TTk9P5+fnnU7nxzO4vb3d2Nhwu907Ozt2u71XVBSl2WyKotibhN1un5yc9Hq9r0Pe3t4eGRlJp9MfAwAANzc3NE0jCHJwcADDMABgdXVVlmWCIHpHRVEkSXp+fp6YmKAoam5ujud5mqZLpRKKolZDNiuTyYRCoXq9bhjG0tLS+fn5G8Pd3V0+nw+Hw1tbW51OZ3l5uVKpWM3gjYLBIARBDMOMjY01m82ZmRmPx2M2IAgyOzsbCASq1Wq5XMZxXJZlv9//avj4U7GyspLNZk9OTp6enkZHR9/14DjOMAwMw6Ioapr2x92AuyjL8u7ubqvVsvCoqhqNRuPxuLk4KGBAnZ2d7e3tmSt9t+ir9N/80YaAIeAfAn4Bddm+RmhEf3oAAAAASUVORK5CYII=' />";
    }

    html+=
        "&nbsp;" +
        "<img style='width:16px;height:16px' class='PagesMenu MenuItem' id='" + canvas.id + "PagesBringToFront' data-vectorid=\'" + canvas.id + "\' title='Bring to Front' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAA60lEQVRIie3WwQ3DIAwFUNIVMgpDIIXpshFsYiahhxyqGrC/rXIrp8QCvwjQV47ee9g5Xlu724DWWs65tbYFqLXGGFNKMcZaq0HowCilnOdZSmHPyNCBsaPJUIBVL9yQANaFiK7rIiKTsQTY+uf1vu+xKBtzYNp9esiqMQHUFiaDA+Bi3Ai+ZfjkgC9gtwg0PkAIQbiC01s0ziQilg5fgNx9FRWsogBIMMgVCcBjR5gpAer+ylHxVCRAvSFqVEiHLOzAPyp8n/b7qPAZaFSAhjMqTIY5KqyGLSochiEqfAYaFb4xHvLRN/++vwHjJmyU4KEyiAAAAABJRU5ErkJggg==' />" +
        "<img style='width:16px;height:16px' class='PagesMenu MenuItem' id='" + canvas.id + "PagesBringForward' data-vectorid=\'" + canvas.id + "\' title='Bring Forward' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAvUlEQVRIie3Wyw3DIAwGYKcrMApDIMF0bGQ2sSehh0p9GAI2EodK+EQi+/8OjlCuWivsrMfW9AP8G8DMKSVm3gKUUrz3IQTvfSnFIFRFIaJzDhHFWVNzoE00GRPgLktvjACRQkQxRiIyGbeAmH895pzbl2OjD3TTu0ueGh1gGmEyJKAc1huwNqZvBuuA1fgAAGD9BNtOIhK3ww9gTe/2TwBremuMgLV0YYyA5fRvYwS8l7xc7ZKvev6LDnCAJxAbNG1LwUATAAAAAElFTkSuQmCC' />" +
        "<img style='width:16px;height:16px' class='PagesMenu MenuItem' id='" + canvas.id + "PagesSendBackward' data-vectorid=\'" + canvas.id + "\' title='Send Backward' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAuElEQVRIie3W0Q3EIAgGYLkV2Mrt3IhRYBLu4ZKesYpg7Zu8NYH/S4smBVVNb9bn1fQDHGA/AAAi8jBRRADg/6xVpZQQkYh0tYgIEevYFvh1rBnXrAXUfWvpV84QWDCafgtg5qjRdDLzEGhaPcZ0JEUHos0t4DecbR3AM+x/0T5gR4Q+4xAYBZVSQgfBAu7zzJxzDh3lCWCkOC/KHOhm+a+hC1BzyXsAHSx5J6C3JXsK9PzZHeBpfQHjFIgyCj/PCAAAAABJRU5ErkJggg==' />" +
        "<img style='width:16px;height:16px' class='PagesMenu MenuItem' id='" + canvas.id + "PagesSendToBack' data-vectorid=\'" + canvas.id + "\' title='Send to Back' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAA40lEQVRIie2WzQ0EIQiFZVuwK7uzI0qRSpjDJrMGFYH5OS03zeN9cSAvA8ycnqxPfwAAIrroSEQA8DtzVymlnDMicrQQMefc20rAVxFjnL0aoNfF3E+fJSDAEHoN0FrzMoSytbYECKmFsW1J3gavWALsDKNsArA02x86B+gWrs+43KKVUa1Vd9e2aIyKcQVLKcoqR6LCOOT+xh0V3ptIVChDHm+CUTEd8qi8FBViyJaWf1RsH/puVFgY26hwAMb+bVS4AYqLxd0EmHoZ3a0AVod8D4AXQ74TwLOo2Bbwm3/XT9QBAXDAWWLk690AAAAASUVORK5CYII=' />" +
        ""

    $(canvas.param.pages).children(":first").append(html);

    $(canvas.param.pages).children(":last").bind('click', function (e) {

        if (typeof $(e.target).attr('data-action') != "undefined") {
            switch ($(e.target).attr('data-action')) {
                case 'delete':
                    DeletePage(
                        $(e.target.parentNode).attr('data-vectorid'),
                        $(e.target.parentNode).attr('data-id'),
                        $(e.target));
                    break;
                case 'hide':
                    HidePage(
                        $(e.target.parentNode).attr('data-vectorid'),
                        $(e.target.parentNode).attr('data-id'),
                        $(e.target));
                    break;
                case 'select':

                    SelectPage(
                        $(e.target.parentNode).attr('data-vectorid'),
                        $(e.target.parentNode).attr('data-id'),
                        $(e.target));
                    break;
            }

        }
    });

    $("#" + canvas.id + "PagesNew").bind('click', function (e) { NewPage(canvas.id) });
    $("#" + canvas.id + "PagesDuplicate").bind('click', function (e) { DuplicatePage(canvas.id) });

    if (canvas.param.SlideMode) {
        $("#" + canvas.id + "PagesMaster").bind('click', function (e) { ShowHideMasterPages(canvas.id) });
        $("#" + canvas.id + "PagesReturnFromMaster").bind('click', function (e) { ShowHideMasterPages(canvas.id) });
    }

    $("#" + canvas.id + "PagesBringToFront").bind('click', function (e) { canvas.param.SlideMode?PagesSendToBack(canvas.id):PagesBringToFront(canvas.id) });
    $("#" + canvas.id + "PagesBringForward").bind('click', function (e) { canvas.param.SlideMode?PagesSendBackward(canvas.id):PagesBringForward(canvas.id) });
    $("#" + canvas.id + "PagesSendBackward").bind('click', function (e) { canvas.param.SlideMode?PagesBringForward(canvas.id):PagesSendBackward(canvas.id) });
    $("#" + canvas.id + "PagesSendToBack").bind('click', function (e) { canvas.param.SlideMode?PagesBringToFront(canvas.id):PagesSendToBack(canvas.id) });

    ReDrawPages(canvas.id)
}

function PagesBringToFront(vectorid) {

    var canvas = document.getElementById(vectorid);

    if (canvas.FileData.CurrentPage == canvas.FileData.Pages.length - 1)
        return;

    History_AddTo(canvas);

    var departed = canvas.FileData.Pages.splice(canvas.FileData.CurrentPage, 1)[0];
    canvas.FileData.Pages.splice(canvas.FileData.Pages.length, 0, departed);

    eziDrawHelper.ChangeCurrentPage(canvas, canvas.FileData.Pages.length - 1);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);

}

function PagesBringForward(vectorid) {

    var canvas = document.getElementById(vectorid);

    if (canvas.FileData.CurrentPage == canvas.FileData.Pages.length - 1)
        return;

    History_AddTo(canvas);

    var departed = canvas.FileData.Pages.splice(canvas.FileData.CurrentPage, 1)[0];
    canvas.FileData.Pages.splice(canvas.FileData.CurrentPage+1, 0, departed);

    eziDrawHelper.ChangeCurrentPage(canvas, canvas.FileData.CurrentPage + 1);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);

}

function PagesSendBackward(vectorid) {

    var canvas = document.getElementById(vectorid);

    if (canvas.FileData.CurrentPage == 0)
        return;

    History_AddTo(canvas);

    var departed = canvas.FileData.Pages.splice(canvas.FileData.CurrentPage, 1)[0];
    canvas.FileData.Pages.splice(canvas.FileData.CurrentPage - 1, 0, departed);

    eziDrawHelper.ChangeCurrentPage(canvas, canvas.FileData.CurrentPage - 1);


    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);

}

function PagesSendToBack(vectorid) {

    var canvas = document.getElementById(vectorid);

    if (canvas.FileData.CurrentPage == 0)
        return;

    History_AddTo(canvas);

    var departed = canvas.FileData.Pages.splice(canvas.FileData.CurrentPage, 1)[0];
    canvas.FileData.Pages.splice(0, 0, departed);

    eziDrawHelper.ChangeCurrentPage(canvas, 0);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);

}

function DuplicatePage(vectorid) {

    var canvas = document.getElementById(vectorid);

    var page=$.extend(true, [], canvas.FileData.Pages[canvas.FileData.CurrentPage])
    page.title += " " + (canvas.FileData.Pages.length + 1);

    History_AddTo(canvas);

    canvas.FileData.Pages.splice(canvas.FileData.CurrentPage, 0, page);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
}

function ShowHideMasterPages(vectorid) {

    var canvas = document.getElementById(vectorid);

    canvas.FileData.EditMasterPage = !canvas.FileData.EditMasterPage;
    canvas.FileData.SelectedItem = -1;

    ShowHideMasterPagesToolbar(canvas);

    eziDrawHelper.ActiveBoard(canvas);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);

}

function ShowHideMasterPagesToolbar(canvas) {

    if (canvas.FileData.EditMasterPage) {
        $(".PagesMenu").hide();
        $(".MasterPagesMenu").show();
    }
    else {
        $(".PagesMenu").show();
        $(".MasterPagesMenu").hide();
    }
}

function NewPage(vectorid) {

    var canvas = document.getElementById(vectorid);

    var page = $.extend(true, [], canvas.FileData.PageTemplate)
    page.title += " " + (canvas.FileData.Pages.length + 1);

    History_AddTo(canvas);

    canvas.FileData.Pages.push(page);

    eziDrawHelper.ChangeCurrentPage(canvas, canvas.FileData.Pages.length-1);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);
}

function SelectPage(vectorid, pageid, SelectedElement) {

    var canvas = document.getElementById(vectorid);

    eziDrawHelper.ChangeCurrentPage(canvas, pageid);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);

    if (canvas.param.SlideMode)
        ReDrawVector(vectorid);

    if (canvas.param.shapeStyle != null) {
        $(canvas.param.shapeStyle).eziProperties({
            onPropertyChange: function (key, subKey, value) {
                History_AddTo(canvas);

                if (key == null)
                    canvas.FileData.Pages[canvas.FileData.CurrentPage][subKey] = value;
                else
                    canvas.FileData.Pages[canvas.FileData.CurrentPage][key][subKey] = value;

                ReDrawPages(vectorid);
                ReDrawHistory(vectorid);
                ReDrawVector(vectorid);
            },
            InputProperties: canvas.FileData.Pages[canvas.FileData.CurrentPage],
            PropertyHelper: eziDrawHelper.PagePropertyHelper
        });
    }

}

function DeletePage(vectorid, pageid, SelectedElement) {

    var canvas = document.getElementById(vectorid);

    if (canvas.FileData.Pages.length == 1)
        return;

    History_AddTo(canvas);

    canvas.FileData.Pages.splice(pageid, 1);

    if (canvas.FileData.CurrentPage >= canvas.FileData.Pages.length)
        eziDrawHelper.ChangeCurrentPage(canvas, canvas.FileData.CurrentPage - 1);

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);
}

function HidePage(vectorid, pageid, SelectedElement) {

    var canvas = document.getElementById(vectorid);

    canvas.FileData.Pages[pageid].visible = !canvas.FileData.Pages[pageid].visible;

    ReDrawPages(vectorid);
    ReDrawHistory(vectorid);
    ReDrawVector(vectorid);
}

function ReDrawPages(vectorid) {

    var canvas = document.getElementById(vectorid);

    if (canvas.param.pages == null)
        return;

    var pages = canvas.FileData.Pages;
    var ipos;
    var style;
    var visible;
    var html;

    var child = $(canvas.param.pages).children(":last");

    child.html("");

    if (canvas.FileData.EditMasterPage) {

        html =
            '<a id=\'Pages_' + vectorid + '_MasterPage\' class=\'slink\' data-vectorid=\'' + vectorid + '\' data-id=\'Master\'>' +
            '<div class=\'pages ElementText\'>Master Page</div>' +
            '</a>';
            
        child.append(html);
        return;
    }
    
    for (ipos = 0; ipos < pages.length; ipos++) {

        if (ipos == canvas.FileData.CurrentPage)
            style = "ElementSelText";
        else
            style = "ElementText";

        if (pages[ipos].visible)
            visible = "ElementActive";
        else
            visible = "ElementInactive";

        html =
            '<a id=\'Pages_' + vectorid + '_' + ipos + '\' ondrop="PagesDrop(event)" ondragover="PagesAllowDrop(event)" ondragstart="PagesDrag(event)" class=\'slink\' draggable="true" data-vectorid=\'' +
            vectorid + '\' data-id=\'' + ipos + '\'>' +
            '<div class=\'ElementDelete\' data-action=\'delete\' title=\'Delete\'></div>' +
            '<div class=\'' + visible + '\' data-action=\'hide\' title=\'Show|Hide\' />' +
            '<div class=\'pages ' + style + '\' data-action=\'select\'>' + pages[ipos].title + '</div>' +
            '</a>';

        if (canvas.param.SlideMode)
            child.append(html);
        else
            child.prepend(html);
    }

}

