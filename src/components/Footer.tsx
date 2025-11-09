import { GraduationCap, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-8 h-8 text-red-600" />
              <span className="text-xl font-bold">MathsCapital LMS</span>
            </div>
            <p className="text-gray-300">
              Empowering students with quality mathematics education for Grades 6-11.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-red-400 transition">Home</a></li>
              <li><a href="/contact" className="hover:text-red-400 transition">Contact</a></li>
              <li><a href="/auth" className="hover:text-red-400 transition">Login</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>mathscapital@lms-mathematics.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+94 77 348 0852</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-red-800 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; 2024 O/L Mathematics LMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

