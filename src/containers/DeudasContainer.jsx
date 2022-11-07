import React, { useEffect, useState } from "react";
import { Buscador } from "../components/GenericComponents/Buscador";
import { ListDeuda } from "../components/DeudasComponents/ListDeuda";
import { EditOrDeleteDeuda } from "../components/DeudasComponents/EditOrDeleteDeuda";
import { Title } from "../components/GenericComponents/Title";
import { NewCobro } from "../components/DeudasComponents/NewCobro";

function DeudasContainer() {

  //Nombre de coleccion
  const collectionName = "cobros"

  //Manejo de variables de Edit or Delete
  const [deudaId, setDeudaId] = useState(0);

  //Manejo de modals
  const [open, setOpen] = useState(false);
  const [openEoD, setOpenEoD] = useState(false);
  const [searchCobro, setSearchCobro] = useState("");

  return (
    <>
      {/* Componente titulo */}
      <Title titleText="Cobros" />
      {/* Componente buscador*/}
      <Buscador
        setSearch={setSearchCobro}
        open={open}
        setOpen={setOpen}
        setOpenEoD={setOpenEoD}
      />
      {/* Componente donde se enlistan las deudas*/}
      <ListDeuda
        collectionName={collectionName}
        setDeudaId={setDeudaId}

        searchValue={searchCobro}
        open={open}
        setOpen={setOpen}
        openEoD={openEoD}
        setOpenEoD={setOpenEoD}
      />
      {/* Componente modal new deuda*/}
      <NewCobro collectionName={collectionName} open={open} setOpen={setOpen} setOpenEoD={setOpenEoD} />

      {/* Componente modal edit delete deduda*/}
      <EditOrDeleteDeuda
        collectionName={collectionName}
        deudaId={deudaId}
        openEoD={openEoD}
        setOpen={setOpen}
        setOpenEoD={setOpenEoD}
      />
    </>
  );
}

//Exportamos el componente
export { DeudasContainer };