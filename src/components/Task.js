import { useState } from "react";
import axios from "axios";

function Task({ taskId, desc, important, urgent, updateDesc }) {
  const [edit, setEdit] = useState(false);

  const onClick = (e) => {
    setEdit(!edit);
  };

  const onBlur = (e) => {
    if (edit) {
      (async () => {
        try {
          await axios.patch("http://localhost:8080/data", {
            description: e.target.value,
            id: taskId,
          });
          updateDesc(taskId, e.target.value);
        } catch (error) {
          console.log("Could not update item");
        }
      })();
    }
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

export default Task;
