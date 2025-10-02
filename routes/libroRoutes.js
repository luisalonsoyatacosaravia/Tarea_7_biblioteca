//RUTAS = acceso a los recursos
//Verbos:
//GET - Obtener, PUT = Actualizar, POST = crear, DELETE = eliminar
const express = require('express')

//Enrutador
const router = express.Router()

//Acceso = Crear, Listar, etc...
const libroController = require('../controllers/libroController')

//Definiendo las rutas
router.post('/', libroController.crearLibros)

router.get('/', libroController.obtenerLibros)

router.get('/:id', libroController.obtenerLibroPorId)

router.put('/:id', libroController.actualizarLibro)

router.delete('/:id', libroController.eliminarLibro)


module.exports = router