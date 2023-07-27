import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { put } from '@/services/ApiRequest';

type Props = {
    open: boolean,
    onClose: (() => void),
    publicacao: any
}


export default function ComentarioDialog({ open, onClose, publicacao }: Props) {
    const [corpo, setCorpo] = useState("");

    const changeCorpo = (corpo: string) => {
        setCorpo(corpo);
    }

    const comentar = () => {
        let comentarios = publicacao.comentarios;
        const comentario = { corpo: corpo, autor: { id: "1234", nome: "Ana" } }
        comentarios.push(comentario);
        const body = {
            meta: {
                downvote: publicacao.downVote,
                upvote: publicacao.upVote
            },
            _id: publicacao._id,
            titulo: publicacao.titulo,
            autor: publicacao.autor,
            corpo: publicacao.corpo,
            comentarios: comentarios,
            data: publicacao.data,
            __v: publicacao._v
        }

        put(`publicacao/${publicacao._id}`, body);
        onClose();
    }
    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Comentar</DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Comentário"
                        multiline
                        maxRows={4}
                        fullWidth
                        sx={{ mt: 2 }}
                        value={corpo}
                        onChange={(e) => { changeCorpo(e.target.value); }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} color='error'>Cancelar</Button>
                    <Button onClick={() => comentar()}>Comentar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}