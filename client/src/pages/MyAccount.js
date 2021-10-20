import React,{useEffect,useState} from 'react';
import {
    Paper,
    Grid,
    TextField,
    Typography,
    Divider,
    Button
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import { getUserData,updateUserData } from '../api/index';
import {toast} from 'react-toastify'

const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(5),
    margin : theme.spacing(5)
}));
const MyAccount = () => {
    const [account, setAccount] = useState({
        first_name : '',
        last_name : '',
        email : '',
        username : '',
        address : '',
    });
    const [accountError, setAccountError] = useState({
        first_name : false,
        last_name : false,
        email : false,
        username : false,
        address : false,
    })
    const fetchAccount = async ()=>{
        const data = await getUserData();
        console.log(data);
        setAccount(data?.data);
    }
    const validation = ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+$/;
        const newAccountError = {
            first_name : account.first_name === '',
            last_name : account.last_name === '',
            username : (!account.username || !emailRegex.test(account.username)),
            address : account.address === ''
        }
        setAccountError(newAccountError);
        let isFormValid = true;
        for(const key in newAccountError){
            if(newAccountError[key]){
              isFormValid = false;
            }
        }
        return isFormValid;
    }
    const updateAccount = async ()=>{
        const isValid = validation();
        if(!isValid) return;
        const data = await updateUserData({...account, email : account.username});
        if(data?.status===200){
            toast('User Data Updated');
        }
    }
    const handleChange = async (e)=>{
        setAccount({...account, [e.target.name]:e.target.value});
    }
    useEffect(()=>{
        fetchAccount();
    },[])
    return (
        <div>
            <CartPaper elevation={10}>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={12} lg={12}>
                        <Typography variant="h5">My Account</Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="first_name"
                            value={account.first_name}
                            onChange={handleChange}
                            error = {accountError.first_name}
                            helperText = {accountError.first_name && 'Invalid Entry'}
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            value={account.last_name}
                            onChange={handleChange}
                            error = {accountError.last_name}
                            helperText = {accountError.last_name && 'Invalid Entry'}
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="username"
                            value={account.username}
                            onChange={handleChange}
                            error = {accountError.username}
                            helperText = {accountError.username && 'Invalid Entry'}
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            label="Shipping Address"
                            name="address"
                            multiline
                            value={account?.address}
                            onChange={handleChange}
                            rows={3}
                            error = {accountError.address}
                            helperText = {accountError.address && 'Invalid Entry'}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} align="center">
                       <Button 
                            variant="contained"  
                            sx={{background : "#2D46B9"}}
                            onClick={updateAccount}
                            
                        ><SaveIcon/> 
                            Update Account 
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Typography variant="h5">Password</Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirm_password"
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} align="center">
                       <Button variant="contained"  sx={{background : "#2D46B9"}}><SaveIcon/> Change Password </Button>
                    </Grid>
                </Grid>
            </CartPaper>
        </div>
    )
}

export default MyAccount;
