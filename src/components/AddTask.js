function AddTask({ text, handleSubmit, onInputChange }) {
  return (
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
  );
}

export default AddTask;
