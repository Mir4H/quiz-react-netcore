import React from "react";
import useStateContext from "../hooks/useStateContext";


const Quiz = () => {
  const { context, setContext } = useStateContext()

  console.log(context)
  return <div>Quiz</div>
};

export default Quiz
