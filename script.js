let draggedNote = '';
let draggedColumn = '';
let draggedContainer = '';
let draggedCard = '';
let direction = '';
let oldY = 0;
let animatedElem = Array();
let draggedSet = '';
let newColumn = false;


document.querySelectorAll('.note').forEach(noteProcess);
document.querySelectorAll('.column').forEach(columnProcess);
document.querySelectorAll('.note-container').forEach(containerProcess);
document.querySelectorAll('.set-container').forEach(setContainerProcess);
document.querySelectorAll('.row').forEach(columnsPr)

document.addEventListener('mousemove', function (event) {
    if (event.pageY < oldY){
        direction = 'UP';

    }else if (event.pageY > oldY){
        direction = 'DOWN';
    }
    oldY = event.pageY;
});

function columnsPr(columns){
    columns.addEventListener('drop', (event)=>{
        if (event.target.className === "note-container under"){
            return
        }
        else if (event.target.className === "set-container under"){
            return
        }
        else {
            event.stopPropagation();
            event.preventDefault();
            console.log('drop');
            console.log(this)
            const setContainer = document.createElement('div');
            setContainer.classList.add('set-container');
            const set = document.createElement('div');
            set.classList.add('column');
            set.draggable = true;
            const notes = document.createElement('div');
            notes.classList.add('notes');
            const noteContainer = document.createElement('div');
            noteContainer.classList.add('note-container')
            noteContainer.appendChild(draggedNote);
            notes.appendChild(noteContainer);
            set.appendChild(notes);
            setContainer.appendChild(set);

            containerProcess(noteContainer);
            setContainerProcess(setContainer);
            columnProcess(set);

            let columns = document.querySelector('.columns');
            if (direction === 'UP') {
                console.log(event.target.nextSibling);
                columns.insertBefore(setContainer, event.target.nextSibling);
            }
            if (direction === 'DOWN') {
                columns.insertBefore(setContainer, event.target);
            }
            draggedContainer.remove();


        }



    }, true);
}
function noteProcess(noteElement){
    noteElement.addEventListener('dragstart', dragStart);
    noteElement.addEventListener('dragend', dragEnd);
    noteElement.addEventListener('dragleave', (event) => {
        event.preventDefault();
        event.stopPropagation();
    }, false);
    noteElement.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
    }, false);
}


function containerProcess(containerElement){
    containerElement.addEventListener('dragover', dragOverContainer, false);
    containerElement.addEventListener('dragenter', dragEnterContainer, false);
    containerElement.addEventListener('dragleave', dragLeaveContainer, false);
    containerElement.addEventListener('drop', dropContainer, false);
}

function columnProcess(columnElement){
    columnElement.addEventListener('drop', function (event){
        event.stopPropagation();
        event.preventDefault();
        if (draggedNote){
            const container = document.createElement('div');
            container.classList.add('note-container');
            container.appendChild(draggedNote);
            containerProcess(container);
            columnElement.querySelector('.notes').append(container);
        }
        else if (draggedColumn){
            if(animatedElem){
                animatedElem.forEach((elem)=>{
                    elem.style = 'transform: none';
                });
                animatedElem.length = 0;
            }
        }
    }, false);

    columnElement.addEventListener('dragstart', dragStartColumn);
    columnElement.addEventListener('dragend', dragEndColumn);
    columnElement.addEventListener('dragleave', (event) => {
        event.preventDefault();
        event.stopPropagation();
    }, false);
    columnElement.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
    }, false)


}

function setContainerProcess(setContainer){
    setContainer.addEventListener('dragover', dragOverSet, false);
    setContainer.addEventListener('dragenter', dragEnterSet, false);
    setContainer.addEventListener('dragleave', dragLeaveSet, false);
    setContainer.addEventListener('drop', dropCol, false);

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
    if(animatedElem){
        animatedElem.forEach((elem)=>{
            elem.style = 'transform: none';
        });
        animatedElem.length = 0;
    }

}

