"use client";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Collapse, Button } from '@mui/material';
import Comentario from './Comentario';
import AddIcon from '@mui/icons-material/Add';
import ComentarioDialog from './ComentarioDialog';
import { put } from '@/services/ApiRequest';

type Props = {
    publicacao: any
}



export default function Publicacao({ publicacao }: Props) {
    const [showComments, setShowComments] = useState(false);
    const [openComentDialog, setOpenComentDialog] = useState(false);
    const [titulo, setTitulo] = useState(publicacao.titulo);
    const [corpo, setCorpo] = useState(publicacao.corpo);
    const [autor, setAutor] = useState(publicacao.autor.nome);
    const [data, setdata] = useState(publicacao.data);
    const [upVote, setUpVote] = useState(publicacao.meta.upvote);
    const [downVote, setDownVote] = useState(publicacao.meta.downvote);

    const [hasClickedUpVote, setHasClickedUpVote] = useState(false);
    const [hasClickedDownVote, setHasClickedDownVote] = useState(false);


    const handleUpVote = () => {
        if (!hasClickedUpVote) {
            setUpVote(upVote + 1);
            const body = {
                meta: {
                    downvote: downVote,
                    upvote: upVote + 1
                },
                _id: publicacao._id,
                titulo: titulo,
                autor: {
                    id: publicacao._id,
                    nome: autor
                },
                corpo: corpo,
                comentarios: publicacao.comentarios,
                data: data,
                __v: publicacao._v
            }

            const resp = put(`publicacao/${publicacao._id}`, body);
            setHasClickedUpVote(true);
        }

    }

    const handleDownVote = () => {
        if (!hasClickedDownVote) {
            setDownVote(downVote + 1);
            const body = {
                meta: {
                    downvote: downVote + 1,
                    upvote: upVote
                },
                _id: publicacao._id,
                titulo: titulo,
                autor: autor,
                corpo: corpo,
                comentarios: publicacao.comentarios,
                data: data,
                __v: publicacao._v
            }

            const resp = put(`publicacao/${publicacao._id}`, body);
            setHasClickedDownVote(true);
        }

    }

    function formatarData(dataString: string): string {
        const data = new Date(dataString);
        const agora = new Date();

        const diffEmMilissegundos = agora.getTime() - data.getTime();

        const segundos = Math.floor(diffEmMilissegundos / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (dias > 0) {
            return `${dias} dia${dias > 1 ? 's' : ''} atrás`;
        } else if (horas > 0) {
            return `${horas} hora${horas > 1 ? 's' : ''} atrás`;
        } else if (minutos > 0) {
            return `${minutos} minuto${minutos > 1 ? 's' : ''} atrás`;
        } else {
            if (segundos == 0) {
                return "agora"
            } else {
                return `${segundos} segundo${segundos !== 1 ? 's' : ''} atrás`;

            }
        }
    }

    return (
        <>
            <Card sx={{ minWidth: '50%', bgcolor: '#e6f5ff', mt: 2 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }

                    title={autor}
                    subheader={formatarData(data)}
                />
                <CardContent>
                    <Typography variant="h5" sx={{ ml: '40%' }} color="text.secondary">
                        {titulo}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }} color="text.secondary">
                        {corpo}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <IconButton aria-label="add to favorites" onClick={handleUpVote}>
                            <KeyboardArrowUpIcon fontSize='large' sx={{ color: '#006bb3' }} />
                            <Typography variant="h6">{upVote}</Typography>
                        </IconButton>
                        <IconButton aria-label="add to favorites" onClick={handleDownVote}>
                            <KeyboardArrowDownIcon fontSize='large' sx={{ color: '#b30000' }} />
                            <Typography variant='h6'>{downVote}</Typography>
                        </IconButton>
                    </Box>

                    <IconButton aria-label="add to favorites" onClick={() => { setShowComments(!showComments) }}>
                        <KeyboardArrowDownIcon />
                        <Typography variant='body1'>Comentários</Typography>
                    </IconButton>

                </CardActions>
                <Collapse in={showComments} timeout="auto" unmountOnExit>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <ComentarioDialog open={openComentDialog} onClose={() => { setOpenComentDialog(false) }} publicacao={publicacao} />
                        <Box>
                            <Button variant="outlined" size='small' startIcon={<AddIcon />} sx={{ float: 'right', mb: 2 }} onClick={() => { setOpenComentDialog(true) }}>
                                comentar
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 6 }}>
                            {publicacao.comentarios.map((comentario: any) => <Comentario comentario={comentario} />)}
                        </Box>

                    </CardContent>
                </Collapse>
            </Card>
        </>

    )
}
