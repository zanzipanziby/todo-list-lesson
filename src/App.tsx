import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
    // BLL
    const todoListTitle = 'What to learn'
    const todoListTitle2 = 'What to Drink'
    const tasks = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: 'Bear', isDone: true},
        {id: 2, title: 'Cheese', isDone: true},
        {id: 3, title: 'Fish', isDone: false}
    ]

    // GUI
    return (
        <div className="App">
            <TodoList title = {todoListTitle} tasks = {tasks}/>
            <TodoList title = {todoListTitle2} tasks = {tasks2}/>
        </div>
    );
}

export default App;