//container functions
function dragEnterContainer(event) {
    if (!draggedNote){
        return
    }
    else {
        event.preventDefault();
        if (this.querySelector('.dragged') === null) {
            this.classList.add('under');
        }

        const cards = Array.from(this.parentElement.children);
        const children = Array()
        cards.forEach((elem) => {
            children.push(elem.firstChild)
        });

        if (direction === 'UP') {
            let board = children.indexOf(this.children[0]);
            for (let elem = children.length - 2; elem >= board; elem--) {
                children[elem].style = 'transform: translateY(50px)';
                animatedElem.push(children[elem]);
            }
            if (draggedCard !== this.parentElement.parentElement){
                children[children.length-1].style ='transform: translateY(50px)';
                animatedElem.push(children[children.length-1]);
            }

        }
        if (direction === 'DOWN') {
            let board = children.indexOf(this.children[0]);
            for (let elem = 1; elem <= board; elem++) {
                children[elem].style = 'transform: translateY(-50px)';
                animatedElem.push(children[elem]);
            }
            if (draggedCard !== this.parentElement.parentElement){
                if (this.parentElement.children.length === 1){
                    this.children[0].style = 'transform: translateY(50px)';
                    animatedElem.push(this.children[0]);
                }
                else {
                    children[0].style ='transform: translateY(-50px)';
                    animatedElem.push(children[0]);
                }

            }

        }
    }




}


function dragOverContainer(event){
   event.preventDefault();

}

function dragLeaveContainer(event) {
    event.preventDefault();
    this.classList.remove('under');
    if(animatedElem){
        animatedElem.forEach((elem)=>{
            elem.style = 'transform: none';
        });
        animatedElem.length = 0;
    }
}

function dropContainer(event){
    event.stopPropagation();
    event.preventDefault();
    if (this.parentElement.parentElement === draggedCard){
        const oldChild = this.firstChild;
        const newChild = draggedNote;
        draggedContainer.appendChild(oldChild);
        draggedContainer.removeChild(newChild);
        this.appendChild(draggedNote);
        this.classList.remove('under');
        if(animatedElem){
            animatedElem.forEach((elem)=>{
                elem.style = 'transform: none';
            });
            animatedElem.length = 0;
        }
    }
    else {
        const container = document.createElement('div');
        container.classList.add('note-container');
        container.appendChild(draggedNote);
        containerProcess(container);
        if (draggedContainer.parentNode.children.length === 1) {
            draggedContainer.parentNode.parentNode.parentNode.remove();
        }
        draggedContainer.remove();
        this.parentElement.insertBefore(container, this);
        this.classList.remove('under');
        if(animatedElem){
            animatedElem.forEach((elem)=>{
                elem.style = 'transform: none';
            });
            animatedElem.length = 0;
        }
    }
    if (this.parentElement.parentElement.parentElement.className !== 'set-container'){
        console.log(this.parentElement.parentElement.className)
    }


}

// column functions
function dragStartColumn(event){
    document
        .querySelectorAll('.note-container')
        .forEach(noteElement => noteElement.setAttribute('disabled', 'true'));
    draggedColumn = this;
    draggedSet = this.parentElement;
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
    if (this.querySelector('.dragged') === null) {
        this.classList.add('under');
    }
    if (draggedCard){
        newColumn = false;
    }

    const sets = Array.from(this.parentElement.children);

    let children = Array();
    sets.forEach((elem) => {
        children.push(elem.firstChild)
    });

    if (direction === 'UP') {
        let board = children.indexOf(this.children[0]);
        for (let elem = children.length - 2; elem >= board; elem--) {
            let offset = draggedColumn.offsetHeight.toString()
            children[elem].style = 'transform: translateY('+offset+'px)';
            animatedElem.push(children[elem]);
        }
    }

    if (direction === 'DOWN') {
        let board = children.indexOf(this.children[0]);
        for (let elem = 1; elem <= board; elem++) {
            let offset = draggedColumn.offsetHeight.toString()
            children[elem].style = 'transform: translateY(-'+offset+'px)';
            animatedElem.push(children[elem]);
        }
    }
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
    if(animatedElem){
        animatedElem.forEach((elem)=>{
            elem.style = 'transform: none';
        });
        animatedElem.length = 0;
    }

}

function dropCol(event){
    event.stopPropagation();
    const oldChild = this.firstChild;
    const newChild = draggedColumn;

    this.appendChild(newChild);
    this.removeChild(oldChild);

    draggedSet.appendChild(oldChild);
    this.classList.remove('under');
    if(animatedElem){
        animatedElem.forEach((elem)=>{
            elem.style = 'transform: none';
        });
        animatedElem.length = 0;
    }
}

