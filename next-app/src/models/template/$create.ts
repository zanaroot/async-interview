"server only"
import { db } from "@/packages/db"
import { Template } from "./type"
import { templateTable } from "@/packages/db/schemas/template"

export const createTemplateModel = async (input:Template)=>{
  try {
    if (!input.name) {
        console.error('Champ manquant')
    }
    const newTemplate = await db.insert(templateTable).values(input)
    return newTemplate
  } catch (error) {
    throw error
  }
}