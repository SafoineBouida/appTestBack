var express = require('express');
var router = express.Router();
var Article = require("./../models/article");
const { request } = require('express');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/article", async (request, response) => {
  try {
    var { titre, article, user } = request.body
    obj = { titre: titre, article: article, user: user }
    article = new Article(obj);
    await article.save()
    return response.status(200).send(data)
  } catch (error) {
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
      if(type){
        var count = await article.avis.filter( x => x.type).length
      } else {
        var count = await article.avis.filter( x => !x.type).length
      } 
      console.log(count)
      return response.status(200).send({count})
    }
  } catch (error) {
    return response.status(405).send('erreur')
  }
})
module.exports = router;  