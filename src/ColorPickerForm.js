import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  root: {},
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem'
  },
  colorNameInput: {
    width: '100%',
    height: '70px'
  }
}))

function ColorPickerForm(props){
    const {colors, currentColor, updateCurrentColor, addColor, newColorName, handleColorNameChange, isPaletteFull}= props;
    const classes = useStyles();

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
    return(
        <div className={classes.root}>
            <ChromePicker 
            color={currentColor} 
            onChangeComplete={updateCurrentColor}
            className={classes.picker}
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
                className={classes.colorNameInput}
                variant='filled'
                margin='normal'
                placeholder='Color Name'
            />
            <Button 
                variant="contained" 
                color="primary" 
                type='submit'
                className={classes.addColor}   
                disabled={isPaletteFull}         
                style={{backgroundColor: isPaletteFull ? 'lightgrey' : currentColor}}>
                {isPaletteFull ? 'Palette full' : 'Add color'}
            </Button>
            </ValidatorForm>
        </div>
    )
}

export default ColorPickerForm;