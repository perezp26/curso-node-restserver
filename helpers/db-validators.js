const Rol = require('../models/rol')
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no es un rol valido en la base de datos`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${ correo } ya existe !!!`);
    }
}

const idExisteUsuario = async(id = '') => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El id ${ id } no existe !!!`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    idExisteUsuario
}