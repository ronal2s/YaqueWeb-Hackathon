//Renys De La Cruz - 20160207
//Regis Báez       - 2014-0324
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

const { COLLECTIONS } = require("./utils/constants");
const { convertJSONtoNormalDate } = require("./utils/functions");


const data_articulos = [
  { codigoArticulo: "ART-01", descripcion: "Keyboard", balanceActual: 23, unidadCompra: "100" },
  { codigoArticulo: "ART-02", descripcion: "Mouse", balanceActual: 7, unidadCompra: "100" },
  { codigoArticulo: "ART-03", descripcion: "Monitor", balanceActual: 3, unidadCompra: "2500" },
  { codigoArticulo: "ART-04", descripcion: "Cable USB", balanceActual: 8, unidadCompra: "100" },
  { codigoArticulo: "ART-05", descripcion: "Cable HDMI", balanceActual: 19, unidadCompra: "100" },
  { codigoArticulo: "ART-06", descripcion: "Headphones", balanceActual: 11, unidadCompra: "800" },
  { codigoArticulo: "ART-07", descripcion: "Alcatel", balanceActual: 23, unidadCompra: "2500" },
]

const data_ventas = [
  { codigoArticulo: "ART-01", cantidad: 2, cliente: "Juan", fecha: "04/08/2020" },
  { codigoArticulo: "ART-01", cantidad: 1, cliente: "Pedro", fecha: "09/08/2020" },
  { codigoArticulo: "ART-01", cantidad: 3, cliente: "Miguel", fecha: "09/08/2020" },
  { codigoArticulo: "ART-01", cantidad: 7, cliente: "José", fecha: "04/08/2020" },
  { codigoArticulo: "ART-01", cantidad: 8, cliente: "Luis", fecha: "09/08/2020" },
  { codigoArticulo: "ART-01", cantidad: 10, cliente: "Santos", fecha: "09/08/2020" },
  { codigoArticulo: "ART-02", cantidad: 2, cliente: "Juan", fecha: "04/08/2020" },
  { codigoArticulo: "ART-02", cantidad: 4, cliente: "Pedro", fecha: "09/08/2020" },
  { codigoArticulo: "ART-02", cantidad: 8, cliente: "Miguel", fecha: "09/08/2020" },
  { codigoArticulo: "ART-02", cantidad: 12, cliente: "José", fecha: "04/08/2020" },
  { codigoArticulo: "ART-02", cantidad: 17, cliente: "Luis", fecha: "09/08/2020" },
  { codigoArticulo: "ART-02", cantidad: 13, cliente: "Santos", fecha: "09/08/2020" },
]



const data_articulo_suplidor = [
  { codigoArticulo: "ART-01", codigoSuplidor: "SUP-01", tiempoEntrega: 3, precioCompra: 50 },
  { codigoArticulo: "ART-01", codigoSuplidor: "SUP-02", tiempoEntrega: 1, precioCompra: 85 },
  { codigoArticulo: "ART-01", codigoSuplidor: "SUP-03", tiempoEntrega: 5, precioCompra: 50 },
  { codigoArticulo: "ART-02", codigoSuplidor: "SUP-01", tiempoEntrega: 3, precioCompra: 50 },
  { codigoArticulo: "ART-02", codigoSuplidor: "SUP-02", tiempoEntrega: 1, precioCompra: 85 },
  { codigoArticulo: "ART-02", codigoSuplidor: "SUP-03", tiempoEntrega: 5, precioCompra: 50 },
  { codigoArticulo: "ART-03", codigoSuplidor: "SUP-01", tiempoEntrega: 3, precioCompra: 2100 },
  { codigoArticulo: "ART-03", codigoSuplidor: "SUP-02", tiempoEntrega: 1, precioCompra: 2400 },
  { codigoArticulo: "ART-03", codigoSuplidor: "SUP-03", tiempoEntrega: 5, precioCompra: 1700 },
  { codigoArticulo: "ART-04", codigoSuplidor: "SUP-01", tiempoEntrega: 3, precioCompra: 50 },
  { codigoArticulo: "ART-04", codigoSuplidor: "SUP-02", tiempoEntrega: 1, precioCompra: 85 },
  { codigoArticulo: "ART-04", codigoSuplidor: "SUP-03", tiempoEntrega: 5, precioCompra: 50 },
  { codigoArticulo: "ART-05", codigoSuplidor: "SUP-01", tiempoEntrega: 3, precioCompra: 50 },
  { codigoArticulo: "ART-05", codigoSuplidor: "SUP-02", tiempoEntrega: 1, precioCompra: 85 },
  { codigoArticulo: "ART-05", codigoSuplidor: "SUP-03", tiempoEntrega: 5, precioCompra: 50 },
  { codigoArticulo: "ART-06", codigoSuplidor: "SUP-01", tiempoEntrega: 3, precioCompra: 700 },
  { codigoArticulo: "ART-06", codigoSuplidor: "SUP-02", tiempoEntrega: 1, precioCompra: 750 },
  { codigoArticulo: "ART-06", codigoSuplidor: "SUP-03", tiempoEntrega: 5, precioCompra: 600 },
  { codigoArticulo: "ART-07", codigoSuplidor: "SUP-01", tiempoEntrega: 3, precioCompra: 2200 },
  { codigoArticulo: "ART-07", codigoSuplidor: "SUP-02", tiempoEntrega: 1, precioCompra: 2400 },
  { codigoArticulo: "ART-07", codigoSuplidor: "SUP-03", tiempoEntrega: 5, precioCompra: 1800 },
]


MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("test");

  deleteCollection(COLLECTIONS.ARTICULOS, dbo);
  deleteCollection(COLLECTIONS.ARTICULOS_SUPLIDOR, dbo);
  deleteCollection(COLLECTIONS.VENTAS, dbo);
  deleteCollection(COLLECTIONS.ORDENES, dbo);

  createCollection(COLLECTIONS.ORDENES, dbo);
  createCollection(COLLECTIONS.VENTAS, dbo);
  createCollection(COLLECTIONS.ARTICULOS, dbo);
  createCollection(COLLECTIONS.ARTICULOS_SUPLIDOR, dbo);

  putData(COLLECTIONS.ARTICULOS, dbo, data_articulos);
  putData(COLLECTIONS.ARTICULOS_SUPLIDOR, dbo, data_articulo_suplidor);
  // putData(COLLECTIONS.VENTAS, dbo, data_ventas);

  app.get("/inventario", (req, res) => {
    getData(COLLECTIONS.ARTICULOS, dbo, (result) => res.send(result));
  });

  app.get("/suplidor", (req, res) => {
    getData(COLLECTIONS.ARTICULOS_SUPLIDOR, dbo, (result) => res.send(result));
  });

  app.get("/consumos", (req, res) => {
    getConsumos(dbo, (result) => {
      res.send(result);
    })
  })

  app.get("/ventas", (req, res) => {
    getData(COLLECTIONS.VENTAS, dbo, (result) => {
      res.send(result)
    })
  })

  app.get("/ventas/nueva", (req, res) => {
    const { cliente, articulo, cantidad, fecha } = req.query;
    console.log("Query: ", req.query)
    getData(COLLECTIONS.VENTAS, dbo, (result) => {
      const obj = { name: "codigoArticulo", value: articulo }
      getSingleItem(COLLECTIONS.ARTICULOS, dbo, obj, (result) => {
        if (parseInt(cantidad) < result.balanceActual) {
          const obj = { id: result._id, value: { balanceActual: result.balanceActual - 1 } };
          updateItem(COLLECTIONS.ARTICULOS, dbo, obj, (result) => {
            const obj = { codigoArticulo: articulo, cantidad: parseInt(cantidad), cliente, fecha }
            putData(COLLECTIONS.VENTAS, dbo, obj, (result) => {
              res.send({ error: false, msg: "Venta realizada", ...result })
            })
          })
        } else {
          res.send({ error: true, msg: `La cantidad es mayor al balance disponible: ${result.balanceActual}` })
        }
      })
    })
  });

  app.get("/ordenes", (req, res) => {
    getData(COLLECTIONS.ORDENES, dbo, (result) => {
      res.send(result);
    })
  })

  app.get("/ordenes/nueva", (req, res) => {
    const { fecha, articulo, incluirConsumoDiario, cantidad } = req.query;
    console.log(req.query)
    dbo.collection(COLLECTIONS.ARTICULOS_SUPLIDOR).find({ codigoArticulo: articulo }).toArray()
      .then(result => {
        // console.log(result)
        let fechaRequest = convertJSONtoNormalDate(new Date(fecha).toJSON());
        // fechaRequest = convertJSONtoNormalDate(fechaRequest.toJSON());
        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          let fechaFutura = new Date().setDate(new Date().getDate() + element.tiempoEntrega)
          fechaFutura = convertJSONtoNormalDate(new Date(fechaFutura).toJSON())
          console.log(fechaRequest, fechaFutura)
          if (fechaRequest == fechaFutura) {
            console.log("Suplidor disponible: ", element)
            if (incluirConsumoDiario == 'true') {
              getConsumos(dbo, (consumos) => {
                for (let j = 0; j < consumos.length; j++) {
                  const consumo = consumos[j];
                  if (consumo._id == articulo) {
                    const requestData = {
                      codigoArticulo: element.codigoArticulo,
                      codigoSuplidor: element.codigoSuplidor,
                      tiempoEntrega: element.tiempoEntrega,
                      precioCompra: element.precioCompra,
                      fechaEstimada: fechaFutura,
                      cantidad: parseInt(cantidad) + Math.round(consumo.avgQuantity)
                    }
                    putData(COLLECTIONS.ORDENES, dbo, requestData, (result) => {
                      res.send({ error: false, msg: "Orden realizada" });
                    });
                  }
                }
              })
            }
            else {
              const requestData = {
                codigoArticulo: element.codigoArticulo,
                codigoSuplidor: element.codigoSuplidor,
                tiempoEntrega: element.tiempoEntrega,
                precioCompra: element.precioCompra,
                fechaEstimada: fechaFutura,
                cantidad
              }
              putData(COLLECTIONS.ORDENES, dbo, requestData, (result) => {
                res.send({ error: false, msg: "Orden realizada" });
              });
            }
            break;
          } else {
            res.send({ error: true, msg: "No hay suplidor disponible para esa fecha" });
            break;
          }
        }
      })
  });
})


