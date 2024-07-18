type uuid = string;

export default class TodoItem {
  constructor(
    public id: uuid,
    public text: string,
    public completed: boolean = false,
  ) {}
}

const PATH = "http://localhost:8080";

const pruneItems = (items: TodoItem[]) =>
  items.filter((item) => item.text.length > 0);

const throwOnErr = ({ status }: { status: number }) => {
  if (status !== 200 && status !== 204)
    throw new Error(`Set item request failed: status: ${status}`);
};

const loadItems = async () =>
  await fetch(`${PATH}/`)
    .then((res) => res.json())
    .then((items) => pruneItems(items));

const addItem = async (item: TodoItem) =>
  await fetch(`${PATH}/`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());

const setItem = async (item: TodoItem) =>
  await fetch(`${PATH}/`, {
    method: "PUT",
    body: JSON.stringify(item),
  }).then(throwOnErr);

const deleteItem = async (item: TodoItem) =>
  await fetch(`${PATH}/${item.id}`, {
    method: "DELETE",
  }).then(throwOnErr);

export { pruneItems, loadItems, addItem, setItem, deleteItem, PATH };
