import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import Projetos from "./db.js"; // Importa o modelo Cliente
import { where } from "sequelize";

const server = express();
const __dirname = path.resolve();

// Middlewares
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// ** CREATE - Rota para criar um novo cliente **
server.post("/criar", async (req, res) => {
  try {
    const { nome, descricao, data, funcionarios } = req.body;
    const novoProjetos = await Projetos.create({ nome, descricao, data, funcionarios});
    res.status(201).json(novoProjetos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criarProjeto" });
  }
});

// ** READ - Rota para listar todos os clientes **
server.get("/consultar", async (req, res) => {
  try {
    const projetos = await Projetos.findAll();
    res.json(projetos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao pegar o Projeto" });
  }
});

// ** READ - Rota para pegar um cliente pelo ID **
server.get("/pegar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projetos = await Projetos.findOne({ where: { id } });
    if (projetos) {
      res.json(projetos);
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao pegar o projeto" });
  }
});

// ** UPDATE - Rota para atualizar um cliente pelo ID **
server.get("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {  } = req.body;
    const projetos = await Projetos.findOne({ where: { id } });

    if (projetos) {
      await projetos.update({ nome, descricao, data, funcionarios});
      res.json(projetos); 
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o Projeto" });
  }
});

// ** DELETE - Rota para excluir um cliente pelo ID **
server.get("/delete/:id", async (req, res) => {
    const  id  = req.params.id;
    Projetos.destroy({ where: { id: `${id}` }});
    res.json({ message: "Projeto excluído com sucesso" });
});


//SEMPRE MANTENHA NO FINAL DO CÒDIGO 
server.listen(3031, function () {
  console.log("Server is running on port 3031");
});
