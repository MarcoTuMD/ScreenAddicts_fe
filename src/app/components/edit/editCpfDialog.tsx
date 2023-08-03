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


export default function EditCpfDialog({ open, onClose }: Props) {


    const [cpf, setCpf] = useState("");


    const changeCpf = (Cpf: string) => {
        setCpf(Cpf);
    }

    const editar = async () => {
        let user = JSON.parse(localStorage.getItem("user") || "");
        user.cpf = cpf;
        await put(`usuario/${user._id}`, user);
        localStorage.setItem("user", JSON.stringify(user));
        onClose();
        setCpf("");
    }

    useEffect(() => {
        setCpf(JSON.parse(localStorage.getItem("user") || "").cpf);
    }, [open])



    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Editar Cpf</DialogTitle>

                <DialogContent>
                    <TextField id="outlined-basic" fullWidth label="Cpf" variant="outlined" sx={{ mt: 2 }} value={cpf} onChange={(e) => { changeCpf(e.target.value); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onClose(); setCpf("") }} color='error'>Cancelar</Button>
                    <Button onClick={() => editar()}>Editar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}