import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Learn Smarter, Score Better
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Your complete study companion for Ghanaian students from Basic 1 to SHS 3
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isAuthenticated ? (
            <>
              <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/notes" className="btn btn-outline text-lg px-8 py-3">
                Browse Notes
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-3">
                Go to Dashboard
              </Link>
              <Link to="/quizzes" className="btn btn-secondary text-lg px-8 py-3">
                Take a Quiz
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <div className="card animate-slide-up">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-semibold mb-2">Comprehensive Notes</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Well-organized study notes covering all subjects from Basic 1 to SHS 3
          </p>
        </div>

        <div className="card animate-slide-up animate-delay-100">
          <div className="text-4xl mb-4">🎥</div>
          <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Learn with embedded YouTube videos explaining complex topics
          </p>
        </div>

        <div className="card animate-slide-up animate-delay-200">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold mb-2">Practice Quizzes</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge with quizzes and get instant feedback
          </p>
        </div>

        <div className="card animate-slide-up animate-delay-300">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your performance and identify areas for improvement
          </p>
        </div>

        <div className="card animate-slide-up animate-delay-100">
          <div className="text-4xl mb-4">🌙</div>
          <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Study comfortably with our eye-friendly dark mode
          </p>
        </div>

        <div className="card animate-slide-up animate-delay-200">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Access your study materials anywhere, on any device
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="gradient-primary rounded-2xl p-12 text-white text-center mb-16">
        <h2 className="text-3xl font-display font-bold mb-8">Trusted by Students Across Ghana</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-5xl font-bold mb-2">12+</div>
            <div className="text-xl">Grade Levels</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">20+</div>
            <div className="text-xl">Subjects</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">100+</div>
            <div className="text-xl">Practice Questions</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      {!isAuthenticated && (
        <div className="text-center py-12">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Ace Your Exams?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of students improving their grades
          </p>
          <Link to="/register" className="btn btn-primary text-lg px-8 py-3 inline-block">
            Create Free Account
          </Link>
        </div>
      )}
    </div>
  );
}
