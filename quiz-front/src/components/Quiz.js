import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, createAPIendpoint, ENDPOINTS } from "../api";
import { formatTime } from "../helpers/formatTime";
import useStateContext from "../hooks/useStateContext";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finishTime, setFinishTime] = useState(0);
  const { context, setContext } = useStateContext();
  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setFinishTime(prev => prev + 1);
    }, [1000]);
  };

  useEffect(() => {
    setContext({finishTime:0, selectedOptions:[]})
    createAPIendpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQuestions(res.data);
        startTimer();
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateAnswer = (questionId, option) => {
    const answer = [...context.selectedOptions];
    answer.push({
      questionId,
      selected: option,
    });

    if (questionIndex < 4) {
      setContext({ selectedOptions: [...answer] });
      setQuestionIndex(questionIndex + 1);
    } else {
      setContext({ selectedOptions: [...answer], finishTime });
    }
  };

  return questions.length !== 0 ? (
    <Card
      sx={{
        maxWidth: 640,
        mx: "auto",
        mt: 5,
        "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
      }}
    >
      <CardHeader
        title={`Question ${questionIndex + 1} of 5`}
        action={<Typography>{formatTime(finishTime)}</Typography>}
      />
      <Box>
        <LinearProgress
          variant="determinate"
          value={((questionIndex + 1) * 100) / 5}
        />
      </Box>
      {questions[questionIndex].imageName==null ? 
      null
      : <CardMedia component="img" image={`${BASE_URL}images/${questions[questionIndex].imageName}`} sx={{maxWidth: 640}}/>}
      <CardContent>
        <Typography variant="h6">
          {questions[questionIndex].questionText}
        </Typography>
        <List>
          {questions[questionIndex].options.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() =>
                updateAnswer(questions[questionIndex].questionId, index)
              }
            >
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
