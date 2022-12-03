// Arquivo principal
import express from "express"
import * as dotenv from "dotenv"

//habilitar o servidor a ter variaveis de ambientes
dotenv.config()

//instanciar a variável que vai ficar responsável pelo nosso servidor -> app
const app = express ()

//configurar o servidor para aceitar, enviar e receber arquivo em json
app.use(express.json());


//CRIAÇÃO DE ROTAS
    app.get("/enap", (req, res) =>{
        //req- request - requisição do cliente, é o que o cliente manda para o servidor
        //res- response- é a resposta para o cliente

        const bemVindo = "Bem vindo ao servidor da ENAP turma 92 - Ironhack"

        return res.status(200).json(bemVindo)

    });


// o servidor supindo para o ar
app.listen(process.env.PORT, () => {
    console.log(
        `App up and running on port http://localhost:${process.env.PORT}`
    );
});

