import React from 'react';
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

const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(5),
    margin : theme.spacing(5)
}));
const MyAccount = () => {
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
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="last_name"
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            fullWidth
                            label="Shipping Address"
                            name="shipping_address"
                            multiline
                            rows={3}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} align="center">
                       <Button variant="contained"  sx={{background : "#2D46B9"}}><SaveIcon/> Update Account </Button>
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
