import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtom from '@mui/material/IconButton'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom'

//
export default function CarsList() {
//
  const [state, setState] = React.useState({
    cars: {}

  })

  // Desestruturando as variáveis de estado
  //
  const {
    cars
  } = state

  // Este useEffect() será executado apenas uma vez, durante o
  // carregamento da página
  React.useEffect(()=>{
    loadData()   // Carrega dos dados do back-end
  },[])

  async function loadData() {   // async =  quando acontece algo de fora da aplicação
    try {
      //
      const result = await fetch('https://api.faustocintra.com.br/cars')

      // Requisição OK
      //
      if(result.ok) setState({...state, cars: await result.json()})
      // Requisição com erro
      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)
    }
    catch(error){
      // Exibimos o erro no console
      console.error(error)
    }
  }
  //
  const columns = [
    { 
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    { 
      field: 'brand',
      headerName: 'MARCA',
      width: 150
    },
    {
      field: 'model',
      headerName: 'MODELO',
      width: 130,
    },
    {
      field: 'color',
      headerName: 'COR',
      width: 100,
    },
    {
      field: 'year_manufacture',
      headerName: 'ANO DE FABRICAÇÃO',
      width: 170,
      valueFormatter: params => {
        if(params.value) return format(new Date(params.value), 'dd/MM/yyyy')
        else return 
      }
    },
    {
      field: 'imported',
      headerName: 'IMPORTADO',
      width: 130,
      //
      valueFormatter: params => {
        if(params.value === "1") return 'SIM'
        else return 'NÃO'
      }
    },
    {
      field: 'plates',
      headerName: 'PLACA',
      width: 100,
    },
    {
      field: 'selling_price',
      headerName: 'PREÇO DE VENDA',
      width: 150,
      //
      valueFormatter: params => {
        if (params.value) return 'R$ ' + params.value
        else return ''
      }
    },
    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params =>
        <Link to={'./' + params.id}> 
          <IconButtom aria-label='Editar'>
            <EditIcon/>
          </IconButtom>
        </Link>
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params => 
      <IconButtom 
        aria-label='Excluir'
        onClick={() => handleDeleteButtonClick(params.id)}
        >
        <DeleteForeverIcon color='error'/>
      </IconButtom>
    },
  ];
  
  async function handleDeleteButtonClick(id){
    if(confirm('Deseja realmente excluir este item?')) {
      try {
        // Faz chamada do back-end para excluir o cliente
        //
        const result = await fetch(`https://api.faustocintra.com.br/cars/${id}`, {
          method: 'DELETE'
        })
        // Se a exclusão tiver sido feita com sucesso, atualiza a listagem
        if(result.ok) loadData()
        alert('Exclusão efetuada com sucesso')
      }
      catch(error) {
        console.error(error)
      }
    }
  }

  return (

    <>
      //
      <Typography variant="h1" sx={{mb: '50px'}}>
        Listagem de carros
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
        mb: '25px' // margin-bottom

      }}>
        //
        <Link to="new">
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            startIcon={<AddBoxIcon />}
            >
              Cadastrar novo carro
          </Button>
        </Link>
      </Box>
      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          //
          rows={cars}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  )
}