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

export const categoryList = async (request, response, next) => {
  try {
      let categoires = await Category.findAll();
      return response.status(200).json({ categories: categoires, status: true });
  }
  catch (err) {
      return response.status(500).json({ error: "Internal server error", status: false });
  }
}

export const remove = (request, response, next) => {
  Category.destroy({
      where: { id: request.body.id }
  }).then(result => {
      return response.status(200).json({ message: "Category removed", status: true });
  }).catch(err => {
      console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
  })
}

export const update = async (request, response, next) => {
  try {
      const category = await Category.findByPk(request.body.id, { raw: true });
      if (!category)
          return response.status(404).json({ error: "Requested resource not found.", status: false });

      const status = await Category.update({ categoryName: request.body.categoryName }, {
          where: { id: request.body.id }
      });
      return response.status(200).json({ message: "category updated", category: { ...category, categoryName: request.body.categoryName }, status: true });
  }
  catch (err) {
      return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}
