// middleware/route-guard.js

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    console.log(req.session)
    if (!req.session.user) {
      return res.redirect('/auth/login');
    } else{
         next();
    }
   
  };
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    } else{
        next();
    }
    
  };
  
  module.exports = {isLoggedIn:isLoggedIn, isLoggedOut:isLoggedOut};
  