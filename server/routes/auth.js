const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs')
const fetchuser = require('../middleware/fetchUser')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "skippersenani$money";

//ROUTE_2: create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Oops wrong password").isLength({ min: 5 }),
], async (req, res) => {
    // if error occurs return bad request
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether the email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Email Already Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const Data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(Data, JWT_SECRET);
        success = true
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured")
    }
})


//ROUTE_2: Authenticate user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Oops wrong password").isLength({ min: 5 }),
], async (req, res) => {
    // if error occurs retrun bad request
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // find user
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const Data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(Data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occured!!")
    }

    //ROTUE_3: Get the logged in user details using: POST "api/auth/getuser". login required

    router.get('/getuser', fetchuser, async (req, res) => {
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send("Internal Server Error!!")
        }
    })

    //ROUTE_3: Update an existing Note using: PUT "/api/notes/updatenote". login required.
    router.put('/update/:id', fetchuser, async (req, res) => {
        try {
            const { name, email, age, gender, location, phone, } = req.body;
            // create a newNote object
            const newUser = {};
            if (name) { newUser.name = name };
            if (email) { newUser.email = email };
            if (age) { newUser.age = age };
            if (gender) { newUser.gende = gender };
            if (location) { newUser.location = location };
            if (phone) { newUser.phone = phone };
            // Find the note to be updated and update it
            let user = await User.findById(req.params.id);
            if (!user) { res.status(404).send("Not Found") }

            // if (note.user.toString() !== req.user.id) {
            //     return res.status(404).send("Not Allowed")
            // }
            user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true })
            res.json({ user });
        } catch (error) {
            res.status(500).send("Internal Server Error!!");
        }
    })


})

module.exports = router;