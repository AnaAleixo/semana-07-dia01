import express from "express";
import TaskModel from "../model/task.model.js";
import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";

const userRoute = express.Router();

const saltRounds =10

//sign-up
userRoute.post("/sign-up", async (req, res) => {
  try {
    //capturand a senha do meu req.body
    const { password } = req.body;

    //checando se a senha EXISTE || se a senha passou nos pré requisitos
    if (
      !password ||
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/
      )
    ) {
      return res
        .status(400)
        .json({ msg: "Senha não tem os requisitos mínimos de segurança" });
    }

    //gerar o salt
    const salt = await bcrypt.genSalt(saltRounds); //10

    //hashear senha
    const hashedPassword = await bcrypt.hash(password, salt);

    //criar o usuário com a senha hasheada
    const newUser = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    //deleto a propriedade passwordHash do obj
    delete newUser._doc.passwordHash;

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});



/*Banco de Dados
const bancoDados = [
    {
        id:"b535d1f9-b087-47c7-a3f4-b88fa6241a58",
        name: "Ana Aleixo",
        age: "45",
        role: "Aluna",
        active: true,
        tasks: [
            "Assistir todas as aulas da semana",
            "E fazer todas as tarefas! Tô lascada!"
        ]
    }
];
*/

//CREATE - MONGODB (Criando rotas no Mongo)
/*
userRoute.post("/create-user", async (req, res) => {
  try {
    const form = req.body;
    
//quer criar um documento dentro da sua collection -> .create()
    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Algo deu errado na criação do usuário" });
  }
});
*/
//GET ALL USER - MONGODB
userRoute.get("/all-users", async (req, res) => {
  try {
    const users = await UserModel.find({}, { _v: 0, updateAt: 0 }).sort({
      age: 1,
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

//GET ONE USER - - MONGODB
userRoute.get("/oneUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // const user = await UserModel.find({_id: id})

    const user = await UserModel.findById(id).populate("tasks");

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//DELETE - - MONGODB
userRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    const users = await UserModel.find();
    /*
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});*/

    //DELETE todas as TAREFAS que o usuário é dono - - MONGODB
    await TaskModel.deleteMany({ user: id });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//EDIT - - MONGODB
userRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default userRoute;
/* EXEMPLOS DE ROTAS DA AULA
//CRIAÇÃO DE ROTAS
userRoute.get("/enap", (req, res) =>{
        //req- request - requisição do cliente, é o que o cliente manda para o servidor
        //res- response- é a resposta para o cliente

        const bemVindo = "Bem vindo ao servidor da ENAP turma 92 - Ironhack"

        return res.status(200).json(bemVindo)

    });

/*
//ATIVIDADE : CRIAR ROTA QUE RETORNE O BANCO DE DADOS - > ROTA - > "/all-users" verbo:GET
userRoute.get("/all-users", (req, res) => {
  const users = bancoDados;

  return res.status(200).json(users);
});

// POST - Creat
userRoute.post("/new-user", (req, res) => {
  //console.log(req.body) -> é o corpo da minha requisição(json)
  //console.log(req.body.name)-> é apenas o nome

  const form = req.body;

  bancoDados.push(form);

  return res.status(201).json(bancoDados);
});

//DELETE - delete a user
userRoute.delete("/delete/:id", (req, res) => {
  console.log(req.params.id); // req.params -> {} por isso ele pode ser DESCONSTUÍDO
  const { id } = req.params; // eu estou DESCONSTRUINDO o req.params e ABRINDO o obj e acessando pelo NOME da chave

  const deleteById = bancoDados.find((user) => user.id === id);

  if (!deleteById) {
    return res.status(400).json({ msg: "Usuário não encontrado" });
  }

  console.log(deleteById);
  const index = bancoDados.indexOf(deleteById);
  console.log(index);

  bancoDados.splice(index, 1);

  return res.status(200).json(bancoDados);
});

// PUT - Editar
userRoute.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const editUser = bancoDados.find((user) => user.id === id);

  const index = bancoDados.indexOf(editUser); //0

  bancoDados[index] = {
    ...editUser,
    ...req.body,
  };

  return res.status(200).json(bancoDados[index]);
});
*/
