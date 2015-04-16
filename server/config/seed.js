/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Customer = require('../api/customer/customer.model');
var Owner = require('../api/owner/owner.model');
var Qupey = require('../api/qupey/qupey.model');
var Store = require('../api/store/store.model');




Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  });
});


Store.find({}).remove(function() {
  Store.create({
    name: 'Best Buy', 
    contactInfo: {
      phone: '2222222222', 
      street: '308 Lincoln Road', 
      city: 'Brooklyn', 
      state: 'NY', 
      postalcode: '11216' 
    }, 
    tagline: 'Pleased to meet you', 
    description: 'one stop shop for everything you need',
    icon: "http://file.answcdn.com/answ-cld/image/upload/v1/tk/brand_image/cd4fe6a0/14c2f8f0a580c4c93ec51864c5c108e420934096.png",
    background_img: "http://static3.businessinsider.com/image/51bcda1d69bedd1d5400002a/microsoft-plans-to-build-windows-stores-inside-hundreds-of-best-buys.jpg"
  }, {
    name: 'Trader Joe\'s', 
    contactInfo: {
      phone: '7182468460', 
      street: '130 Court Street', 
      city: 'Brooklyn', 
      state: 'NY', 
      postalcode: '11210' 
    }, 
    tagline: 'The poor mans Whole foods',
    description: 'an American privately held chain of specialty grocery stores headquartered in Monrovia, California, in Greater Los Angeles',
    icon: "http://chachingonashoestring.com/wp-content/uploads/2013/11/trader-joes.png",
    background_img: "http://static1.1.sqspcdn.com/static/f/503827/12927311/1309201990223/Location-Icon.gif?token=NQD8OuQVNBT18jkpZGl%2FyUBkQT4%3D"
  }, {
    name: 'Whole Foods Market', 
    contactInfo: {
      phone: '7189073622', 
      street: '214 3rd Street', 
      city: 'Brooklyn', 
      state: 'NY', 
      postalcode: '11215' 
    }, 
    tagline: 'We sell overpriced really good food',
    description: 'Eco-minded chain with natural & organic grocery items, housewares & other products (most sell wine)',
    icon: "https://pechemignonkitchen.files.wordpress.com/2014/10/whole-foods-market-logo.png",
    background_img: "http://www.gaiahealthblog.com/wordpress1/wp-content/uploads/2013/08/whole-foods1.jpg"
  })
}, function (){
  console.log('done with stores')
})

Customer.find({}).remove(function() {
  Customer.create({
    firstName: 'Joe',
    lastName: 'Smith', 
    email: 'test@test.com',
    password: 'test', 
    provider: 'local'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    firstName: 'testy',
    lastName: 'testy', 
    email: 'test@test.com',
    password: 'test', 
    provider: 'local'
  }, function(){
    console.log('finished with customers')
  });
});

Qupey.find({}).remove(function() {
  Qupey.create({
    name: 'Whole Foods Default Qupey',
    status: 'default', 
    type: {
      discount: 30, 
      details: '30% off total purchase'
    },
    expiration: new Date("2015-07-02T20:45:00.000Z"), 
    shareable: true
  }, {
    name: 'Whole Foods Gold Qupey',
    status: 'gold', 
    type: {
      discount: 50, 
      details: '50% off total purchase'
    },
    expiration: new Date("2015-07-02T20:45:00.000Z"), 
    shareable: false
  }, {
    name: 'Best Buy Default Qupey',
    status: 'default', 
    type: {
      discount: 20, 
      details: '20% off total purchase'
    },
    expiration: new Date("2015-07-02T20:45:00.000Z"), 
    shareable: true
  }, {
    name: 'Best Buy Gold Qupey',
    status: 'gold', 
    type: {
      discount: 35, 
      details: '35% off total purchase'
    },
    expiration: new Date("2015-07-02T20:45:00.000Z"), 
    shareable: false
  }, {
    name: 'Trader Joe\'s Default Qupey',
    status: 'default', 
    type: {
      discount: 20, 
      details: '20% off total purchase'
    },
    expiration: new Date("2015-07-02T20:45:00.000Z"), 
    shareable: true
  }, {
    name: 'Trade Joe\'s Gold Qupey',
    status: 'gold', 
    type: {
      discount: 45, 
      details: '45% off total purchase'
    },
    expiration: new Date("2015-07-02T20:45:00.000Z"), 
    shareable: false
  },function(){
    console.log('finished with qupeys')
  });
});

Owner.find({}).remove(function() {
  Owner.create({
    provider: 'local',
    firstName: 'Freddy',
    lastName: 'Businessman',
    email: 'freddy@freddy.com',
    password: 'freddy'
  }, {
    provider: 'local',
    firstName: 'Connor',
    lastName: 'Connor',
    email: 'connor@connor.com',
    password: 'connor'
  }, function(){
    console.log('done with owners')
  });
});