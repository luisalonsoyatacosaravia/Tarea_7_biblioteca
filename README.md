# Procedimientos 💻
1. Restaurar la BD
```sql
CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE libros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    numpaginas INT,
    categoria VARCHAR(100)
);
```
2. Abrir proyecto _libro_ en VSCode 👨‍💻

3. Intalación de Dependencias
```
npm install
```

4. Iniciar el servidor
Iniciar el Servidor

5. Metodo
POST	/api/libros	crearLibros	
```
Crea un nuevo libro. Requiere titulo, autor, numpaginas, y categoria en el body.
```
6. GET   /api/libros	obtenerLibros
```
Listado General: Recupera y devuelve la lista completa de todos los libros.
```
7. PUT	/api/libros/:id	actualizarLibro
```
Actualiza uno o más campos de un libro por su id. Utiliza lógica dinámica (solo actualiza los campos enviados en el body).
```
8. DELETE	/api/libros/:id	eliminarLibro
```
Elimina un libro específico por su id.