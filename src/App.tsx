/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, RotateCcw, Award, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  paragraph: string;
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: 1,
    paragraph: "The rapid development of artificial intelligence (AI) has led to significant changes in various industries. While some experts argue that AI will create new job opportunities, others express concerns about the potential displacement of human workers. The debate continues as society adapts to these technological advancements.",
    question: "According to the text, what is a primary concern regarding AI?",
    options: [
      { label: "A", text: "The lack of interest in technological advancements." },
      { label: "B", text: "The potential for human workers to lose their jobs." },
      { label: "C", text: "The cost of implementing AI in industries." },
      { label: "D", text: "The slow pace of AI development." }
    ],
    correctAnswer: "B"
  },
  {
    id: 2,
    paragraph: "Ecotourism is often promoted as a sustainable way to enjoy nature while supporting local communities. However, if not managed properly, an influx of tourists can lead to environmental degradation and the loss of cultural identity. Striking a balance is crucial for the long-term success of such initiatives.",
    question: "What is a potential negative consequence of poorly managed ecotourism?",
    options: [
      { label: "A", text: "Increased support for local communities." },
      { label: "B", text: "Improvement in environmental standards." },
      { label: "C", text: "Damage to the environment and local culture." },
      { label: "D", text: "A complete ban on international travel." }
    ],
    correctAnswer: "C"
  },
  {
    id: 3,
    paragraph: "Traditional farming methods often rely on natural cycles and organic fertilizers. In contrast, modern industrial agriculture uses synthetic chemicals and heavy machinery to maximize yields. While industrial methods produce more food, they raise questions about sustainability and soil health.",
    question: "What distinguishes traditional farming from modern industrial agriculture?",
    options: [
      { label: "A", text: "The use of heavy machinery in traditional farming." },
      { label: "B", text: "A reliance on synthetic chemicals for better yields." },
      { label: "C", text: "The use of natural processes and organic materials." },
      { label: "D", text: "A focus on maximizing production at any cost." }
    ],
    correctAnswer: "C"
  },
  {
    id: 4,
    paragraph: "Urban planning plays a vital role in creating livable cities. By integrating green spaces, efficient public transport, and affordable housing, planners can improve the quality of life for residents. Neglecting these elements can lead to congestion and social inequality.",
    question: "What is one benefit of effective urban planning mentioned in the passage?",
    options: [
      { label: "A", text: "An increase in traffic congestion." },
      { label: "B", text: "Enhanced quality of life for city dwellers." },
      { label: "C", text: "Higher costs for public transportation." },
      { label: "D", text: "Reduction of green spaces in urban areas." }
    ],
    correctAnswer: "B"
  },
  {
    id: 5,
    paragraph: "Renewable energy sources, such as solar and wind power, are becoming increasingly cost-competitive with fossil fuels. Transitioning to clean energy is essential for reducing carbon emissions and combating climate change. Governments worldwide are providing incentives to accelerate this shift.",
    question: "Why is the transition to clean energy considered essential?",
    options: [
      { label: "A", text: "Because fossil fuels are becoming cheaper." },
      { label: "B", text: "To lower the cost of solar panels." },
      { label: "C", text: "To decrease carbon output and address global warming." },
      { label: "D", text: "To eliminate the need for government incentives." }
    ],
    correctAnswer: "C"
  },
  {
    id: 6,
    paragraph: "The study of ancient civilizations provides insight into how human societies have evolved over millennia. Archaeologists use artifacts and ruins to reconstruct the daily lives, beliefs, and social structures of past peoples. This knowledge helps us understand our own cultural heritage.",
    question: "How do archaeologists learn about past civilizations?",
    options: [
      { label: "A", text: "By interviewing descendants of ancient peoples." },
      { label: "B", text: "By analyzing physical remains and objects." },
      { label: "C", text: "By reading modern history textbooks." },
      { label: "D", text: "By predicting future societal trends." }
    ],
    correctAnswer: "B"
  },
  {
    id: 7,
    paragraph: "Marine biodiversity is under threat from overfishing, pollution, and rising sea temperatures. Coral reefs, in particular, are highly sensitive to environmental changes and are experiencing widespread bleaching. Protecting these ecosystems is vital for maintaining the health of the oceans.",
    question: "Which of the following is specifically mentioned as being vulnerable to environmental shifts?",
    options: [
      { label: "A", text: "Deep-sea trenches." },
      { label: "B", text: "Coral reefs." },
      { label: "C", text: "Commercial fishing vessels." },
      { label: "D", text: "Plastic waste in the ocean." }
    ],
    correctAnswer: "B"
  },
  {
    id: 8,
    paragraph: "Psychological research suggests that spending time in nature can significantly reduce stress and improve mental well-being. Activities such as walking in a park or hiking in the forest help lower cortisol levels and enhance mood. This connection highlights the importance of preserving natural environments.",
    question: "According to the passage, what is one effect of nature on mental health?",
    options: [
      { label: "A", text: "An increase in stress levels." },
      { label: "B", text: "A decline in overall mood." },
      { label: "C", text: "The reduction of stress-related hormones." },
      { label: "D", text: "A preference for indoor activities." }
    ],
    correctAnswer: "C"
  },
  {
    id: 9,
    paragraph: "Globalization has facilitated the exchange of goods and ideas on an unprecedented scale. While it has driven economic growth in many regions, it has also been criticized for contributing to wealth inequality and the loss of local traditions. The impact of globalization is complex and multi-faceted.",
    question: "What is one criticism of globalization mentioned in the text?",
    options: [
      { label: "A", text: "It slows down economic development." },
      { label: "B", text: "It limits the exchange of ideas." },
      { label: "C", text: "It may lead to the disappearance of local customs." },
      { label: "D", text: "It reduces the gap between rich and poor." }
    ],
    correctAnswer: "C"
  },
  {
    id: 10,
    paragraph: "The Rosetta Stone, discovered in 1799, was instrumental in deciphering Egyptian hieroglyphs. It contains a decree issued in three different scripts: Ancient Egyptian hieroglyphs, Demotic script, and Ancient Greek. By comparing the texts, scholars were finally able to unlock the mysteries of ancient Egyptian writing.",
    question: "Why was the Rosetta Stone important?",
    options: [
      { label: "A", text: "It was the first stone ever discovered in Egypt." },
      { label: "B", text: "It provided a key to understanding an ancient writing system." },
      { label: "C", text: "It proved that the Greeks ruled Egypt for centuries." },
      { label: "D", text: "It described the daily lives of Egyptian pharaohs." }
    ],
    correctAnswer: "B"
  },
  {
    id: 11,
    paragraph: "Effective communication is essential for teamwork and productivity in the workplace. Clear instructions, active listening, and open feedback help prevent misunderstandings and foster a positive work environment. Companies that prioritize communication often see higher employee satisfaction.",
    question: "What can help prevent misunderstandings at work?",
    options: [
      { label: "A", text: "Strict hierarchies and top-down management." },
      { label: "B", text: "Detailed manuals for every minor task." },
      { label: "C", text: "Providing clear guidance and listening attentively." },
      { label: "D", text: "Increasing the number of weekly meetings." }
    ],
    correctAnswer: "C"
  },
  {
    id: 12,
    paragraph: "Microplastics are tiny plastic particles that have become a pervasive environmental pollutant. They are found in the oceans, soil, and even the air we breathe. Because they are so small, they are easily ingested by wildlife, posing a significant threat to the entire food chain.",
    question: "What makes microplastics particularly dangerous to animals?",
    options: [
      { label: "A", text: "Their bright colors attract predators." },
      { label: "B", text: "Their large size makes them easy to spot." },
      { label: "C", text: "They can be easily consumed by creatures due to their size." },
      { label: "D", text: "They only affect animals living in the deep ocean." }
    ],
    correctAnswer: "C"
  },
  {
    id: 13,
    paragraph: "Space exploration has led to numerous technological breakthroughs that benefit life on Earth, such as satellite communication and advanced medical imaging. Despite the high costs, proponents argue that the knowledge gained is invaluable for the future of humanity.",
    question: "What is one argument in favor of space exploration?",
    options: [
      { label: "A", text: "It is a very low-cost endeavor." },
      { label: "B", text: "It results in useful technologies for everyday life." },
      { label: "C", text: "It guarantees that humans will live on Mars soon." },
      { label: "D", text: "It helps reduce the world's population." }
    ],
    correctAnswer: "B"
  },
  {
    id: 14,
    paragraph: "The Industrial Revolution marked a major turning point in history, as manual labor was increasingly replaced by machine-based manufacturing. This shift led to rapid urbanization as people moved to cities in search of work in factories. While it drove economic growth, it also resulted in poor living conditions for many workers.",
    question: "What was a direct result of the shift to machine-based manufacturing?",
    options: [
      { label: "A", text: "A return to traditional farming methods." },
      { label: "B", text: "A decline in the growth of cities." },
      { label: "C", text: "Movement of the population towards urban centers." },
      { label: "D", text: "The immediate improvement of workers' housing." }
    ],
    correctAnswer: "C"
  },
  {
    id: 15,
    paragraph: "Critical thinking involves analyzing information objectively and making reasoned judgments. It requires individuals to question assumptions and evaluate evidence rather than accepting information at face value. This skill is increasingly important in the digital age, where misinformation is common.",
    question: "What does a critical thinker do according to the text?",
    options: [
      { label: "A", text: "Accepts all information found online immediately." },
      { label: "B", text: "Relies solely on personal intuition to make decisions." },
      { label: "C", text: "Assesses information and looks for supporting proof." },
      { label: "D", text: "Avoids using the internet to prevent misinformation." }
    ],
    correctAnswer: "C"
  },
  {
    id: 16,
    paragraph: "The Great Barrier Reef is the world's largest coral reef system. It is home to thousands of species of fish, mollusks, and other marine life. However, climate change and ocean acidification are causing significant damage to this delicate ecosystem, leading to loss of biodiversity.",
    question: "What is the main threat to the Great Barrier Reef mentioned here?",
    options: [
      { label: "A", text: "The over-population of certain fish species." },
      { label: "B", text: "Tourism and recreational diving." },
      { label: "C", text: "Environmental changes linked to the climate." },
      { label: "D", text: "A lack of scientific research in the area." }
    ],
    correctAnswer: "C"
  },
  {
    id: 17,
    paragraph: "Literacy rates have improved globally over the past few decades, yet millions of adults still lack basic reading and writing skills. Education programs targeting adult learners are essential for reducing poverty and promoting social inclusion. Empowering individuals with literacy opens up better job prospects.",
    question: "Why are adult literacy programs important?",
    options: [
      { label: "A", text: "To increase the cost of higher education." },
      { label: "B", text: "To help people find better employment opportunities." },
      { label: "C", text: "To replace children's education initiatives." },
      { label: "D", text: "To discourage adults from working in manual labor." }
    ],
    correctAnswer: "B"
  },
  {
    id: 18,
    paragraph: "Bees play a crucial role in the ecosystem as pollinators. Many of the crops that humans rely on for food depend on bees for reproduction. The decline in bee populations worldwide due to pesticides and habitat loss is a major concern for global food security.",
    question: "What is a consequence of the declining bee population?",
    options: [
      { label: "A", text: "An increase in the variety of wild flowers." },
      { label: "B", text: "Potential risks to the world's food supply." },
      { label: "C", text: "A reduction in the use of harmful pesticides." },
      { label: "D", text: "Improved reproduction rates for most crops." }
    ],
    correctAnswer: "B"
  },
  {
    id: 19,
    paragraph: "The concept of a 'circular economy' aims to minimize waste by reusing, repairing, and recycling materials. This approach contrasts with the traditional 'linear economy' of take-make-dispose. Transitioning to a circular model can help protect natural resources and reduce pollution.",
    question: "How does a circular economy differ from a linear economy?",
    options: [
      { label: "A", text: "It focuses on producing goods as quickly as possible." },
      { label: "B", text: "It encourages the immediate disposal of old products." },
      { label: "C", text: "It prioritizes the continuous use of resources and waste reduction." },
      { label: "D", text: "It is more expensive to maintain in the long run." }
    ],
    correctAnswer: "C"
  },
  {
    id: 20,
    paragraph: "Remote work has become more common, offering flexibility for both employers and employees. While it reduces commuting time and office costs, it can also lead to feelings of isolation and difficulties in maintaining a work-life balance. Clear boundaries are necessary for success in a remote setting.",
    question: "What is one challenge associated with working from home?",
    options: [
      { label: "A", text: "Increased commuting expenses." },
      { label: "B", text: "The potential for feeling lonely or disconnected." },
      { label: "C", text: "Higher costs for maintaining a central office." },
      { label: "D", text: "A complete lack of flexibility in working hours." }
    ],
    correctAnswer: "B"
  }
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (optionLabel: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionLabel
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setShowResults(false);
  };

  const score = useMemo(() => {
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    return (correctCount / questions.length) * 10;
  }, [userAnswers]);

  const correctCount = useMemo(() => {
    return Object.keys(userAnswers).filter(id => {
      const q = questions.find(q => q.id === parseInt(id));
      return q && userAnswers[parseInt(id)] === q.correctAnswer;
    }).length;
  }, [userAnswers]);

  const allAnswered = Object.keys(userAnswers).length === questions.length;

  if (showResults) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-emerald-100 rounded-full">
              <Award className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Test Completed!</h1>
          <p className="text-stone-500 mb-8">Here is your IELTS Reading performance summary.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-sm text-stone-500 uppercase tracking-wider font-semibold mb-1">Score</p>
              <p className="text-4xl font-bold text-stone-900">{score.toFixed(1)}<span className="text-lg text-stone-400">/10</span></p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-sm text-stone-500 uppercase tracking-wider font-semibold mb-1">Correct</p>
              <p className="text-4xl font-bold text-stone-900">{correctCount}<span className="text-lg text-stone-400">/20</span></p>
            </div>
          </div>

          <div className="space-y-3 mb-8 text-left">
            <h3 className="font-semibold text-stone-800 mb-2">Review Answers:</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCorrect = userAnswers[q.id] === q.correctAnswer;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setShowResults(false);
                      setCurrentQuestionIndex(idx);
                    }}
                    className={`h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="bg-white border-bottom border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-stone-900 p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">IELTS Reading Practice</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block h-2 w-32 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-stone-900 transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-stone-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Passage Section */}
          <motion.div 
            key={`passage-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 md:p-10"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full uppercase tracking-wider">
                Paragraph {currentQuestionIndex + 1}
              </span>
            </div>
            <p className="text-lg leading-relaxed text-stone-800 font-serif italic">
              "{currentQuestion.paragraph}"
            </p>
          </motion.div>

          {/* Question Section */}
          <div className="space-y-6">
            <motion.div 
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 md:p-10"
            >
              <h2 className="text-xl font-bold mb-8 leading-tight">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = userAnswers[currentQuestion.id] === option.label;
                  const isCorrect = option.label === currentQuestion.correctAnswer;
                  const showFeedback = isSubmitted;

                  let buttonClass = "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ";
                  
                  if (showFeedback) {
                    if (isSelected) {
                      buttonClass += isCorrect 
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900" 
                        : "border-rose-500 bg-rose-50 text-rose-900";
                    } else {
                      buttonClass += "border-stone-100 bg-stone-50 text-stone-400 opacity-60";
                    }
                  } else {
                    buttonClass += isSelected 
                      ? "border-stone-900 bg-stone-900 text-white shadow-md" 
                      : "border-stone-100 hover:border-stone-300 hover:bg-stone-50 text-stone-700";
                  }

                  return (
                    <button
                      key={option.label}
                      onClick={() => handleSelectOption(option.label)}
                      disabled={isSubmitted}
                      className={buttonClass}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                          isSelected && !showFeedback ? 'bg-white/20' : 'bg-stone-100 group-hover:bg-stone-200'
                        } ${isSelected && showFeedback ? (isCorrect ? 'bg-emerald-200' : 'bg-rose-200') : ''}`}>
                          {option.label}
                        </span>
                        <span className="font-medium">{option.text}</span>
                      </div>
                      
                      {showFeedback && isSelected && (
                        isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                    userAnswers[currentQuestion.id] === currentQuestion.correctAnswer 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {userAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">Correct! Well done.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span className="font-semibold">Incorrect. Try to review the paragraph.</span>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex-1 py-4 px-6 rounded-2xl border border-stone-200 bg-white font-semibold text-stone-600 flex items-center justify-center gap-2 hover:bg-stone-50 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={isSubmitted ? () => setShowResults(true) : handleSubmit}
                  disabled={!allAnswered && !isSubmitted}
                  className="flex-[2] py-4 px-6 rounded-2xl bg-stone-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-stone-800 disabled:opacity-50 transition-colors shadow-lg shadow-stone-200"
                >
                  {isSubmitted ? 'View Final Score' : 'Submit Test'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="flex-[2] py-4 px-6 rounded-2xl bg-stone-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200"
                >
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Progress Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 hidden md:block">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex gap-1.5">
            {questions.map((q, idx) => {
              const isAnswered = !!userAnswers[q.id];
              const isCurrent = idx === currentQuestionIndex;
              const isCorrect = isSubmitted && userAnswers[q.id] === q.correctAnswer;
              const isWrong = isSubmitted && userAnswers[q.id] !== q.correctAnswer;

              let dotClass = "w-3 h-3 rounded-full transition-all ";
              if (isCurrent) dotClass += "ring-4 ring-stone-100 bg-stone-900 scale-125 ";
              else if (isCorrect) dotClass += "bg-emerald-500 ";
              else if (isWrong) dotClass += "bg-rose-500 ";
              else if (isAnswered) dotClass += "bg-stone-400 ";
              else dotClass += "bg-stone-200 ";

              return (
                <button 
                  key={q.id} 
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={dotClass}
                  title={`Question ${idx + 1}`}
                />
              );
            })}
          </div>
          <div className="text-sm font-medium text-stone-500">
            {Object.keys(userAnswers).length} of {questions.length} answered
          </div>
        </div>
      </footer>
    </div>
  );
}
