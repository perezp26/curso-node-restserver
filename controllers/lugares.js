const { response } = require('express');

const lugaresGet = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'get API - controllerLugares'
    })
}

module.exports = {
    lugaresGet
}