import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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

function NewPedido() {
  function handleClose() {
    setOpen(false);
  }

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [carrito, setCarrito] = useState([]);

  console.log(carrito)

  return (
    <Paper>
      <form>
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
          subtitle={"$10.50"}
          number={3}
          data={DataTotal()}
          width={'auto'}
        />
        <AccordionNew
          title={"Fecha de entrega:"}
          subtitle={"10/12/1998"}
          number={4}
          data={DataFecha()}
          width={'40%'}
        />
      </form>
    </Paper>
  );
}

export { NewPedido };
