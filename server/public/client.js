console.log('js');

$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  getTasks();
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

function renderTasks(array) {
  for (let task of array) {
    $('#tableBody').append(`
      <tr>
        <td>${task.title}</td>
        <td>${task.date_created}</td>
        <td>${task.complete}</td>
        <td><button>Change</button></td>
        <td><button>Delete</button></td>
      </tr>
      `);
  }
}
