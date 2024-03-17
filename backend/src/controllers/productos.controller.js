const mysql = require('mysql');
const dbconfig = require('../config/db.config.js');
const multer = require('multer');
const path = require('path');
const { error } = require('console');



// Configuración de multer para imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     cb(null, 'drc/uploads/');
    },
filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
},

});
const upload = multer ({storage:storage});


// Crear conexión a la base de datos
const connection = mysql.createConnection({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.db,
});

// Obtener todos los productos 
exports.getProductos = (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
};

// Obtener un producto por ID
exports.getProductoById = (req, res) => {
    connection.query(
        'SELECT * FROM productos WHERE Id = ?',
        [req.params.id],
        (error, results) => {
            if (error) throw error;
            res.send(results[0]);
        }
    );
};

// Crear un nuevo producto
exports.createProducto = [
    upload.single('imagen'), // Middleware de multer para subir la imagen
    (req, res) => {
        const { nombre, descripcion, precio } = req.body;
        const imagen = req.file ? req.file.filename : null;
        connection.query(
            'INSERT INTO productos(nombre, descripcion, precio, imagen) VALUES (?,?,?,?)',
            [nombre, descripcion, precio, imagen],
            (error, results) => {
                if (error) throw error;
                res.send({ message: 'producto creado exitosamente' });
            }
        );
    },
];

// Actualizar producto por ID
exports.updateProducto = [
    upload.single('image'),
    (req, res) => {
        const { nombre, descripcion, precio } = req.body;
        const imagen = req.file ? req.file.filename : null;
        connection.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, imagen = ? WHERE id = ?',
            [nombre, descripcion, precio, imagen, req.params.id],
            (error, results) => {
                if (error) throw error;
                res.send({ message: 'producto actualizado exitosamente' });
            }
        );
    },
];

// Eliminar producto por ID 
exports.deleteProducto = (req, res) => {
    connection.query(
        'DELETE FROM productos WHERE id = ?',
        [req.params.id],
        (error, results) => {
            if (error) throw error;
            res.send({ message: 'producto eliminado exitosamente' });
        }
    );
};

