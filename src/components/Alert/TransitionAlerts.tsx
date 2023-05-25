import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {AlertTitle} from "@mui/material";
import {useSelector} from "react-redux";
import {responseError} from "../../../src/features/users/users.slise";


const TransitionAlerts = () => {
    const [open, setOpen] = React.useState(true);

    let Error = useSelector(responseError)
    return (
        <div>

            <Box sx={{width: '100%'}}>
                <Collapse in={open}>
                    <Alert severity="error"
                           action={
                               <IconButton
                                   aria-label="close"
                                   color="inherit"
                                   size="small"
                                   onClick={() => {
                                       setOpen(false);
                                   }}
                                   sx={{mb: 2}}
                               >
                                   <CloseIcon fontSize="inherit"/>
                               </IconButton>
                           }
                    >
                        <AlertTitle>{Error.message}</AlertTitle>
                        {Error.fails.photo[0]}

                    </Alert>
                </Collapse>
            </Box>
        </div>
    );
}

export default TransitionAlerts