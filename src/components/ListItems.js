import React from 'react'
import {AiTwotoneDelete, AiOutlineEdit} from 'react-icons/ai'


const ListItems = ({ deleteTodo, handleEdit, listItem, priority }) => {

    return (
        <>
            {
                listItem.map((task, index) => ( 
                    <div className={`display-list ${task.priority}`} key={index}>
                        <div className='task-details'>
                            <h3 className='task-heading'>{task.taskName}</h3>
                            <p className='task-description'>{task.taskDescription}</p>
                        </div>
                        <div>
                            <AiOutlineEdit 
                                className='edit-btn' 
                                onClick={() => handleEdit(task, index) } 
                            />
                            <AiTwotoneDelete 
                                className='delete-btn' 
                                onClick={() => deleteTodo(task.taskName)} 
                            />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ListItems;
