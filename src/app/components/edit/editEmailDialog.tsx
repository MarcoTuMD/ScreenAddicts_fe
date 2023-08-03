import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { post, put } from '@/services/ApiRequest';

type Props = {
    open: boolean,
    onClose: (() => void)
}


export default function EditEmailDialog({ open, onClose }: Props) {


    const [email, setEmail] = useState("");


    const changeEmail = (email: string) => {
        setEmail(email);
    }

    const editar = async () => {
        let user = JSON.parse(localStorage.getItem("user") || "");
        user.email = email;
        await put(`usuario/${user._id}`, user);
        localStorage.setItem("user", JSON.stringify(user));
        onClose();
        setEmail("");
    }

    useEffect(() => {
        setEmail(JSON.parse(localStorage.getItem("user") || "").email);
    }, [open])



    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Editar email</DialogTitle>

                <DialogContent>
                    <TextField id="outlined-basic" fullWidth label="email" variant="outlined" sx={{ mt: 2 }} value={email} onChange={(e) => { changeEmail(e.target.value); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onClose(); setEmail("") }} color='error'>Cancelar</Button>
                    <Button onClick={() => editar()}>Editar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}