import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ArrowRight, Calculator, Users, Award } from 'lucide-react';

export default function Home() {
  const grades = [6, 7, 8, 9, 10, 11];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to O/L Mathematics LMS
            </h1>
            <p className="text-xl md:text-2xl text-red-200 mb-8">
              Comprehensive Mathematics Education for Grades 6-11
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/auth"
                className="bg-red-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition border-2 border-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grades Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-400 mb-4">Available Grades</h2>
            <p className="text-lg text-gray-300">
              Select your grade level to explore course materials
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {grades.map((grade) => (
              <Link
                key={grade}
                to="/auth"
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-red-300 p-6 text-center group"
              >
                <GraduationCap className="h-12 w-12 text-red-800 mx-auto mb-3 group-hover:scale-110 transition" />
                <h3 className="text-2xl font-bold text-red-800">Grade {grade}</h3>
                <ArrowRight className="h-5 w-5 text-red-600 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-16 w-16 text-red-800 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-red-800 mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of learners and excel in mathematics
          </p>
          <Link
            to="/auth"
            className="inline-block bg-red-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-900 transition shadow-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

