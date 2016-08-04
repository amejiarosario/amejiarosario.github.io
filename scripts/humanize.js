var humanize = require('humanize-plus');

hexo.extend.helper.register('fnumber', function (number) {
  if(number < 1000){
    return (parseInt(number/100, 10) / 10) + 'k';
  } else {
    return humanize.compactInteger(number, 1);
  }
});
