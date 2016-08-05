const search = instantsearch({
  appId: '7M9S763HKU',
  apiKey: '33db42bbc1d2631fd68f26ebefa35aa8',
  indexName: 'adrianmejia-blog'
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for titles, content, tags, categories,...',
    autofocus: false,
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats',
  })
);

const hitTemplate = document.getElementById('movie').innerHTML;

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 5,
    templates: {
      item: hitTemplate,
    },
    transformData: hit => {
      // console.log(JSON.stringify(hit));
      hit.stars = [];
      hit.year = new Date(hit.date).getFullYear();
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= (5*hit.pageviews__total/200000));
      }
      return hit;
    },
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#tags',
    attributeName: 'tags',
    operator: 'and',
    limit: 10,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#categories',
    attributeName: 'categories',
    operator: 'and',
    limit: 10,
  })
);

// search.addWidget(
//   instantsearch.widgets.starRating({
//     container: '#ratings',
//     attributeName: 'rating',
//   })
// );

// search.addWidget(
//   instantsearch.widgets.rangeSlider({
//     container: '#year',
//     attributeName: 'year',
//     tooltips: {
//       format: v => v && v.toLocaleString(),
//     },
//   })
// );

search.start();
