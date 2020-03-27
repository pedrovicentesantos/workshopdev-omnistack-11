const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./database.db');

db.serialize(function () {
  
  db.run(`CREATE TABLE IF NOT EXISTS ideas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    title TEXT,
    category TEXT,
    description TEXT,
    link TEXT
  );`);

  const data = ["https://image.flaticon.com/icons/svg/2729/2729007.svg",
    "Cursos de Programação",
    "Estudo",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fuga possimus!",
    "https://rocketseat.com.br"
  ];
  const query = `INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
    ) VALUES(?, ?, ?, ?, ?);`;
  // db.run(query, data, function(err){
  //   if(err) return console.log(err)

  //   console.log(this);
  // });

  // Deletar dados
  // const id = 2;
  // db.run(`DELETE FROM ideas WHERE id=?`, id, function(err) {
  //   if(err) return console.log(err)

  //   console.log(this);
  // });

  // db.all(`SELECT * FROM ideas`, function(err,rows) {
  //   if(err) return console.log(err);

  //   console.log(rows);
  // });

});

module.exports = db;