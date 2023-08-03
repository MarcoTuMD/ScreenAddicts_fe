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


export default function EditSenhaDialog({ open, onClose }: Props) {


    const [senha, setSenha] = useState("");
    const [senhaAntiga, setSenhaAntiga] = useState("");


    const changeSenha = (Senha: string) => {
        setSenha(Senha);
    }

    const changeSenhaAntiga = (Senha: string) => {
        setSenhaAntiga(Senha);
    }

    const editar = async () => {
        let user = JSON.parse(localStorage.getItem("user") || "");
        if (senhaAntiga == user.senha) {
            user.senha = senha;
            await put(`usuario/${user._id}`, user);
            localStorage.setItem("user", JSON.stringify(user));
            onClose();
            setSenha("");
            setSenhaAntiga("");
        }

    }




    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Editar Senha</DialogTitle>

                <DialogContent>
                    <TextField id="outlined-basic" fullWidth type='password' label="Senha Antiga" variant="outlined" sx={{ mt: 2 }} value={senhaAntiga} onChange={(e) => { changeSenhaAntiga(e.target.value); }} />
                    <TextField id="outlined-basic" fullWidth type='password' label="Senha" variant="outlined" sx={{ mt: 2 }} value={senha} onChange={(e) => { changeSenha(e.target.value); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onClose(); setSenha(""); setSenhaAntiga(""); }} color='error'>Cancelar</Button>
                    <Button onClick={() => editar()}>Editar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}