console.log('js');

$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  getTasks();
  // button listeners
  $(document).on('click', '.changeBtn', onChangeBtn);
  $(document).on('click', '.deleteBtn', onDeleteBtn);
}

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
        <td>${task.complete}</td>
        <td><button class="changeBtn">Change</button></td>
        <td><button class="deleteBtn">Delete</button></td>
      </tr>
      `);
  }
}

function onChangeBtn() {
  console.log('changeBtn click');
}

function onDeleteBtn() {
  console.log('deleteBtn click');
}
