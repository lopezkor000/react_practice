import "./App.css";
import { useState } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

const DEMO_TASKS = [
  { id: 1, desc: "wash", important: true, urgent: false },
  { id: 2, desc: "eat", important: false, urgent: false },
  { id: 3, desc: "sleep", important: true, urgent: true },
];

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
        <AddTask
          text={text}
          handleSubmit={handleSubmit}
          onInputChange={onInputChange}
        />
      </div>
    </div>
  );
}

export default App;
