import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


function ColorPickerForm(props){
    const {colors, currentColor, updateCurrentColor, addColor, newColorName, handleColorNameChange, isPaletteFull}= props;
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
        <div>
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
        </div>
    )
}

export default ColorPickerForm;