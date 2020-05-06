import React, {Component} from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';


class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level: 500, format: 'hex'};
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);

    }
    changeLevel(level){
        this.setState({level});
    }
    changeFormat(val){
        this.setState({format: val});
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox 
            background={color[format]} 
            name={color.name} 
            key={color.id}
            id={color.id}
            paletteId={id}
            showLink={true}
            ></ColorBox>
        ));
        return (
            <div className='Palette'>
                <NavBar 
                level={level} 
                changeLevel={this.changeLevel}
                handleChange={this.changeFormat}
                showingAllColors
                ></NavBar>
                <div className='Palette-colors'>                    
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
            </div>
        )
    }
}

export default Palette;