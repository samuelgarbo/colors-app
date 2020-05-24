import React, { useEffect} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from './PaletteMetaForm';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 400;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px'
      },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBarBtns: {
      
    }
}))

function PaletteFormNav(props){   
    const { open, palettes, handleDrawerOpen, handleSubmit, newPaletteName, handlePaletteNameChange } = props;
    const classes = useStyles();
    useEffect(()=>{
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>       
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
    });
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
                <div className='classes.navBarBtns'>
                    <Link to='/'>
                    <Button variant='contained' color='secondary'>Go back</Button>
                    </Link>
                    <PaletteMetaForm handleSubmit={handleSubmit} newPaletteName={newPaletteName} handlePaletteNameChange={handlePaletteNameChange}/>
                </div>
            </AppBar>
        </div>
    )
};


export default PaletteFormNav;
