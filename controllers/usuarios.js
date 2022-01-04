const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const {apikey = "no key"} = req.query;

    res.json({
        ok: true,
        msg: 'get API - controller',
        apikey
    })
}

const usuariosPost = (req = request, res = response) => {

    const {nombre, edad} = req.body;

    res.status(201).json({
        ok: true,
        msg: 'post API - controller',
        nombre,
        edad
    })
}

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id;
    const {apikey = "no key"} = req.query;

    res.json({
        ok: true,
        msg: 'put API - controller',
        id,
        apikey
    })
}


const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controller '
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}