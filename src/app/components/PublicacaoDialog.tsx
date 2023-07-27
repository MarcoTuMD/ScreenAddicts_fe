import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { post } from '@/services/ApiRequest';

type Props = {
    open: boolean,
    onClose: (() => void)
}


export default function PublicacaoDialog({ open, onClose }: Props) {
    const [titulo, setTitulo] = useState("");
    const [corpo, setCorpo] = useState("");

    const changeTitulo = (titulo: string) => {
        setTitulo(titulo);
    }

    const changeCorpo = (corpo: string) => {
        setCorpo(corpo);
    }

    const publicar = async () => {
        const body =
        {
            titulo: titulo,
            corpo: corpo,
            autor: {
                id: "123",
                nome: "Marco Tulio"
            }
        }
        await post("publicacao", body);
        onClose();
        setTitulo("");
        setCorpo("");
    }

    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Nova Publicação</DialogTitle>
                <DialogContent>
                    <TextField id="outlined-basic" fullWidth label="Título" variant="outlined" sx={{ mt: 2 }} value={titulo} onChange={(e) => { changeTitulo(e.target.value); }} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Corpo"
                        multiline
                        maxRows={4}
                        rows={4}
                        fullWidth
                        sx={{ mt: 2 }}
                        value={corpo}
                        onChange={(e) => { changeCorpo(e.target.value); }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onClose(); setTitulo(""); setCorpo("") }} color='error'>Cancelar</Button>
                    <Button onClick={() => publicar()}>Publicar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}