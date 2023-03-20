import React from "react";
import { useStateContext } from "../hooks/useStateContext";

const Question = () => {
  const { context, setContext } = useStateContext;

  setContext({ finishTime: 1 })
  return <div>Question</div>
};

export default Question;
