"use strict";

function loadSearch() {
  var search = instantsearch({
    appId: '7M9S763HKU',
    apiKey: '33db42bbc1d2631fd68f26ebefa35aa8',
    indexName: 'adrianmejia-blog-1'
  });
  search.addWidget(instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for titles, content, tags, categories,...',
    autofocus: false
  }));
  search.addWidget(instantsearch.widgets.stats({
    container: '#stats'
  }));
  var hitTemplate = document.getElementById('movie').innerHTML;
  search.addWidget(instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 5,
    templates: {
      item: hitTemplate
    },
    transformData: function transformData(hit) {
      // console.log(JSON.stringify(hit));
      hit.stars = [];
      hit.year = new Date(hit.date).getFullYear();

      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= 5 * hit.pageviews__total / 200000);
      }

      return hit;
    }
  }));
  search.addWidget(instantsearch.widgets.pagination({
    container: '#pagination'
  }));
  search.addWidget(instantsearch.widgets.refinementList({
    container: '#tags',
    attributeName: 'tags',
    operator: 'and',
    limit: 10
  }));
  search.addWidget(instantsearch.widgets.refinementList({
    container: '#categories',
    attributeName: 'categories',
    operator: 'and',
    limit: 10
  }));
  search.addWidget(instantsearch.widgets.numericRefinementList({
    container: '#ratings',
    attributeName: 'pageviews__total',
    options: [{
      name: 'All'
    }, {
      end: 1000,
      name: 'less than 1k'
    }, {
      start: 1000,
      end: 10000,
      name: 'between 1k and 10k'
    }, {
      start: 10000,
      end: 100000,
      name: 'between 10k and 100k'
    }, {
      start: 100000,
      end: 200000,
      name: 'between 100k and 200k'
    }, {
      start: 200000,
      end: 300000,
      name: 'between 200k and 300k'
    }, {
      start: 300000,
      name: 'more than 300k'
    }]
  }));
  search.addWidget(instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-times-circle" aria-hidden="true"></i> Reset filters'
    },
    autoHideContainer: false
  }));
  search.addWidget(instantsearch.widgets.rangeSlider({
    container: '#year',
    attributeName: 'dateYear',
    tooltips: {
      format: function format(v) {
        return v && v;
      }
    }
  })); // search.start();

  return search;
}