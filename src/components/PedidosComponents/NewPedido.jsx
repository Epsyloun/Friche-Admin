import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionNew } from "./AccordionNew";
import {DataCliente, DataFecha, DataProductos, DataTotal} from './DataAccordion'
import { isEmpty } from "@firebase/util";
import { getOneRegister, saveNewRegister, updateRegister } from "../../firebase/api";
import CheckIcon from '@mui/icons-material/Check';
import Swal from "sweetalert2";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

function NewPedido({collectionName, setOpen}) {

  const StyledAnimation ={
    animation: 'fade-in ease 0.5s'
  }

    let navigate = useNavigate();

    //Inicializando el tema de colores de la app
    const theme = useTheme();

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [fecha, setFecha] = useState(null);

  async function addPedido(e){
    e.preventDefault();
    let error = false;
    let title = '';
    let subtitle = '';
    let newPedido = {}
    if(!isEmpty(nombre) && nombre !== ''){
      if(cantidad > 0 && carrito.length > 0){
        if(fecha !== null){
          newPedido = {'nombre':nombre,'items': carrito,'total': totalCarrito, 'fecha':fecha, 'estado': '0'}
          await saveNewRegister(collectionName,newPedido);
          Swal.fire({
            title:'Pedido añadido',
            icon:'success',
            text:'Nuevo pedido añadido',
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color:theme.palette.text.accent,
            background: theme.palette.background.paper,
          }
          ).then(
            setNombre(''),
            setCantidad(0),
            setCarrito([]),
            setTotalCarrito(0),
            setFecha(null),
            setOpen(false)
          )
        }else{error=true; title="Fecha incorrecta"; subtitle="Debe tomar una fecha"}
      }else{error=true; title="Sin compras"; subtitle="Debe elegiralmenos un objeto del inventario para realizar el pedido"}
    }else{error=true; title="Sin nombre"; subtitle="Debe llenar almenos el campo de nombre"}
    if(error === true){
      Swal.fire({
        icon: 'error',
        title: title,
        text: subtitle,
        iconColor: theme.palette.text.icon,
        color:theme.palette.text.accent,
        background: theme.palette.background.paper,
      })
    }
  }

  return (
    <Paper sx={StyledAnimation}>
      <form onSubmit={addPedido} autoComplete="off">
        <AccordionNew
          title={"Cliente:"}
          subtitle={nombre}
          number={1}
          data={DataCliente(setNombre)}
          width={'auto'}
        />
        <AccordionNew
          title={"Productos:"}
          subtitle={cantidad}
          number={2}
          data={DataProductos(setCantidad, cantidad, carrito, setCarrito)}
          width={'auto'}
        />
        <AccordionNew
          title={"Total:"}
          subtitle={'$'+totalCarrito}
          number={3}
          data={DataTotal(carrito, setTotalCarrito)}
          width={'auto'}
        />
        <AccordionNew
          title={"Fecha de entrega:"}
          subtitle={fecha}
          number={4}
          data={DataFecha(fecha, setFecha)}
          width={'40%'}
        />
        <Grid p={2} container>
          <Grid item xs={6} align="left"><Button variant="outlined" onClick={()=>{setOpen(false)}}>Regresar</Button></Grid>
          <Grid item xs={6} align="right"><Button variant="contained" type="submit" endIcon={<CheckIcon />}>Guardar</Button></Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export { NewPedido };