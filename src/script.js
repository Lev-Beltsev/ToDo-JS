class Todo { 

    selectors = {
    root: '[data-js-todo]',
    newTaskForm: '[data-js-todo-new-task-form]',  
    newTaskImput: '[data-js-todo-new-task-input]',  
    searchTaskForm: '[data-js-todo-search-task-form]', 
    searchTaskImput: '[data-js-todo-search-task-imput]',  
    totalTask: '[data-js-todo-delete-all-button]',  
    deleteAllButton: '[data-js-todo-delete-all-button]', 
    list: '[data-js-todo-list]',  
    item: '[data-js-todo-item]',  
    itemLabel: '[data-js-todo-item-label]',  
    itemDeleteButton: '[data-js-todo-item-delete-button]',  
    emptyMessage: '[data-js-todo-empty-message]',  
    }
}

stateClasses = { 

    isVisible: 'is-visible',
    isDisappearing: 'is-disappearing', 

}

localStorageKey = 'todo-items' 


new Todo ()