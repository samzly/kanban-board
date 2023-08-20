import React from "react";
import './Item.css';

class Item extends React.Component {
    render() {
        return (
            <li className='item'>{this.props.children}</li>
        )
    }
}

export default Item;