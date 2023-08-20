import React, {useState} from "react";
import './AddForms.css';

function MoveItem(props) {

    const {moveItem, prevStage, currStage, prevTasks} = props;
    const [isShown, setShown] = useState(false);

    const buttonText = <>
        <svg className='add-symbol' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 7H9V2C9 1.448 8.552 1 8 1C7.448 1 7 1.448 7 2V7H2C1.448 7 1 7.448 1 8C1 8.552 1.448 9 2 9H7V14C7 14.552 7.448 15 8 15C8.552 15 9 14.552 9 14V9H14C14.552 9 15 8.552 15 8C15 7.448 14.552 7 14 7Z" fill="#5E6C84"/>
        </svg>
        Add card
    </>

    const addButton = <>
        <button className='button_add-item' onClick={() => setShown(true)}>{buttonText}</button>
    </>

    const dropDown = <>
        <div className='dropdown__arrow'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path d="M1 0.5L11 13L19 0.5" stroke="black"/>
            </svg>
        </div>
        <ul className='dropdown__list'>
            {prevTasks.map((item) => (<li className='dropdown__item' key={prevTasks.indexOf(item)} onClick={() => handleClick(item, prevTasks.indexOf(item))}>{item.name}</li>))}
        </ul>
    </>

    const handleClick = (item, key) => {
        moveItem(prevStage, currStage, item.id, key);
        setShown(false)
    }

    const clickDisabled = (e) => {
        e.stopPropagation()
    }

    const disabledButton = <>
        <button className='button_add-item button_disabled' onClick={clickDisabled}>{buttonText}</button>
    </>

    return (
            <div className='add-item'>{
                prevTasks.length === 0 ? disabledButton : isShown ? dropDown : addButton
            }</div>
        )
}

export default MoveItem