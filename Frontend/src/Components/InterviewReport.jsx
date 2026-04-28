import { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router-dom";

const InterviewReport = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [openIndex, setOpenIndex] = useState(null);
  const { report } = useInterview();
  const { getReportById, loading , getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#020617] border-r border-gray-800 p-6">
        <h2 className="text-gray-400 text-sm mb-4">SECTIONS</h2>

        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("technical")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "technical"
                ? "bg-pink-500/20 text-pink-400"
                : "text-gray-400"
            }`}
          >
            Technical Questions
          </button>

          <button
            onClick={() => setActiveTab("behavioral")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "behavioral"
                ? "bg-pink-500/20 text-pink-400"
                : "text-gray-400"
            }`}
          >
            Behavioral Questions
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "roadmap"
                ? "bg-pink-500/20 text-pink-400"
                : "text-gray-400"
            }`}
          >
            Road Map
          </button>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={()=>{
              getResumePdf(interviewId)
            }}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                     text-white px-8 py-3 rounded-xl font-semibold 
                     shadow-lg hover:scale-105 hover:shadow-pink-500/30 
                     transition-all duration-300 ease-in-out"
          >
            📄 Generate Resume
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* TECHNICAL */}
        {activeTab === "technical" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Technical Questions</h1>

            <div className="space-y-4">
              {report.technicalQuestions.map((q, index) => (
                <div
                  key={index}
                  className="bg-[#020617] border border-gray-800 rounded-xl p-4 cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex justify-between items-center">
                    <p>{q.question}</p>
                    <span>{openIndex === index ? "▲" : "▼"}</span>
                  </div>

                  {openIndex === index && (
                    <div className="mt-4 text-sm text-gray-400">
                      <p>
                        <strong>Intention:</strong> {q.intention}
                      </p>
                      <p className="mt-2">
                        <strong>Answer:</strong> {q.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* BEHAVIORAL */}
        {activeTab === "behavioral" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Behavioral Questions</h1>
            <p className="text-gray-400">Coming from API...</p>
          </>
        )}

        {/* ROADMAP */}
        {activeTab === "roadmap" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Preparation Roadmap</h1>

            <div className="space-y-6 border-l-2 border-pink-500 pl-6">
              {/* <div>
                <h3 className="font-semibold text-pink-400">Day 1</h3>
                <p className="text-gray-400">Learn Node.js internals</p>
              </div>

              <div>
                <h3 className="font-semibold text-pink-400">Day 2</h3>
                <p className="text-gray-400">MongoDB indexing</p>
              </div> */}
              {report.preparationPlan.map((q, index) => (
                <div>
                  <h3 className="font-semibold text-pink-400">{q.day}</h3>
                  <p className="text-gray-400">{q.focus}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-72 bg-[#020617] border-l border-gray-800 p-6">
        {/* Match Score */}
        <div className="text-center mb-6">
          <div className="w-28 h-28 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center text-2xl font-bold">
            {report.matchScore}
          </div>
          <p className="text-green-400 mt-2">Strong match</p>
        </div>

        {/* Skill Gaps */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3">SKILL GAPS</h3>

          <div className="space-y-2">
            {report.skillGaps.map((q, index) => (
              <div className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm">
                {q.skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;
