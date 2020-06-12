const ciController={};

const database = require('../services/database');

ciController.postValidCi = async (req, res, next) => {
    const { cedula } = req.body;
    let resultado = await database.consultarCliente(cedula);

    res.json({cliente: resultado})

}

module.exports=ciController;
