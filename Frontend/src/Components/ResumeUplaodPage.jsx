import React from "react";
import { useState , useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview"


const ResumeUplaodPage = () => {

  const { loading, generateReport,reports } = useInterview()
  const [ jobDescription, setJobDescription ] = useState("")
  const [ selfDescription, setSelfDescription ] = useState("")
  const resumeInputRef = useRef()

  const navigate = useNavigate()

  const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
  }
  
  if(loading){
    return (
      <main>
        <h1>Loading you interview plan</h1>
      </main>
    )
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] px-4 py-10">
    
    {/* 🔷 Top Form Section */}
    <div className="flex items-center justify-center">
      <div className="w-full max-w-5xl bg-[#0b1220]/80 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-8">
        
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Your <span className="text-pink-500">Interview Plan</span>
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Upload your resume or describe yourself to generate a smart strategy.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* LEFT */}
          <div>
            <label className="text-gray-300 font-semibold text-sm mb-2 block">
              Target Job Description
            </label>
            <textarea
              onChange={(e)=>setJobDescription(e.target.value)}
              rows="8"
              placeholder="Paste job description here..."
              className="w-full bg-[#020617] border border-gray-700 text-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            
            <div>
              <label className="text-gray-300 font-semibold text-sm mb-2 block">
                Upload Resume
              </label>

              <label htmlFor="resume" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-pink-500 transition">
                  <p className="text-gray-400">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF or DOCX (Max 5MB)</p>
                </div>
              </label>

              <input
                ref={resumeInputRef}
                type="file"
                id="resume"
                accept=".pdf,.docx"
                className="hidden"
              />
            </div>

            <div className="text-center text-gray-500 text-sm">OR</div>

            <div>
              <label className="text-gray-300 font-semibold text-sm mb-2 block">
                Quick Self Description
              </label>
              <textarea
                onChange={(e)=>setSelfDescription(e.target.value)}
                rows="4"
                placeholder="Describe your skills, experience..."
                className="w-full bg-[#020617] border border-gray-700 text-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleGenerateReport}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            🚀 Generate My Interview Strategy
          </button>
        </div>

      </div>
    </div>

    {/* 🔥 BOTTOM SECTION (NEW) */}
    {reports && reports.length > 0 && (
      <div className="max-w-5xl mx-auto mt-14">
        
        <h2 className="text-2xl font-bold text-white mb-6">
          My Recent Interview Plans
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-[#0b1220] border border-gray-800 rounded-xl p-4 hover:border-pink-500 transition cursor-pointer"
              onClick={() => navigate(`/interview/${report._id}`)}
            >
              <h3 className="text-white font-semibold text-lg">
                {report.role || "Backend Developer"}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Generated on {new Date(report.createdAt).toLocaleDateString()}
              </p>

              <p className="text-pink-500 text-sm mt-2 font-semibold">
                Match Score: {report.score || 88}%
              </p>
            </div>
          ))}
        </div>

      </div>
    )}
  </div>
);



};

export default ResumeUplaodPage;