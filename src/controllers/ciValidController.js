const ciController = {};

const database = require('../services/database');

ciController.postValidCi = async (req, res, next) => {
    res.json(await funDesicion(req.body));
}


async function funDesicion(body){
    //{"respuesta":["Jhonny","Zapata"]}
    /*
  "cedula": [
    {
      "id_cliente": 2,
      "p_nombre": "Fernando",
      "s_nombre": "Manuel",
      "p_apellido": "Paredes",
      "s_apellido": "Cepeda",
      "numero_cedula": 602887234,
      "telefono": 985365601,
      "correo": "fparedes19@gmail.com",
      "direccion": "Pomasqui - Barrio el Común",
      "id_telegram": null,
      "edad": 47
    }
  ]
}
*/
    const { input, bandera } = body;
    let type = bandera.toUpperCase();
    switch (type) {
        case "AUTENTIFICAR":  
            console.log(body);  
            let valCi = await validCi(input.toString());
            var resultado={"respuesta":[valCi[0].p_nombre,valCi[0].p_apellido]}
            return resultado;
        case "PRESTAMOS":   
            
            return {"respuesta":[{"label":"internet","value":{"input":{"text":"internet"}}},{"label":"chrome","value":{"input":{"text":"chrome"}}}]};
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
