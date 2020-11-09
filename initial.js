const sets = {
    set1: {
        name: 'Set 1',
        tasks : {
            1: 'Task 1',
            2: 'Task 2',
            3: 'Task 3'
        },
    },
    set2: {
        name: "Set 2",
        tasks : {
            4: 'Task 4',
            5: 'Task 5',
            6: 'Task 6',
            7: 'Task 7'
        },
    },
    set3: {
        name: 'Set 3',
        tasks: {
            8: 'task 8',
        },
    }
};

const initializeList = function (sets){
    const columns = document.querySelector('.columns');
    const array_set = Object.values(sets); // Сразу можно создать массив объектов
    array_set.forEach((item, index) => {
        const setContainer = document.createElement('div');
        setContainer.classList.add('set-container');

        const set = document.createElement('div');
        set.classList.add('column');
        set.draggable = true;
        set.setAttribute('data-column-id', index.toString());

        const title = document.createElement('p');
        title.classList.add('column-header');
        title.innerText = item.name;

        const notes = document.createElement('div');
        notes.classList.add('notes');

        set.appendChild(title);
        set.appendChild(notes);
        setContainer.appendChild(set);
        columns.appendChild(setContainer);

        let array_notes = Object.values(array_set[index].tasks);
        if (array_notes.length !== 0){
            array_notes.forEach((task, i) => {
                let noteContainer = document.createElement('div');
                noteContainer.classList.add('note-container');
                let note = document.createElement('div');
                note.classList.add('note');
                note.draggable = true;
                note.setAttribute('data-note-id', i.toString());
                note.innerText = task;
                noteContainer.appendChild(note);
                notes.appendChild(noteContainer);
            });
        }
    });
};

initializeList(sets);

