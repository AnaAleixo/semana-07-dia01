import { Schema, model } from "mongoose"

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minLength:2,
        maxLength: 20,
        lowercase:true,

    },
    age: {
        type: Namber,
        min: 18,
        max: 100,
    
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        match:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },

    role: {
        type:String,
        enum:["professora", "aluno","ta"],
        default:"aluno",
    },
    ative:{
        type: Boolean,
        default: true,
    },
    tasks: [{type: String}],
    birth:{type: Date},
   },

   {
    timestamps:true,
   }
);

const UserModel = model("user", userSchema)

export  default UserModel
