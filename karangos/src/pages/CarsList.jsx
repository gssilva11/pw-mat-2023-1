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

// Foi modificado o nome da função principal para 'CarsList()'
export default function CarsList() {
// Foi modificado o nome do objeto para 'cars'
  const [state, setState] = React.useState({
    cars: {}

  })

  // Desestruturando as variáveis de estado
  // Foi alterado o nome da variável para 'cars', ela recebera o
  // valor desestruturado de 'state'
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
      // Foi alterada a URL para "https://api.faustocintra.com.br/cars"
      const result = await fetch('https://api.faustocintra.com.br/cars')

      // Requisição OK
      // Atualiza o estado com os dados retornados, caso a requisição seja bem sucedida
      if(result.ok) setState({...state, cars: await result.json()})
      // Requisição com erro
      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)
    }
    catch(error){
      // Exibimos o erro no console
      console.error(error)
    }
  }
  // Foram realizadas as alterações necessárias para identificar as colunas de nossa
  // tabela apresentada em nosso site. Algumas delas receberam um tratamento especial
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
      // Esse campo foi tratado para: quando retornar o valor 1 será mostrado o texto 'SIM'
      // e quando retornar o valor 0 será mostrado o texto 'NÃO'. Para uma comparação
      // estritamente igual, como foi utilizada, o número 1 deve ser passado como string 
      // pois o valor retornado pelo banco de dados é uma string.
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
      // Foi adicionada a identificação monetária 'R$' para uma
      // melhor apresentação
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
        // Foi modificada a URL para "https://api.faustocintra.com.br/cars/${id}"
        // onde o id é passado na url para a modificação de apenas 1 objeto
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
      {/* Foi modificado o conteúdo do Typography */}
      <Typography variant="h1" sx={{mb: '50px'}}>
        Listagem de carros
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
        mb: '25px' // margin-bottom

      }}>
        {/* Foi modificado o conteúdo do Button */}
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
          // A propriedade rews é definida como cars, que é a
          // lista de objetos obtidos da solicitação à API.
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