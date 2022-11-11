import React, { useEffect } from 'react';

import { InventarioCard } from './InventarioCard';
import { Grid } from '@mui/material';

function TabsInventario({setProductoId,data, setOpen, setOpenEoD}) {

  useEffect(()=>{
    setOpen(false);
  },[])

  return (
    <Grid container spacing={2} mt={1} sx={{justifyContent:'center'}}>
        {data.map((producto)=>(
            <Grid item xs={6} md={3} lg={3} key={producto.id}>
            <InventarioCard
              id={producto.id}
              title={producto.nombre}
              precio={producto.precio}
              cantidad={producto.cantidad}
              setOpenEoD={setOpenEoD}
              setProductoId={setProductoId}
            />
          </Grid>
        ))}
    </Grid>
  );
}


export {TabsInventario};
