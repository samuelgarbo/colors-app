import React, {Component} from 'react';
import './ColorBox.css';

class ColorBox extends Component {
    render(){
        const {name, color} = this.props.background;
        return (
            <div className='ColorBox' style={{background: color}} className='ColorBox'>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>{name}</span>
                    </div>
                    <button className='copy-button'>Copy</button>
                </div>
                <span className='see-more'>More</span>
            </div>
        )
    }
}

export default ColorBox;