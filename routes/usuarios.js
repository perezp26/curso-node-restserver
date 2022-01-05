const { Router } = require('express');
const { check } = require('express-validator');
const { validarcampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, idExisteUsuario } = require('../helpers/db-validators');

const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost, usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExisteUsuario),
    check('rol').custom(esRolValido),
    validarcampos
], usuariosPut)

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe ser mayor de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(esRolValido), // .custom( (rol) => esRolValido(rol)) -->cuando se tiene una funcion o un callback cuyo primer argumento es el mismo argumento que estamos recibiendo se puede obviar 
    validarcampos
], usuariosPost)

router.patch('/', usuariosPatch)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExisteUsuario),
    validarcampos
], usuariosDelete)

module.exports = router;