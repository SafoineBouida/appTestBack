var express = require('express');
var router = express.Router();
var Article = require("./../models/article");
const { request } = require('express');
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
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)

})


router.post("/article", upload.single('article'), async (request, response) => {
  try {
    var { titre, article, user } = request.body
    const file = request.file
    if (file) {
      article = file.filename

    }
    obj = { titre: titre, article: article, user: user }
    article = new Article(obj);
    data = await article.save()
    return response.status(200).send(data)
  } catch (error) {
    console.log(error.message)
    return response.status(405).send('erreur')
  }
});

router.get("/article", (request, response) => {
  Article.find({}).populate("user").exec((err, data) => {
    if (err)
      return response.status(405).send('erreur')
    return response.status(200).send(data)
  })
});

router.post("/comment", async (request, response) => {
  try {
    var { user, description, article } = request.body
    article = await Article.findOne({ _id: article }).exec();
    if (article) {
      article.comments.push({ user: user, description: description })
      await article.save();
    }
    return response.status(200).send(article)
  } catch (error) {
    return response.status(405).send('erreur')
  }
});

router.post("/avis", async (request, response) => {
  try {
    var { user, type, article } = request.body
    article = await Article.findOne({ _id: article }).exec();
    if (article) {
      article.avis.push({ user: user, type: type })
      await article.save();
    }
    return response.status(200).send(article)
  } catch (error) {
    return response.status(405).send('erreur')
  }
})

router.get("/nbavis", async (request, response) => {
  try {
    var { article, type } = request.body
    article = await Article.findOne({ _id: article }).exec();
    if (article) {
      if (type) {
        var count = await article.avis.filter(x => x.type).length
      } else {
        var count = await article.avis.filter(x => !x.type).length
      }
      console.log(count)
      return response.status(200).send({ count })
    }
  } catch (error) {
    return response.status(405).send('erreur')
  }
})
module.exports = router;  