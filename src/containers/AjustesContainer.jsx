import React, { useEffect, useState } from "react";
import { Ajustes } from "../components/AjustesComponents/Ajustes";
import { Title } from "../components/GenericComponents/Title";

const collectionName = "user";

function AjustesContainer() {
  return (
    <>
      <Title titleText="Ajustes" />
      <Ajustes collectionName={collectionName} />
    </>
  );
}
export { AjustesContainer };
