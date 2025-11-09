import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, FileText, Award } from 'lucide-react';
import { dummyQuizzes } from '../utils/dummyData';

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quiz = dummyQuizzes.find((q) => q.id === id);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h2>
          <p className="text-gray-300 mb-4">The quiz you're looking for doesn't exist.</p>
          <Link
            to="/student"
            className="inline-block bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.length !== quiz.questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const getQuestionStatus = (questionIndex: number) => {
    if (!submitted) return null;
    const question = quiz.questions[questionIndex];
    const userAnswer = answers[questionIndex];
    const isCorrect = userAnswer === question.correctAnswer;
    return { isCorrect, correctAnswer: question.correctAnswer };
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/student"
            className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-red-400 mb-2">{quiz.title}</h1>
          <p className="text-lg text-gray-300 mb-4">{quiz.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Grade {quiz.grade}
            </span>
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-300">
              {quiz.curriculum}
            </span>
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-300">
              {quiz.topic}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {quiz.questions.length} Questions
            </span>
          </div>
        </div>

        {/* Quiz Questions */}
        <div className="space-y-6 mb-6">
          {quiz.questions.map((question, questionIndex) => {
            const status = getQuestionStatus(questionIndex);
            return (
              <div
                key={question.id}
                className={`bg-white rounded-xl shadow-md p-6 border ${
                  submitted
                    ? status?.isCorrect
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                    : 'border-red-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-red-800">
                    Question {questionIndex + 1}
                  </h3>
                  {submitted && status && (
                    <div className="flex items-center space-x-2">
                      {status.isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4 text-lg">{question.question}</p>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answers[questionIndex] === optionIndex;
                    const isCorrect = optionIndex === question.correctAnswer;
                    const isWrong = submitted && isSelected && !isCorrect;

                    return (
                      <label
                        key={optionIndex}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                          submitted
                            ? isCorrect
                              ? 'border-green-500 bg-green-100'
                              : isWrong
                              ? 'border-red-500 bg-red-100'
                              : 'border-gray-300 bg-gray-50'
                            : isSelected
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-red-300 hover:bg-red-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={optionIndex}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                          disabled={submitted}
                          className="h-5 w-5 text-red-600"
                        />
                        <span className="flex-1 text-gray-700">{option}</span>
                        {submitted && isCorrect && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {submitted && isWrong && <XCircle className="h-5 w-5 text-red-600" />}
                      </label>
                    );
                  })}
                </div>
                {submitted && !status?.isCorrect && (
                  <p className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold">Correct answer:</span>{' '}
                    {question.options[question.correctAnswer]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button / Results */}
        {!submitted ? (
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <button
              onClick={handleSubmit}
              disabled={answers.length !== quiz.questions.length}
              className={`w-full bg-red-800 text-white px-6 py-3 rounded-lg font-semibold transition ${
                answers.length !== quiz.questions.length
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-red-900'
              }`}
            >
              Submit Quiz
            </button>
            {answers.length !== quiz.questions.length && (
              <p className="text-center text-sm text-gray-600 mt-2">
                Please answer all {quiz.questions.length} questions
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
            <div className="text-center mb-6">
              <Award className="h-16 w-16 text-red-800 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-red-800 mb-2">Quiz Complete!</h2>
              <div className="text-5xl font-bold text-red-800 mb-2">{score}%</div>
              <p className="text-gray-600">
                You got {answers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length} out of{' '}
                {quiz.questions.length} questions correct
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/student')}
                className="flex-1 bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers([]);
                  setScore(0);
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

