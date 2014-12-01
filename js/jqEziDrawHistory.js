function History_AddTo(canvas) {

    canvas.history.data.splice(canvas.history.position, canvas.history.data.length);
    canvas.history.data.push($.extend(true, [], canvas.FileData));
    canvas.history.position = canvas.history.data.length;
}


function History_Undo(canvas) {

    if (canvas.history.position == 0)
        return;

    if (canvas.history.position == canvas.history.data.length) {
        History_AddTo(canvas);
        canvas.history.position--;
    }

    canvas.FileData = $.extend(true, [], canvas.history.data[canvas.history.position-- - 1]);

    eziDrawHelper.ActiveBoard(canvas);
    ReDrawPages(canvas.id);
    ShowHideMasterPagesToolbar(canvas)
    ReDrawHistory(canvas.id);
    ReDrawVector(canvas.id);
}

function History_Redo(canvas) {
    if (canvas.history.position >= canvas.history.data.length - 1)
        return;

    canvas.FileData = $.extend(true, [], canvas.history.data[++canvas.history.position]);

    eziDrawHelper.ActiveBoard(canvas);
    ReDrawPages(canvas.id);
    ShowHideMasterPagesToolbar(canvas)
    ReDrawHistory(canvas.id);
    ReDrawVector(canvas.id);

}

function History_Clear(canvas) {
    canvas.history = { position: 0, data: [] };
}
