import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import styles from './styles/ColorBoxStyles';



class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = { copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
        
    }
    changeCopyState() {
        this.setState({ copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500);
        });
    }
    render(){
        const {name, background, paletteId, id, showFullPalette, classes } = this.props;
        const { copied } = this.state;
        
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.colorBox} style={{background: background}}>
                    <div 
                        style={{background: background}} 
                        className={clsx(classes.copyOverlay, {[classes.showOverlay]: copied,})}
                    ></div>  
                                  
                    <div className={clsx(classes.copyMessage, {[classes.showMessage]: copied,})}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div >
                        <div className={classes.boxContent}>
                            <span className={classes.copyText}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showFullPalette &&
                        <Link 
                            to={`/palette/${paletteId}/${id}`} 
                            onClick={e=>e.stopPropagation}>
                                <span className={classes.seeMore}>More</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);