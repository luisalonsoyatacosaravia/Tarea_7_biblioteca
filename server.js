const express = require('express')
const librosRoutes = require('./routes/libroRoutes')

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

//Comunicación se realizará JSON
app.use(express.json())

//Rutas
app.use('/api/libros', librosRoutes)

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado http://localhost:${PORT}`)
})