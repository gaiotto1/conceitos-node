const express = require('express');

const server = express();

server.use(express.json());

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
server.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({
    "Nome": name,
    "E-mail": email
  })
});

server.listen(3000);
