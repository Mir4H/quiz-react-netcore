import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createAPIendpoint, ENDPOINTS } from "../api";
import { formatTime } from "../helpers/formatTime";
import useStateContext from "../hooks/useStateContext";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finishTime, setFinishTime] = useState(0)
  
  let timer

  const startTimer = () => {
    timer = setTimeout(() => {
      setFinishTime(finishTime + 1)
    }, 1000)
  }

  useEffect(() => {
    createAPIendpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQuestions(res.data)
        startTimer()
      })
      .catch((err) => {
        console.log(err)
      });

      return () => { clearInterval(timer)}
  }, []);


  return questions.length !== 0 ? (
    <Card sx={{maxWidth:640, mx:'auto', mt:5, '& .MuiCardHeader-action':{m:0, alignSelf: 'center'}}}>
      <CardHeader title={`Question ${questionIndex+1} of 5`} action={<Typography>{formatTime(finishTime)}</Typography>}/>
      <Box>
        <LinearProgress variant="determinate" value={(questionIndex+1)*100/5}/>
      </Box>
      <CardContent>
        <Typography variant="h6">
          {questions[questionIndex].questionText}
        </Typography>
        <List>
          {questions[questionIndex].options.map((item, index) => (
            <ListItemButton key={index}>
              <div>
                {String.fromCharCode(65 + index) + " | "} {item}
              </div>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : null;
};

export default Quiz;
