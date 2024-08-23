import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <div className={`todo-item ${todo?.completed ? 'completed' : ''}`}>
            <div>{todo?.title}</div>
            <div>
                <button className="toggle-btn" onClick={() => toggleComplete(todo._id)}>
                    {todo?.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;
