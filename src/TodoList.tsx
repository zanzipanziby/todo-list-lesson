import React from 'react';
import {FilterValuesType} from "./App";

 type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (taskId: number) => void
    changeFilter: (f: FilterValuesType) => void
}

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const getTasksListItem = (t: TasksType) => {
        return (
            <li key={t.id}>
                <button onClick={() => props.removeTasks(t.id)}>x</button>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
            </li>


        )
    }
    const tasksList = props.tasks.map(getTasksListItem)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;