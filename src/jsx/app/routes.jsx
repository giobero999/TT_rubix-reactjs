/* ERROR PAGES */
var notfound = require('./routes/notfound.jsx');

/* APP PAGES */
var login = require('./routes/app/login.jsx');
var signup = require('./routes/app/signup.jsx');
var profile = require('./routes/app/profile.jsx');
var blank = require('./routes/app/blank.jsx');

// assets
var upload = require('./routes/app/upload.jsx');
var crop = require('./routes/app/crop.jsx');
var gallery = require('./routes/app/gallery.jsx');


var tables = require('./routes/app/tables.jsx');
var campaigns = require('./routes/app/campaigns.jsx');
var zones = require('./routes/app/zones.jsx');
var time = require('./routes/app/time.jsx');

/* ROUTES */
module.exports = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={blank} />
    <Route path='/' handler={blank} />
    <NotFoundRoute handler={notfound} />
    <Route path='/app/campaigns' handler={campaigns} />
    <Route path='/app/profile' handler={profile} />
    <Route path='/app/assets/upload' handler={upload} />
    <Route path='/app/assets/crop' handler={crop} />
    <Route path='/app/assets/gallery' handler={gallery} />
    <Route path='/app/zones' handler={zones} />
    <Route path='/app/login' handler={login} />
    <Route path='/app/signup' handler={signup} />
    <Route path='/app/time' handler={time} />
    <Route path='/app/tables' handler={tables} />


  </Route>
);
