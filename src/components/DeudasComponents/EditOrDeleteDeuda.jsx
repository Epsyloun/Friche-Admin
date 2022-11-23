import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { deleteRegister, updateRegister, getOneRegister } from '../../firebase/api';
import Swal from "sweetalert2";
import { useTheme } from '@mui/material/styles';

//Componente del modal de editar o eliminar
function EditOrDeleteDeuda({ collectionName, deudaId, setDeudaId, openEoD, setOpenEoD, setOpen }) {

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

  //Funcion para obtener la fecha de hoy
  let fechaVar = new Date();
  let diaf = fechaVar.getDate();
  let mes = fechaVar.getMonth();
  mes = mes + 1;
  let ano = fechaVar.getFullYear();

  //Funcion para cerrar los modal
  function handleClose() {
    setOpen(false);
    setOpenEoD(false);
    setEditOrDeleteCobro(initialState)//Limpiando los textfields al cerrar el modal
    setDeudaId(0)
  }

  //Maneja los cambios en los textfields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditOrDeleteCobro({ ...editOrDeleteCobro, [name]: value })
  }

  //Obteniendo datos de una sola deuda
  const getDeuda = async () => {

    if (deudaId === 0) {
      return
    }

    const docSnap = await getOneRegister(collectionName, deudaId);

    if (docSnap.exists()) {
      //Almacenando info de un solo registro
      setEditOrDeleteCobro(docSnap.data())
    } else {
      //mensaje de error al no encontrar
      console.log("No such document!");
    }
  }

  //Funcion para obtener mas informacion de una sola deuda cuando cambie el id
  useEffect(() => {
    getDeuda();
  }, [deudaId])

  //Datos para limpiar los textfields
  const initialState = {
    nombre: '',
    apellido: '',
    correo: '',
    fecha: '',
    monto: ''
  }

  //state para la info que se muestra en los textfields
  const [editOrDeleteCobro, setEditOrDeleteCobro] = useState(initialState);

  //Funcion para eliminar
  async function eliminarCobro() {
    const docSnap = await getOneRegister(collectionName, deudaId);

    if (docSnap.exists()) {
      Swal.fire({
        title: 'Eliminar este cobro',
        icon: 'warning',
        text: '¿Seguro que quieres eliminar este cobro?',
        iconColor: theme.palette.text.icon,
        color: theme.palette.text.accent,
        background: theme.palette.background.paper,
        showCancelButton: true,
        confirmButtonColor: theme.palette.secondary.main,
        cancelButtonColor: theme.palette.background.background,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteRegister(collectionName, deudaId);
          handleClose()
          Swal.fire({
            title: 'Cobro eliminado',
            icon: 'success',
            text: 'El cobro fue eliminado',
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color: theme.palette.text.accent,
            background: theme.palette.background.paper,
          })
        }
      });
    } else {
      console.log("No such document!");
    }
  }


  //Funcion para editar
  async function modificarCobro(e) {
    theme
    e.preventDefault();

    //Se actualiza la fecha
    const arreglo = { ...editOrDeleteCobro, 'fecha': `${diaf}/${mes}/${ano}` }

    //Se almacena el objeto con la fecha actualizada
    setEditOrDeleteCobro(arreglo)
    const docSnap = await getOneRegister(collectionName, deudaId);

    if (docSnap.exists()) {

      if (editOrDeleteCobro.nombre.length < 15 && editOrDeleteCobro.apellido.length < 15 && editOrDeleteCobro.correo.length < 25) {
        if (isNaN(editOrDeleteCobro.nombre) && isNaN(editOrDeleteCobro.apellido)) {
          if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(editOrDeleteCobro.correo)) {
            if (editOrDeleteCobro.monto < 1000000) {

              Swal.fire({
                title: 'Guardar cambios',
                icon: 'info',
                text: '¿Quieres guardar los cambios?',
                iconColor: theme.palette.text.icon,
                color: theme.palette.text.accent,
                background: theme.palette.background.paper,
                showCancelButton: true,
                confirmButtonColor: theme.palette.secondary.main,
                cancelButtonColor: theme.palette.background.background,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  updateRegister(collectionName, deudaId, arreglo);
                  handleClose()
                  Swal.fire({
                    title: 'Cobro actualizado',
                    icon: 'success',
                    text: 'El cobro fue actualizado',
                    timer: 2000,
                    iconColor: theme.palette.text.icon,
                    color: theme.palette.text.accent,
                    background: theme.palette.background.paper,
                  })
                }
              });

            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Ingrese una cantidad meno',
                timer: 2000,
                iconColor: theme.palette.text.icon,
                color: theme.palette.text.accent,
                background: theme.palette.background.paper,
              })
            }
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Ingrese dirrecion de correo correcto',
              timer: 2000,
              iconColor: theme.palette.text.icon,
              color: theme.palette.text.accent,
              background: theme.palette.background.paper,
            })
          }

        }
        else {

          Swal.fire({
            icon: 'error',
            title: 'Ingrese nombre correcto',
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color: theme.palette.text.accent,
            background: theme.palette.background.paper,
          })
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Ingrese menos caracteres',
          timer: 2000,
          iconColor: theme.palette.text.icon,
          color: theme.palette.text.accent,
          background: theme.palette.background.paper,
        })
      }


    } else {
      console.log("No such document!");
    }

    const number = 2000;
number.toLocaleString('en-IN', {style: 'currency',currency: 'INR', minimumFractionDigits: 2})
console.log(number);
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
        <form onSubmit={modificarCobro} autoComplete="off">
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
                  value={editOrDeleteCobro.nombre}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="apellido"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Apellido"
                  placeholder="Apellido del cliente"
                  value={editOrDeleteCobro.apellido}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="correo"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Correo"
                  placeholder="Correo del cliente"
                  value={editOrDeleteCobro.correo}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="monto"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Cobro"
                  type="number"
                  placeholder="0.00"
                  value={editOrDeleteCobro.monto}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={12} xs={12}></Grid>
              <Grid item align="left" md={4} xs={6}>
                <Button onClick={eliminarCobro} variant="outlined">Eliminar</Button>
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
export { EditOrDeleteDeuda };