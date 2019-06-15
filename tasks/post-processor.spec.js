const pp = require('./post-processor');
const gaData = require('./post-processor.spec.data.json');

describe('Post proccessor', () => {
  describe('#sanitize', () => {
    it('should remove the dates and file extention', () => {
      const filename = '2019-05-14-How-to-build-a-Node-js-eCommerce-website-for-free.md';
      expect(pp.sanitize(filename)).toBe('how-to-build-a-node-js-ecommerce-website-for-free');
    });
  });

  describe('#findPostInGa', () => {
    it('should aggregate data', () => {
      const posts = ['how-to-build-a-node-js-ecommerce-website-for-free'];
      const data = gaData;
      expect(pp.findPostInGa(posts, data)).toMatchObject({
        'how-to-build-a-node-js-ecommerce-website-for-free': {
          pageviews: (2157 + 179 + 11 + 6 + 2 + 2 + 16),
        },
      });
    });
  });
});
