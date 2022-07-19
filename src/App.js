import React from 'react';
import "./styles.css";

export default function App() {
// test data
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ])

  return (
    <div className="App">
      <h1>To Do List  </h1>
      <TodoList todos={todos} />
      <AddToDo setTodos={setTodos} />
    </div>
  ); // Passing todos array as todos property 
}
function TodoList({todos}) {

  return (

    <ul>
      {[todos.map((todo => (
        <li key={todo.id}> {todo.text}</li>
      )))]}
    </ul>
  )
};
function AddToDo({ setTodos }) {
  const inputRef = React.useRef();
  function handleAddTodo(event) {
    event.preventDefault();
    console.log("AddToDo: ", event.target.elements.AddToDo.value) // log what was submited 
    const text = event.target.elements.AddToDo.value;
    const todo = {
      id: 4,
      text,
      done: false
    };
    console.log(todo);
    setTodos(prevTodos => {
      return prevTodos.concat(todo)
    })
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input name="AddToDo" placeholder="Add Item" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );

}

