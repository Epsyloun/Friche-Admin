import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  deleteRegister,
  updateRegister,
  getOneRegister,
} from "../../firebase/api";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isEmpty } from "@firebase/util";

//Componente del modal de editar o eliminar
function EditOrDeletePedido({
  collectionName,
  pedidoId,
  setPedidoId,
  openEoD,
  setOpenEoD,
}) {
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

  //Datos para limpiar los textfields
  const initialState = {
    nombre: "",
    fecha: "",
    items: {},
    total: "",
    estado: "",
  };

  //state para la info que se muestra en los textfields
  const [editOrDeletePedido, setEditOrDeletePedido] = useState(initialState);
  //State para la info de la fecha
  dayjs.extend(customParseFormat);
  let Date = dayjs("01/01/2030", "DD/MM/YYYY", "es");
  const [value, setValue] = useState(Date);

  //Inicializando el tema de colores de la app
  const theme = useTheme();

  //Funcion para cerrar los modal
  function handleClose() {
    setOpenEoD(false);
    setEditOrDeletePedido(initialState); //Limpiando los textfields al cerrar el modal
    setPedidoId(0);
  }

  //Maneja los cambios en los textfields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditOrDeletePedido({ ...editOrDeletePedido, [name]: value });
  };

  //Obteniendo datos de un solo pedido
  const getPedido = async () => {
    if (pedidoId === 0) {
      return;
    }

    const docSnap = await getOneRegister(collectionName, pedidoId);

    if (docSnap.exists()) {
      //Almacenando info de un solo registro
      setEditOrDeletePedido(docSnap.data());

      //se alamacena la fecha con el formato valido
      dayjs.extend(customParseFormat);
      let yourDate = dayjs(docSnap.data().fecha, "DD/MM/YYYY", "es");
      setValue(yourDate);
    } else {
      //mensaje de error al no encontrar
      console.log("No such document!");
    }
  };

  //Funcion para obtener mas informacion de un solo pedido cuando cambie el id
  useEffect(() => {
    getPedido();
  }, [pedidoId]);

  //Funcion para eliminar
  async function eliminarPedido() {
    const docSnap = await getOneRegister(collectionName, pedidoId);

    if (docSnap.exists()) {
      Swal.fire({
        title: "Eliminar este pedido",
        icon: "warning",
        text: "¿Seguro que quieres eliminar este pedido?",
        iconColor: theme.palette.text.icon,
        color: theme.palette.text.accent,
        background: theme.palette.background.paper,
        showCancelButton: true,
        confirmButtonColor: theme.palette.secondary.main,
        cancelButtonColor: theme.palette.background.background,
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteRegister(collectionName, pedidoId);
          handleClose();
          Swal.fire({
            title: "Pedido eliminado",
            icon: "success",
            text: "El pedido fue eliminado",
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color: theme.palette.text.accent,
            background: theme.palette.background.paper,
          });
        }
      });
    } else {
      console.log("No such document!");
    }
  }

  //Funcion para editar
  async function modificarPedido(e) {
    theme;
    e.preventDefault();

    let arreglo = {
      ...editOrDeletePedido,
      estado: editOrDeletePedido.estado.toString(),
    };

    const docSnap = await getOneRegister(collectionName, pedidoId);

    if (docSnap.exists()) {
      Swal.fire({
        title: "Guardar cambios",
        icon: "info",
        text: "¿Quieres guardar los cambios?",
        iconColor: theme.palette.text.icon,
        color: theme.palette.text.accent,
        background: theme.palette.background.paper,
        showCancelButton: true,
        confirmButtonColor: theme.palette.secondary.main,
        cancelButtonColor: theme.palette.background.background,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          updateRegister(collectionName, pedidoId, arreglo);
          handleClose();
          Swal.fire({
            title: "Pedido actualizado",
            icon: "success",
            text: "El Pedido fue actualizado",
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color: theme.palette.text.accent,
            background: theme.palette.background.paper,
          });
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
        <form onSubmit={modificarPedido} autoComplete="off">
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
              <Grid item md={4} xs={12}>
                <TextField
                  name="nombre"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Nombre"
                  placeholder="Nombre del cliente"
                  value={editOrDeletePedido.nombre}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Estado de entrega
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editOrDeletePedido.estado}
                    name="estado"
                    label="Estado de entrega"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={0}>Pendiente</MenuItem>
                    <MenuItem value={1}>Realizado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} />
              <Grid item md={4} xs={12}>
                <TextField
                  disabled
                  name="total"
                  required
                  fullWidth
                  label="Total"
                  placeholder="total de venta"
                  value={editOrDeletePedido.total}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha de entrega"
                    value={value}
                    disablePast={true}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                      setValue(newValue);
                      let newFecha =
                        newValue.$D +
                        "/" +
                        (newValue.$M + 1) +
                        "/" +
                        newValue.$y;
                      setEditOrDeletePedido({
                        ...editOrDeletePedido,
                        fecha: newFecha,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              {Object.entries(editOrDeletePedido.items).length === 0 ? (
                <></>
              ) : (
                <Grid item md={8} xs={12}>
                  <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    {editOrDeletePedido.items.map((product) => (
                      <Grid item key={product.id} mt={2} md={4} xs={12}>
                        <Paper
                          elevation={4}
                          p={1}
                          sx={{ borderRadius: "20px" }}
                        >
                          <Typography p={2} align="center" variant="h4">
                            {product.nombre}
                          </Typography>
                          <Divider mb={4} />
                          <Box p={2}>
                            <Typography align="left" variant="h6">
                              Cantidad: {product.cantidad}
                            </Typography>
                            <Typography align="left" variant="h5">
                              Precio: {product.precio}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
              <Grid item md={12} xs={12}></Grid>
              <Grid item align="left" md={4} xs={6}>
                <Button onClick={eliminarPedido} variant="outlined">
                  Eliminar
                </Button>
              </Grid>
              <Grid item align="right" md={4} xs={6}>
                <Button type="submit" variant="contained">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </Grid>
  );
}

//Se expota el componente
export { EditOrDeletePedido };
