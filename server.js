const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const cors = require("cors");

const PORT = 8080;

let db;
(async () => {
  db = await open({
    filename: "db.db",
    driver: sqlite3.Database,
  });
})();

let app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(cors());

app.get("/data", async (req, res) => {
  let data = await db.all("SELECT * FROM task");
  res.json(data);
});

app.patch("/data", async (req, res) => {
  let description = req.body.description;
  let id = req.body.id;
  const result = await db.run(
    "UPDATE task SET description = ? WHERE id = ? AND description != ?",
    [description, id, description]
  );
  console.log(result);
  res.json({});
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
