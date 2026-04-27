//Получаю элементы из html 
const form = document.querySelector('[data-js-todo-new-task-form]'); 
const input = document.querySelector ('[data-js-todo-new-task-input]');  
const totalTask = document.querySelector('[data-js-todo-total-tasks]'); 
const deleteAllBtn = document.querySelector('[data-js-todo-delete-all-button]'); 
const taskList = document.querySelector('[data-js-todo-list]'); 
const emptyMessage = document.querySelector('[data-js-todo-empty-message]'); 

//Состояние 
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

//Первый запуск
renderTasks(); 

//Добавляю задачу 
form.addEventListener('submit', (e) => { e.preventDefault(); 
    const taskText = input.value.trim(); 
    if (taskText === '') return;
    tasks.push(taskText); 
    input.value = ''; 
    saveAndRender(); 
});

//Основа всего 
function renderTasks() { 
    taskList.innerHTML = ''; 
//Цикл
    tasks.forEach((task,index) => {
//Создание элемента
    const li = document.createElement('li');
    li.textContent = task; 
//Удаление по клику
    li.addEventListener('click', () => { 
    tasks.splice(index, 1); 
    saveAndRender(); 
});
//Добавление в DOM 
    taskList.appendChild(li); 
});
    //Обновление UI 

    totalTask.textContent = tasks.length;

   deleteAllBtn.style.display = tasks.length > 0 ? 'block' : 'none';

    emptyMessage.textContent = tasks.length === 0 
    ? 'There are no tasks yet' 
    :'';

}

//Сохраняю данные в local storage
                                
function saveAndRender() {  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(); 

}

 deleteAllBtn.addEventListener('click', () => {  //Обнуляю массив 
    tasks = [];
    saveAndRender();
});


input.addEventListener('keydown', (e) => {  //Добавление отклика на Enter в input 
    if (e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event ('submit'));
    }
}); 



