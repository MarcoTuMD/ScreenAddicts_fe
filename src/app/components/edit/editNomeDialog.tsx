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


export default function EditNomeDialog({ open, onClose }: Props) {


    const [nome, setNome] = useState("");


    const changeNome = (nome: string) => {
        setNome(nome);
    }

    const editar = async () => {
        let user = JSON.parse(localStorage.getItem("user") || "");
        user.nome = nome;
        await put(`usuario/${user._id}`, user);
        localStorage.setItem("user", JSON.stringify(user));
        onClose();
        setNome("");
    }

    useEffect(() => {
        setNome(JSON.parse(localStorage.getItem("user") || "").nome);
    }, [open])



    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Editar Nome</DialogTitle>

                <DialogContent>
                    <TextField id="outlined-basic" fullWidth label="Nome" variant="outlined" sx={{ mt: 2 }} value={nome} onChange={(e) => { changeNome(e.target.value); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onClose(); setNome("") }} color='error'>Cancelar</Button>
                    <Button onClick={() => editar()}>Editar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}