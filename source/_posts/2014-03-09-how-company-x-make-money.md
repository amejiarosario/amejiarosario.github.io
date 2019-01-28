---
layout: post
title: "How company X make money?"
date: 2014-03-09 21:39:42 -0400
updated: 2014-03-09 21:39:42 -0400
comments: true
pageviews__total: 4248
pageviews__recent: 8
pageviews__avg_time: 125
tutorial__order: 0
tags:
  - startups
categories:
  - Technologies

---

Have you ever wonder how the companies that offer free services make money? Such as Instagram, Evernote, Facebook, Twitter, LinkedIn, Google Maps, so on... or if it is even profitable to keep free users using their services. We would go through several revenue models and hopefully, it will throw you some light next time you decide to roll your own startup.

<!--More-->

<a href="#start">TL; DR</a>: Go to the interactive company revenue checker.</a>

### Revenues Models

Let’s start first giving some perspective what models are actually giving the most revenues. In 2013, App Store, reported that free apps brought the 71% of the revenue! Even more than paid apps… how’s that even possible!?

{% img /images/revenue-breakdown.png %}

<div style="clear:both"></div>

(source: <a href="http://techcrunch.com/2013/03/28/in-app-purchase-revenue-hits-record-high-accounts-for-76-of-u-s-iphone-app-revenue-90-in-asian-markets/" target="_blank">techcrunch</a>)


<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/css/base/jquery.ui.all.min.css">
<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/company_revenue.css">



Ok, let’s discuss some revenue models to understand this. There are 3 main models:


  - **Freemium**: apps are free to download and use. However, quite often some different features are sold separately (e.g. new levels, specialized functions, remove ads, more capacity, and so on). E.g. Pandora, Hulu, Google Docs.

  - **Premium**: users paid upfront a fixed price for the application. After you pay for it, you are able to download it. Usually new software updates are free. E.g. MS Office 365.

  - **Subscription**: users paid a fixed price which is automatically charged every certain time. Magazines in the iOS Newsstand are a good example of this subscription based model. Subscriptions have generally lower prices than premium accounts. E.g. Netfix.


Freemium is not as "free" as it might seem in the surface, there are indirect ways of getting revenues from it:


 - **Advertising**: the application/service is free to use, but it contains ads or  interruption banners for an couple of minutes in order to raise revenue. This model is usually applied along with freemium apps and to remove the  ads users have to pay a subscription. E.g. Spotify.

 - **Selling data**:  user information and behavior inside the application is sell to interested 3rd-parties. Usually used with freemium apps and specified in the terms of used.

 - **Transaction**: the application is free to use generally and charges a percentage or fixed fee with every users’ transaction made. For example, it allows you to publish your item on their site for free but when you sell it, it charges you a fee. Or publish a project in a site and when it reaches certain goal a percentage fee is applied. E.g. eBay, Kickstarter.

 - **Online lead generation**:  collects user’s information sometimes in an exchange of a product or service and then resell the information to companies interested indirectly. It’s different from the selling data model because the information is not sold to 3rd party directly, but indirectly. Influencing users desitions based on 3rd party companies affiliated and users' interests, likes and behaviors. E.g. Mint, LinkedIn.

 - **Donations**: (it's self-explanatory) Services/apps are free, but it encourages users to contribute throughout donations to support the development.



After reading these, you might have more clues why free apps are so much win nowadays. They helped to create those million-dollar-per-day games! (remembered FlappyBird, Candycrush, Farmville...) In a market where there is enough competition, having a free option will take you to large numbers of users quicker and broader, because of the low barrier to entry. For instance, Whatsapp had at certain point 10k of daily downloads, after moving it to $1 it download rate drops 10 times, they finally opted for yearly subscriptions.

Subscription-based revenue are also a model worth doing a special mention. It brings a steady flow of income to companies and usually comes in different tiers to fulfill users need. But, it has to be flexible enough, because it might limit hard core users which might be willing to pay more for taking the product to a new level.

<p> Click at the companies logos to see if their revenue models are profitable or not. You might get surprised! If some information is not accurate please leave a comment and if you are wondering about another company not listed here, let me know and I will add it :) </p>


<a id="start"></a>
<div id="company_revenue">
  <ul id="companies-holder"></ul>
</div>

<div style="clear:both"></div>

<script src="https://code.jquery.com/jquery-1.7.1.min.js" integrity="sha256-iBcUE/x23aI6syuqF7EeT/+JFBxjPs5zeFJEXxumwb0=" crossorigin="anonymous"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>

<script type="text/javascript">
  String.prototype.titleize = function() {
    return this.replace(/_/g, " ").replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };
</script>

<script type="text/template" id="company-icon">
  <li class="company-item">
    <a href="#<%= name %>" class="company-icon" data-company="<%= name %>" title="How does <%= name.titleize() %> make money?">
      <span>
          <img src="/images/logo_<%= name %>.png" alt="<%= name %>">
      </span>
    </a>
  </li>
