const {signUp,login}  = require("../services/auth.services");

//controller for signup

async function signupHandler(req,res) {
    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        throw new Error("Please fill all credentials!");
    }

    try {
        const user = await signUp({name,email,password});
        res.status(201).json(user);
    } catch (error) {
        console.log("error is ",error.message);
        res.status(400).send("error occured while signup");
    }
}

async function loginHandler(req,res) {
    const {email,password} = req.body;
    if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const data = await login({email,password});
    res.status(200).json(data);
  } catch (error) {
    console.log("error is",error.message);
    res.status(401).send("Error occured while Login!");
  }
}

module.exports = {signupHandler,loginHandler};