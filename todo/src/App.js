import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './styles.css'; // Import the global styles
import { createTodo, getTodos, deleteTodo as deleteTodoAPI, toggleComplete as toggleCompleteAPI } from './api/todos';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await getTodos();
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async (title) => {
        try {
            const response = await createTodo({ title }); // Note: passing `title` directly
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };
    

    // const handleUpdateTodo = async (id, updatedText) => {
    //     try {
    //         await updateTodo(id, { text: updatedText });
    //         setTodos(todos.map(todo => (todo._id === id ? { ...todo, text: updatedText } : todo)));
    //     } catch (error) {
    //         console.error('Error updating todo:', error);
    //     }
    // };

    const toggleComplete = async (id) => {
        try {
            const response = await toggleCompleteAPI(id); // Call the API to toggle completion
            setTodos(todos.map(todo => (todo._id === id ? response.data : todo))); // Update the state
        } catch (error) {
            console.error('Error toggling completion:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await deleteTodoAPI(id);
            console.log(response);
            
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="container">
            <h1>Todo App</h1>
            <AddTodo addTodo={addTodo} />
            <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        </div>
    );
};

export default App;