</script>

<script type="text/template" id="company-detail">
  <section id="company-details-<%= name %>" class="company-details">
    <h2>How does <%= name.titleize() %> make money?</h2>
    <input type="hidden" autofocus>
    <div>
      <ul>
        <li class="advertising revenue-<%= revenues.advertising > 0 ? 'active' : 'inactive' %>"><i class="fa fa-bullhorn"></i> Advertising</li>
        <li class="freemium revenue-<%= revenues.freemium > 0? 'active' : 'inactive' %>"><i class="fa fa-users"></i> Freemium</li>
        <li class="subscribers revenue-<%= revenues.subscribers > 0 ? 'active' : 'inactive' %>"><i class="fa fa-credit-card"></i> Subscribers</li>
        <li class="premium revenue-<%= revenues.premium > 0 ? 'active' : 'inactive' %>"><i class="fa fa-money"></i> Premium</li>
        <li class="lead_gen revenue-<%= revenues.lead_gen > 0 ? 'active' : 'inactive' %>"><i class="fa fa-random"></i> Lead Gen</li>
        <li class="transactions revenue-<%= revenues.transactions > 0 ? 'active' : 'inactive' %>"><i class="fa fa-code-fork"></i> Transactions/Royalties</li>
        <li class="selling_data revenue-<%= revenues.selling_data > 0 ? 'active' : 'inactive' %>"><i class="fa fa-globe"></i> Selling Data</li>
      </ul>
    </div>
    <div class="profitable <%= profitable ? 'active' : 'inactive' %>">
      Profitable? <%= profitable ? 'Yes' : 'No' %> <i class="fa fa-thumbs-o-<%= profitable ? 'up' : 'down' %>"></i>
      <%= revenue.length > 0 ? "<br><small>Revenue: "+revenue+"</small>" : "" %>
    </div>
    <p><small><%= description %></small></p>
    <div id="sources">
      Sources: <% _.each(sources, function(s, i){ %>
        <a href="<%= s %>" target="_blank"><%= i+1 %></a>
      <% }) %>
    </div>
  </section>
</script>

