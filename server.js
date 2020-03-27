const express = require('express');
const nunjucks = require('nunjucks');

const db = require('./db');

const server = express();

// const ideas = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//     title: "Cursos de Programação",
//     category: "Estudo",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//     title: "Exercícios",
//     category: "Saúde",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//     title: "Meditação",
//     category: "Mentalidade",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729028.svg",
//     title: "Cozinhar",
//     category: "Saúde",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729042.svg",
//     title: "Séries",
//     category: "Entretenimento",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
//     title: "Yoga",
//     category: "Mentalidade",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
//     url: "https://rocketseat.com.br"
//   },
// ]

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

server.listen(3000);