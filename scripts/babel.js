const babel = require("@babel/core");

hexo.extend.renderer.register('babel.js', 'js', function(data, options, callback){
  callback(null, babel.transform(data.text, {
    filename: data.path
  }).code);
});
