import React from 'react';
import "./styles.css";

export default function App() {
// test data
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: true },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ])

  return (
    <div className="App">
      <h1>To Do List  </h1>
      <TodoList setTodos={setTodos} todos={todos} />
      <AddToDo setTodos={setTodos} />
    </div>
  ); // Passing todos array as todos property 
};

function TodoList({todos,setTodos}) {
  function handleToggleTodo(todo){
    console.log("handle toggle");
  
     // if a todo's id is equal to the one we clicked on,
    // just update that todo's done value to its opposite,
    // otherwise, do nothing (return it)
    const updatedTodos = todos.map((t) => 
    t.id === todo.id
    ? {

      ...t,
      done: !t.done
    } 
    : t
    );  
    setTodos(updatedTodos);
    console.log("completed map"); 
    }

  

  return (

    <ul>
      {[todos.map((todo => (
        <li 
        onDoubleClick={() => handleToggleTodo(todo)}
        style = {{ 
          textDecoration: todo.done? "line-through" : "" 
        }}
        key={todo.id}> {todo.text}
        <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
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
      id: Math.random(),
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

function DeleteTodo({todo, setTodos}){
  function handleDeleteTodo(){
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {

      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
    });
    }
  }

  return (
    <span onClick={handleDeleteTodo} role="button" style = {{ 
      color: 'red',
      fontWeight: 'bold',
      marginLeft: 10,
      cursor: "pointer"

    }}>x</span> 
  )


}

