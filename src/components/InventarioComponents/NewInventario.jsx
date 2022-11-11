import React, { useEffect, useState } from "react";
import { ListInventario } from "../components/InventarioComponents/ListInventario";
import { Title } from "../components/GenericComponents/Title";
import { LoaderInventario } from "../components/GenericComponents/Skeletons";

function InventarioContainer() {

    //Nombre de coleccion
    const collectionName = "inventario"

    //Manejo de variables de Edit or Delete
    const [deudaId, setDeudaId] = useState(0);

    //Manejo de modals
    const [openNew, setOpenNew] = useState(false);
    const [openEoD, setOpenEoD] = useState(false);
    const [searchCobro, setSearchCobro] = useState("");

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [loader]);

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
