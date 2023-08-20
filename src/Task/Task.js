import React, {useEffect, useState} from "react";
import './Task.css';
import {Link, useParams} from "react-router-dom";

const Task = (props) => {

    const {addDescription, tasks} = props;

    const {stage, id} = useParams();

    const oldDescription = tasks[stage].find(task => task.id == id)?.description;

    const [newDescription, setDescription] = useState(oldDescription)

    const taskName = tasks[stage].find(task => task.id == id)?.name;


    const handleChange = e => {
        setDescription(e.target.value)
    }

    const handleSubmit = () => {
        addDescription(stage, id, newDescription);
    }

    const textArea = <textarea className='task__textarea' defaultValue={oldDescription} placeholder={oldDescription ? oldDescription : 'This task has no description'} onChange={handleChange} />

    return (
        <>
            <div className='task'>
                <form className='task__form'>
                    <h1 className='task__title'>{taskName}</h1>
                    <Link to='/'>
                        <button onClick={handleSubmit} className='task__button' type="submit">
                            <svg className='task__button_svg' viewBox="0 0 100 100">
                                <line x1="0" x2="100" y1="0" y2="100" />
                                <line x1="0" x2="100" y1="100" y2="0" />
                            </svg>
                        </button>
                    </Link>

                    {textArea}
                </form>
            </div>
            <div className='task__background'></div>
        </>

    )
}

export default Task