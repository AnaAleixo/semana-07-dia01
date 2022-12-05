// Arquivo principal
import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import {uuid} from 'uuidv4';
import userRoute from "./routes/user.routes.js";
import taskRoute from './routes/task.routes.js';

//habilitar o servidor a ter variaveis de ambientes
dotenv.config();

//instanciar a variável que vai ficar responsável pelo nosso servidor -> app
const app = express ();

//configurar o servidor para aceitar, enviar e receber arquivo em JSON
app.use(express.json());

//conectando com o banco de dados
connect();
app.use("/user", userRoute);

app.use("/task", taskRoute);



/* Resumão da Aula
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

// NOVO BANCO DE DADOS- PROJETO 03
const bancoDadosCat =[
    {
        id:"6dd37b20-5eff-4c99-bfb9-5280866c55ec",
        processo: "0000100-33.2022.0.00.7000",
        nome: "Acessibilidade",
        data: "DEZ/2020",
        unidade: "PE-SOF",
        usuario: "Ana.lima",
        descrição: [
            "Publicação do documento (Extrato) no veículo Diário Oficial Eletrônico", 
            "Administrativo da 5ª Região Nº 210.0 de 09/11/2022 (Data de Disponibilização)."
        ]
    },
    

    {
        id: "fe82c49a-3534-4437-93bd-ec76a4e53d72",
        processo: "0000100-32.2022.0.00.7000",
        nome: "Acessibilidade",
        data: "DEZ/2020",
        unidade: "PE-SOF",
        usuario: "Ana.lima",
        descrição: [
            "Processo remetido pela unidade PE-SOF" 
            ]
    },

    {
        id:"f0ebbdcd-79cc-4fda-920a-a483c981662e",
        processo: "0000100-30.2022.0.00.7000",
        nome: "Acessibilidade",
        data: "DEZ/2020",
        unidade: "PE-SOF",
        usuario: "Ana.lima",
        descrição: [
            "Processo remetido pela unidade PE-SAPE" 
            ]
    }
        
    
]


//CRIAÇÃO DE ROTAS
    app.get("/enap", (req, res) =>{
        //req- request - requisição do cliente, é o que o cliente manda para o servidor
        //res- response- é a resposta para o cliente

        const bemVindo = "Bem vindo ao servidor da ENAP turma 92 - Ironhack"

        return res.status(200).json(bemVindo)

    });
*/
    //ATIVIDADE : CRIAR ROTA QUE RETORNE O BANCO DE DADOS - > ROTA - > "/all-users" verbo:GET

    app.get("/all-users", (req, res) => {

        const users = bancoDados

        return res.status(200).json(users)

    })
// OUTRA ATIVIDADE: CRIAR ROTA QUE RETORNE O BANCO DE DADOS -> ROTA -> "/cat-users" verbo:GET

app.get("/cat-users", (req, res) =>{

    const users = bancoDadosCat

    return res.status(200).json(users)
}
)

// POST - Creat
app.post("/new-user", (req, res) => {
//console.log(req.body) -> é o corpo da minha requisição(json)
//console.log(req.body.name)-> é apenas o nome

    const form = req.body;

    bancoDados.push(form);

    return res.status(201).json(bancoDados);
})

// TREINANDO POST - Creat
app.post("new-user",(req, res) => {

    const form = req.body;

    bancoDadosCat.push(form);

    return res.status(202).jason(bancoDadosCat);
})

//DELETE - delete a user
app.delete("/delete/:id", (req, res) => {
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
app.put("/edit/:id", (req, res) => {

    const { id }= req.params;
    const editUser = bancoDados.find((user) => user.id === id)


     const index = bancoDados.indexOf(editUser) //0

    bancoDados[index] = {
        ...editUser,
        ...req.body
    }

    return res.status(200).json(bancoDados[index]);
}) 


// o servidor supindo para o ar
/*app.listen(27017, () => {
    console.log("App up and running on port http://localhost:8080");*/

// o servidor supindo para o ar
app.listen(process.env.PORT, () => {
    console.log(
        `App up and running on port http://localhost:${process.env.PORT}`
    );
});
