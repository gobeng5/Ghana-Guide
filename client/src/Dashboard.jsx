import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../utils/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await progressAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {user?.gradeLevel} Student
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card gradient-primary text-white">
          <h3 className="text-lg font-semibold mb-2">Total Quizzes</h3>
          <p className="text-4xl font-bold">{stats?.totalQuizzes || 0}</p>
        </div>
        <div className="card gradient-accent text-white">
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-4xl font-bold">{stats?.averageScore || 0}%</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <h3 className="text-lg font-semibold mb-2">Study Time</h3>
          <p className="text-4xl font-bold">{Math.round((stats?.totalTimeSpent || 0) / 60)}m</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/notes" className="card hover:scale-105 transition-transform">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">📖</div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Study Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">Browse study materials</p>
            </div>
          </div>
        </Link>

        <Link to="/quizzes" className="card hover:scale-105 transition-transform">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">✅</div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Practice Quizzes</h3>
              <p className="text-gray-600 dark:text-gray-400">Test your knowledge</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      {stats?.recentActivity && stats.recentActivity.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-display font-bold mb-4">Recent Activity</h2>
          <div className="card">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{activity.subject} - {activity.topic}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(activity.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${activity.score >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.score}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
