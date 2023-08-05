import React, { useState } from 'react';
import { Todo } from './models/Todo';

interface EditTodoModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedTodo: Todo) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, isOpen, onClose, onSave }) => {
  const [editedTodoText, setEditedTodoText] = useState(todo.text);

  const handleSave = () => {
    const editedTodo: Todo = { ...todo, text: editedTodoText };
    onSave(editedTodo);
    onClose();
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div>
        <input
          type="text"
          value={editedTodoText}
          onChange={(e) => setEditedTodoText(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTodoModal;
