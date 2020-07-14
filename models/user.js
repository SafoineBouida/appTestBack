var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
 username : {
     type:String,
     required : true
    },
 nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
});

var User = mongoose.model('User', userSchema);



module.exports = User