import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from "../api/hooks";
import { useForm } from "react-hook-form";
import TodoItem from "../components/TodoItem";

export default function Todos() {
  const { data: todos, isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const { register, handleSubmit, reset } = useForm<{ title: string; description?: string }>();

  async function onSubmit(values: any) {
    await createTodo.mutateAsync(values);
    reset();
  }

  const handleToggle = (id: string, completed: boolean) => {
    updateTodo.mutate({ id, payload: { completed } });
  };

  const handleUpdate = (id: string, title: string, description?: string) => {
    updateTodo.mutate(
      { id, payload: { title, description } },
      {
        onSuccess: () => {
          console.log('Todo updated successfully');
        },
        onError: (error: any) => {
          console.error('Error updating todo:', error);
          alert('Failed to update todo. Please try again.');
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo.mutate(id, {
        onSuccess: () => {
          console.log('Todo deleted successfully');
        },
        onError: (error: any) => {
          console.error('Error deleting todo:', error);
          alert('Failed to delete todo. Please try again.');
        },
      });
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="todos-container">
      <div className="todos-card">
        <h1>My Todos</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
          <div className="form-row">
            <input
              {...register("title")}
              placeholder="Todo title"
              className="form-input"
              required
            />
            <input
              {...register("description")}
              placeholder="Description (optional)"
              className="form-input"
            />
            <button type="submit" className="btn btn-primary">
              Add Todo
            </button>
          </div>
        </form>

        <ul className="todo-list">
          {todos?.map((t: any) => (
            <TodoItem
              key={t._id}
              id={t._id}
              title={t.title}
              description={t.description}
              completed={t.completed}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>

        {todos?.length === 0 && (
          <p className="empty-message">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}
