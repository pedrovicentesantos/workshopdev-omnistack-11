const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729028.svg",
    title: "Cozinhar",
    category: "Saúde",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729042.svg",
    title: "Séries",
    category: "Entretenimento",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
    title: "Yoga",
    category: "Mentalidade",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
    url: "https://rocketseat.com.br"
  },
]

server.use(express.static('public'));

nunjucks.configure('views', {
  express: server,
  noCache: true,
});

server.get('/', function(request, response) {
  
  const lastIdeas = [];
  const tempIdeas = [...ideas];
  for (let idea of tempIdeas.reverse()) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea);
    }
  }

  return response.render('index.html', { ideas: lastIdeas });
});

server.get('/ideias', function(request, response) {

  const tempIdeas = [...ideas];
  tempIdeas.reverse();

  return response.render('ideias.html', { ideas: tempIdeas });
});

server.listen(3000);