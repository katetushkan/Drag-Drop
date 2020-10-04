let draggedNote = '';
let draggedColumn = '';
let draggedContainer = '';
let draggedCard = '';

document.querySelectorAll('.note').forEach(noteProcess);
document.querySelectorAll('.column').forEach(columnProcess);
document.querySelectorAll('.note-container').forEach(containerProcess);
document.querySelectorAll('.set-container').forEach(setContainerProcess);

function noteProcess(noteElement){
    noteElement.addEventListener('dragstart', dragStart);
    noteElement.addEventListener('dragend', dragEnd);
    noteElement.addEventListener('dragleave', (event) => {
        event.preventDefault()
        event.stopPropagation()
    }, false)
    noteElement.addEventListener('dragover', (event) => {
        event.preventDefault()
        event.stopPropagation()
    }, false)
}

function containerProcess(containerElement){
    containerElement.addEventListener('dragover', dragOverContainer, false);
    containerElement.addEventListener('dragenter', dragEnterContainer, false);
    containerElement.addEventListener('dragleave', dragLeaveContainer, false);
    containerElement.addEventListener('drop', dropContainer, true);
}

function columnProcess(columnElement){
    columnElement.addEventListener('drop', function (event){
        event.stopPropagation();
        event.preventDefault();
        console.log('dropped card');
        if (draggedNote){
            const container = document.createElement('div');
            container.classList.add('note-container')
            container.appendChild(draggedNote);
            containerProcess(container);
            columnElement.querySelector('.notes').append(container);
        }
        else if (draggedColumn){
            debugger
            const children = Array.from(document.querySelector('.columns').children);
            const indexA = children.indexOf(this.parentElement);
            const indexB = children.indexOf(draggedColumn.parentElement);
            const container = document.createElement('div');
            container.classList.add('set-container');
            container.appendChild(draggedColumn);
            if (indexA < indexB){
                document.querySelector('.columns').insertBefore(container, this.parentElement);
            } else {
                document.querySelector('.columns').insertBefore(container, this.parentElement.nextElementSibling);
            }
            document.querySelectorAll('.column').forEach(column => column.classList.remove('under'));
        }
    }, false);

    columnElement.addEventListener('dragstart', dragStartColumn);
    columnElement.addEventListener('dragend', dragEndColumn);
    columnElement.addEventListener('dragleave', (event) => {
        event.preventDefault()
        event.stopPropagation()
    }, false)
    columnElement.addEventListener('dragover', (event) => {
        event.preventDefault()
        event.stopPropagation()
    }, false)


}

function setContainerProcess(setContainer){
    setContainer.addEventListener('dragover', dragOverSet, false);
    setContainer.addEventListener('dragenter', dragEnterSet, false);
    setContainer.addEventListener('dragleave', dragLeaveSet, false);

}

// note functions
function dragStart(event){
    event.stopPropagation();
    draggedNote = this;
    draggedContainer = this.parentElement;
    draggedCard = this.parentElement.parentElement.parentElement;
    this.classList.add('dragged');
}

function dragEnd(event){
    event.stopPropagation();
    draggedNote = null;
    draggedContainer = null;
    draggedCard = null;
    this.classList.remove('dragged');
    document.querySelectorAll('.note').forEach(el => el.classList.remove('under'));


}

//container functions
function dragEnterContainer(event){
    event.preventDefault()
    if (this.querySelector('.dragged') === null) {
        this.classList.add('under');
    }
}

function dragOverContainer(event){
    event.preventDefault();
}

function dragLeaveContainer(event) {
    event.preventDefault();
    this.classList.remove('under');
}

function dropContainer(event){
    event.stopPropagation();
    event.preventDefault();
    console.log(this.parentElement.parentElement)
    if (this.parentElement.parentElement === draggedCard){
        console.log('draggedCard');
        const oldChild = this.firstChild;
        const newChild = draggedNote;
        draggedContainer.appendChild(oldChild);
        draggedContainer.removeChild(newChild);
        this.appendChild(draggedNote);
        this.classList.remove('under');
    }
    else {
        debugger
        const container = document.createElement('div');
        container.classList.add('note-container')
        container.appendChild(draggedNote);
        containerProcess(container);
        draggedContainer.remove();
        this.parentElement.insertBefore(container, this);
        this.classList.remove('under')
    }

}

// column functions
function dragStartColumn(event){

    document
        .querySelectorAll('.note-container')
        .forEach(noteElement => noteElement.setAttribute('disabled', 'true'));
    draggedColumn = this;
    draggedColumn.classList.add('dragged');

}

function dragEndColumn(event){
    draggedColumn.classList.remove('dragged');
    draggedColumn = null;

    document
        .querySelectorAll('.note')
        .forEach(noteElement => noteElement.setAttribute('draggable', 'true'));
}

//set function
function dragEnterSet(event){
    event.stopPropagation();
    if ( !draggedColumn || draggedColumn === this){
        return
    }
    this.classList.add('under');
}

function dragOverSet(event){

    event.preventDefault();

}

function dragLeaveSet(event){
    event.preventDefault();
    if (!draggedColumn || draggedColumn === this){
        return
    }
    this.classList.remove('under');
}

