// Arquivo principal
import express from "express";
import * as dotenv from "dotenv";

//habilitar o servidor a ter variaveis de ambientes
dotenv.config();

//instanciar a variável que vai ficar responsável pelo nosso servidor -> app
const app = express ();

//configurar o servidor para aceitar, enviar e receber arquivo em json
app.use(express.json());

//Banco de Dados
const bancoDados = [
    {
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
        Processo: "0000100-33.2022.0.00.7000",
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
        Processo: "0000100-32.2022.0.00.7000",
        nome: "Acessibilidade",
        data: "DEZ/2020",
        unidade: "PE-SOF",
        usuario: "Ana.lima",
        descrição: [
            "Processo remetido pela unidade PE-SOF" 
            ]
    },

    {
        Processo: "0000100-30.2022.0.00.7000",
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

// o servidor supindo para o ar
app.listen(27017, () => {
    console.log("App up and running on port http://localhost:8080");

app.listen(process.env.PORT, () => {
    console.log(
        `App up and running on port http://localhost:${process.env.PORT}`
    );
});
});