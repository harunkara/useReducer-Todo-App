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
        Kaydet
      </button>
      <table>
        <tbody>
          {state.map((todoz) => (
            <tr key={"tr" + todoz.id}>
              {!todoz.toggle ? (
                <td key={"td-1-false" + todoz.id}>{todoz.todo}</td>
              ) : (
                <td key={"td-1-true" + todoz.id}>
                  <del>{todoz.todo}</del>
                </td>
              )}
              <td key={"td-2" + todoz.id}>
                <button
                  onClick={() =>
                    dispatch({ type: "del", payload: { id: todoz.id } })
                  }
                >
                  SİL
                </button>
              </td>
              <td key={"td-3" + todoz.id}>
                <button
                  onClick={() =>
                    dispatch({ type: "toggle", payload: { id: todoz.id } })
                  }
                >
                  ÇİZ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
