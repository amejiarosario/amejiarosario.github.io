/**
 * Related - find related posts or if is part of tutorial bundle
 *
 * @param  {Object} page - post variable
 * @return {Array}      list of posts related
 */
hexo.extend.helper.register('related', function (page, site) {
  var relatedPosts = [];
  var tutorialTags = [];

  // find related tags
  tutorialTags = extractTutorialTags(page);

  tutorialTags.forEach(function (tutorial) {
    site.posts.sort('tutorial__order').each(function(post){
      if(post.tags.map(tag => tag.name).some(tag => tag === tutorial)) {
        post.tutorialTag = tutorial;
        relatedPosts.push(post);
      }
    });
  });

  return relatedPosts;
});

function extractTutorialTags(page) {
  var tags = [];
  [/^tutorial_.+/i, /^course_.+/i].forEach(function(bundle){
    if(!page.tags){
      return;
    }

    page.tags
      .map(tag => tag.name)
      .filter(tag => tag.match(bundle))
      .forEach(function(tutorialTag) {
        tags.push(tutorialTag);
      });
  });
  return tags;
}
