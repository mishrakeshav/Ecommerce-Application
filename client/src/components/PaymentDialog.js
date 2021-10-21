import React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PayPalButtons } from "@paypal/react-paypal-js"; 

export default function FormDialog({open, setOpen, finalPlaceOrder}) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // finalPlaceOrder();
  }, [])

  return (
    <div>
      <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}}  onClick={handleClickOpen}>
        Order Online
      </Button>
      <Dialog  maxWidth={'lg'} open={open} onClose={handleClose}>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to place the order
          </DialogContentText>
        </DialogContent>
        <PayPalButtons/>
      </Dialog>
    </div>
  );
}
