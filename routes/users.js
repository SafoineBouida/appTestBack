var express = require('express');
var router = express.Router();
var User = require("./../models/user")
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/user", (request, response) => {
  const { username, nom, prenom, telephone, adresse } = request.body
  const obj = { username: username, nom: nom, prenom: prenom, telephone: telephone, adresse: adresse }
  user = new User(obj);
  user.save( (err, data) => {
    if (err)
      return response.status(405).send('erreur')
    return response.status(200).send(data)
  })
})

module.exports = router;
