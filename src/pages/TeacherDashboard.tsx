import { useState } from 'react';
import { Plus, Upload, FileText, Users, Megaphone, BookOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Lesson, Quiz, Announcement } from '../types/models';
import { dummyLessons, dummyQuizzes, dummyAnnouncements, dummyUsers } from '../utils/dummyData';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'quizzes' | 'students' | 'announcements'>('lessons');
  const [lessons] = useState<Lesson[]>(dummyLessons);
  const [quizzes] = useState<Quiz[]>(dummyQuizzes);
  const [announcements] = useState<Announcement[]>(dummyAnnouncements);
  const students = dummyUsers.filter((u) => u.role === 'student');

  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    grade: 10,
    curriculum: 'Cambridge',
    topic: '',
    videoUrl: '',
    pdfUrl: '',
    notes: '',
  });

  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    grade: 10,
    curriculum: 'Cambridge',
    topic: '',
    questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }],
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
  });

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a backend
    alert('Lesson added successfully! (This is a demo)');
    setShowLessonForm(false);
    setNewLesson({
      title: '',
      description: '',
      grade: 10,
      curriculum: 'Cambridge',
      topic: '',
      videoUrl: '',
      pdfUrl: '',
      notes: '',
    });
  };

  const handleAddQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a backend
    alert('Quiz created successfully! (This is a demo)');
    setShowQuizForm(false);
    setNewQuiz({
      title: '',
      description: '',
      grade: 10,
      curriculum: 'Cambridge',
      topic: '',
      questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }],
    });
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a backend
    alert('Announcement posted successfully! (This is a demo)');
    setShowAnnouncementForm(false);
    setNewAnnouncement({ title: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      <Sidebar role="teacher" />
      <div className="flex-1 p-4 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-red-400 mb-4 lg:mb-6">Teacher Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-red-800">
          {(['lessons', 'quizzes', 'students', 'announcements'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition ${
                activeTab === tab
                  ? 'text-red-400 border-b-2 border-red-400'
                  : 'text-gray-300 hover:text-red-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-red-400">Lessons</h2>
              <button
                onClick={() => setShowLessonForm(!showLessonForm)}
                className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Lesson</span>
              </button>
            </div>

            {showLessonForm && (
              <form onSubmit={handleAddLesson} className="bg-white p-6 rounded-xl shadow-md mb-6 border border-red-300">
                <h3 className="text-xl font-semibold text-red-800 mb-4">Create New Lesson</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Lesson Title"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    className="px-4 py-2 border border-red-300 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Topic"
                    value={newLesson.topic}
                    onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })}
                    className="px-4 py-2 border border-red-300 rounded-lg"
                    required
                  />
                  <select
                    value={newLesson.grade}
                    onChange={(e) => setNewLesson({ ...newLesson, grade: parseInt(e.target.value) })}
                    className="px-4 py-2 border border-red-300 rounded-lg"
                  >
                    {[6, 7, 8, 9, 10, 11].map((g) => (
                      <option key={g} value={g}>Grade {g}</option>
                    ))}
                  </select>
                  <select
                    value={newLesson.curriculum}
                    onChange={(e) => setNewLesson({ ...newLesson, curriculum: e.target.value })}
                    className="px-4 py-2 border border-red-300 rounded-lg"
                  >
                    <option value="Cambridge">Cambridge</option>
                    <option value="Edexcel">Edexcel</option>
                    <option value="Local">Local</option>
                  </select>
                  <textarea
                    placeholder="Description"
                    value={newLesson.description}
                    onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                    className="px-4 py-2 border border-red-300 rounded-lg md:col-span-2"
                    rows={3}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Video URL (YouTube)"
                    value={newLesson.videoUrl}
                    onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                    className="px-4 py-2 border border-red-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="PDF URL"
                    value={newLesson.pdfUrl}
                    onChange={(e) => setNewLesson({ ...newLesson, pdfUrl: e.target.value })}
                    className="px-4 py-2 border border-red-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Notes (Markdown supported)"
                    value={newLesson.notes}
                    onChange={(e) => setNewLesson({ ...newLesson, notes: e.target.value })}
                    className="px-4 py-2 border border-red-300 rounded-lg md:col-span-2"
                    rows={5}
                  />
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    type="submit"
                    className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition"
                  >
                    <Upload className="h-4 w-4 inline mr-2" />
                    Upload Lesson
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLessonForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-xl shadow-md p-6 border border-red-300">
                  <BookOpen className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Grade {lesson.grade}
                    </span>
                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs border border-red-300">
                      {lesson.curriculum}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-red-400">Quizzes</h2>
              <button
                onClick={() => setShowQuizForm(!showQuizForm)}
                className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create Quiz</span>
              </button>
            </div>

            {showQuizForm && (
              <form onSubmit={handleAddQuiz} className="bg-white p-6 rounded-xl shadow-md mb-6 border border-blue-300">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Create New Quiz</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Quiz Title"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                      className="px-4 py-2 border border-blue-300 rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Topic"
                      value={newQuiz.topic}
                      onChange={(e) => setNewQuiz({ ...newQuiz, topic: e.target.value })}
                      className="px-4 py-2 border border-blue-300 rounded-lg"
                      required
                    />
                    <select
                      value={newQuiz.grade}
                      onChange={(e) => setNewQuiz({ ...newQuiz, grade: parseInt(e.target.value) })}
                      className="px-4 py-2 border border-blue-300 rounded-lg"
                    >
                      {[6, 7, 8, 9, 10, 11].map((g) => (
                        <option key={g} value={g}>Grade {g}</option>
                      ))}
                    </select>
                    <select
                      value={newQuiz.curriculum}
                      onChange={(e) => setNewQuiz({ ...newQuiz, curriculum: e.target.value })}
                      className="px-4 py-2 border border-blue-300 rounded-lg"
                    >
                      <option value="Cambridge">Cambridge</option>
                      <option value="Edexcel">Edexcel</option>
                      <option value="Local">Local</option>
                    </select>
                    <textarea
                      placeholder="Description"
                      value={newQuiz.description}
                      onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                      className="px-4 py-2 border border-blue-300 rounded-lg md:col-span-2"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Questions</h4>
                    {newQuiz.questions.map((q, idx) => (
                      <div key={idx} className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <input
                          type="text"
                          placeholder="Question"
                          value={q.question}
                          onChange={(e) => {
                            const questions = [...newQuiz.questions];
                            questions[idx].question = e.target.value;
                            setNewQuiz({ ...newQuiz, questions });
                          }}
                          className="w-full px-4 py-2 border border-blue-300 rounded-lg mb-2"
                          required
                        />
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center mb-2">
                            <input
                              type="radio"
                              name={`correct-${idx}`}
                              checked={q.correctAnswer === optIdx}
                              onChange={() => {
                                const questions = [...newQuiz.questions];
                                questions[idx].correctAnswer = optIdx;
                                setNewQuiz({ ...newQuiz, questions });
                              }}
                              className="mr-2"
                            />
                            <input
                              type="text"
                              placeholder={`Option ${optIdx + 1}`}
                              value={opt}
                              onChange={(e) => {
                                const questions = [...newQuiz.questions];
                                questions[idx].options[optIdx] = e.target.value;
                                setNewQuiz({ ...newQuiz, questions });
                              }}
                              className="flex-1 px-4 py-2 border border-blue-300 rounded-lg"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setNewQuiz({
                          ...newQuiz,
                          questions: [...newQuiz.questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }],
                        });
                      }}
                      className="text-blue-700 hover:text-blue-900 text-sm"
                    >
                      + Add Question
                    </button>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Create Quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQuizForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-xl shadow-md p-6 border border-red-300">
                  <FileText className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Grade {quiz.grade}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {quiz.questions.length} Questions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <h2 className="text-2xl font-semibold text-red-400 mb-6">Students</h2>
            <div className="bg-white rounded-xl shadow-md border border-red-300 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-red-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-red-600 mr-2" />
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Grade {student.grade || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-red-400">Announcements</h2>
              <button
                onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}
                className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Post Announcement</span>
              </button>
            </div>

            {showAnnouncementForm && (
              <form onSubmit={handleAddAnnouncement} className="bg-white p-6 rounded-xl shadow-md mb-6 border border-red-300">
                <h3 className="text-xl font-semibold text-red-800 mb-4">New Announcement</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    className="w-full px-4 py-2 border border-red-300 rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    className="w-full px-4 py-2 border border-red-300 rounded-lg"
                    rows={5}
                    required
                  />
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    type="submit"
                    className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition"
                  >
                    <Megaphone className="h-4 w-4 inline mr-2" />
                    Post Announcement
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-xl shadow-md p-6 border border-red-300">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-red-800">{announcement.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

