const { Router } = require('express');
const router = Router();
const User = require('../models/User')
const Contador = require('../models/Contador')
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('../controllers/verifyToken');

router.post('/signUp', async (req, res, next) =>{
    const { user, email, password  } = req.body;
    
    const usuario = new User({
        user,
        email,
        password
    })
    usuario.password = await usuario.encryptPassword(usuario.password)
    await usuario.save();

    const token = jwt.sign({id: usuario._id}, config.secret)

    res.json({auth: true, token})
})


router.post('/signIn', async (req, res, next) =>{
    const {email, password} = req.body;
    console.log(email, password)
    const user = await User.findOne({email: email});

    if(!user){
        return res.status(404).send("The email doesn't exist");
    }

    const passValid = await user.validatePassword(password);
    console.log(passValid)
    if(!passValid){
        res.status(401).json({auth:false, token: null})
    }

    const token = jwt.sign({id: user._id}, config.secret)

    res.json({auth: true, token})
})


router.post('/consumo', /*verifyToken,*/async (req, res, next) =>{
    /*
    const user = await User.findById(req.userId, {password:0})
    if(!user){
        return res.status(404).send('No user found');
    }
    const caso = req.body.texto;
    const fecha=Date.now();

    const contador= new Contador({
        caso,
        fecha
    })

    await contador.save();

    
    res.json(user);
    */
   let fecha = Date(Date.now())
   res.json(fecha)
})

module.exports = router;