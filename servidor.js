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



//put para actualizar informacion
router.put("/ActualizaPersona", (req, res) => {
    RegistroSchema.findOneAndUpdate(
        { numeroDocumentoRegistro: req.body.numeroDocumento },
        {
            $set: {
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
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Persona Actualizada') })
        .catch(error => console.error(error))
});

//delete Borra informacion
router.delete("/BorraPersona", (req, res) => {
    RegistroSchema.deleteOne(
        { numeroDocumentoRegistro: req.body.numeroDocumento }
    )
        .then(result => {
            res.json('Persona borrada Satisfactoriamente')
        })
        .catch(error => console.error(error))
});


/*router.put('/id', (req,res) => {
    let actualizarRegistro = new RegistroSchema({
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

    actualizarRegistro.save(function(err, datos){
        if(err){
            console.log(err);
        }
        res.send("Registro actualizado correctamente.")
    })
});

router.delete('/id', (req,res) => {
    let eliminarRegistro = new RegistroSchema({
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

    eliminarRegistro.save(function(err, datos){
        if(err){
            console.log(err);
        }
        res.send("Registro eliminado correctamente.")
    })
});*/

app.use(router);
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
});