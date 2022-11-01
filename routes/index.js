const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Get Profile page
router.get('/profile', isLoggedIn, (req, res) => {
    console.log('SESSION =====> ', req.session);
    res.render('profile', { user: req.session.user})
})

module.exports = router;
