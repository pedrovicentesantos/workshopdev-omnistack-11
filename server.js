const express = require('express');
const nunjucks = require('nunjucks');

const db = require('./db');

const server = express();

function deleteFromDb(id) {
  db.run(`DELETE FROM ideas WHERE id=?`, id, function(err) {
    if(err) {
      console.log(err);
      return false
    }
    return true
  });
}

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

nunjucks.configure('views', {
  express: server,
  noCache: true,
});

server.get('/', function(request, response) {

  db.all(`SELECT * FROM ideas`, function(err,rows) {
    if(err) { 
      console.log(err);
      return response.send("Erro no BD");
    }

    const lastIdeas = [];
    const tempIdeas = [...rows];
    for (let idea of tempIdeas.reverse()) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    return response.render('index.html', { ideas: lastIdeas });
    
  });
  
});

server.get('/ideias', function(request, response) {

  db.all(`SELECT * FROM ideas`, function(err,rows) {
    if(err) { 
      console.log(err);
      return response.send("Erro no BD");
    }

    const tempIdeas = [...rows];
    tempIdeas.reverse();

    return response.render('ideias.html', { ideas: tempIdeas });
    
  });

});

server.post('/', function(request, response) {
  const query = `INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
    ) VALUES(?, ?, ?, ?, ?);`;
  const data = [
    request.body.image,
    request.body.title,
    request.body.category,
    request.body.description,
    request.body.link
  ]
  
  db.run(query, data, function(err){
    if(err) {
      console.log(err);
      return response.send("Erro no BD");
    }

    return response.redirect('/ideias');
  });
});

server.delete('/:id', function(request, response) {
  const id = request.params.id;
  
  const result = deleteFromDb(id)
  if (!result) {
    return response.send("Erro no BD");
  }
  return response.status(204).send('OK');

});

server.delete('/ideias/:id', function(request, response) {
  const id = request.params.id;
  
  const result = deleteFromDb(id)
  if (!result) {
    return response.send("Erro no BD");
  }
  return response.status(204).send('OK');
  
});

server.listen(3000);