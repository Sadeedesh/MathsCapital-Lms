import { useParams, Link } from 'react-router-dom';
import { Download, ArrowLeft, BookOpen, Video } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { dummyLessons } from '../utils/dummyData';

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = dummyLessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Lesson Not Found</h2>
          <p className="text-gray-300 mb-4">The lesson you're looking for doesn't exist.</p>
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

  const handleDownloadPDF = () => {
    if (lesson.pdfUrl) {
      // In a real app, this would trigger a download
      window.open(lesson.pdfUrl, '_blank');
    } else {
      alert('PDF not available for this lesson');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/student"
            className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-red-400 mb-2">{lesson.title}</h1>
          <p className="text-lg text-gray-300">{lesson.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Grade {lesson.grade}
            </span>
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-300">
              {lesson.curriculum}
            </span>
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-300">
              {lesson.topic}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Section */}
            {lesson.videoUrl && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
                <div className="flex items-center space-x-2 mb-4">
                  <Video className="h-6 w-6 text-red-800" />
                  <h2 className="text-2xl font-semibold text-red-800">Video Lesson</h2>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={lesson.videoUrl}
                    title={lesson.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Notes Section */}
            {lesson.notes && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-6 w-6 text-red-800" />
                  <h2 className="text-2xl font-semibold text-red-800">Lesson Notes</h2>
                </div>
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown>{lesson.notes}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download PDF Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Resources</h3>
              {lesson.pdfUrl ? (
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-red-800 text-white px-4 py-3 rounded-lg hover:bg-red-900 transition flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download PDF</span>
                </button>
              ) : (
                <p className="text-gray-600 text-sm">No PDF available for this lesson.</p>
              )}
            </div>

            {/* Lesson Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Lesson Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Grade:</span>
                  <span className="ml-2 text-gray-600">Grade {lesson.grade}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Curriculum:</span>
                  <span className="ml-2 text-gray-600">{lesson.curriculum}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Topic:</span>
                  <span className="ml-2 text-gray-600">{lesson.topic}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

