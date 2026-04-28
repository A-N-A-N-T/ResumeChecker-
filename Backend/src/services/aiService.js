const Groq = require("groq-sdk")
const { z } = require("zod")

const puppeteer = require("puppeteer")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

// ✅ SAME schema (no change)
const interviewReportSchema = z.object({
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"])
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string())
    })
  ),
  title: z.string()
})


// 🔧 Helper: clean JSON
function cleanJSON(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()
}


// 🔥 MAIN FUNCTION
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

  const prompt = `
You are an AI that MUST return STRICT JSON.

RULES:
- Output ONLY valid JSON
- NO explanation
- NO backticks
- DO NOT skip fields

Structure:
{
  "matchScore": number,
  "technicalQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "behavioralQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "skillGaps": [
    { "skill": string, "severity": "low" | "medium" | "high" }
  ],
  "preparationPlan": [
    { "day": number, "focus": string, "tasks": string[] }
  ],
  "title": string
}

Resume: ${resume.slice(0, 2000)}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // 🔥 best free model
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.3
  })

  const rawText = response.choices[0].message.content

  console.log("RAW AI:", rawText)

  let parsed

  try {
    parsed = JSON.parse(cleanJSON(rawText))
  } catch (err) {
    console.error("❌ JSON Parse Error:", rawText)

    // fallback (important)
    return {
      matchScore: 50,
      technicalQuestions: [],
      behavioralQuestions: [],
      skillGaps: [],
      preparationPlan: [],
      title: "Unknown Role"
    }
  }

  // ✅ Zod validation
  try {
    return interviewReportSchema.parse(parsed)
  } catch (err) {
    console.error("❌ Validation Error:", err)

    return {
      matchScore: parsed.matchScore || 50,
      technicalQuestions: parsed.technicalQuestions || [],
      behavioralQuestions: parsed.behavioralQuestions || [],
      skillGaps: parsed.skillGaps || [],
      preparationPlan: parsed.preparationPlan || [],
      title: parsed.title || "Unknown Role"
    }
  }
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

  const prompt = `
You are an AI that MUST return STRICT JSON.

RULES:
- Output ONLY valid JSON
- NO explanation
- NO backticks
- DO NOT skip fields

Structure:
{
  "html": string
}

Instructions:
- Generate a professional ATS-friendly resume in HTML format
- Use clean structure (h1, h2, ul, li)
- Keep design simple and readable
- Use minimal inline CSS
- Highlight relevant skills based on job description
- Make it look like human-written (NOT AI generated)
- Keep it concise (1–2 pages max)

Resume: ${resume.slice(0, 2000)}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // ✅ same as your interview fn
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.3
  })

  const rawText = response.choices[0].message.content

  // console.log("RAW RESUME AI:", rawText)

  let parsed

  try {
    parsed = JSON.parse(cleanJSON(rawText))
  } catch (err) {
    console.error("❌ JSON Parse Error:", rawText)

    // fallback HTML
    const fallbackHtml = `
      <html>
        <body>
          <h1>Resume Generation Failed</h1>
          <p>Please try again.</p>
        </body>
      </html>
    `

    return await generatePdfFromHtml(fallbackHtml)
  }

  // ✅ basic validation
  if (!parsed.html) {
    const fallbackHtml = `
      <html>
        <body>
          <h1>Invalid Resume Output</h1>
          <p>Missing HTML content.</p>
        </body>
      </html>
    `

    return await generatePdfFromHtml(fallbackHtml)
  }

  // ✅ generate PDF
  const pdfBuffer = await generatePdfFromHtml(parsed.html)

  return pdfBuffer
}

module.exports = { generateInterviewReport , generateResumePdf }