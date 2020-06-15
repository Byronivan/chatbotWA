var configV = require('../credentials/credentialsApis')
var sql = require("mssql");
var validCi = require('../services/validarCedula');

// config for your database
var config = {
    user: configV.sqlServer.user,
    password: configV.sqlServer.password,
    server: configV.sqlServer.ipserver,
    database: configV.sqlServer.database,
    port:1434,
    options: {
        enableArithAbort: true,
        encrypt: false
    }
};

async function consultarCliente(cedula) {
    //conectarse a sql
    let cliente;

    try {
        let cedulaValida = validCi.validarCedula(cedula)
        if (cedulaValida == "Cedula Correcta") {
            await sql.connect(config)
            const result = await sql.query`Select *from clientes where numero_cedula=${cedula}`
            cliente = result;
            if(result.recordset.length==0){
                return "No tiene Deuda";
            }
            return cliente.recordset;
        } else {
            return cedulaValida;
        }
    } catch (err) {
        return err
    }

}

module.exports.consultarCliente = consultarCliente;