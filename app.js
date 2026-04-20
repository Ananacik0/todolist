// inputs, list for tasks
const titleTask = document.querySelector('#title'),
    descriptionTask = document.querySelector('#description'),
    listTask = document.querySelector('#list'),
// buttons
    btnAdd = document.querySelector('#push'),
    btnCompleted = document.querySelector('#completed'),
    btnActive = document.querySelector('#active'),
    btnAll = document.querySelector('#all'),
    btnDelete = document.querySelector('#delete__check'),
    btnCheckAll = document.querySelector('#checked__all'),
    checkboxAll = document.querySelector('#checkbox__all'),
    modalWindow = document.querySelector('.modal'),
    modalTitle = document.querySelector('.modal__title'),
    modalDescription = document.querySelector('.modal__description'),
    modalDate = document.querySelector('.modal__date'),
    modalCheckbox = document.querySelector('.modal__checkbox'),
    modalOptionsList = document.querySelector('.modal__options');
// 


let arrayTask = [];
let typeFilter = 'all';

const addTask = () => {
    if (titleTask.value !== '' && descriptionTask.value !== '') {
        const task = {
            id: Date.now(),
            title: titleTask.value,
            description: descriptionTask.value,
            isChecked: false,
        };
        arrayTask.push(task);
        titleTask.value = '';
        descriptionTask.value = '';
        typeFilter = 'all'
        render();
        titleTask.focus()
    } else {
        // modal window for error
    };
};
const pressKeyboard = (event) => {
    switch (true) {
        case event.code === 'Enter':
            addTask();
            break;
        case event.code === 'Delete':
            deleteCheck();
            break;
        default:
            break; 
    }
    event.code === 'Enter' ? addTask() : '';
};
const deleteCheck = () => {
    arrayTask = arrayTask.filter( element => !element.isChecked);
    render();
};
const checkedAll = (event) => {
    arrayTask.length > 0 ? arrayTask.forEach( element => {
        event.target.checked === true ? element.isChecked = true : element.isChecked = false;
    }) : '';
    render()
};

let thisTask = {}; 

const taskWindow = (element) => {
    modalWindow.style.left = `0`;
    modalTitle.value = element.title;
    modalDescription.innerText = element.description;
    modalDate.value = '';
    modalCheckbox.checked = element.isChecked;
    thisTask = element
};

const saveDataInTask = (element) => {
    element.title = modalTitle.value;
    element.description = modalDescription.value;
    element.isChecked = modalCheckbox.checked;
    thisTask = element;
};

const btnOptions = (event) => {
    saveDataInTask(thisTask);
    switch (true) {
        case event.target.className === 'modal__save':
            arrayTask.forEach( element => {
                if(element.id === thisTask.id) {
                    element.title = thisTask.title;
                    element.description = thisTask.description;
                    element.isChecked = thisTask.isChecked;
                };
                console.log(thisTask)
            });
            modalWindow.style.left = `-100vw`
            render();
            break;
        case event.target.className === 'modal__delete':
            arrayTask = arrayTask.filter( element => element.id !== thisTask.id);
            render()
            break;
        default:
            break;
    };
};

const clickModal = (event) => {
    if (event.target.className === 'modal__close--image') {
        modalWindow.style.left = `-100vw`
        modalTitle.value = thisTask.title;
        modalDescription.value = thisTask.description;
        modalDate.value = '';
        modalCheckbox.checked = '';
    }
};

const clickList = (event) => {
console.log(event)
    switch (true) {

        case event.target.id === 'checkbox__task':
            arrayTask.forEach( element => {
                if (Number(event.target.parentElement.id) === element.id) {
                    element.isChecked = !element.isChecked ? true : false;
                }
            });
            render()
            console.log(arrayTask)
            break;

        case event.target.className === 'task__remove':
            arrayTask = arrayTask.filter( element => element.id !== Number(event.target.parentElement.id));
            render();
            break;
            
        case event.target.className === 'task':
            arrayTask.forEach( element => {
                console.log(event)
                element.id === Number(event.target.id) ? taskWindow(element) : false;
            });
            break;

        default:
            break;

    }
};

