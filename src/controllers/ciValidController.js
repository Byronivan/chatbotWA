const ciController = {};

const database = require('../services/database');

ciController.postValidCi = async (req, res, next) => {
    res.json(await funDesicion(req.body));
}


async function funDesicion(body){
    //{"respuesta":["Jhonny","Zapata"]}

    const { input, bandera } = body;
    let type = bandera.toUpperCase();
    switch (type) {
        case "AUTENTIFICAR":
            let valCi = await validCi(input);
            return {"respuesta":["Jhonny","Zapata"]};
        case "LISTA_CATEGORIAS":
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
