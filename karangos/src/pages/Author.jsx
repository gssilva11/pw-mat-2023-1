import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'

// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import image from '../assets/autor.png'

import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Author() {

  const [likes, setLikes] = React.useState(0)

  function like() {
    return setLikes(likes+1)
  }

  useEffect(()=>{
    window.localStorage.setItem = likes
  },[like])
  return(
    <>
      <Typography variant="h1" sx={{mb: '50px'}}>
          Sobre o autor
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 375 }}
            image = {image}
            title="Gabriel Santos Silva"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Gabriel Santos Silva
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estudante de análise e desenvolvimento de sistemas
                pela Fatec Dr. Thomaz Novelino, em Franca-SP. 
                Está no 4° ciclo do curso onde frequenta as 
                aulas de programação web com o professor 
                Fausto Cintra.
            </Typography>
          </CardContent>
          <CardActions>

          <Button 
            variant="contained" 
            color="secondary"
            size="medium"
            startIcon={<FavoriteIcon />}
            
            onClick={like}
            
            >
              Curtir {`(${likes})`}
          </Button>
            
          </CardActions>
        </Card>
      </Typography>
    </>
  )
}