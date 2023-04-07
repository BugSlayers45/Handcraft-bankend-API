import {Feedback} from "../model/association.js";

export const feedback = async (request,response,next)=>{
  try{
    console.log(request.body);
    const feed = await Feedback.create(request.body);
     return response.status(200).json({message: "feedback added",status: true});
  }
  catch(err){
    console.log(err);
      return response.status(500).json({error: "Internal Server Error",status: false});
  }

}

export const viewFeedback = async (request, response, next) => {
  try {
      let feedback = await Feedback.findAll()
      console.log(feedback);
      return response.status(200).json({ feedbacks : feedback, status: true });
  }
  catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error", status: false });
  }
}