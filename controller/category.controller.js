import { validationResult } from "express-validator"
import {Category} from "../model/association.js";

export const saveCategory = async (request,response,next)=>{
  try{
    let error = await validationResult(request);
    if(!error.isEmpty())
        return response.status(400).json({error: "Bad request", status:false})
    
    const category = await Category.create(request.body);
     return response.status(200).json({message: "category saved..",status: true});
  }
  catch(err){
    console.log(err);
      return response.status(500).json({error: "Internal Server Error",status: false});
  }

}

export const saveAllCategory = async (request,response,next)=>{
    try{
        for(let category of request.body.categories){
            await Category.create({categoryName: category});
        }
          return response.status(200).json({message: "Category saved...",status: true});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error: "Internal Server Error",status: false});
    }
}