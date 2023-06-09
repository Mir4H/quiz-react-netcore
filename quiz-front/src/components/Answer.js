import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  List,
  ListItem,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { BASE_URL } from '../api'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import { green, red, grey } from '@mui/material/colors'

const Answer = ({ questionAnswers }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const markCorrect = (qa, i) => {
    if ([qa.answer, qa.selected].includes(i)) {
      return { sx: { color: qa.answer === i ? green[500] : red[500] } }
    }
  }

  return (
    <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
      {questionAnswers.map((item, j) => (
        <Accordion disableGutters key={j} expanded={expanded === j} onChange={handleChange(j)}>
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownIcon
                sx={{ color: item.answer === item.selected ? green[500] : red[500] }}
              />
            }
          >
            <Typography sx={{ width: '90%', flexShrink: 0 }}>{item.questionText}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: grey[900] }}>
            {item.imageName ? (
              <CardMedia
                component="img"
                image={`${BASE_URL}images/${item.imageName}`}
                sx={{ maxWidth: 640 }}
              />
            ) : null}
            <List>
              {item.options.map((x, index) => (
                <ListItem key={index}>
                  <Typography {...markCorrect(item, index)}>
                    {String.fromCharCode(65 + index) + '. '} {x}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default Answer
