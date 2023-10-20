const router = require("express").Router();

const connection = require("../../database");

router.get("/getSeries", (req, res) => {
  const sql = "SELECT * FROM series";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("séries récupérées");
    res.send(JSON.stringify(result));
  });
});

router.get("/getOneSerie/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const selectOneSql = `SELECT * FROM series WHERE id =?`;
  connection.query(selectOneSql, [id], (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.get("/getFavorites", (req, res) => {
  const sqlFav = "SELECT * FROM series WHERE series.like = 1";
  connection.query(sqlFav, (err, result) => {
    if (err) throw err;
    console.log("Favoris récupérés");
    res.send(JSON.stringify(result));
  });
});

router.patch("/likedOne", (req, res) => {
  console.log(req.body);
  const like = req.body.like === true ? 1 : 0;
  const id = req.body.id;
  const updateSql = "UPDATE series SET `like`=? WHERE id=?";
  connection.query(updateSql, [like, id], (err, result) => {
    if (err) throw err;
    console.log("Série modifiée en BDD");
    res.send(req.body);
  });
});

router.delete("/deleteSerie/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const deleteSql = "DELETE FROM series WHERE id= ?";
  connection.query(deleteSql, [id], (err, result) => {
    if (err) throw err;
  });
  res.sendStatus(200);
});

router.post("/insertSerie", (req, res) => {
  console.log(req.body);
  const { synopsis, year, poster, title } = req.body;
  const insertSql =
    "INSERT INTO series (title, imgBlob, year, content) VALUES (?, ?, ?, ?)";
  connection.query(
    insertSql,
    [title, poster, year, synopsis],
    (err, result) => {
      if (err) throw err;
      let lastInsertId = result.insertId;
      let sqlLastOne = "SELECT * FROM series WHERE id = ?";
      connection.query(sqlLastOne, [lastInsertId], (err, result) => {
        res.send(JSON.stringify(result));
      });
    }
  );
});

module.exports = router;
