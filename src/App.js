import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <Todo />
    </div>
  );
}
function Todo() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="todo-app">
      <Header />
      <ListForm onAddItems={handleItems} />
      <TodoList
        items={items}
        onDelete={handleDelete}
        onPacked={handlePacked}
        onClearList={handleClearList}
      />
    </div>
  );
}
function Header() {
  return (
    <div className="header">
      <h1>To Do List</h1>
    </div>
  );
}

function ListForm({ onAddItems }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItems = { description, packed: false, id: Date.now() };

    onAddItems(newItems);
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function TodoList({ items, onDelete, onPacked, onClearList }) {
  let sortedItems;
  sortedItems = items
    .slice()
    .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list-container">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onPacked={onPacked}
            onClearList={onClearList}
          />
        ))}
      </ul>
      <button className="delete" onClick={onClearList}>
        Clear
      </button>
    </div>
  );
}

function Item({ item, onDelete, onPacked }) {
  return (
    <li>
      <input type="checkbox" onClick={() => onPacked(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span>
      <button className="delete" onClick={() => onDelete(item.id)}>
        -
      </button>
    </li>
  );
}
