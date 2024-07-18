import React, { useEffect, useState } from "react";
import "./App.css";

import ListRow from "./components/ListRow/ListRow";
import TodoItem, {
  addItem,
  deleteItem,
  loadItems,
  pruneItems,
  setItem,
} from "./model/TodoItem";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { v4 as uuid } from "uuid";

function App() {
  // clear errors from prev run
  console.clear();

  const [todoItems, _setTodoItems] = useState([] as TodoItem[]);

  useEffect(
    () =>
      void loadItems()
        .then((items) => _setTodoItems(items))
        .catch((err) => {
          console.error("Error loading items:", err);
        }),
    [],
  );

  const appendTodoItem = (text: string) =>
    addItem(new TodoItem(uuid(), text))
      .then((newItem) => {
        _setTodoItems(todoItems.concat(newItem));
      })
      .catch((err) => console.error("Error adding item:", err));

  const setTodoItem = (newItem: TodoItem) =>
    setItem(newItem)
      .then(() =>
        _setTodoItems(
          todoItems.map((item) => {
            if (item.id === newItem.id) return newItem;
            else return item;
          }),
        ),
      )
      .catch((err) => console.error("Error updating item:", err));

  const deleteTodoItem = (target: TodoItem) =>
    deleteItem(target)
      .then(() =>
        _setTodoItems(todoItems.filter((item) => item.id !== target.id)),
      )
      .catch((err) => console.error("Error deleting item:", err));

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const theme = darkTheme;

  return (
    <div onClick={() => _setTodoItems(pruneItems(todoItems))}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <h1>Todo</h1>

          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "0",
            }}
            onClick={(e) => e.stopPropagation()}
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
    </div>
  );
}

export default App;
