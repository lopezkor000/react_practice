import "./App.css";
import { useState } from "react";

const DEMO_TASKS = [
  { id: 1, desc: "wash", important: true, urgent: false },
  { id: 2, desc: "eat", important: false, urgent: false },
  { id: 3, desc: "sleep", important: true, urgent: true },
];

function Task({ taskId, desc, important, urgent, updateDesc }) {
  const [edit, setEdit] = useState(false);

  const onClick = (e) => {
    setEdit(!edit);
  };

  const onBlur = (e) => {
    if (edit) updateDesc(taskId, e.target.value);
    setEdit(!edit);
  };

  return (
    <>
      {edit ? (
        <>
          <input
            type="text"
            className="list-group-item form-control input-sm"
            onBlur={onBlur}
            defaultValue={desc}
            autoFocus
          />
        </>
      ) : (
        <li
          className={`list-group-item 
              ${important && "bg-success text-light"} 
              ${urgent && "border border-3 border-warning"}`}
          onClick={onClick}
        >
          <div className="small">{desc}</div>
        </li>
      )}
    </>
  );
}

let ID = 10;

function App() {
  const [tasks, setTasks] = useState(DEMO_TASKS);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: ID++,
        desc: e.target.newTask.value,
        important: false,
        urgent: false,
      },
    ]);
    setText("");
  };

  const updateDesc = (id, val) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, desc: val } : task))
    );
  };

  const onInputChange = (e) => {
    setText(e.value);
  };

  return (
    <div className="container">
      <h1>ToDo</h1>

      <div className="col-md-3">
        <ul className="list-group">
          {tasks.map(({ id, desc, important, urgent }) => {
            return (
              <Task
                key={id}
                taskId={id}
                desc={desc}
                important={important}
                urgent={urgent}
                updateDesc={updateDesc}
              />
            );
          })}
        </ul>

        <div className="row mt-2">
          <div className="col-auto">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="To do"
                  name="newTask"
                  value={text}
                  onChange={onInputChange}
                ></input>
                <button className="btn btn-primary">+</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
