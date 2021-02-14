console.log('js');

//const swal = require('sweetalert');
//import swal from 'sweetalert';

$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  getTasks();
  // button listeners
  $(document).on('click', '#btn-submit', onSubmit);
  $(document).on('click', '.changeBtn', onChangeBtn);
  $(document).on('click', '.deleteBtn', onDeleteBtn);
}

/*
 **** GET
 */
function getTasks() {
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      console.log('response', response);
      renderTasks(response);
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
}

// This task is being called inside of the GET
function renderTasks(array) {
  // Empty the html where the tasks will live
  $('#tableBody').empty();

  // loop through the tasks array
  for (let task of array) {
    let taskCompleteClass;
    // if the task is complete, assign the table row a class 'complete-row'
    if (task.complete) {
      taskCompleteClass = 'complete-row';
    }
    // append each task, and two buttons in the row
    $('#tableBody').append(`
    <div class="row justify-content-center align-items-center taskRow">
      <div class="${taskCompleteClass} tasks col-sm-6">${task.title}</div>
      <div class="dates col-sm-2">${task.date_created}</div>
      <div class="dates col-sm-2">TASK.COMPLETE</div>
      <div class="change-buttons col-sm-1">
        <button type="button" class="btn changeBtn btn-success" data-id="${task.id}" data-status="${task.complete}">
        Complete
        </button>
      </div>
      <div class="delete-buttons col-sm-1">
        <button type="button" class="btn deleteBtn btn-danger" data-id="${task.id}">
        Delete
        </button>
      </div>
    </div>
    `);
  }
}

// SUBMIT BUTTON
function onSubmit() {
  if ($('#titleInput').val() === '') {
    alert('Error! Missing Input');
  } else {
    gatherInputs();
    clearInputs();
  }
}

// Gather inputs for the POST
function gatherInputs() {
  let taskTitle = $('#titleInput').val();

  let newTask = {
    task: taskTitle,
  };

  postNewTask(newTask);
}

function clearInputs() {
  $('#titleInput').val('');
}

/*
 **** POST
 */
// after submit,and after inputs have been gathered, POST
function postNewTask(data) {
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: data,
  })
    .then((response) => {
      console.log('POST response:', response);
      getTasks();
    })
    .catch((error) => {
      console.log('error in POST', error);
    });
}

/*
 **** DELETE
 */

// DELETE BUTTON
function onDeleteBtn() {
  // console.log('Delete Click');
  swal({
    title: 'Confirm Delete',
    text: 'Deletes are PERMANENT',
    icon: 'warning',
    buttons: true,
  }).then((deleteConfirm) => {
    if (deleteConfirm) {
      swal('DELETED');
      let thisTaskID = $(this).data('id');
      //console.log('Task ID', thisTaskID);
      deleteTask(thisTaskID);
    } else {
      swal('Delete Cancelled');
    }
  });
  // let thisTaskID = $(this).data('id');
  // console.log('Task ID', thisTaskID);
  // deleteTask(thisTaskID);
}

function deleteTask(taskID) {
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskID}`,
  })
    .then(function (response) {
      console.log('successful DELETE');
      // refresh task data
      getTasks();
    })
    .catch(function (err) {
      console.log('error', err);
      alert('ERROR');
    });
}

/*
 **** PUT
 */
// CHANGE STATUS BUTTON
function onChangeBtn() {
  console.log('changeBtn click');
  let thisTaskId = $(this).data('id');
  let currentStatus = $(this).data('status');
  console.log('current Status:', currentStatus);
  changeStatus(thisTaskId, currentStatus);
}

function changeStatus(id, status) {
  $.ajax({
    method: 'PUT',
    url: `/tasks/${id}`,
    data: {
      status: status,
    },
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.log('error:', err);
      alert('ERROR Try again l8r');
    });
}
