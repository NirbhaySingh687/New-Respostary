import express from "express"
import Login from "../models/login.js";
import bcrypt from "bcrypt"

const router = express.Router()

//register

router.post('/register',async(req,res)=>{
    try {
        const {name,password,email}=req.body
        const user= await Login.find();

        //Find user is already Exist or not
        const isExitingUser=[]
        if(user.length !== 0){
            for(let users of user){
                if(users.user_email === email){
                    isExitingUser.push(users)
                }
            }
        }
        if(isExitingUser.length !== 0 ){
            return res.status(402).send('User is Already Exist')
        }
        //Ecrypted the Plain password which is entered by user
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const bcryptPassword = await bcrypt.hash(password,salt)

        //insert the Encrpted password to database
        const data= new Login({
            user_name: name,
            user_email: email,
            user_password: bcryptPassword
        })
        await data.save()

        return res.json(data)

    } catch (err) {
        console.error(err.message)
        return res.status(401).send('Server Error')
    }
})

//login
router.post('/login',async(req,res)=>{
    try {
        const {email,password}= req.body
        console.log(`>>>>>>>>>>>.${JSON.stringify(email)}`)
        console.log(`password${JSON.stringify(password)}`)

        const user=  await Login.find();
        //find the user is exist or not
        const isExitingUser=[]
        if(user.length !== 0){
            for(let users of user){
                if(users.user_email === email){
                    isExitingUser.push(users)
                }
            }
        }
        if(isExitingUser.length === 0){
            return res.status(401).send('email and password is incorrect')
        }
        console.log(`>>>>>>isExitingUser>>>>>.${JSON.stringify(isExitingUser)}`)

        //Verify  the password which is entered by the user
        const validPassword= await bcrypt.compare(password,isExitingUser[0].user_password)
        console.log(validPassword)
        if(!validPassword){
            return res.status(404).send('Incorrect Password')
        }
        return res.json(user)
    } catch (error) {
        console.log(error.message)
        return res.status(401).send('Server Error')
    }
})

export default router