const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "mysecretkey";
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1:  create a user using: POST "/api/auth/createuser" .No login required
router.post('/createuser', [
  body('name', "Enter a valid name").isLength({min: 3}),
  body('email', "Enter a valid Email").isEmail(),
  body('password', "Password must be at least 5 characters").isLength({min: 5}),
], async (req, res) => {
//if there are errors return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user already exists with the email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" });
    }
    //create new user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });

    const data = {
     user:{
          id: user.id
     }
    }
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log({authtoken});

    res.json(user);
    //catch errors
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot br blank').exists(),
], async(req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;
  try{
    let user =await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const payload = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(payload, JWT_SECRET);
    res.json(authtoken);

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}
)

// ROUTE 3: GET LOGGEDIN USER DETAILS USING POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async(req, res) => {
  try{
    const userID=req.user.id;
    const user = await User.findById(userID).select("-password")
    res.send(user);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
