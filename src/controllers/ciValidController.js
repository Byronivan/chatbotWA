const ciController = {};
var moment= require("moment");
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
    console.log(body);  
    const { input, bandera,fecha } = body;
    //input convertir a string
    let type = bandera.toUpperCase();
    let value = input;
    
    switch (type) {
        case "AUTENTIFICAR":  
        value = input.toString();
        if (value.length == 9) {
            value = "0"+value;
        }
            let valCi = await database.consultas.consultarCliente(value);
            var resultado=null       
                 
            if(valCi!="Cedula Incorrecta" && valCi.length!=0 ){
                resultado={"respuesta":[valCi[0].p_nombre,valCi[0].p_apellido]};
            }else{
                resultado={"respuesta":[valCi]};
            }
            if(valCi=="No tiene Deuda"){
                resultado={"respuesta":["No tiene deuda"]};
            }
            return resultado;
        case "PRESTAMOS":   
            value = input.toString();
            if (value.length == 9) {
                value = "0"+value;
            }
            return await database.consultas.consultarPrestamo(value);
        case "DIASMORA":
              /**
               * Interes por mora
               * valor=  Monto*tasaMora/30 dias comerciales
               * total=valor*diasRetraso
               */
              var mora=value;
              var dias=diasMora(mora.value.fechaPago,fecha); 
              var valor=(mora.value.tasaMora*mora.value.valorCuota)/30;//dias comerciales
              var interesMora=(valor*dias);
              var total=interesMora+mora.value.valorCuota;
              mora.value.fechaPromesa=fecha;
              mora.value.interesMora=interesMora;
              mora.value.dias=dias;
              mora.value.interesValorCuota=total;
            return {"respuesta":mora};
        default:
            break;
    }
}

ciController.getHello = async (req,res,next) =>{
    res.json({hello:"hello world"})
}


function diasMora(fechaI,fechaF){
    var fechaInicio = new Date(fechaI).getTime();
    var fechaFin    = new Date(fechaF).getTime();
    var diff = fechaFin - fechaInicio;
    return diff/(1000*60*60*24); 
}
module.exports = ciController;
