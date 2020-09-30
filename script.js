let draggedNote = '';
document.querySelectorAll('.note').forEach(noteProcess);
document.querySelectorAll('.column').forEach(columnProcess);

function noteProcess(noteElement){
    noteElement.addEventListener('dragstart', dragStart);
    noteElement.addEventListener('dragend', dragEnd);
    noteElement.addEventListener('dragover', dragOver);
    noteElement.addEventListener('dragenter', dragEnter);
    noteElement.addEventListener('dragleave', dragLeave);
    noteElement.addEventListener('drop', dragDrop);
}

function columnProcess(columnElement){
    columnElement.addEventListener('dragover', function (event){
        event.preventDefault();
    })

    columnElement.addEventListener('drop', function (event){
        if (draggedNote){
            columnElement.querySelector('.notes').append(draggedNote);
        }
    })
}

function dragStart(event){
    draggedNote = this;
    this.classList.add('dragged');
    event.stopPropagation();
}

function dragEnd(event){
    draggedNote = null;
    this.classList.remove('dragged');
    document.querySelectorAll('.note').forEach(el => el.classList.remove('under'));
}

function dragOver(event){
    event.preventDefault();
    if (this === draggedNote){
        return
    }
}

function dragEnter(event){
    if (this === draggedNote){
        return
    }
    this.classList.add('under');
}

function dragLeave(event){
    if (this === draggedNote){

    }
    this.classList.remove('under');
}

function dragDrop(event){
    event.stopPropagation();
    if (this === draggedNote){
        return
    }
    if (this.parentElement === draggedNote.parentElement) {
        const note = Array.from(this.parentElement.querySelectorAll('.note'));
        const indexUnder = note.indexOf(this);
        const indexAbove = note.indexOf(draggedNote);
         if (indexUnder < indexAbove){
             this.parentElement.insertBefore(draggedNote, this);
         } else {
             this.parentElement.insertBefore(draggedNote, this.nextElementSibling)
         }
    }
    else {
        this.parentElement.insertBefore(draggedNote, this)
    }

}