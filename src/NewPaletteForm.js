import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PaletteFormNav from './PaletteFormNav';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm(props) {
  const {palettes, maxColors} = props;
  
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState('');
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = useState('');
  const [newPaletteName, setNewPaletteName] = useState('');
  
  const isPaletteFull = colors.length >= maxColors;

  useEffect(()=>{
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>       
      colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', (value) =>       
      colors.every(
        ({ color }) => color !== currentColor
      )
    );
    
  });  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (e) => {
    setCurrentColor(e.hex);
  };

  const addColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }  
    setColors([...colors, newColor]);
    setNewColorName('');
  }

  const deleteColor = (colorName) => {
    setColors([...colors.filter((color) => color.color !== colorName)]);
  }

  const clearColors = () =>{
    setColors([]);
  }

  const addRandomColor = () => {
    const allColors = palettes.map( p => p.colors).flat();
    let rand;
    do{
      rand = Math.floor(Math.random() * allColors.length);
    }while(!isColorListed(allColors[rand]));    
    setColors([...colors, allColors[rand]]);
  }

  const isColorListed = (newColor) => {
    return colors.every(color => 
      color.color !== newColor.color
    )
  }

  const handleColorNameChange = (evt) => {
    setNewColorName(evt.target.value);
  }

  const handlePaletteNameChange = (evt) => {
    setNewPaletteName(evt.target.value);
  }

  const handleSubmit = () => {
    
    const newPalette = {
      colors: colors,
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-')
    }
    props.savePalette(newPalette);
    props.history.push('/');
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
   
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        newPaletteName={newPaletteName}
        handlePaletteNameChange={handlePaletteNameChange}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
             <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider />        
        <Typography variant='h4'>
          Design your Palette
        </Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            disabled={isPaletteFull}  
            onClick={addRandomColor}>
              Random color
          </Button>
        </div>
        <ChromePicker 
          color={currentColor} 
          onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm 
          onSubmit={addColor}          
          onError={errors => console.log(errors)}
        >
          <TextValidator 
            value={newColorName} 
            onChange={handleColorNameChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['this field is required', 'name is already used', 'color is already used']}
          />
          <Button 
            variant="contained" 
            color="primary" 
            type='submit'   
            disabled={isPaletteFull}         
            style={{backgroundColor: isPaletteFull ? 'lightgrey' : currentColor}}>
              {isPaletteFull ? 'Palette full' : 'Add color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
          colors={colors}
          deleteColor={deleteColor}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
