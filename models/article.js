var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  titre : {
    type:String,
    required : true
  },
  article : {
    type:String,
    required : false
  },
  
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  comments : [{
    description: {
      type: String,
      required: false,
    },
    user:{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
  }],
  avis : [{
    type: {
      type: Boolean,
      required: false,
    },
    user:{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
  }],
  
}, { timestamps: { createdAt: 'created_at' } });

var Article = mongoose.model('Article', userSchema);



module.exports = Article

