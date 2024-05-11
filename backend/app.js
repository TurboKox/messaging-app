require('dotenv').config()

const nano = require('nano')(`http://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@127.0.0.1:5984`)
const colors = require('colors')
const bodyParser = require('body-parser')

const express = require('express')
const cors = require('cors')

const DB_NAME = 'messagingapp'
const PORT = 5555
const app = express()

app.use(cors())
app.use(bodyParser.json())

const DB = nano.use(DB_NAME)

// Etap II

const multer = require('multer')
const jwt = require('jsonwebtoken')
const argon = require('argon2')

const UPLOAD_FOLDER = 'uploads'
const JWT_SEKRET = 'sekret'

const IUser = require('./user.interface')

app.use(`/${UPLOAD_FOLDER}`, express.static(`${UPLOAD_FOLDER}`))

const ustawieniaZapisu = multer.diskStorage({
  destination: function (req, file, fz) {
    fz(null, UPLOAD_FOLDER)
  },
  filename: function(req, file, fz) {
    fz(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({
  storage: ustawieniaZapisu,
  dest: `${UPLOAD_FOLDER}/`,
  fileFilter: (req, file, fz) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      fz(null, true)
    } else {
      fz(new MediaError('Nieprawidłowy format pliku'))
    }
  }
})

//

app.get('/api/v1/konwersacja', (req, res) => {
  DB.list({include_docs: true}, (error, dane) => {
    if(error) {
      res.status(500).json({error: `Internal Server Error: ${error.message}`})
      return
    }

    const wszystkieDokumenty = dane.rows.map(wiersz => wiersz.doc)
    res.status(200).json(wszystkieDokumenty)
  })
})

app.post('/api/v1/dodaj', upload.single("zdjecie"), (req, res) => {
  const zdjecie = req.file

  console.log(zdjecie.filename);

  const dokument = {
    tresc_wiadomosci: req.body.tresc_wiadomosci,
    data_wyslania_wiadomosci: req.body.data_wyslania_wiadomosci,
    status_wiadomosci: "wysłana",
    status_dostepnosci: "niedostępny",
    nazwa_uzytkownika: req.body.nazwa_uzytkownika,
    zdjecie: zdjecie.filename
}
DB.insert(dokument, (err, body) => {
  if(err) {
    res.status(500).json({error: `Internal Server Error: ${err.message}`})
    return
  }
  
  console.log(`Dodano wiadomosc`.green)
  res.status(200).json({message: 'Dokument dodany'})
  })
})

app.patch(`/api/v1/edytuj`, (req, res) => {
  const dokument = {
    _id: req.body._id,
    _rev: req.body._rev,
    tresc_wiadomosci: req.body.tresc_wiadomosci,
    data_wyslania_wiadomosci: req.body.data_wyslania_wiadomosci,
    status_wiadomosci: "wysłana",
    status_dostepnosci: "niedostępny",
    nazwa_uzytkownika: req.body.nazwa_uzytkownika
  }
  DB.insert(dokument, (err, body) => {
    if(err) {
      res.status(500).json({error: `Internal Server Error: ${err.message}`})
      return
    }
    console.log(`Edytowano wiadomosc`.green)
    res.status(200).json({message: 'Dokument zaktualizowany'})
  })
})


app.delete("/api/v1/usun/:id/:rev", (req, res) => {
  const id = req.params.id
  const rev = req.params.rev

  DB.destroy(id, rev, (err, body) => {
    if(err) {
      res.status(500).json({error: `Internal Server Error: ${err.message}`})
      return
    }
    
    res.status(200).json({message: 'Dokument usunięty'})
  })
})

app.listen(PORT, () => {
  console.log(`Serwer działa na adresie http://localhost:${PORT}`.underline.blue)
})
