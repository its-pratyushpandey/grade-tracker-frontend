import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import { Modal } from '../components/ui/Modal';
import { Student } from '../types';
import { studentsAPI, gradesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    enrollmentId: '',
  });
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await studentsAPI.getAllWithoutPagination();
      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadStudents();
      return;
    }

    try {
      const response = await studentsAPI.search(searchQuery);
      setStudents(response.data.content);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedStudent) {
        await studentsAPI.update(selectedStudent.id, formData);
        toast.success('Student updated successfully');
      } else {
        await studentsAPI.create(formData);
        toast.success('Student created successfully');
      }
      setShowModal(false);
      loadStudents();
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await studentsAPI.delete(id);
      toast.success('Student deleted successfully');
      loadStudents();
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phoneNumber: student.phoneNumber || '',
      enrollmentId: student.enrollmentId || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      enrollmentId: '',
    });
    setSelectedStudent(null);
  };

  const getStatusColor = (average?: number) => {
    if (!average) return 'bg-gray-100 text-gray-800';
    if (average >= 90) return 'bg-green-100 text-green-800';
    if (average >= 80) return 'bg-blue-100 text-blue-800';
    if (average >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-2">Manage student information and records</p>
        </div>

        {isAdmin && (
          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            icon={<Plus className="w-5 h-5" />}
          >
            Add Student
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or enrollment ID..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Average</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grades</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{student.phoneNumber}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4">
                    <span className="badge badge-primary">{student.enrollmentId || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    {student.averageGrade ? (
                      <span className={`badge ${getStatusColor(student.averageGrade)}`}>
                        {student.averageGrade.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-gray-400">No grades</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.totalGrades || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleEdit(student)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={selectedStudent ? 'Edit Student' : 'Add Student'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input
                type="text"
                required
                className="input"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input
                type="text"
                required
                className="input"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              required
              className="input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Phone Number</label>
            <input
              type="tel"
              className="input"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Enrollment ID</label>
            <input
              type="text"
              className="input"
              value={formData.enrollmentId}
              onChange={(e) => setFormData({ ...formData, enrollmentId: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {selectedStudent ? 'Update' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
