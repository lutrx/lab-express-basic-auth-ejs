const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcrypt = require('bcryptjs')
const app = require('../app')
const { restart } = require('nodemon')
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')

//Get Signup Page

router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})

//Post the signup data

router.post('/signup', isLoggedOut,  async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        await User.create({
            username: username,
            password: hashedPassword,
        })
        res.redirect('/auth/login')
    } catch (error) {
        res.render('auth/signup', { errorMessage: error.message })
    }
})

// Get Login page
router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/login')
})

//Post the login data

router.post('/login', isLoggedOut, async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await User.findOne( { username } )
        if (!currentUser) {
            res.render('auth/login', { errorMessage: 'Username does not exist!' })
        } else {
            if (bcrypt.compareSync(password, currentUser.password)) {
                req.session.user = currentUser
                res.redirect('/profile')
            } else {
                res.render('auth/login', { errorMessage: 'Password is not correct!' })
            }
        }
})

//Create Logout
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        next(err)
      }
      res.redirect('/auth/login')
    })
  })


module.exports = router;