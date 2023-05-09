const { json } = require("express");
const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");

const app = express();


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_karyawan",
});

app.use(bodyParser.json());
app.use(cors());

connection.connect();


app.get("/api/data-karyawan", (req, res) => {
  connection.query(
    "SELECT * FROM tabel_karyawan",
    function (error, results, fields) {
      console.log(error)
      res.send(results);
    }
  );
});

app.post("/api/data-karyawan", (req, res) => {
  let dataInputan = {
    nama: req.body.nama,
    umur: req.body.umur,
    jenisKelamin: req.body.jenisKelamin,
    alamat: req.body.alamat,
   
  };

  connection.query(
    "INSERT INTO tabel_karyawan SET ?",
    dataInputan,
    (error, results, fields) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.delete("/api/data-karyawan/:nama", (req, res) => {
  connection.query(
    `DELETE FROM tabel_karyawan WHERE nama = '${req.params.nama}'`,
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.put("/api/data-karyawan/:nama", (req, res) => {

   
    let nama = req.body.nama;
    let umur= req.body.umur;
    let jenisKelamin= req.body.jenisKelamin;
    let alamat= req.body.alamat;



  connection.query(
    'UPDATE data_barang SET nama=? , umur=? , jenisKelamin =? , alamat =?',[nama,umur,jenisKelamin,alamat,nama],
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.listen(3004, () => {
  console.log("backend run.... http://localhost:3004");
});