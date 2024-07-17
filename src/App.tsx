import React, { useState } from "react";
import "./App.css";

import ListRow from "./ListRow";
import TodoItem, { loadItems, pruneItems } from "./TodoItem";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { v4 as uuid } from "uuid";

function App() {
  // clear errors from prev run
  console.clear();

  const [todoItems, _setTodoItems] = useState(loadItems());
  const setTodoItems = (items: typeof todoItems) => {
    _setTodoItems(items);
    // serialize to localstorage
    const json = JSON.stringify(items);
    localStorage.setItem("items", json);
  };
  const appendTodoItem = (text: string) =>
    setTodoItems(pruneItems([...todoItems, new TodoItem(uuid(), text)]));

  const setTodoItem = (newItem: TodoItem) => {
    setTodoItems(
      todoItems.map((item) => {
        if (item.id === newItem.id) {
          item = newItem;
        }
        return item;
      }),
    );
  };

  const deleteTodoItem = (target: TodoItem) =>
    setTodoItems(todoItems.filter((item) => item.id !== target.id));

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const theme = darkTheme;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <h1>Todo</h1>

        {/* <Input addListRow={appendTodoItem} /> */}

        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "0",
          }}
        >
          {todoItems.map((todoItem) => (
            <ListRow
              todoItem={todoItem}
              setTodoItem={setTodoItem}
              deleteTodoItem={deleteTodoItem}
              key={todoItem.id}
            />
          ))}

          <ListRow
            todoItem={new TodoItem(uuid(), "", false)}
            setTodoItem={() => {}}
            addItem={appendTodoItem}
            deleteTodoItem={() => {}}
            isNew={true}
            key="new!"
          />
        </ul>
      </ThemeProvider>
    </div>
  );
}

export default App;
