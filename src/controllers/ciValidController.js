const ciController={};

const database = require('../services/database');

ciController.postValidCi = async (req, res, next) => {
    const { cedula } = req.body;
    let resultado = await database.consultarCliente(cedula);

    res.json({cliente: resultado})

}

ciController.getHello = async (req, res, next) => {
    res.json({hello:"hello world"})
}

module.exports=ciController;
