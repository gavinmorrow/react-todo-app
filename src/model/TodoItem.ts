type uuid = string;

export default class TodoItem {
  constructor(
    public id: uuid,
    public text: string,
    public completed: boolean = false,
  ) {}
}

const pruneItems = (items: TodoItem[]) =>
  items.filter((item) => item.text.length > 0);

const loadItems = () =>
  pruneItems(JSON.parse(localStorage.getItem("items") ?? "[]"));

export { pruneItems, loadItems };
