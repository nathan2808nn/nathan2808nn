const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meu_banco_de_dados'
});

db.connect((err) => {
    if (err) {
        console.error('erro ao conectar banco de dados');
        process.exit(1);
    }
    console.log('conectado ao banco de dados MySQL!');
});

app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, estoque } = req.body;

    if (!nome || !preco || !estoque === undefined) {
        return res.status(400).json({ message: 'Os campos nome, preco e estoque são obrigatórios' });
    }

    const sql = 'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?,?,?,?)';
    db.query(sql, [nome, descricao, preco, estoque], (err, result) => {
        if (err) {
            console.error({message:'erro ao inserir produto'});
            return res.status(500).json({ message: 'Erro ao inserir produto' });
        }
        res.status(201).json({message: 'produto criado com sucesso!', produtoid: result.insertId});
    });
});

app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
        res.status(200).json(results);
    });
});

app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM produtos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            return res.status(500).json({ message: 'Erro ao buscar produto.' });
        }
        if (results.lenght === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json(result[0]);
    });
});

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    if (!nome || !preco || !estoque === undefined) {
        return res.status(400).json({ message: 'Os campos nome, preco e estoque são obrigatórios' });
    }

    const sql = 'UPDATE produtos SET nome =?, descricao =?, preco =?, estoque =? WHERE id =?';
    db.query(sql, [nome, descricao, preco, estoque, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err);
            return res.status(500).json({ message: 'Erro ao atualizar produto.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'produto atualizado com sucesso!' });
    });
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM produtos WHERE id =?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            return res.status(500).json({ message: 'Erro ao excluir produto.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'produto deletado com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});














