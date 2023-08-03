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


export default function EditDataNascDialog({ open, onClose }: Props) {


    const [data, setData] = useState("");


    const changeData = (Data: string) => {
        setData(Data);
    }

    const editar = async () => {
        let user = JSON.parse(localStorage.getItem("user") || "");
        user.dataNascimento = data;
        await put(`usuario/${user._id}`, user);
        localStorage.setItem("user", JSON.stringify(user));
        onClose();
        setData("");
    }

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("user") || "").dataNascimento);
    }, [open])



    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Editar data de nascimento</DialogTitle>

                <DialogContent>
                    <TextField id="outlined-basic" type='date' fullWidth label="Data" variant="outlined" sx={{ mt: 2 }} value={data} onChange={(e) => { changeData(e.target.value); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onClose(); setData("") }} color='error'>Cancelar</Button>
                    <Button onClick={() => editar()}>Editar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}