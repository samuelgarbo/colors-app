import React, {useState} from 'react';
import clsx from 'clsx';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';



export default function NewPaletteForm(props) {
  const {palettes, maxColors} = props;  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('');
  const [colors, setColors] = useState(seedColors[0].colors);
  const [newColorName, setNewColorName] = useState('');
  const [newPaletteName, setNewPaletteName] = useState('');
  
  const isPaletteFull = colors.length >= maxColors;  

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

  const handleSubmit = (newEmoji) => {
    
    const newPalette = {
      colors: colors,
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      emoji: newEmoji
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
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button 
                className={classes.button}
                variant="contained" 
                color="secondary" 
                onClick={clearColors}>
                  Clear Palette
              </Button>
              <Button 
                className={classes.button}
                variant="contained" 
                color="primary" 
                disabled={isPaletteFull}  
                onClick={addRandomColor}>
                  Random color
              </Button>
            </div>
            <ColorPickerForm
              currentColor={currentColor}
              updateCurrentColor={updateCurrentColor}
              addColor={addColor}
              newColorName={newColorName}
              handleColorNameChange={handleColorNameChange}
              isPaletteFull={isPaletteFull}
              colors={colors}
            />
          </div>
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
          distance={20}
        />
      </main>
    </div>
  );
}
