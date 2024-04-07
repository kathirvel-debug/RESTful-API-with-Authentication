import userRepositary from "./userRepositary.js";
import UserModel from "./userModel.js";
import jwt from 'jsonwebtoken';
const userDB = new userRepositary();
import bcrypt from 'bcrypt';
import { log } from "console";
export default class userController {
    async signUp(req, res) {
        console.log(req.body)
        const {
            name,
            password,
        } = req.body;
        if (name === "" || password === "") {
            return res.status(200).send("Empty data!")
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new UserModel(
            name,
            hashedPassword,
        );
        try {
            const data = await userDB.signUp(user);
            res.status(201).send(data);
        }
        catch (err) {
            return res.status(200).send("Something went wrong");
        }

    }
    async sigIn(req, res) {
        const { name, password } = req.body
        if(name===""||password===""){
            return res.status(200).send("Please enter the required field")
        }
        try {
            const user = await userDB.signIN(name);
            if (!user) {
                return res.status(400).send('Incorrect Credentials')
            }
            else {
                const auth = await bcrypt.compare(password, user.password);
                if (auth) {
                    const token = jwt.sign(
                        {
                            userID: user._id,
                            name: user.name,

                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h',
                        }
                    )
                    
                    return res.status(200).send({Token:token});
                   
                }
                else {
                    return res.status(400).send('Incorrect password')
                }
            }

        }
        catch (err) {
            log(err)
            return res.status(200).send(err);
        }
    }
  
}