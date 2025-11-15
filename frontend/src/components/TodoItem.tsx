import { useState } from "react";

interface TodoItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
}

function TodoItem({ id, title, description, completed, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || "");

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <div className="todo-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="form-input"
            placeholder="Todo title"
            autoFocus
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="form-input"
            placeholder="Description (optional)"
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="btn btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id, !completed)}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <span className={`todo-title ${completed ? "completed" : ""}`}>
            {title}
          </span>
          {description && (
            <span className="todo-description">{description}</span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
