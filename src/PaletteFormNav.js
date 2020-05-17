import React, { useEffect} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

function PaletteFormNav(props){   
    const { classes, open, palettes, handleDrawerOpen, handleSubmit, newPaletteName, handlePaletteNameChange } = props;
    
    useEffect(()=>{
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>       
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
    });
    return(
        <div>
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
                    Persistent drawer
                </Typography>
                <ValidatorForm 
                onSubmit={handleSubmit}          
                onError={errors => console.log(errors)}
                >
                    <TextValidator 
                    value={newPaletteName} 
                    onChange={handlePaletteNameChange}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['this field is required', 'Palette name is used']}
                    />
                    <Button 
                    variant="contained" 
                    color="primary"
                    type="submit"
                    >
                    Save palette
                    </Button>
                    <Link to='/'>
                    <Button variant='contained' color='secondary'>Go back</Button>
                    </Link>
                
                </ValidatorForm>
                </Toolbar>
            </AppBar>
        </div>
    )
};


export default PaletteFormNav;
