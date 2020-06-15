const ciController = {};

const database = require('../services/database');

ciController.postValidCi = async (req, res, next) => {
    const { valor, tipo } = req.body;
    
    let type = tipo.toUpperCase();
    console.log(type);
    switch (type) {
        case "AUTENTIFICACION":
            let valCi = await validCi(valor);
            console.log(valCi)
            res.json({cedula:valCi})
            return valCi;
        case "LISTA_CATEGORIAS":
            res.json({valor:"funciona 2"})
            return "funcion 2";
        default:
            break;
    }

}

ciController.getHello = async (req,res,next) =>{
    res.json({hello:"hello world"})
}

async function validCi(cedula) {
    let resultado = await database.consultarCliente(cedula);
    return resultado
}

module.exports = ciController;
