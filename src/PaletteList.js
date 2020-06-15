import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state={
            openDialog: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleClose(){
        this.setState({openDialog: false, deletePaletteId: ''})
    }
    handleOpen(id){
        this.setState({openDialog: true, deletePaletteId: id})
    }
    handleDelete(){
        this.props.deletePalette(this.state.deletePaletteId);
        this.handleClose();
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const { palettes, classes } = this.props;
        const {openDialog} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.title}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition
                                key={palette.id}
                                timeout={500}
                                classNames="item"
                            >
                                <MiniPalette
                                    {...palette}
                                    key={palette.id}
                                    handleOpen={this.handleOpen}                                   
                                    handleClick={() => this.goToPalette(palette.id)}
                                ></MiniPalette>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={openDialog} onClose={this.handleClose} aria-labelledby='deleteDialog'>
                    <DialogTitle id='dialogTitle'>Delete palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar className={classes.checkIcon}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete'/>

                        </ListItem>
                        <ListItem button onClick={this.handleClose}>
                            <ListItemAvatar>
                                <Avatar className={classes.closeIcon}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel'/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>

        )
    }
}

export default withStyles(styles)(PaletteList);