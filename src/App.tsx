import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";
import {v1} from "uuid"

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
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ])
    // Функция для удаления таски
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
        console.log(taskId)
    }


    // Функция для фильтрации тасок
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const getFilteredTasks = (t: Array<TasksType>, f: FilterValuesType) => {
        let tasksForTodoList = t;
        if (f === 'active') {
            tasksForTodoList = t.filter(t => !t.isDone)
        }
        if (f === 'completed') {
            tasksForTodoList = t.filter(t => t.isDone)
        }

        return tasksForTodoList
    }

    // let tasksForTodoList = tasks;
    // if (filter === 'active') {
    //     tasksForTodoList = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //     tasksForTodoList = tasks.filter(t => t.isDone)
    // }


    const changeFilter = (f: FilterValuesType) => {
        setFilter(f)
    }


    // Функция для добавления таски
    const addTask = (newTitle: string) => {
            const newTask: TasksType = {
                id: v1(),
                title: newTitle,
                isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId:string, newStatus: boolean) => {
        const updatedTasks: Array<TasksType> = tasks.map(t => t.id ===taskId ? {...t, isDone: newStatus}: t)
        setTasks(updatedTasks)
    }
    // GUI
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={getFilteredTasks(tasks, filter)}
                removeTasks={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus ={changeTaskStatus}
                filter={filter}

            />
        </div>
    );
}

export default App;
