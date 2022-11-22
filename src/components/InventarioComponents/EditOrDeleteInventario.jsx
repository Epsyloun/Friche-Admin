import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState, useEffect} from "react";
import {deleteRegister, updateRegister, getOneRegister} from '../../firebase/api';
import Swal from "sweetalert2";
import { useTheme } from '@mui/material/styles';

//Componente del modal de editar o eliminar
function EditOrDeleteInventario({collectionName,productoId,setProductoId, openEoD, setOpenEoD, setOpenNew}) {

  //StyleComponent
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

  //Funcion para cerrar los modal
  function handleClose() {
    setOpenNew(false);
    setOpenEoD(false);
    setEditOrDeleteProducto(initialState)//Limpiando los textfields al cerrar el modal
    setProductoId(0)
  }

  //Maneja los cambios en los textfields
  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setEditOrDeleteProducto({...editOrDeleteProducto, [name]:value})
    console.log(value);
  }

  //Obteniendo datos de una sola producto
  const getProducto = async () => {

    if(productoId === 0){
      return
    }

    const docSnap = await getOneRegister(collectionName,productoId);

    if (docSnap.exists()) {
      //Almacenando info de un solo registro
      setEditOrDeleteProducto(docSnap.data())
    } else {
      //mensaje de error al no encontrar
      console.log("No such document!");
    }
  }

  //Funcion para obtener mas informacion de una sola produto cuando cambie el id
  useEffect(()=>{
    getProducto();
  },[productoId])

  //Datos para limpiar los textfields
  const initialState = {
    nombre:'',
    categoria:'',
    cantidad:'',
    precio:''
  }

  //state para la info que se muestra en los textfields
  const [editOrDeleteProducto, setEditOrDeleteProducto] = useState(initialState);

  //Funcion para eliminar
  async function eliminarProducto(){
    const docSnap = await getOneRegister(collectionName,productoId);

    if (docSnap.exists()) {
      Swal.fire({
        title:'Eliminar este producto',
        icon:'warning',
        text:'¿Seguro que quieres eliminar este producto?',
        iconColor: theme.palette.text.icon,
        color:theme.palette.text.accent,
        background: theme.palette.background.paper,
        showCancelButton: true,
        confirmButtonColor: theme.palette.secondary.main,
        cancelButtonColor: theme.palette.background.background,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if(result.isConfirmed){
          deleteRegister(collectionName,productoId);
          handleClose()
          Swal.fire({
            title:'Producto eliminado',
            icon:'success',
            text:'El producto fue eliminado',
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color:theme.palette.text.accent,
            background: theme.palette.background.paper,
          })
        }
      });
    } else {
      console.log("No such document!");
    }
  }


  //Funcion para editar
  async function modificarProducto(e) {theme
    e.preventDefault();

    //Se actualiza la categoria
    const arreglo = {...editOrDeleteProducto, 'categoria': editOrDeleteProducto.categoria.toString()}

    //Se almacena el objeto con la categoria actualizada
    setEditOrDeleteProducto(arreglo)
    const docSnap = await getOneRegister(collectionName,productoId);

    if (docSnap.exists()) {

      Swal.fire({
        title:'Guardar cambios',
        icon:'info',
        text:'¿Quieres guardar los cambios?',
        iconColor: theme.palette.text.icon,
        color:theme.palette.text.accent,
        background: theme.palette.background.paper,
        showCancelButton: true,
        confirmButtonColor: theme.palette.secondary.main,
        cancelButtonColor: theme.palette.background.background,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if(result.isConfirmed){
          updateRegister(collectionName,productoId, arreglo);
          handleClose()
          Swal.fire({
            title:'Producto actualizado',
            icon:'success',
            text:'El producto fue actualizado',
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color:theme.palette.text.accent,
            background: theme.palette.background.paper,
          })
        }
      });

    } else {
      console.log("No such document!");
    }

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
          open={openEoD}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <form onSubmit={modificarProducto} autoComplete="off">
          <Box sx={style}>
            <Typography align="center" variant="h3" component="h3">
              Ver más
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
                  id="outlined-required"
                  label="Nombre"
                  placeholder="Nombre del cliente"
                  value={editOrDeleteProducto.nombre}
                />
              </Grid>
              <Grid item md={8} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editOrDeleteProducto.categoria}
                  name="categoria"
                  label="Categoria"
                  onChange={handleInputChange}
                >
                  <MenuItem value={1}>Salados</MenuItem>
                  <MenuItem value={2}>Dulces</MenuItem>
                  <MenuItem value={3}>Picantes</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="cantidad"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Cantidad"
                  type="number"
                  placeholder="0.00"
                  value={editOrDeleteProducto.cantidad}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="precio"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Precio"
                  type="string"
                  placeholder="0.00"
                  value={editOrDeleteProducto.precio}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={12} xs={12}></Grid>
              <Grid item align="left" md={4} xs={6}>
                <Button onClick={eliminarProducto} variant="outlined">Eliminar</Button>
              </Grid>
              <Grid item align="right" md={4} xs={6}>
                <Button type="submit" variant="contained">Guardar</Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </Grid>
  );
}

//Se expota el componente
export { EditOrDeleteInventario };