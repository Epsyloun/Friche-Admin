import React, { useEffect } from 'react';

import { InventarioCard } from './InventarioCard';
import { Grid } from '@mui/material';

function CardProduct({data, setCantidad, cantidadT, carrito, setCarrito}) {

  return (
    <Grid container spacing={2} m={1} sx={{justifyContent:'center', width:"97.5%", paddingBottom:"30px"}}>
        {data.map((producto)=>(
            <Grid item xs={12} md={3} lg={3} key={producto.id}>
            <InventarioCard
              idProduct={producto.id}
              title={producto.nombre}
              precio={producto.precio}
              cantidad={producto.cantidad}
              cantidadT={cantidadT}
              setCantidad={setCantidad}
              carrito={carrito}
              setCarrito={setCarrito}
            />
          </Grid>
        ))}
    </Grid>
  );
}


export {CardProduct};
