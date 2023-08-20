import React from "react";
import Item from "../Item/Item";
import './List.css'
import {Link} from "react-router-dom";

class List extends React.Component {

    render() {
        return (
            <div className='task__stage'>
                {this.props.tasks.length === 0 ? null :
                    <ul className='task__list'>
                        {this.props.tasks.map(item => (
                            <Link className='list__item' key={this.props.tasks.indexOf(item)} to={`${this.props.path}/${item.id}`}>
                                <Item>
                                    {item.name}
                                </Item>
                            </Link>
                        ))}
                    </ul>
                }
            </div>
        )
    }

}

export default List