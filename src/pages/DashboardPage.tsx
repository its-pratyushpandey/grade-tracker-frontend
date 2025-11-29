import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ChartSkeleton } from '../components/ui/Skeleton';
import { statisticsAPI } from '../services/api';
import { Statistics } from '../types';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

export function DashboardPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatistics = useCallback(async () => {
    try {
      const response = await statisticsAPI.getOverall();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  if (!stats) {
    return <div className="text-center text-gray-600">No data available</div>;
  }

  const gradeDistributionData = useMemo(() => [
    { name: 'A (90-100)', value: stats.distribution.gradeA, color: '#10b981' },
    { name: 'B (80-89)', value: stats.distribution.gradeB, color: '#3b82f6' },
    { name: 'C (70-79)', value: stats.distribution.gradeC, color: '#f59e0b' },
    { name: 'D (60-69)', value: stats.distribution.gradeD, color: '#ef4444' },
    { name: 'F (0-59)', value: stats.distribution.gradeF, color: '#8b5cf6' },
  ], [stats]);

  const coursePerformanceData = useMemo(() => 
    stats.coursePerformances.map(cp => ({
      name: cp.courseCode,
      average: Number(cp.averageGrade.toFixed(2)),
      students: cp.totalStudents,
    })), [stats]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="h-4 w-96 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg p-6 border">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-4" />
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card><ChartSkeleton /></Card>
          <Card><ChartSkeleton /></Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of student performance and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Students</p>
                <p className="text-3xl font-bold mt-2">{stats.totalStudents}</p>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Courses</p>
                <p className="text-3xl font-bold mt-2">{stats.totalCourses}</p>
              </div>
              <BookOpen className="w-12 h-12 text-green-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Grades</p>
                <p className="text-3xl font-bold mt-2">{stats.totalGrades}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Class Average</p>
                <p className="text-3xl font-bold mt-2">{stats.overallAverage?.toFixed(1) || 'N/A'}</p>
              </div>
              <Award className="w-12 h-12 text-orange-200" />
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card title="Grade Distribution" description="Distribution of letter grades">
          <ResponsiveContainer width="100%" height={300} className="touch-pan-y">
            <PieChart>
              <Pie
                data={gradeDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => {
                  // Hide labels on small screens
                  if (window.innerWidth < 640) return '';
                  return `${name}: ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={window.innerWidth < 640 ? 60 : 80}
                fill="#8884d8"
                dataKey="value"
              >
                {gradeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Course Performance */}
        <Card title="Course Performance" description="Average scores by course">
          <ResponsiveContainer width="100%" height={300} className="touch-pan-y">
            <BarChart data={coursePerformanceData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={window.innerWidth < 640 ? -45 : 0}
                textAnchor={window.innerWidth < 640 ? 'end' : 'middle'}
                height={window.innerWidth < 640 ? 60 : 30}
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="average" fill="#3b82f6" name="Average Score" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Students */}
      <Card title="Top Performing Students" description="Students with highest average grades">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Average</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Grades</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.topStudents.slice(0, 5).map((student, index) => (
                <tr key={student.studentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{student.studentName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary-600">
                      {student.averageGrade.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.totalGrades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
