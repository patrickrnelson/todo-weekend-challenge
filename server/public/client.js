console.log('js');

$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  getTasks();
  // button listeners
  $(document).on('click', '#submitBtn', onSubmit);
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
    // append each task, and two buttons in the row
    $('#tableBody').append(`
      <tr>
        <td>${task.title}</td>
        <td>${task.date_created}</td>
        <td class="completion-status">${task.complete}</td>
        <td><button class="changeBtn" data-id="${task.id}">Change</button></td>
        <td><button class="deleteBtn" data-id="${task.id}">Delete</button></td>
      </tr>
      `);
  }
}

// SUBMIT BUTTON
function onSubmit() {
  console.log('onSubmit');
  gatherInputs();
}

// Gather inputs for the POST
function gatherInputs() {
  let taskTitle = $('#titleInput').val();
  let date = $('#dateInput').val();

  let newTask = {
    task: taskTitle,
    date: date,
  };

  postNewTask(newTask);
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
  let thisTaskID = $(this).data('id');
  console.log('Task ID', thisTaskID);
  deleteTask(thisTaskID);
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
  let currentStatus = $(this).parent().siblings('.completion-status').text();

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