const tasksAllCheckbox = () => {
    checkboxAll.checked = arrayTask.length > 0 ? arrayTask.every( element => element.isChecked) : false;
};
const filterButton = (event) => {
    switch (true) {
        case event.target.id === 'all':
            typeFilter = 'all';
            event.target.style.cssText += `background: #fff; color: #000`
            console.log(event)
            btnCompleted.style.background = `var(--light-bgtask)`;
            btnCompleted.style.color = `var(--light-background)`;
            btnActive.style.background = `var(--light-bgtask)`;
            btnActive.style.color = `var(--light-background)`;
            break;
        case event.target.id === 'active':
            typeFilter = 'active';
            event.target.style.cssText += `background: #fff; color: #000`
            btnCompleted.style.background = `var(--light-bgtask)`;
            btnCompleted.style.color = `var(--light-background)`;
            btnAll.style.background = `var(--light-bgtask)`;
            btnAll.style.color = `var(--light-background)`;
            break;
        case event.target.id === 'completed':
            typeFilter = 'completed';
            event.target.style.cssText += `background: #fff; color: #000`
            btnAll.style.background = `var(--light-bgtask)`;
            btnAll.style.color = `var(--light-background)`;
            btnActive.style.background = `var(--light-bgtask)`;
            btnActive.style.color = `var(--light-background)`;
            break;
        default:
            break;
    };
    render()
};

const lengthArray = () => {
    let activeArray = arrayTask.filter( element => !element.isChecked);
    btnAll.innerText = `All ${arrayTask.length}`;
    btnActive.innerText = `Active ${activeArray.length}`;
    btnCompleted.innerHTML = `Completed ${arrayTask.length - activeArray.length}`
};

const filterType = () => {
    switch (true) {
        case typeFilter === 'all':
            btnAll.style.background = `#fff`;
            btnAll.style.color = `#000`;
            btnCompleted.style.background = `var(--light-bgtask)`;
            btnCompleted.style.color = `var(--light-background)`;
            btnActive.style.background = `var(--light-bgtask)`;
            btnActive.style.color = `var(--light-background)`;
            return arrayTask;
            break;
        case typeFilter === 'active':
            return arrayActive = arrayTask.filter( element => !element.isChecked);
            break;
        case typeFilter === 'completed':
            return arrayCompleted = arrayTask.filter( element => element.isChecked);
            break;
        default:
            break;
    };
};
const render = () => {
    let newTask = ``;
    let newArray = filterType();
    if (newArray.length !== 0) {
        newArray.forEach( element => {
            newTask += `
                <li class="task" id="${element.id}">
                    <div class="task__text">
                        <h2 class="task__title">${element.title}</h2>
                        <p class="task__description">${element.description}</p>
                    </div>
                    <div class="task__options" id="${element.id}">
                        <input type="checkbox" ${element.isChecked ? 'checked' : ''} id="checkbox__task">
                        <img src="./remove.svg" alt="" class="task__remove">
                    </div>
                </li>
            `
            ;
            listTask.innerHTML = newTask;
        });
    } else {
        listTask.innerHTML = `
            <img src="./add.svg" alt="" class="add__image">
            <p>Add task in this list...</p>
        `;
    };
    tasksAllCheckbox();
    lengthArray();
};
// listening
const listenlistTask = listTask.addEventListener( 'click', clickList);
const listenAdd = btnAdd.addEventListener( 'click', addTask);
const listenCompleted = btnCompleted.addEventListener( 'click', filterButton);
const listenActive = btnActive.addEventListener( 'click', filterButton);
const listenAll = btnAll.addEventListener( 'click', filterButton);
const listenDelete = btnDelete.addEventListener( 'click', deleteCheck);
const listenCheckboxAll = checkboxAll.addEventListener( 'click', checkedAll);
const listenModal = modalWindow.addEventListener( 'click', clickModal);
const listenSave = modalOptionsList.addEventListener ( 'click', btnOptions);
const listenEnter = document.addEventListener( 'keydown', pressKeyboard);