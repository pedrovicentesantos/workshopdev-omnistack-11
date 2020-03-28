function onOff() {
  document
    .querySelector("#modal")
    .classList.toggle("hide")
  
  document
    .querySelector('body')
    .classList.toggle("hideScroll")

  document
    .querySelector('#modal')
    .classList.toggle('addScroll')
}

function checkFields(event) {
  const valuesToCheck = [
    "title",
    "category",
    "image",
    "description",
    "link"
  ]

  const isEmpty = valuesToCheck.find(function(value) {
    if (typeof(event.target[value].value) === 'string' &&
    event.target[value].value.trim().length === 0) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault();
    alert(`Por favor, preencha o campo ${isEmpty}`);
  }
}

function handleDelete(event) {
  const request = new XMLHttpRequest();

  const href = event.view.location.href;
  const id = event.target.id;

  let path = '';
  if (href.endsWith('/')) {
    path = href+id;  
  } else {
    path = href + '/' + id;
  }

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      event.view.location.reload();
    }
  }

  request.open('DELETE', path, true);
  request.send();
  
}