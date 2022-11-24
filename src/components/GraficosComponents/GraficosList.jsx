import React, { useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { SliderGraficos } from "./Slider";
import {
  CobrosGraficosArray,
  FinanzasGraficosArray,
  InventarioGraficosArray,
  PedidosGraficosArray,
} from "./GraficosData";

//StyledComponent
const StyledTypo = {
  animation: "fade-in ease 2.5s",
};

function GraficosList() {
  const GraficosCobros = CobrosGraficosArray();
  const GraficosPedidos = PedidosGraficosArray();
  const GraficosInventario = InventarioGraficosArray();
  const GraficosFinanzas = FinanzasGraficosArray();

  return (
    <>
      <Typography
        sx={StyledTypo}
        mt="0.5em"
        mb="0.5em"
        variant="h4"
        color="text.accent"
        align="center"
      >
        <Divider />
        Cobros
        <Divider />
      </Typography>
      <Grid container>
        {GraficosCobros.length === 0 ? null : (
          <SliderGraficos name="Cobros" data={GraficosCobros} />
        )}
      </Grid>

      <Typography
        sx={StyledTypo}
        mt="0.5em"
        mb="0.5em"
        variant="h4"
        color="text.accent"
        align="center"
      >
        <Divider />
        Pedidos
        <Divider />
      </Typography>
      <Grid container>
        {GraficosPedidos.length === 0 ? null : (
          <SliderGraficos name="Pedidos" data={GraficosPedidos} />
        )}
      </Grid>

      <Typography
        sx={StyledTypo}
        mt="0.5em"
        mb="0.5em"
        variant="h4"
        color="text.accent"
        align="center"
      >
        <Divider />
        Inventario
        <Divider />
      </Typography>
      <Grid container>
        {GraficosInventario.length === 0 ? null : (
          <SliderGraficos name="Inventario" data={GraficosInventario} />
        )}
      </Grid>

      <Typography
        sx={StyledTypo}
        mt="0.5em"
        mb="0.5em"
        variant="h4"
        color="text.accent"
        align="center"
      >
        <Divider />
        Finanzas
        <Divider />
      </Typography>
      <Grid container>
        {GraficosFinanzas.length === 0 ? null : (
          <SliderGraficos name="Finanzas" data={GraficosFinanzas} />
        )}
      </Grid>
    </>
  );
}

export { GraficosList };
