import React, {Component} from 'react';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class ColorBox extends Component {
    render(){
        const {name, color} = this.props.background;
        return (
            <CopyToClipboard text={color}>
                <div className='ColorBox' style={{background: color}} className='ColorBox'>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span>{name}</span>
                        </div>
                        <button className='copy-button'>Copy</button>
                    </div>
                    <span className='see-more'>More</span>
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;