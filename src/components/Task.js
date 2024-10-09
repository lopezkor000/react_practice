import { useState } from "react";

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

export default Task;
