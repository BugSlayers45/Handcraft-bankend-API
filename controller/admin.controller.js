import { validationResult } from "express-validator";
import Admin from "../model/admin.model.js";
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";

export const signin = (request,response,next)=>{
    try {
        let admin = Admin.findOne({
            raw: true,
            where: {
                email: request.body.adminEmail
            }
        });
        if (admin) {
            let status = bcrypt.compare(request.body.adminPassword, admin.password)
            if (status) {
                let payload = { subject: Admin.adminEmail };
                let token = Jwt.sign(payload, 'qwertyuiolkjhgfwertj')
                return response.status(200).json({ message: "SignIn successfull",token:token, status: true });
            }
            return response.status(400).json({ message: "Bad request", status: false });
        }
    } catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false })
    }
}

export const signup = async (request,response,next)=>{
    const error =  await validationResult(request);
    if (!error.isEmpty())
        return response.status(400).json({ error: "Bad request", message: error.array() });
    let saltkey = await bcrypt.genSalt(10);
    let encrypPassword = await bcrypt.hash(request.body.adminPassword, saltkey);
    request.body.adminPassword = encrypPassword;

    let AdminDetails = Admin.create(request.body)
        .then(result => {
            return response.status(200).json({admin: result, status: true });
        }).catch(err => {
            console.log(err); 
            return response.status(400).json({ error: "Internal server error", status: false });
        })
}