const getConsumos = (dbo, callback) => {
  dbo.collection(COLLECTIONS.VENTAS).aggregate([
    { $group: { _id: "$codigoArticulo", avgQuantity: { $avg: "$cantidad" }, } },
  ]).toArray()
    .then(result => {
      callback(result);
    })
    .catch(error => console.error(error))
}


const putData = (nameCollection, dbo, obj, callback) => {
  const typeInsert = Array.isArray(obj) ? "insertMany" : "insertOne";
  dbo.collection(nameCollection)[typeInsert](obj, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Data pushed");
      if (callback) callback(result);
    }
  })
}

const getSingleItem = (nameCollection, dbo, obj, callback) => {
  console.log(obj)
  dbo.collection(nameCollection).find({ [obj.name]: obj.value }).toArray((error, result) => {
    if (error) throw error;
    // console.log(`${nameCollection} results: `, result);
    if (callback) callback(result[0]);
  })
}

const getData = (nameCollection, dbo, callback) => {
  dbo.collection(nameCollection).find().toArray((error, result) => {
    if (error) throw error;
    // console.log(`${nameCollection} results: `, result);
    if (callback) callback(result);
  })
}

const updateItem = (nameCollection, dbo, obj, callback) => {
  dbo.collection(nameCollection).update({ _id: obj.id }, { $set: { ...obj.value } })
    .then(result => {
      callback(result)
    })
    .catch(error => console.error(error))
}


const createCollection = (nameCollection, dbo, callback) => {
  if (!(dbo.collection(nameCollection).countDocuments() > 0)) {
    dbo.createCollection(nameCollection, (err, res) => {
      if (err) throw err;
      // console.log(`Collection ${nameCollection} created!`);
      if (callback) callback();
    })
  }
}


const deleteCollection = (nameCollection, dbo, callback) => {
  dbo.collection(nameCollection).remove()
    .then(result => { if (callback) callback(result); })
    .catch(error => console.error(error));
}

app.get("/", (req, res) => {
  res.render("index");
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => {
  console.log("Server is running");
});