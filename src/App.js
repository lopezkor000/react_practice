import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8080/data");
      setTasks(result.data);
    })();
  }, []);

  const onInputChange = (e) => {
    setText(e.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: ID++,
        description: e.target.newTask.value,
        important: false,
        urgent: false,
      },
    ]);
    setText("");
  };

  const updateDesc = (id, val) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, description: val } : task
      )
    );
  };

  return (
    <div className="container">
      <h1>ToDo</h1>

      <div className="col-md-3">
        <ul className="list-group">
          {tasks.map((data) => {
            let { id, description, important, urgent } = data;
            return (
              <Task
                key={id}
                taskId={id}
                desc={description}
                important={important}
                urgent={urgent}
                updateDesc={updateDesc}
              />
            );
          })}
        </ul>
        <AddTask
          handleSubmit={handleSubmit}
          text={text}
          onInputChange={onInputChange}
        />
      </div>
    </div>
  );
}

export default App;
