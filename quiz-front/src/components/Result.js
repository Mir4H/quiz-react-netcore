import { Alert, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAPIendpoint, ENDPOINTS } from '../api'
import { formatTime } from '../helpers/formatTime'
import useStateContext from '../hooks/useStateContext'
import { green } from '@mui/material/colors'
import Answer from './Answer'

const Result = () => {
  const { context, setContext } = useStateContext()
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.questionId)
    createAPIendpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qa = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.questionId === x.questionId)
        }))
        setAnswers(qa)
        calculateScore(qa)
      })
      .catch((err) => console.log(err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const calculateScore = (qa) => {
    let tempScore = qa.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc
    }, 0)
    setScore(tempScore)
  }

  const restart = () => {
    setContext({ finishTime: 0, selectedOptions: [] })
    navigate('/quiz')
  }

  const submitScore = () => {
    createAPIendpoint(ENDPOINTS.player)
      .put(context.playerId, {
        playerId: context.playerId,
        score: score,
        finishTime: context.finishTime
      })
      .then((res) => {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
            <Typography variant="h4">Congratulations</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>
            <Typography variant="h6">Took {formatTime(context.finishTime) + ' mins'}</Typography>
            <Button variant="contained" sx={{ mx: 1 }} size="small" onClick={submitScore}>
              Save Score
            </Button>
            <Button variant="contained" sx={{ mx: 1 }} size="small" onClick={restart}>
              Try Again
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{ width: '60%', m: 'auto', visibility: showAlert ? 'visible' : 'hidden' }}
            >
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png"></CardMedia>
      </Card>
      <Answer questionAnswers={answers} />
    </>
  )
}

export default Result
