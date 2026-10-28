import React, { useState, useEffect, useRef } from 'react';

const INITIAL_TASKS = [
  { id: 1, title: 'Learn React basics', completed: false },
  { id: 2, title: 'Build my first application', completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem('todo-app-tasks');
      return stored ? JSON.parse(stored) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const editInputRef = useRef(null);

  // Sync tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('todo-app-tasks', JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  }, [tasks]);

  // Focus the edit input when entering edit mode
  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInputValue('');
  };

  // Toggle task completed state
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a specific task
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  // Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // Start editing a task
  const handleStartEdit = (task, e) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingId(task.id);
    setEditingText(task.title);
  };

  // Save the edited task
  const handleSaveEdit = (id) => {
    const trimmed = editingText.trim();
    if (trimmed) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title: trimmed } : task
        )
      );
    }
    setEditingId(null);
    setEditingText('');
  };

  // Handle keys while editing (Enter to save, Esc to cancel)
  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingText('');
    }
  };

  // Compute filtered list and counts
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <main className="app">
      <header className="header">
        <div className="brand-icon" aria-hidden="true">✓</div>
        <h1>My Tasks</h1>
        <p>Plan your day. Make progress.</p>
      </header>

      <section className="todo-card" aria-label="Todo list application">
        <form className="add-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What do you need to do?"
            aria-label="New task"
            maxLength={200}
          />
          <button type="submit" className="add-button">
            + Add
          </button>
        </form>

        <div className="stats">
          <span>{remainingCount} remaining</span>
          <span>{completedCount} completed</span>
        </div>

        <nav className="filters" aria-label="Filter tasks">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              type="button"
              className={filter === f ? 'filter active-filter' : 'filter'}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </nav>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? 'task done' : 'task'}
            >
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  aria-label={`Mark "${task.title}" as ${
                    task.completed ? 'incomplete' : 'complete'
                  }`}
                />
                {editingId === task.id ? (
                  <input
                    ref={editInputRef}
                    type="text"
                    className="task-edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                    onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Edit task title"
                    maxLength={200}
                  />
                ) : (
                  <span
                    className="task-title"
                    onDoubleClick={(e) => handleStartEdit(task, e)}
                    title="Double click to edit"
                  >
                    {task.title}
                  </span>
                )}
              </label>

              <button
                className="delete-button"
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                aria-label={`Delete ${task.title}`}
                title="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <span role="img" aria-label="Target">🎯</span>
            <p>
              {tasks.length === 0
                ? 'No tasks yet. Add your first task!'
                : 'No tasks in this category.'}
            </p>
          </div>
        )}

        <footer className="card-footer">
          <span>{tasks.length} total tasks</span>
          <button
            type="button"
            onClick={handleClearCompleted}
            disabled={completedCount === 0}
            style={{
              opacity: completedCount === 0 ? 0.5 : 1,
              cursor: completedCount === 0 ? 'default' : 'pointer',
            }}
          >
            Clear completed
          </button>
        </footer>
      </section>

      <p className="bottom-note">Small steps every day lead to big results.</p>
    </main>
  );
}
