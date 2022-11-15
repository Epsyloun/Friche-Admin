import React, { useEffect, useState } from "react";
import { Buscador } from "../components/GenericComponents/Buscador";
import { TableComponent } from "../components/GenericComponents/Table";
import { Title } from "../components/GenericComponents/Title";
import { PedidosArray } from "../components/GenericComponents/infoExamples";
import { NewPedido } from "../components/PedidosComponents/NewPedido";

function PedidosContainer() {
  function createData(nombre, fecha, total) {
    return { nombre, fecha, total };
  }
  const columns = [
    { id: "nombre", label: "Nombre" },
    { id: "fecha", label: "Fecha" },
    { id: "total", label: "Total" },
  ];

  const newRow = PedidosArray();
  const sendRow = [];
  newRow.map((row) => {
    sendRow.push(createData(row.nombre, row.fecha, row.monto));
  });

  const [open, setOpen] = useState(false);
  const [openEoD, setOpenEoD] = useState(false);

  return (
    <>
      {!open && (
        <>
          <Title titleText="Pedidos" />
          <Buscador
            // setSearch={setSearchCobro}
            open={open}
            setOpen={setOpen}
            setOpenEoD={setOpenEoD}
          />
          <TableComponent columns={columns} rows={sendRow} />
        </>
      )}
      {open && <>
        <Title titleText="Agregar nuevo pedido" />
        <NewPedido/>
      </>}
    </>
  );
}

export { PedidosContainer };
