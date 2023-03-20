import React from "react";
import { useStateContext } from "../hooks/useStateContext";

const Question = () => {
  const { context, setContext } = useStateContext();

  return <div>Question</div>
};

export default Question
