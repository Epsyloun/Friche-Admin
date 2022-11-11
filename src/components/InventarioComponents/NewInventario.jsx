import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import Swal from "sweetalert2";
import {saveNewRegister} from '../../firebase/api'
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";

//Componente modal de new Cobro
function NewInventario({collectionName, open, setOpen, categoria, setOpenEoD, categoriaIndex, setCategoriaIndex}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Inicializando el tema de colores de la app
  const theme = useTheme();

  //Funcion para cerrar el modal
  function handleClose() {
    setOpen(false);
    setOpenEoD(false);
  }

  useEffect(()=>{
    if(categoria === "Salado"){
      setCategoriaIndex(1);
    }else if(categoria === "Dulce"){
      setCategoriaIndex(2);
    }else if(categoria === "Picante"){
      setCategoriaIndex(3);
    }
  },[open])

  //Datos iniciales para guardar un nuevo cobro
  const initialState = {
    nombre:'',
    categoria:'',
    cantidad:'',
    precio:''
  }

  const [addProducto, setAddProducto] = useState(initialState);//state del nuevo cobro

  //Manejar los datos de los textfields
  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setAddProducto({...addProducto, [name]:value})
  }

  //Funcion para manejar el submit al guardar un nuevo registro
  async function handleSubmit(e) {
    e.preventDefault();
    //Se actualiza la categoria
    const arreglo = {...addProducto, 'categoria':`${categoriaIndex}`}
    await saveNewRegister(collectionName,arreglo);
    Swal.fire({
      title:'Producto añadido',
      icon:'success',
      text:'Nuevo producto añadido',
      timer: 2000,
      iconColor: theme.palette.text.icon,
      color:theme.palette.text.accent,
      background: theme.palette.background.paper,
    }
    ).then(
      setAddProducto(initialState),
      handleClose()
    )
  }

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography align="center" variant="h3" component="h3">
              Nuevo producto
            </Typography>
            <Typography align="center" variant="h5" component="h5">
              "{categoria}"
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              mt={2}
            >
              <Grid item md={8} xs={12}>
                <TextField
                  name="nombre"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  label="Nombre del producto"
                  placeholder="Nombre del Producto"
                  value={addProducto.nombre}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="cantidad"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  label="Cantidad del producto"
                  type="number"
                  placeholder="10"
                  value={addProducto.monto}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="precio"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  label="Precio del producto"
                  step='any'
                  min="0.01"
                  type="string"
                  placeholder="0.00"
                  value={addProducto.monto}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item align="center" md={8} xs={12}>
                <Button type="submit" variant="contained">Aceptar</Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </Grid>
  );
}

//Exportamos el componente
export { NewInventario };