import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TextInput from "../components/TextInput";
import SentimentCard from "../components/SentimentCard";
import api from "../axios";
import QuillEditor from "../components/ReactQuill";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";

const JournalPage = () => {
  const { theme } = useContext(ThemeContext);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({
        duration: 600,
        once: false,
      });
      AOS.refreshHard();
    });
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Journal added successfully!");
    try {
      const res = await api.post("/api/analyze", { text });
      setResult(res.data);
    } catch (err) {
      setError("Failed to analyze sentiment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        
        
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-600 to-purple-600'
              : 'bg-gradient-to-br from-blue-200 to-purple-200'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-tr from-pink-600 to-yellow-600'
              : 'bg-gradient-to-tr from-pink-200 to-yellow-200'
          }`}></div>
          <div className={`absolute top-1/4 left-1/4 w-60 h-60 rounded-full opacity-10 blur-2xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-indigo-600 to-cyan-600'
              : 'bg-gradient-to-br from-indigo-200 to-cyan-200'
          }`}></div>
        </div>

        <main className="flex-1">
          {/* Hero Section */}
          <section data-aos="fade-up" className="py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-move">
                Journal & Reflect
              </h1>
              <p className={`text-xl max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Express your thoughts and feelings. Our AI will analyze the
                sentiment and emotions in your writing to help you understand
                yourself better.
              </p>
            </div>
          </section>

          {/* Main Journal Section */}
          <section
            data-aos="fade-up"
            className="min-h-screen flex items-center justify-center py-12 px-4 relative"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-32 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-40 left-16 w-6 h-6 bg-purple-400 rounded-full opacity-40"></div>
              <div className="absolute bottom-20 right-32 w-5 h-5 bg-pink-400 rounded-full opacity-50"></div>
            </div>

            <div className="w-full max-w-3xl relative z-10">
              <div className={`backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-800/60 via-gray-700/60 to-gray-800/60 border-gray-600/30'
                  : 'bg-gradient-to-br from-blue-100/60 via-purple-50/60 to-pink-100/60 border-white/30'
              }`}>
                
                {/* Header with Loading Icon */}
                <div data-aos="fade-left" className="text-left mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-8 md:w-16 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                      {loading ? (
                        <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg
                          className="w-6 h-6 md:w-8 md:h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h1 className={`text-3xl md:text-3xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        How are you feeling today?
                      </h1>
                      <p className={`text-lg ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Share your thoughts and let AI understand your emotions
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  data-aos="fade-left"
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  <div className="relative">
                    <QuillEditor value={text} onChange={setText} />
                  </div>

                  <div className="flex justify-center">
                    <button
                      data-aos="fade-down"
                      className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                      type="submit"
                      disabled={loading || !text.trim()}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <span className="relative z-10 flex items-center">
                        {loading ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            Analyzing your emotions...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            Add Journal
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
                
                <Toaster 
                  position="top-right" 
                  reverseOrder={false}
                  toastOptions={{
                    style: {
                      background: theme === 'dark' ? '#374151' : '#ffffff',
                      color: theme === 'dark' ? '#f9fafb' : '#111827',
                    },
                  }}
                />

                {/* Results Placeholder/Area */}
                <div className="mt-8 min-h-[80px] flex items-center justify-center">
                  {loading && (
                    <div className="text-center">
                      <div className={`inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'bg-blue-900/60 border border-blue-700/50'
                          : 'bg-blue-100/80'
                      }`}>
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                        }`}>
                          Analyzing sentiment and emotion...
                        </span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className={`p-4 border rounded-2xl backdrop-blur-sm ${
                      theme === 'dark'
                        ? 'bg-red-900/60 border-red-700/50'
                        : 'bg-red-100/80 border-red-200'
                    }`}>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-red-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-red-300' : 'text-red-800'
                        }`}>
                          {error}
                        </span>
                      </div>
                    </div>
                  )}

                  {result ? (
                    <div className="w-full animate-fade-in">
                      <div className="flex flex-wrap gap-4 justify-center items-center">
                        {/* Sentiment Result */}
                        <div
                          className={`inline-flex items-center px-6 py-3 rounded-full font-bold text-white shadow-lg transform hover:scale-105 transition-all duration-300 ${
                            result.sentiment === "POSITIVE"
                              ? "bg-gradient-to-r from-green-400 to-green-600"
                              : result.sentiment === "NEGATIVE"
                              ? "bg-gradient-to-r from-red-400 to-red-600"
                              : result.sentiment === "NEUTRAL"
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-gray-400 to-gray-600"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full mr-3 ${
                              result.sentiment === "POSITIVE"
                                ? "bg-green-200"
                                : result.sentiment === "NEGATIVE"
                                ? "bg-red-200"
                                : result.sentiment === "NEUTRAL"
                                ? "bg-yellow-200"
                                : "bg-gray-200"
                            }`}
                          ></div>
                          Sentiment:{" "}
                          {result.sentiment?.charAt(0).toUpperCase() +
                            result.sentiment?.slice(1)}
                        </div>

                        {/* Emotion Result */}
                        {result.emotion && (
                          <div className="inline-flex items-center px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Emotion:{" "}
                            {result.emotion?.charAt(0).toUpperCase() +
                              result.emotion?.slice(1)}
                          </div>
                        )}
                      </div>

                      {/* Original SentimentCard */}
                      <div className="mt-6 flex items-center justify-center">
                        <SentimentCard
                          sentiment={result.sentiment}
                          emotion={result.emotion}
                        />
                      </div>
                    </div>
                  ) : (
                    !loading && (
                      <p className={`italic text-lg ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Your journal's emotional insights will appear here
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section data-aos="fade-up" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl font-bold mb-12 text-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Journaling Tips
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Tip 1 */}
                <div
                  data-aos="fade-left"
                  className={`rounded-3xl p-8 shadow-xl border hover:shadow-2xl transition duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-blue-100'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-inner ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-800 to-purple-800'
                      : 'bg-gradient-to-br from-blue-100 to-purple-100'
                  }`}>
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v18m9-9H3"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Be Honest
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Write authentically about your feelings without judgment.
                    There's no right or wrong way to feel.
                  </p>
                </div>

                {/* Tip 2 */}
                <div
                  data-aos="fade-up"
                  className={`rounded-3xl p-8 shadow-xl border hover:shadow-2xl transition duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-green-100'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-inner ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-green-800 to-teal-800'
                      : 'bg-gradient-to-br from-green-100 to-teal-100'
                  }`}>
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Stay Consistent
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Regular journaling helps you track emotional patterns and
                    personal growth over time.
                  </p>
                </div>

                {/* Tip 3 */}
                <div
                  data-aos="fade-right"
                  className={`rounded-3xl p-8 shadow-xl border hover:shadow-2xl transition duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-purple-100'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-inner ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-purple-800 to-pink-800'
                      : 'bg-gradient-to-br from-purple-100 to-pink-100'
                  }`}>
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Reflect Deeply
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Use our sentiment analysis to gain insights into your
                    emotional well-being and patterns.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default JournalPage;