const express = require('express');

const server = express();

server.use(express.json());

// middleware local (pode ser chamado em quanlaquer rota)
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({error: 'User name is required'});
  }
  return next();
}

// Criando um middleware global (será executado antes de bater na rota chamada)
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  return next();
})

// Query params = ?teste=1
server.get('/users', (req, res) => {
  const nome = req.query.nome;
  return res.json(`Nome: ${nome}`);
});

// Route prams = /users/1
server.get('/users/:id', (req, res) => {
  const { id } = req.params; // recebendo o parâmetro utilizando desestruturação
  return res.json(id);
});

// Request body = { "nome": "Julio", "email": "teste@gmail.com" }
server.post('/users', checkUserExists, (req, res) => {
  const { name, email } = req.body;
  res.json({
    "Nome": name,
    "E-mail": email
  })
});

server.listen(3000);
