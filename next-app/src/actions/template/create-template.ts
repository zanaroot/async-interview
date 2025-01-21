'use server'
import { createTemplateModel } from "@/models/template/$create";
import { Template } from "@/models/template/type";

export const createTemplate = async (input:Template)=>{
    await createTemplateModel(input) 
}