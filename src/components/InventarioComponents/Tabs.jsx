import React, { useEffect } from 'react';

import { InventarioCard } from './InventarioCard';
import { Grid } from '@mui/material';

function TabsInventario({data, setOpen}) {

  useEffect(()=>{
    setOpen(false);
  },[])

  return (
    <Grid container  mt={1} sx={{justifyContent:'center'}}>
      <Grid container spacing={2} lg={10} md={10} xs={12} sx={{justifyContent:'center'}}>
      {data.map((producto)=>(
        <Grid xs={6} md={3} lg={3} item key={producto.id}>
          <InventarioCard
            title={producto.nombre}
            precio={producto.precio}
            cantidad={producto.cantidad}
          />
      </Grid>
      ))}
      </Grid>
    </Grid>
  );
}


export {TabsInventario};
