import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//Styled Components
const StyledCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  animation: "fade-in ease 0.5s",
};

const StyleDidiver = {
  width: "90%",
  bgcolor: "background.paper",
};

const StyledBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const StyledInput = {
  textAlign: "center",
};

const StyleTypography = {
  width: "90%",
  marginLeft: "20px",
  marginRight: "20px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
};

function InventarioCard({
  idProduct,
  title,
  cantidad,
  precio,
  setCantidad,
  cantidadT,
  carrito,
  setCarrito,
}) {
  const initialState = {
    id: idProduct,
    nombre: title,
    cantidad: 0,
    precio: precio,
  };

  const [cantidadLabel, setCantidadLabel] = useState(0); //Para mostrar el numero de la cantidad al apretar el + o -
  const [item, setItem] = useState(initialState); //state donde se almacena el item a guardar en el carrito


  function addToCart(newCantidadLabel){
    //se busca si este id ya esta en el arreglo de carrito
    let find = carrito.find(({ id }) => id === idProduct)
    //si no esta añade un producto nuevo
    const prevItem = {...item}
    if(find === undefined){
      const newItem = {id:idProduct, nombre:title, cantidad:newCantidadLabel, precio:precio}
      setItem(newItem)
      setCarrito([...carrito, newItem])
    }
    //si la cantidad es 0 de elimina del carrito
    else if(newCantidadLabel === 0){
      const deletedItem = carrito.filter(({ id }) => id !== idProduct)
      setCarrito([...deletedItem])
    }
    //Si si esta solo actualiza la cantidad
    else{
      const newItem = {...prevItem, 'cantidad': newCantidadLabel}
      const deletedItem = carrito.filter(({ id }) => id !== idProduct)
      setItem(newItem)
      setCarrito([...deletedItem, newItem])
    }
  }

  //Funcion para añadir cantidad
  function add() {
    //Verificamos que solo puedan pedir un maximo de las existencias actuales
    if (parseInt(cantidad) > cantidadLabel) {
      let newCantidadLabel = cantidadLabel + 1;
      let newCantidad = cantidadLabel + 1
      setCantidadLabel(newCantidadLabel); //se suma al numero que se muestra en el card
      setCantidad(newCantidad); //se suma al numero de productos totales

      addToCart(newCantidadLabel);
    }
  }
  function less() {
    if (cantidadLabel > 0) {
      let newCantidadLabel = cantidadLabel - 1;
      let newCantidad = cantidadLabel - 1
      setCantidadLabel(newCantidadLabel); //se suma al numero que se muestra en el card
      setCantidad(newCantidad); //se suma al numero de productos totales

      addToCart(newCantidadLabel);
    }
  }

  return (
    <Card sx={StyledCard}>
      <Box sx={StyledBox}>
        <Typography
          sx={StyleTypography}
          noWrap
          mt="0.3em"
          component="div"
          variant="h4"
          align="center"
          color="text.primary"
        >
          {title}
        </Typography>
        <Divider sx={StyleDidiver} />
        <CardContent>
          <Typography
            component="div"
            variant="h6"
            align="center"
            color="text.primary"
          >
            Cantidad:
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignContent: "center" }}
          >
            <Grid item xs={3} sx={{ justifyContent: "center" }}>
              <IconButton aria-label="restar" onClick={less}>
                <RemoveCircleIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" align="center">
                {cantidadLabel}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton aria-label="añadir" onClick={add}>
                <AddCircleIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
          <Typography
            component="div"
            variant="h6"
            align="center"
            color="text.primary"
          >
            Precio:
          </Typography>
          <TextField
            inputProps={{ style: StyledInput }}
            fullWidth
            disabled
            hiddenLabel
            value={precio}
            variant="filled"
            size="small"
          />
        </CardContent>
      </Box>
    </Card>
  );
}

export { InventarioCard };
