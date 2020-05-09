import React, {Component}  from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
    palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    paletteColors: {
        height: '90%'
    },  
    goBack : {
        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4px',
        backgroundColor: 'black',
    }, 
    backButton: {
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: 'white',
        textTransform: 'uppercase',
        border:'none',
        textDecoration: 'none',
        textAlign: 'center',
    }
}


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex'
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        //return all shades of given color
        return shades.slice(1);
    }
    changeFormat(val){
        this.setState({format: val});
    }
    render(){
        const {format} = this.state;
        const {paletteName, emoji, id,} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]}
                showFullPalette={false}
                ></ColorBox>
        ));
        return(
            <div className={classes.palette}>
                <NavBar handleChange={this.changeFormat} showingAllColors= {false}></NavBar>
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className={classes.backButton}>Go back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
            </div>
        );
    }
}
export default withStyles(styles)(SingleColorPalette);