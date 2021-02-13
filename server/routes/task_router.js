const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all tasks
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasks" ORDER BY "id" ASC;';
  pool
    .query(queryText)
    .then((result) => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
  console.log('New task', req.body);
  let newTask = req.body;

  let queryText = `INSERT INTO "tasks" ("title") VALUES ($1);`;

  console.log('Task Title:', newTask.task);
  pool
    .query(queryText, [newTask.task])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});
// PUT

// DELETE

module.exports = router;
