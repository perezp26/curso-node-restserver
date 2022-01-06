const { request, response } = require("express");


const esAdminRol = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        })
    }

    const { nombre, rol } = req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `${nombre} no es administrador y no puede realizar esta acción`
        })
    }

    next();
}

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}