import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function PaletteMetaForm(props) {
    const {handleSubmit, newPaletteName, handlePaletteNameChange, open, handleClose, palettes, emoji} = props;   

    const handleEmoji = (evt) =>{
      handleSubmit(evt.native);
    }

    useEffect(() => {
      ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
        palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
      )
    });

  return (   

    <div>   
      <Dialog open={open === 'emoji'} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>
        <Picker onSelect={handleEmoji}/>
      </Dialog>   
      <Dialog open={open === 'paletteName'} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
        <ValidatorForm
          onSubmit={emoji}
          onError={errors => console.log(errors)}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a name for you new palette
            </DialogContentText>
            <TextValidator
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              fullWidth
              margin='normal'
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['this field is required', 'Palette name is used']}
            />


          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
