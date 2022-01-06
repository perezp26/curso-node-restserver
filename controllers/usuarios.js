const { response, request } = require('express');
//const bcryptjs = require('bcryptjs');

const passEncrypt = require('../helpers/encrypt-pass');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    //const query = { $or: [{ estado: true }, { google: true }] };
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req = request, res = response) => {

    const { google, ...resto } = req.body;
    const usuario = new Usuario(resto);

    //encriptar la contraseña
    // const salt = bcryptjs.genSaltSync();
    // usuario.password = bcryptjs.hashSync(resto.password, salt);
    usuario.password = passEncrypt(resto.password);

    await usuario.save();

    res.status(201).json({
        usuario
    })
}

const usuariosPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO VALIDA CONTRA BD
    if (password) {
        resto.password = passEncrypt(resto.password);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}


const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controller '
    })
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    //borrado fisico
    ////const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}