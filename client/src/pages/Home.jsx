import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "@/stores/quizStore";
import { FaPlay, FaSearch } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const quizzes = useQuizStore((state) => state.quizzes);
  const getAllQuizzes = useQuizStore((state) => state.getAllQuizzes);
  const loading = useQuizStore((state) => state.loading);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllQuizzes();
  }, [getAllQuizzes]);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 lg:px-20 py-12 md:mt-5 mt-9">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="md:text-3xl font-semibold text-gray-900 mb-8 text-xl">Explore Quizzes</h1>

        {/* SEARCH */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* QUIZ LIST / SKELETON */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                <div className="h-6 w-64 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-all group cursor-pointer"
                onClick={() => navigate(`/quiz/${quiz._id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
                  <button
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Play Quiz"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/quiz/${quiz._id}`);
                    }}
                  >
                    <FaPlay size={16} />
                  </button>
                </div>

                <p className="text-gray-500 text-sm">
                  {quiz.questions?.length ?? 0} Questions
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : ""}
                </p>
              </div>
            ))}

            {filteredQuizzes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No quizzes found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;