import React, { useState } from "react";
import "./Input.css";

import { Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface InputProps {
  addListRow: (input: string) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const [input, setInput] = useState("");
  const clearInput = () => setInput("");

  return (
    <form
      id="inputForm"
      onSubmit={(e) => {
        e.preventDefault();

        if (input.length === 0) return;

        props.addListRow(input);
        clearInput();
      }}
    >
      <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      <IconButton type="submit" aria-label="Add">
        <AddIcon />
      </IconButton>
    </form>
  );
};

export default Input;
