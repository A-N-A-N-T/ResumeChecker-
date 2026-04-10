const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../services/aiService")
const interviewReportModel = require("../models/interviewReportModel")


const interviewReportGeneratorController = async (req,res) => {
    
    // this is for the converting pdf data of resume into text
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription} = req.body
    // here we generate report using fn in service 
    const generateInterviewReportByAi = await generateInterviewReport({
        resume : resumeContent.text,
        selfDescription,
        jobDescription
    })   
    // now the task is to save the report or data getting from the Ai into the database
    
    const data = await interviewReportModel.create({
        user : req.user.id,
        resume : resumeContent.text,
        selfDescription,
        jobDescription,
        ...generateInterviewReportByAi
    })

    res.status(201).json({
        message: "Interview Report generated Successfully!",
        report: data
    })
}

module.exports = {interviewReportGeneratorController}