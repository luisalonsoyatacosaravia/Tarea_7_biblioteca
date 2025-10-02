//Acceso a la BD
const db = require('../config/db')

//Método exportados
//req require (solicutud)
//res response (respuesta)

//CREAR 
exports.crearLibros = async (req, res) => {
  const {titulo, autor, numpaginas, categoria} = req.body

  //2.Validación backend
  if(!titulo || !autor || !numpaginas || !categoria){
    return res.status(400).json({mensaje: 'Falta completar los campos'})
  }

  //3. Estructura la consulta
  const sql = "INSERT INTO libros (titulo, autor, numpaginas, categoria) VALUES(?,?,?,?)"
  
    //Transacción
  try{
  //5. Ejecutamos consulta
    const [result] = await db.query(sql, [titulo, autor, numpaginas, categoria])
    //6. Entregar un resultado (PK)
    
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Registrado correctamente'
    })

  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
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
exports.obtenerLibroPorId = async (req, res) => {
  //1.Obteniendo el ID desde la URL
  //.params => http://miweb.com/api/modulo/7
  const { id } = req.params


  //Preparar consulta
  const sql = "SELECT id, titulo, autor, numpaginas, categoria  FROM libros WHERE id = ?"

  //3. Transaccón
  try{
    //4.Deserialización - PRIMER VALOR DEL ARREGLO
    const [libros] = await db.query(sql, [id])

    //5.Validacion
    //No encontramos el producto con el ID enviado
    if(libros.length == 0){
      //Cuando se ejecuta "return" se FINALIZA el metodo
      return res.status(404).json({mensaje: 'No encontramos el producto'})
    }
    //6. Enviamos los resultados
    res.status(200).json(libros[0])
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

//Actualizar
exports.actualizarLibro = async (req, res) => {
  //Necesitamos un parametro
  const { id } = req.params
  
  //leer un JSON body
  const { titulo, autor, numpaginas, categoria } = req.body

  //Validación => ES OBLIGATORIO QUE ALMENOS UNO TENGA DATOS
 if (!titulo && !autor && !numpaginas && !categoria) {
    return res.status(400).json({mensaje: 'Falta completar los campos'})
  }

  //Algoritmo eficiente de actualizción
  //NO SE HARÁ => UPDATE productos SET descripción = ?, garantia = ?, precio = ? WHERE id = ?
  //SE DESARROLLARÁ => UPDATE productos SET precio = ? WHERE id = ?
  let sqlParts = [] //campos que sufrirá actualización
  let values = [] //valores de los campos

  if (titulo){
    sqlParts.push('titulo = ?')
    values.push(titulo)
  }
  if (autor){
      sqlParts.push('autor = ?')
      values.push(autor)
  }
  if(numpaginas){
      sqlParts.push('numpaginas = ?')
      values.push(numpaginas)
  }
  if(categoria){
      sqlParts.push('categoria = ?')
      values.push(categoria)
  }
  if(sqlParts.length == 0){
  
    return res.status(400).json({mensaje: 'No hay datos por actualizar'})
  }

  //Construir de manera dinámica la consulta
  values.push(id)
  const sql = `UPDATE libros SET ${sqlParts.join(', ')} WHERE id = ?`
  
  try{
    const [result] = await db.query(sql, values)

    if (result.affectedRows === 0){
    return res.status(404).json({mensaje: 'No encontramos el libro con el ID'})
  }
  res.status(200).json({mensaje: 'Actualizado correctamente'})
}
  catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno en el servidor'})
  }

}

//Eliminar
exports.eliminarLibro = async (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM libros WHERE id = ?" //CUIDADO! DELETE ES IRRESVERSIBLE
  try{
    const [result] = await db.query(sql, [id])

    if(result.affectedRows === 0){
      return res.satatus(404).json({mensaje: 'Libro no encotrado para eliminar'})
    }

    res.status(200).json({mensaje: 'Eliminado correctamente'})
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}