import React, { useEffect, useState } from 'react'
import { FinanzasList } from '../components/FinanzasComponents/FinanzasList';
import { Title } from '../components/GenericComponents/Title';


function FinanzasContainer() {

    const collectionName="finanzas"

    return (
    <>
        <Title
            titleText="Finanzas"
        />
        <FinanzasList collectionName={collectionName}/>
    </>
    );
}

export {FinanzasContainer};