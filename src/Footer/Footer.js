import React from "react";
import './Footer.css';

const Footer = (props) => {
    return (
        <footer className='footer'>
            <div className='footer_tasks'>
                <div>
                    Active tasks: {props.count}
                </div>
                <div className='footer_finished'>
                    Finished tasks: {props.finished}
                </div>
            </div>
            <div className='copyright'>Kanban board by Aleksei Samokhin, 2023</div>
        </footer>
    )
}

export default Footer