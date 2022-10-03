import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (taskId: string) => void
    changeFilter: (f: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId:string, newStatus: boolean) => void
    filter: FilterValuesType
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState(false)
    const getTasksListItem = (t: TasksType) => {
        const removeTask = () => props.removeTasks(t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li className = {t.isDone ? 'isDone' : 'notIsDone'} key={t.id}>
                <button onClick={removeTask}>x</button>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
            </li>


        )
    }
    const tasksList = props.tasks.length ? props.tasks.map(getTasksListItem) : <span>Your tasklist is empty</span>

    const addTasks = () => {
        const trimNewTaskTitle = newTaskTitle.trim()
        if(trimNewTaskTitle !== ""){
            props.addTask(trimNewTaskTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }

    const handlerCreator = (filterTitle: FilterValuesType) => () => props.changeFilter(filterTitle)
    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTasks()
    const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>)=> {
        setNewTaskTitle(e.currentTarget.value)
        error && setError(false)
    }
    const errorMessage = error ? <div>Title is required!</div> : null
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value = {newTaskTitle}
                    onChange={onChangeSetNewTaskTitle}
                    onKeyDown={onEnterDownAddTask}
                />
                <button onClick={addTasks}>add</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeBtn' : "btn"} onClick={handlerCreator('all')}>All</button>
                <button className={props.filter === 'active' ? 'activeBtn' : "btn"} onClick={handlerCreator('active')}>Active</button>
                <button className={props.filter === 'completed' ? 'activeBtn' : "btn"} onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;