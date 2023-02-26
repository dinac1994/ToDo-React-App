import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  clearAll,
  clearCompleted,
} from "./features/todos/todosSlice";
import { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function App() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");

  const addButton = () => {
    dispatch(addTodo(task));
    setTask("");
    
  };

  return (
    <div className="App">
      <div className="header">
        <input
          className="textbar"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What should I do?..."
        />
        <button className="add-todo" onClick={addButton}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="clear-actions">
        <button
          className="clear-completed"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear completed tasks
        </button>
        <button className="clear-all" onClick={() => dispatch(clearAll())}>
          Clear all
        </button>
      </div>
      {todos.map((item) => {
        return (
          <div className="todo" key={item.id}>
            <p className="task">{item.task}</p>
            <div className="task-actions">
              <button className={item.complete ? 'highlight' : 'complete-task'} onClick={() => dispatch(completeTodo(item.id))}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="delete-task" onClick={() => dispatch(deleteTodo(item.id))}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
