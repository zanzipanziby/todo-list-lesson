import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    // BLL
    const todoListTitle = 'What to learn'

    // const tasks = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 2, title: 'JS', isDone: true},
    //     {id: 3, title: 'React', isDone: false},
    //     {id: 4, title: 'Redux', isDone: false},
    //     {id: 5, title: 'GraphQL', isDone: false}
    // ]

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}
    ])



    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }



    const [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodoList = tasks;
    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if(filter === 'completed'){
        tasksForTodoList = tasks.filter(t => t.isDone)
    }


    const changeFilter = (f: FilterValuesType) => {
        setFilter(f)
    }



    // GUI
    return (
        <div className="App">
            <TodoList
                title = {todoListTitle}
                tasks = {tasksForTodoList}
                removeTasks={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
