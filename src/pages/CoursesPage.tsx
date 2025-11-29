import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import { Plus } from 'lucide-react';
import { coursesAPI } from '../services/api';
import { Course } from '../types';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-2">Manage course catalog</p>
        </div>
        {isAdmin && (
          <Button icon={<Plus className="w-5 h-5" />}>Add Course</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.code}</p>
              </div>
              <span className="badge badge-primary">{course.credits} Credits</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{course.description || 'No description'}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Avg: <strong>{course.averageGrade?.toFixed(2) || 'N/A'}</strong>
              </span>
              <span className="text-gray-600">
                Students: <strong>{course.enrolledStudents || 0}</strong>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
