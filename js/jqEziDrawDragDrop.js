
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData("Text");

    $(ev.target.parentNode).before(document.getElementById(data));

    MoveVector(
                $(document.getElementById(data)).attr('data-vectorid'),
                $(ev.target.parentNode).attr('data-id'),
                $(document.getElementById(data)).attr('data-id')
            );
}

