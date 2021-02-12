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
