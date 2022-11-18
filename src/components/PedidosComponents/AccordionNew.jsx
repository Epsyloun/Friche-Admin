import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Modal, Typography } from "@mui/material";
import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AccordionNew({title, subtitle, number,data, width}) {

  let width2= 100-parseInt(width)-10;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid p={2}>
      <Accordion expanded={expanded === `panel${number}`} onChange={handleChange(`panel${number}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h5" sx={{ width: width, flexShrink: 0 }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ marginLeft:'10px',width: width2,color: 'text.secondary' }}>{subtitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider/>
          {data}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

export { AccordionNew };