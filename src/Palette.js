import React, {Component} from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color}></ColorBox>
        ));
        return (
            <div className='Palette'>
                {/* Navbar goes her */}
                <div className='Palette-colors'>
                    {/* bunch of colorboxes */}
                    {colorBoxes}
                </div>
                {/* footer eventually */}
            </div>
        )
    }
}

export default Palette;