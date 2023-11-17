import React, { useState, useEffect } from 'react';
import Search from './Search';
import ListItems from './ListItems';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "../../src/styles.css";


const localData = () => {
    let list = localStorage.getItem('todo-list');

    if (list) {
        return JSON.parse(localStorage.getItem('todo-list'))
    } else {
        return [];
    }
}

const Home = () => {

    const [listItem, setListItem] = useState(localData());
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [priority, setPriority] = useState();
    const [isSearching, setIsSearching] = useState(false);
    const [message, setMessage] = useState("");

    // Handles the logout
    const navigate = useNavigate();
    const routeToLogin = () => {
        navigate('login')
    };


    // Handles the radio buttons
    const handleRadioButtons = (e) => {
        setPriority(e.target.value);
        console.log(e.target.value)
    }


    // Handles the add task function
    const HandlesAddTodo = (e) => {
        e.preventDefault()

        if (!taskName || !taskDescription) {
            setMessage("Task name and description are required.")
        } else {
            let newTask = {
                id: uuidv4(),
                taskName,
                taskDescription,
                priority
            }
            setListItem([...listItem, newTask]);
            setTaskName('');
            setTaskDescription('');
            setPriority('');
            setMessage("")
        }
    }


    // Handles update function
    const handleUpdate = (e, taskId) => {
        e.preventDefault()

        if (!taskName || !taskDescription) {
            setMessage("Task name and description are required.")
        }else{
            let editedTask = {
                id: taskId,
                taskName,
                taskDescription,
                priority
            }
    
            setTaskName(taskName)
            setTaskDescription(taskDescription)
            setPriority(priority)
    
            setListItem(listItem.map(task => {
                return task.id === taskId ? editedTask : task
            }))
            setMessage("")
            setTaskName('');
            setTaskDescription('');
            setPriority('');
        }
    }

    // Handle the search function
    const handleSearch = (taskName) => {
        const searchData = JSON.parse(localStorage.getItem('todo-list'));

        setSearchQuery(
            searchData.filter(index => {
                return index.taskName === taskName
            })
        )
        setIsSearching(true);
        console.log(searchQuery)
    };

    //Handles the delete function
    const deleteTodo = (taskName) => {
        const newTask = listItem.filter(task => {
            return task.taskName !== taskName
        })

        setListItem(newTask);
        console.log(newTask)
    }

    // Handles the edit function
    function handleEdit(task) {
        setTaskName(task.taskName);
        setTaskDescription(task.taskDescription);
        setPriority(task.Priority);

    }

    // Saving to local storage
    useEffect(() => {
        localStorage.setItem('todo-list', JSON.stringify(listItem));
    }, [listItem])

    return (
        <>
            <div className='todo-app'>
                <div className='todolist-header'>

                    <h1>Todo List App</h1>
                    <form className='todolist-form'>
                        {message && <p style={{ marginTop:-15, color:'red', marginBottom:-5}}>Task name and description required.</p>}
                        <div className='form-inputs'>
                            <input
                                type='text'
                                required
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder='Enter task name'
                            />
                            <input
                                type='text'
                                required
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                placeholder='Enter description'
                            />
                            <div className='form-radio'>
                                <input
                                    className='radio-btn1'
                                    type='radio'
                                    name='priority'
                                    value='low'
                                    required
                                    onChange={handleRadioButtons}
                                /> <span className='radio-btn1'> Low </span>
                                <input
                                    className='radio-btn2'
                                    type='radio'
                                    name='priority'
                                    value='medium'
                                    required
                                    onChange={handleRadioButtons}
                                /> <span className='radio-btn2'> Medium </span>
                                <input
                                    className='radio-btn3'
                                    type='radio'
                                    name='priority'
                                    value='high'
                                    required
                                    onChange={handleRadioButtons}
                                /> <span className='radio-btn3'> High </span>
                            </div>
                        </div>
                        <button className='btn-add' onClick={HandlesAddTodo}>ADD</button>
                        <button className='btn-update' onClick={(e) => handleUpdate(e, taskId)}> UPDATE</button>
                    </form>
                </div>
                <div className='todolist-display'>
                    < Search onSearch={handleSearch} />
                    {searchQuery.length ?
                        <ListItems handleEdit={handleEdit} deleteTodo={deleteTodo} listItem={searchQuery} priority={priority} />
                        :
                        <ListItems handleEdit={handleEdit} deleteTodo={deleteTodo} listItem={listItem} priority={priority} />
                    }
                </div>
                <div className='logout'>
                    <button className='logout-btn' onClick={() => routeToLogin()}>LOG OUT</button>
                </div>
            </div>
        </>
    );
}

export default Home;