//console.log("Hola mundo desde NodeJS")

const express = require('express');
const mongoose = require('mongoose');
const RegistroSchema = require("./modelos/Registro.js");

const app = express();
const router = express.Router();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Conexion a base de datos
mongoose.connect("mongodb+srv://prueba:prueba@prueba.zjj2o.mongodb.net/RetoSemana1BD?retryWrites=true&w=majority");

//Operaciones CRUD
router.get('/', (req,res) => {
    res.send("El inicio de mi API")
})

router.get('/registro', (req, res) => {
    RegistroSchema.find(function(err, datos){
        if(err){
            console.log("Error leyendo los registros");
        }else{
            res.send(datos);
        }
    })
});

router.post('/registro', (req,res) => {
    let nuevoRegistro = new RegistroSchema({
        idRegistro: req.body.id,
        tipoDocumentoRegistro: req.body.tipoDocumento,
        numeroDocumentoRegistro: req.body.numeroDocumento,
        nombresRegistro: req.body.nombres,
        apellidosRegistro: req.body.apellidos,
        direccionRegistro: req.body.direccion,
        emailRegistro: req.body.email,
        telefonoFijoRegistro: req.body.telefonoFijo,
        telefonoCelularRegistro: req.body.telefonoCelular,
        enlaceSitioWebRegistro: req.body.enlaceSitioWeb,
        descripcionPerfilRegistro: req.body.descripcionPerfil
    });

    nuevoRegistro.save(function(err, datos){
        if(err){
            console.log(err);
        }
        res.send("Registro almacenado correctamente.")
    })
});

app.use(router);
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
});