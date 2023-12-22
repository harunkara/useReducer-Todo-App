import "./styles.css";
import { useReducer, useState } from "react";
export default function App() {
  function reducer(todos, action) {
    console.log(todos);
    switch (action.type) {
      case "add":
        return [...todos, { id: action.payload.id, todo: action.payload.todo }];
      case "del":
        return todos.filter((item) => item.id !== action.payload.id);
      case "toggle": {
        const toggledId = action.payload.id;
        const toggledIndex = todos.findIndex((item) => item.id === toggledId);
        let temp = [...todos];
        if (toggledIndex !== -1) {
          temp[toggledIndex] = {
            ...temp[toggledIndex],
            toggle: !temp[toggledIndex].toggle,
          };
        }

        return temp;
      }
    }
  }
  const [todo, setTodo] = useState("");
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <div className="App">
      <input
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        value={todo}
      ></input>
      <button
        onClick={() => {
          dispatch({
            type: "add",
            payload: { id: Date.now(), todo: todo, toggle: false },
          });
          setTodo("");
        }}
      >
        SAVE
      </button>
      <table>
        <tbody>
          {state.map((todo) => (
            <tr key={"tr" + todo.id}>
              {!todo.toggle ? (
                <td key={"td-1-false" + todo.id}>{todo.todo}</td>
              ) : (
                <td key={"td-1-true" + todo.id}>
                  <del>{todo.todo}</del>
                </td>
              )}
              <td key={"td-2" + todo.id}>
                <button
                  onClick={() =>
                    dispatch({ type: "del", payload: { id: todo.id } })
                  }
                >
                  DELETE
                </button>
              </td>
              <td key={"td-3" + todo.id}>
                <button
                  onClick={() =>
                    dispatch({ type: "toggle", payload: { id: todo.id } })
                  }
                >
                  TOGGLE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
