const pdfParse = require("pdf-parse")
const { generateInterviewReport , generateResumePdf } = require("../services/aiService")
const interviewReportModel = require("../models/interviewReportModel")


const interviewReportGeneratorController = async (req,res) => {
    
    // this is for the converting pdf data of resume into text

        if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" })
    }

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


const getInterviewReportOfUser = async (req,res) => {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({
        _id : interviewId,
        user : req.user.id
    })
    if(!interviewReport){
        return res.status(404).json({
            message : "Interview report not found"
        })
    }

    return res.status(200).json({
        message: "Interview report found successfully",
        interviewReport
    })
}

const getAllInterviewReports = async (req,res) => {
     const interviewReports = await interviewReportModel.find({user : req.user.id}).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
     return res.status(200).json({
        message : "Reports found successfully",
        interviewReports
     })
}

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


module.exports = {interviewReportGeneratorController 
    , getInterviewReportOfUser,
     getAllInterviewReports,
     generateResumePdfController
    }