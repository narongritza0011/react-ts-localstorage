import { Todo } from '../models/Todo';

export const getTodosFromLocalStorage = (): Todo[] => {
  const todosJSON = localStorage.getItem('todos');
  return todosJSON ? JSON.parse(todosJSON) : [];
};

export const saveTodosToLocalStorage = (todos: Todo[]): void => {
  const todosJSON = JSON.stringify(todos);
  localStorage.setItem('todos', todosJSON);
};