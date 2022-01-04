const { Router } = require('express');
const { lugaresGet } = require('../controllers/lugares');

const router = Router();

router.get('/',lugaresGet);

module.exports = router