import express from "express"

const userRoute =express.Router();


//Banco de Dados
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
]

//CRIAÇÃO DE ROTAS
userRoute.get("/enap", (req, res) =>{
        //req- request - requisição do cliente, é o que o cliente manda para o servidor
        //res- response- é a resposta para o cliente

        const bemVindo = "Bem vindo ao servidor da ENAP turma 92 - Ironhack"

        return res.status(200).json(bemVindo)

    });

//ATIVIDADE : CRIAR ROTA QUE RETORNE O BANCO DE DADOS - > ROTA - > "/all-users" verbo:GET
userRoute.get("/all-users", (req, res) => {

        const users = bancoDados

        return res.status(200).json(users)

    })

// POST - Creat
userRoute.post("/new-user", (req, res) => {
//console.log(req.body) -> é o corpo da minha requisição(json)
//console.log(req.body.name)-> é apenas o nome

    const form = req.body;

    bancoDados.push(form);

    return res.status(201).json(bancoDados);
})

//DELETE - delete a user
userRoute.delete("/delete/:id", (req, res) => {
    console.log(req.params.id); // req.params -> {} por isso ele pode ser DESCONSTUÍDO
    const { id } = req.params; // eu estou DESCONSTRUINDO o req.params e ABRINDO o obj e acessando pelo NOME da chave

    const deleteById = bancoDados.find((user) => user.id ===id);

    if (!deleteById){
        return res.status(400).json({msg: "Usuário não encontrado"})
    }

    console.log (deleteById);
    const index = bancoDados.indexOf(deleteById);
    console.log(index);

    bancoDados.splice(index, 1);

    return res. status(200).json(bancoDados);
});

// PUT - Editar
userRoute.put("/edit/:id", (req, res) => {

    const { id }= req.params;
    const editUser = bancoDados.find((user) => user.id === id)
    

     const index = bancoDados.indexOf(editUser) //0

    bancoDados[index] = {
        ...editUser,
        ...req.body
    }

    return res.status(200).json(bancoDados[index]);
})

export default userRoute;