import React from 'react';
import {
    Grid,
    Paper,
    TextField,
    Typography,
    Container
} from '@mui/material'

const Message = () => {
    return (
        <div>
            <Container>
                <Grid>
                    <Grid item xs={12} sm={12} align="center">
                        <Paper elevation={10} sx={{margin : '30px', padding : '20px', background : 'blue'}}>
                            <Typography variant="h2" >SECRET INFORMER</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            
        </div>
    )
}

export default Message;
