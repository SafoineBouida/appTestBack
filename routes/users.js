var express = require('express');
var router = express.Router();
var User = require("./../models/user")
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    filename = file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1]
    cb(null, filename)
  }
})
var upload = multer({ storage: storage })

router.post("/user",upload.single('photo'), (request, response) => {
   var { username, nom, prenom, telephone, adresse, photo } = request.body
  const file = request.file
  if (file) {
    photo = file.filename
  }
  
  const obj = { username: username, nom: nom, prenom: prenom, telephone: telephone, adresse: adresse,photo: photo }
  user = new User(obj);
  user.save( (err, data) => {
    if (err)
      return response.status(405).send('erreur')
    return response.status(200).send(data)
  })
})
router.get("/user", (request, response) => {  
  User.find({}, (err, data) => {
    if (err)
      return response.status(405).send('erreur')
    return response.status(200).send(data)
  })
})

module.exports = router;
