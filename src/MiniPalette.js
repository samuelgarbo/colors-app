import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';


class MiniPalette extends Component {
    constructor(props){
        super(props);
        this.handleDeletePalette = this.handleDeletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleDeletePalette(evt){
        evt.stopPropagation();
        this.props.handleOpen(this.props.id);
    }
    handleClick(){
        this.props.goToPalette(this.props.id);
    }
    render() {
        const { classes, paletteName, emoji, colors,  } = this.props;
        console.log('rendering '+paletteName)
        const miniColorBoxes = colors.map(color => (
            <div
                className={classes.miniColor}
                style={{ backgroundColor: color.color }}
                key={color.name}
            ></div>
        ))

        return (
            <div className={classes.root} onClick={this.handleClick}>

                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: 'all 0.3s ease-in-out' }}
                    onClick={this.handleDeletePalette}
                />

                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>
                    {paletteName}<span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);