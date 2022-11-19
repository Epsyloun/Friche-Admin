import React from 'react'
import { Grid} from '@mui/material';

import { Title } from '../components/GenericComponents/Title';
import { ExtraNav } from '../components/MobileComponents/ExtraNav';
import { SocialMedia } from '../components/MobileComponents/SocialMedia';
import { Technologies } from '../components/MobileComponents/Technologies';

function MobileContainer({pageIndex,setPageIndex}) {

    return (
    <>
        <Title
            titleText="Ver mas"
        />
        <Grid container>
            <ExtraNav
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            />
            <SocialMedia/>
            <Technologies/>
        </Grid>
    </>
    );
}

export {MobileContainer};