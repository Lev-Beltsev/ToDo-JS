// Получаю элементы из html 
const form = document.querySelector('[data-js-todo-new-task-form]'); 
const input = document.querySelector('[data-js-todo-new-task-input]');  
const totalTask = document.querySelector('[data-js-todo-total-tasks]'); 
const deleteAllBtn = document.querySelector('[data-js-todo-delete-all-button]'); 
const taskList = document.querySelector('[data-js-todo-list]'); 
const emptyMessage = document.querySelector('[data-js-todo-empty-message]'); 

// Состояние загружаю из localStorage

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

// МИГРАЦИЯ: преобразую старый формат (строки) в новый (объекты)

if (tasks.length > 0 && typeof tasks[0] === 'string') {
    tasks = tasks.map(text => ({ text, completed: false }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Первый запуск

renderTasks(); 

// Добавляю задачу 

form.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const taskText = input.value.trim(); 
    if (taskText === '') return;
    
    // Добавляю объект вместо строки

    tasks.push({ 
        text: taskText, 
        completed: false 
    }); 
    
    input.value = ''; 
    saveAndRender(); 
});

function renderTasks() { 
    taskList.innerHTML = ''; 
    
    tasks.forEach((task, index) => {

        // Создание элементов
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const span = document.createElement('span');
        const deleteBtn = document.createElement('button');
        
        // Настройка чекбокса

        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        
        // Настройка текста

        span.textContent = task.text;
        
        // Добавляю класс если выполнено 

        if (task.completed) {
            span.classList.add('completed');
        }
        
        // Настройка кнопки удаления

        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        
        // Обработчик чекбокса

        checkbox.addEventListener('change', () => {
            tasks[index].completed = checkbox.checked;
            
            if (checkbox.checked) {
                span.classList.add('completed');
            } else {
                span.classList.remove('completed');
            }
            
            localStorage.setItem('tasks', JSON.stringify(tasks));
            totalTask.textContent = tasks.length;
        });
        
        // Обработчик удаления

        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveAndRender();
        });
        
        // Сборка элемента

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        // Добавление в DOM

        taskList.appendChild(li);
    });
    
    // Обновление UI
    
    totalTask.textContent = tasks.length;
    deleteAllBtn.style.display = tasks.length > 0 ? 'block' : 'none';
    emptyMessage.textContent = tasks.length === 0 ? 'There are no tasks yet' : '';
}

// Сохраняю данные в local storage и перерисовываю
function saveAndRender() {  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(); 
}

// Удаление всех задач
deleteAllBtn.addEventListener('click', () => {
    tasks = [];
    saveAndRender();
});

// Добавление отклика на Enter в input
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});