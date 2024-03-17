//server.js
const express  = require('express');
const app = express();
const productosRoutes = require('./routes/productos.routes');

//middelweares
app.use(express.json());
app.use('/uploads', express.static('uploads')); // servor archivos estaticos desde la carpeta 'uploads'



//Rutas
app.use('/api', productosRoutes);

//iniciar sevidor

const PORT = 3000;
app.listen(PORT , () => {
    console.log(`Servordor corriendo en http://localhost:${PORT}`);
})