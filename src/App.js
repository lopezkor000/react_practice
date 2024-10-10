import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await axios("http://localhost:8080/data");
        setTasks(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Unable to retreive data from server, try again later");
      }
    })();
  }, [submitted]);

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      let response = await axios.post("http://localhost:8080/data", {
        description: e.target.newTask.value,
      });
      let id = response.data.id;
      setTasks([
        ...tasks,
        {
          id: id,
          description: e.target.newTask.value,
          important: true,
          urgent: true,
        },
      ]);
      setSubmitted(!submitted);
    })();
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

      {loading && tasks ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>
          <h2>Error</h2>
          <pre>{error}</pre>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default App;
