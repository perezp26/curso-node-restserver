const { response, request } = require('express')

const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken')

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(400).json({
            msg: 'No hay token para la petición '
        })

    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no encontrado en la DB'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con edo false'
            })
        }


        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}