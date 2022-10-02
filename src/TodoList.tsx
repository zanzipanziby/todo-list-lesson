import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (taskId: string) => void
    changeFilter: (f: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const getTasksListItem = (t: TasksType) => {
        const removeTask = () => props.removeTasks(t.id)
        return (
            <li key={t.id}>
                <button onClick={removeTask}>x</button>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
            </li>


        )
    }
    const tasksList = props.tasks.map(getTasksListItem)

    const addTasks = () => {
        const trimNewTaskTitle = newTaskTitle.trim()
        if(trimNewTaskTitle !== ""){
            props.addTask(trimNewTaskTitle)
        }
        setNewTaskTitle('')
    }

    const handlerCreator = (filterTitle: FilterValuesType) => () => props.changeFilter(filterTitle)
    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTasks()
    const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>)=>setNewTaskTitle(e.currentTarget.value)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value = {newTaskTitle}
                    onChange={onChangeSetNewTaskTitle}
                    onKeyDown={onEnterDownAddTask}
                />
                <button onClick={addTasks}>add</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={handlerCreator('all')}>All</button>
                <button onClick={handlerCreator('active')}>Active</button>
                <button onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;