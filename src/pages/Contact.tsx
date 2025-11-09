import { useState } from 'react';
import { Mail, MessageSquare, Send, Megaphone, Calendar } from 'lucide-react';
import { dummyAnnouncements } from '../utils/dummyData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to a backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-red-300">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-6 w-6 text-red-800" />
                <h2 className="text-2xl font-semibold text-red-800">Send us a Message</h2>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-300 text-green-700 px-6 py-4 rounded-lg">
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Announcements Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
              <div className="flex items-center space-x-2 mb-4">
                <Megaphone className="h-6 w-6 text-red-800" />
                <h2 className="text-xl font-semibold text-red-800">Announcements</h2>
              </div>
              <div className="space-y-4">
                {dummyAnnouncements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-red-800 text-sm">{announcement.title}</h3>
                      <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{announcement.content}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="h-6 w-6 text-red-800" />
                <h2 className="text-xl font-semibold text-red-800">Contact Information</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Email</p>
                  <p className="text-gray-600">info@lms-mathematics.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Office Hours</p>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

