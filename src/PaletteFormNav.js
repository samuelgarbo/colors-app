import React, { useState} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from './PaletteMetaForm';
import useStyles from './styles/PaletteFormNavStyles';



function PaletteFormNav(props){   
    const { open, palettes, handleDrawerOpen, handleSubmit, newPaletteName, handlePaletteNameChange } = props;
    const classes = useStyles();

    const [openPaletteMetaForm, setOpenPaletteMetaForm] = useState('');

    const handleClickOpen = () => {
        setOpenPaletteMetaForm('paletteName');
    };

    const emoji =  () => {
        setOpenPaletteMetaForm('emoji');
    };

    const handleClose = () => {
        setOpenPaletteMetaForm('');
    };

    
    return(
        <div className='classes.root'>
            <CssBaseline />
            <AppBar
                color="default"
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Create palette
                </Typography>
                </Toolbar>
                <div className={classes.navBarBtns}>
                    <Link to='/'>
                        <Button variant='contained' color='secondary' className={classes.navBarButton}>Go back</Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.navBarButton}>
                        Save palette
                    </Button>
                    <PaletteMetaForm emoji={emoji} palettes={palettes} open={openPaletteMetaForm} handleClose={handleClose} handleSubmit={handleSubmit} newPaletteName={newPaletteName} handlePaletteNameChange={handlePaletteNameChange}/>
                </div>
            </AppBar>
        </div>
    )
};


export default PaletteFormNav;
