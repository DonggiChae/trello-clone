import { IToDoState } from '../atoms';

export const LOCAL_TODO = 'storedTodos';

export const loadTodos = () => {
    const localTodos = localStorage.getItem(LOCAL_TODO);
    if (localTodos) {
        return JSON.parse(localTodos);
    }
    return null;
};

export const saveTodos = (todos: IToDoState) => {
    localStorage.setItem(LOCAL_TODO, JSON.stringify(todos));
};