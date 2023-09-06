const userModel = require('../model/dbSchema');
const bcrypt = require('bcrypt');
const {createJWT, verifyJWT} = require('../manageJSON')

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmailExist = await userModel.findOne({email})
    if(isEmailExist){
      res.status(401).json({message:"Email already exists"});
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      password: hashedPassword,
    };

    await userModel.create(userData);
    res.status(201).json({message:"Registration Successfull! Please Login"});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({message:"Invalid username/password"});
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({message:"Invalid username/password"})
      return;
    }

    const token = createJWT({email:user.email})
    res.json({token})
    
  } catch (error) {
    res.status(500).send(`Internal Server Error:${error}`);
  }
};

exports.authenticate = async (req,res) => {
      const authToken = req.headers.authorization.split(' ')[1]
      if(authToken){
        const data = verifyJWT(authToken)
        if(data){
          res.json(data)
        }
        else{
          res.status(401).send("Authentication Failed")
        }
      }
        
      else{
        res.status(401).send("Authentication Failed") 
      }
}
