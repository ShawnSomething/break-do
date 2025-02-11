import React, { useState } from 'react';

interface Task {
    task: string;
    value: number;
    urgency: string;
}

interface SubTask {
    subTask: string;
    value: number;
}

interface SubSubTask {
    subSubTask: string;
    value: number;
}

const complexity = (value: number) => {
    if (value <= 3) {
        return;
    } else if (value > 3 && value <= 6) {
        alert('We can break this down a little');
    } else if (value > 6) {
        alert(`this is going to be big, let's break it down`);
    }
}

export const List = () => {
    const [task, setTask] = useState('');
    const [value, setValue] = useState<number | ''>('');
    const [urgency, setUrgency] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [subTask, setSubTask] = useState('');
    const [subTaskValue, setSubTaskValue] = useState<number | ''>('');
    const [subTasks, setSubTasks] = useState<{ [key: number]: SubTask[] }>({});
    const [subSubTask, setSubSubTask] = useState('');
    const [subSubTaskValue, setSubSubTaskValue] = useState<number | ''>('');
    const [subSubTasks, setSubSubTasks] = useState<{ [key: number]: { [subIndex: number]: SubSubTask[] } }>({});

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseInt(event.target.value, 10);
        setValue(isNaN(parsedValue) ? '' : parsedValue);
    };

    const handleUrgencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrgency(event.target.value);
    };

    const handleSubTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubTask(event.target.value);
    };

    const handleSubTaskValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseInt(event.target.value, 10);
        setSubTaskValue(isNaN(parsedValue) ? '' : parsedValue);
    };

    const handleSubSubTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubSubTask(event.target.value);
    };

    const handleSubSubTaskValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseInt(event.target.value, 10);
        setSubSubTaskValue(isNaN(parsedValue) ? '' : parsedValue);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value === '') return;
        const newTask: Task = { task, value: value as number, urgency };
        setTasks([...tasks, newTask]);
        setTask('');
        setValue('');
        setUrgency('');
        complexity(value as number);
    };

    const handleSubTaskSubmit = (event: React.FormEvent<HTMLFormElement>, taskIndex: number) => {
        event.preventDefault();
        if (subTaskValue === '') return;
        if (subTaskValue > tasks[taskIndex].value) {
            alert('Sub-Task value should not be greater than Task value, make it smaller');
            return;
        }
        const newSubTask: SubTask = { subTask, value: subTaskValue as number };
        setSubTasks({
            ...subTasks,
            [taskIndex]: [...(subTasks[taskIndex] || []), newSubTask]
        });
        setSubTask('');
        setSubTaskValue('');
        complexity(subTaskValue as number);
    };

    const handleSubSubTaskSubmit = (event: React.FormEvent<HTMLFormElement>, taskIndex: number, subTaskIndex: number) => {
        event.preventDefault();
        if (subSubTaskValue === '') return;
        if (subSubTaskValue > subTasks[taskIndex][subTaskIndex].value) {
            alert('Sub-Sub-Task value should not be greater than Sub-Task value, make it smaller');
            return;
        }
        const newSubSubTask: SubSubTask = { subSubTask, value: subSubTaskValue as number };
        setSubSubTasks({
            ...subSubTasks,
            [taskIndex]: {
                ...(subSubTasks[taskIndex] || {}),
                [subTaskIndex]: [...(subSubTasks[taskIndex]?.[subTaskIndex] || []), newSubSubTask]
            }
        });
        setSubSubTask('');
        setSubSubTaskValue('');
        complexity(subSubTaskValue as number);
    };

    return (
        <>
            <div>Break down your to do list</div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={task} 
                    onChange={handleTaskChange} 
                    placeholder="Enter task" 
                />
                <input 
                    type="text" 
                    value={value === '' ? '' : value.toString()} 
                    onChange={handleValueChange} 
                    placeholder="Enter value" 
                />
                <input 
                    type="text" 
                    value={urgency} 
                    onChange={handleUrgencyChange} 
                    placeholder="Enter urgency" 
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        Task: {task.task}, Value: {task.value}, Urgency: {task.urgency}
                        {task.value > 3 && (
                            <>
                                <ul>
                                    {(subTasks[index] || []).map((subTask, subIndex) => (
                                        <li key={subIndex}>
                                            Sub-Task: {subTask.subTask}, Value: {subTask.value}
                                            {subTask.value > 3 && (
                                                <>
                                                    <ul>
                                                        {(subSubTasks[index]?.[subIndex] || []).map((subSubTask, subSubIndex) => (
                                                            <li key={subSubIndex}>
                                                                Sub-Sub-Task: {subSubTask.subSubTask}, Value: {subSubTask.value}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <form onSubmit={(event) => handleSubSubTaskSubmit(event, index, subIndex)}>
                                                        <input 
                                                            type="text" 
                                                            value={subSubTask} 
                                                            onChange={handleSubSubTaskChange} 
                                                            placeholder="Enter sub-sub-task" 
                                                        />
                                                        <input 
                                                            type="text" 
                                                            value={subSubTaskValue === '' ? '' : subSubTaskValue.toString()} 
                                                            onChange={handleSubSubTaskValueChange} 
                                                            placeholder="Enter sub-sub-task value" 
                                                        />
                                                        <button type="submit">Add Sub-Sub-Task</button>
                                                    </form>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <form onSubmit={(event) => handleSubTaskSubmit(event, index)}>
                                    <input 
                                        type="text" 
                                        value={subTask} 
                                        onChange={handleSubTaskChange} 
                                        placeholder="Enter sub-task" 
                                    />
                                    <input 
                                        type="text" 
                                        value={subTaskValue === '' ? '' : subTaskValue.toString()} 
                                        onChange={handleSubTaskValueChange} 
                                        placeholder="Enter sub-task value" 
                                    />
                                    <button type="submit">Add Sub-Task</button>
                                </form>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};