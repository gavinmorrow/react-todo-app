import React, { useState } from "react";
import "./ListRow.css";

import TodoItem from "../../model/TodoItem";
import { IconButton, TextField } from "@mui/material";
import { CheckCircle, CircleOutlined, Delete } from "@mui/icons-material";

interface ListRowProps {
  todoItem: TodoItem;
  setTodoItem: (newItem: TodoItem) => void;
  deleteTodoItem: (target: TodoItem) => void;
  addItem?: (text: string) => void;
  isNew?: boolean;
}

const ListRow: React.FC<ListRowProps> = (props) => {
  const toggleCompleted = () => {
    props.todoItem.completed = !props.todoItem.completed;
    props.setTodoItem(props.todoItem);
  };

  const updateText = (newText: string) => {
    props.todoItem.text = newText;
    props.setTodoItem(props.todoItem);
  };

  const [text, _setText] = useState(props.todoItem.text);
  const setText = (newText: string) => {
    _setText(newText);
    updateText(newText);
  };

  return (
    <li
      className={`list-row ${props.todoItem.completed ? "completed" : ""} ${
        props.isNew ? "input" : ""
      }`}
    >
      <IconButton
        sx={{ ml: -1 }}
        aria-label={
          props.todoItem.completed ? "Mark as todo" : "Mark as completed"
        }
        onClick={toggleCompleted}
        disabled={props.isNew}
      >
        {props.todoItem.completed ? (
          <CheckCircle color="success" />
        ) : (
          <CircleOutlined />
        )}
      </IconButton>

      <form
        className="listRowForm"
        onSubmit={(e) => {
          e.preventDefault();

          if (props.todoItem.text.length === 0) {
            if (!props.isNew) props.deleteTodoItem(props.todoItem);
            return;
          }

          if (!props.isNew) {
            document.getElementById("itemInput")!.focus();
          } else {
            props.addItem!(props.todoItem.text);
            setText("");
          }
        }}
      >
        <TextField
          id={props.isNew ? "itemInput" : undefined}
          style={{ width: "100%" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="standard"
        />
      </form>

      <IconButton
        sx={{ mr: -1 }}
        className="delete"
        aria-label="delete item"
        disabled={props.isNew}
        onClick={() => props.deleteTodoItem(props.todoItem)}
      >
        <Delete />
      </IconButton>
    </li>
  );
};

export default ListRow;
