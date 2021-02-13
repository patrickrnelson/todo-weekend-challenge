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

router.put('/:id', (req, res) => {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  let taskID = req.params.id;

  let currentStatus = req.body.currentStatus;
  let sqlText = '';

  if (currentStatus === 'false') {
    // if we receive a currentStatus that = 'false'
    // set the isRead column to True
    sqlText = `UPDATE books SET "isRead"=TRUE WHERE id=$1`;
    // else if we receive a statusChange that = 'unread'
    // set the isRead column to False
  } else if (currentStatus === 'true') {
    sqlText = `UPDATE books SET "isRead"=FALSE WHERE id=$1`;
  } else {
    console.log('Whoops');
    res.sendStatus(500);
    return; // Do it now, doesn't run the next set of code
  }

  pool
    .query(sqlText, [bookID])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  let reqID = req.params.id;
  let sqlText = `DELETE FROM "tasks" WHERE "id"=$1;`;
  pool
    .query(sqlText, [reqID])
    .then((dbRes) => {
      console.log('Book deleted', dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error making db connection', err);
      res.sendStatus(500);
    });
});

module.exports = router;
