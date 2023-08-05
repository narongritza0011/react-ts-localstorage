import React, { useState } from 'react';
import { Todo } from './models/Todo';
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from './utils/localStorageUtils';
import EditTodoModal from './EditTodoModal';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodosFromLocalStorage());
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    if (!newTodoText.trim()) {
      alert('Todo text cannot be empty.');
      return;
    }

    try {
      const newTodo: Todo = {
        id: Date.now(),
        text: newTodoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('An error occurred while adding the todo.');
    }
  };

  const handleToggleComplete = (id: number) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
      alert('An error occurred while toggling todo completion.');
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleSaveTodo = (editedTodo: Todo) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error editing todo:', error);
      alert('An error occurred while editing the todo.');
    }
  };

  const handleDeleteTodo = (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this todo?')) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('An error occurred while deleting the todo.');
    }
  };

  // Save todos to localStorage whenever todos change
  React.useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleEditTodo(todo)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isEditing && currentTodo && (
        <EditTodoModal
          todo={currentTodo}
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveTodo}
        />
      )}
    </div>
  );
};

export default App;
