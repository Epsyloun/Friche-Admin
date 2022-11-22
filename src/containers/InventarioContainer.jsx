import React, { useEffect, useState } from "react";
import { ListInventario } from "../components/InventarioComponents/ListInventario";
import { Title } from "../components/GenericComponents/Title";


function InventarioContainer() {

    //Nombre de coleccion
    const collectionName = "inventario"

  return (
    <>
      {/* Componente titulo */}
      <Title titleText="Inventario" />
      {/* Componente donde se enlistan las tabs*/}
      <ListInventario collectionName={collectionName}/>
    </>
  );
}

export { InventarioContainer };