<script type="text/javascript">
var companies = [{
  name: 'instagram',
  revenues: {
    freemium: 1,
  },
  revenue: "",
  profitable: false,
  description: "Before selling to Facebook they were not making money. They are trying to incorporate Ads.",
  type: ["social-media"],
  sources: ["https://www.facebook.com/careers/department?req=a0IA000000CxvB4MAJ", "http://adage.com/article/digital/instagram-ads-a-risky-bet-facebook/244945/"]
},{
  name: 'facebook',
  revenues: {
    advertising: 0.85,
    freemium: 1,
  },
  profitable: true,
  revenue: "US$ 7.872 billion (2013)",
  description: "Advertising is the main source of revenue but also some small percentage comes from payments, web apps and other sources.",
  type: ["social-media"],
  sources: ["http://en.wikipedia.org/wiki/Facebook", "http://www.nytimes.com/2012/02/05/opinion/sunday/facebook-is-using-you.html?pagewanted=all&_moc.semityn.www&_r=0", "http://readwrite.com/2012/05/22/how-does-facebook-make-money#awesm=~oy2VCCNkvevfHC", "http://www.splatf.com/2012/02/facebook-revenue/", "http://blog.tweetsmarter.com/social-media/infographic-how-does-twitter-make-money-how-do-other-social-sites-do-it/"]
},{
  name: 'whatsapp',
  revenues: {
    advertising:0,
    freemium:1,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  profitable: true,
  revenue: "",
  description: "The company is based on Freemium model for firt year. Later, it has a subscription of $1 per year.",
  type: ["social-media"],
  sources: ["http://blogs.wsj.com/digits/2013/12/19/whatsapp-hits-400-million-users-wants-to-stay-independent/", "http://www.quora.com/WhatsApp-Messenger/How-much-revenue-is-WhatsApp-generating", "http://news.yahoo.com/whatsapp-now-making-more-money-google-play-ios-220028493.html", "http://gigaom.com/2013/07/17/why-whatsapps-new-subscription-model-makes-perfect-sense/", "http://www.buzzle.com/articles/how-does-whatsapp-make-money.html"]
},{
  name: 'twitter',
  revenues: {
    advertising: 0.85,
    freemium: 1,
  },
  profitable: true,
  revenue: "US$ 317 million (2012)",
  description: "Mostly on corporate advertising and payments from 'promoted' tweets.",
  type: ["social-media"],
  sources: ["http://blog.tweetsmarter.com/social-media/infographic-how-does-twitter-make-money-how-do-other-social-sites-do-it/", "http://www.bbc.com/news/business-24397472", ""]
},{
  name: 'kickstarter',
  revenues: {
    transactions: 1,
    // freemium: 1,
  },
  profitable: true,
  revenue: "US$ 12 million?",
  description: "Charges a 5% for successfully funded projects.",
  type: ["social-media"],
  sources: ["https://www.kickstarter.com/help", "http://qz.com/184019/how-kickstarter-users-raised-nearly-1-billion-the-really-long-tail-of-crowdfunding/"]
},{
  name: 'skype',
  revenues: {
    advertising:0,
    freemium:1,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "US$ 740 million (2009)",
  profitable: true,
  description: "Skype-to-skype calls are free, but users can buy additional features.",
  type: ["social-media"],
  sources: ["https://support.skype.com/en/faq/FA335/how-does-skype-make-money"]
},{
  name: 'groupon',
  revenues: {
    advertising:0,
    freemium:1,
    subscribers:0,
    premium:0,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "US$ 2.573 billion (2013)",
  profitable: true,
  description: "Groupon takes charges a fee to seller for every deal sold. It's one of the fastest growing company in the world. Going from $30.5 million in year one to $713.4 million in year two.",
  type: ["ecommerce"],
  sources: ["http://www.reuters.com/article/2012/05/14/us-groupon-idUSBRE84D16H20120514", "http://www.incomediary.com/10-weird-ways-big-companies-make-money-online"]
},{
  name: 'ebay',
  revenues: {
    advertising:1,
    freemium:0,
    subscribers:0,
    premium:0,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "US$ 16.05 billion (2013)",
  profitable: true,
  description: "Fees are only applied to sellers for each transactions.",
  type: ["ecommerce"],
  sources: ["http://www.reuters.com/article/2012/05/14/us-groupon-idUSBRE84D16H20120514"]
},{
  name: 'mint',
  revenues: {
    advertising:0,
    freemium:0,
    subscribers:0,
    premium:0,
    lead_gen:1,
    transactions:0,
    selling_data:0
  },
  revenue: "",
  profitable: true,
  description: "Mint get paid a small fee when user switch to a new bank or company.",
  type: ["app"],
  sources: ["https://www.mint.com/how-it-works/free/"]
},{
  name: 'linkedin',
  revenues: {
    advertising:1,
    freemium:1,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:1
  },
  revenue: "US$1.52 billion (2013)",
  profitable: true,
  description: "Sells user's data to companies and recruiters.",
  type: ["social-media"],
  sources: ["https://intelligence.businessinsider.com/welcome"]
},{
  name: 'amazon_kindle',
  revenues: {
    advertising:0,
    freemium:0,
    subscribers:0,
    premium:1,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "",
  profitable: false,
  description: "Amazon loses money with Kindle but at the same time makes money selling digital content on it.",
  type: ["hardware"],
  sources: [""]
},{
  name: 'microsoft_xbox',
  revenues: {
    advertising:1,
    freemium:1,
    subscribers:1,
    premium:1,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "",
  profitable: true,
  description: "Xbox console and games cost money (premium), charges $50 annually (subscribers) in addition to ads.",
  type: ["hardware"],
  sources: [""]
},{
  name: 'stack_overflow',
  revenues: {
    advertising:1,
    freemium:0,
    subscribers:0,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "",
  profitable: true,
  description: "Ads, banners and sponsored results.",
  type: ["social-media"],
  sources: ["http://questions-and-answers.findthebest.com/q/17/2521/How-does-Stack-Overflow-make-money"]
},{
  name: 'netflix',
  revenues: {
    advertising:0,
    freemium:0,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "US$4.37 billion (2013)",
  profitable: true,
  description: "Just subscribers.",
  type: ["streaming"],
  sources: [""]
},{
  name: 'pandora',
  revenues: {
    advertising:1,
    freemium:1,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "US$274 million (2012)",
  profitable: true,
  description: "For free users presents adds, for subscribers does not.",
  type: ["streaming"],
  sources: [""]
},{
  name: 'spotify',
  revenues: {
    advertising:1,
    freemium:1,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "",
  profitable: false,
  description: "It has been reporting loses for a couple of years due to royalty payments.",
  type: ["streaming"],
  sources: ["http://mashable.com/2012/10/05/spotify-revenues/", "http://techcrunch.com/2013/07/31/spotify-doubles-revenues-in-2012-while-losing-money-highlighting-royalty-squeeze/", "http://www.telegraph.co.uk/technology/news/10490613/Spotify-pays-500m-in-royalties-in-2013.html"]
},{
  name: 'firefox',
  revenues: {
    advertising:0,
    freemium:0,
    subscribers:0,
    premium:0,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "US$311 million (2012)",
  profitable: true,
  description: "Most of the income comes from royalties from the Firefox search box. Their search partners includes Google, Bing, Yahoo, Yandex, Amazon, eBay and others. Also donations and grants.",
  type: ["browser"],
  sources: ["http://www.extremetech.com/internet/92558-how-browsers-make-money-or-why-google-needs-firefox", "http://www.mozilla.org/en-US/foundation/annualreport/2012/faq/"]
},{
  name: 'craigslist',
  revenues: {
    advertising:1,
    freemium:1,
    subscribers:0,
    premium:0,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "US$27 million (2013)",
  profitable: true,
  description: "Ads and charging users for posting in selected categories.",
  type: ["webapps"],
  sources: ["http://www.craigslist.org/about/factsheet"]
},{
  name: 'dropbox',
  revenues: {
    advertising:0,
    freemium:1,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "US$200 million (2013)",
  profitable: true,
  description: "A fixed capacity for free, to increase it users have to subscribe.",
  type: ["webapp"],
  sources: ["http://techcrunch.com/2013/11/19/if-dropboxs-2013-revenue-is-200m-an-8b-valuation-is-pretty-steep/"]
},{
  name: 'google',
  revenues: {
    advertising:1,
    freemium:0,
    subscribers:0,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "US$59.82 billion (2013)",
  profitable: true,
  description: "Ad products is their main source of revenue (AdSense and AdWords)",
  type: ["webapp", "search"],
  sources: ["http://blogoscoped.com/archive/2009-01-07-n84.html", "http://en.wikipedia.org/wiki/Google"]
},{
  name: 'shopify',
  revenues: {
    advertising:0,
    freemium:0,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "US$100 million?",
  profitable: true,
  description: "Ad products is their main source of revenue (AdSense and AdWords)",
  type: ["webapp", "search"],
  sources: ["http://signalvnoise.com/posts/2378-profitable-proud-shopify", "http://www.shopify.com/2013", "http://www.theglobeandmail.com/report-on-business/small-business/sb-money/business-funding/a-rare-startup-success-story-shopify-hits-1-billion-milestone/article15892998/"]
},{
  name: 'airbnb',
  revenues: {
    advertising:0,
    freemium:0,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:1,
    selling_data:0
  },
  revenue: "US$1 billion?",
  profitable: true,
  description: "Charge to travelers a fee of 6-12% and hosts pay a 3% for every booking on their site.",
  type: ["webapp", "social-media"],
  sources: ["http://www.theglobeandmail.com/report-on-business/small-business/sb-money/business-funding/a-rare-startup-success-story-shopify-hits-1-billion-milestone/article15892998/", "http://www.businessinsider.com/airbnb-billion-revenues-2013-1"]
},{
  name: 'zynga',
  revenues: {
    advertising:1,
    freemium:1,
    subscribers:0,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "US$873.266 million (2013)",
  profitable: true,
  description: "Zynga makes money through people purchasing credits for games and also throught partnerships.",
  type: ["webapp", "games"],
  sources: ["http://www.theglobeandmail.com/report-on-business/small-business/sb-money/business-funding/a-rare-startup-success-story-shopify-hits-1-billion-milestone/article15892998/"]
},{
  name: 'world_of_warcraft',
  revenues: {
    advertising:1,
    freemium:0,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "US$93 million (2013)",
  profitable: true,
  description: "Charges $15 per month to users. They also sends expasions packs and discs.",
  type: ["webapp", "games"],
  sources: ["http://www.theglobeandmail.com/report-on-business/small-business/sb-money/business-funding/a-rare-startup-success-story-shopify-hits-1-billion-milestone/article15892998/", "http://www.tomshardware.com/news/microtransactions-world-of-warcraft-revenues-mmorpg-in-game-store,24236.html"]
},{
  name: 'hulu',
  revenues: {
    advertising:1,
    freemium:0,
    subscribers:1,
    premium:0,
    lead_gen:0,
    transactions:0,
    selling_data:0
  },
  revenue: "US$1 billion (2013)",
  profitable: true,
  description: "Free service has Ads, limitations and restrictions, which are removed for subscribed users.",
  type: ["webapp", "streaming"],
  sources: ["http://gigaom.com/2013/12/18/hulu-2013-1-billion-in-revenue-5-million-subscribers-in-2013/"]
}];

$(function(){
  var $container = $('#companies-holder');

  _.each(companies, function printCompanies(company){
    var $company = _.template($("#company-icon").html(), company);
    $container.append($company);

    var $details = _.template($("#company-detail").html(), company);
    $container.append($details);
  });

  $(".company-icon").on('click', function(e){
    e.preventDefault();
    var name = $(this).data('company');
    var $description = $("#company-details-"+name);

    $description.dialog({
      dialogClass: "company-details-modal",
      modal: true,
      hide: { effect: "explode", duration: 300 },
    });
    $(".ui-widget-overlay").on("click", function() {  $(".ui-dialog-content").dialog().dialog("close"); });
  });
});

</script>
