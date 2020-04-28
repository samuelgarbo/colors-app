import React, {Component} from 'react';
import './ColorBox.css';

class ColorBox extends Component {
    render(){
        return (
            <div className='ColorBox' style={{background: this.props.background.color}} className='ColorBox'>
                <span>{this.props.background.name}</span>
            </div>
        )
    }
}

export default ColorBox;