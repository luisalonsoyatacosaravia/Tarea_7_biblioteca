//Acceso a la BD
const db = require('../config/db')

//Método exportados
//req require (solicutud)
//res response (respuesta)

//CREAR 
exports.crearLibros = async (req, res) => {
  console.log('Ejecutastes POST')
}

//LISTAR
exports.obtenerLibros = async (req, res) => {
  const sql = "SELECT id, titulo, autor, numpaginas, categoria FROM libros"

  try{
    //Deserialización
    const [libros] = await db.query(sql)
    res.status(200).json(libros)
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

//Buscar por ID

//Actualizar

//Eliminar