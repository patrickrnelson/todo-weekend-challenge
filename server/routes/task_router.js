const express = require('express');
const router = express.Router();
const moment = require('moment');
const { resourceLimits } = require('worker_threads');

const pool = require('../modules/pool');

// Get all tasks
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasks" ORDER BY "complete" ASC, "id" ASC;';
  pool
    .query(queryText)
    .then((result) => {
      // loop through each object and change the format of the date
      for (item of result.rows) {
        item.date_created = moment(item.date_created).format('MM-DD-YYYY');
      }
      console.log('result.rows', result.rows);
      // send back the results in an array of obj's
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

  let completeStatus = req.body.status;
  let sqlText = '';

  if (completeStatus === 'false') {
    // if we receive a completeStatus that = 'false'
    // set the complete column to True
    sqlText = `UPDATE tasks SET "complete"=TRUE WHERE id=$1`;
  } else if (completeStatus === 'true') {
    sqlText = `UPDATE tasks SET "complete"=FALSE WHERE id=$1`;
  } else {
    console.log('Error in PUT');
    res.sendStatus(500);
    return; // Do it now, doesn't run the next set of code
  }

  pool
    .query(sqlText, [taskID])
    .then((dbRes) => {
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
