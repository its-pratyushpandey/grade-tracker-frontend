import React from 'react';
import { FileDown, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { exportAPI } from '../services/api';
import { downloadFile } from '../lib/utils';
import toast from 'react-hot-toast';

export function ReportsPage() {
  const handleExport = async (type: string, format: string) => {
    try {
      let response;
      let filename;

      if (type === 'students' && format === 'csv') {
        response = await exportAPI.studentsCSV();
        filename = 'students.csv';
      } else if (type === 'grades' && format === 'csv') {
        response = await exportAPI.gradesCSV();
        filename = 'grades.csv';
      } else if (type === 'grades' && format === 'pdf') {
        response = await exportAPI.gradesPDF();
        filename = 'grades.pdf';
      }

      if (response) {
        downloadFile(response.data, filename!);
        toast.success('Export successful!');
      }
    } catch (error) {
      toast.error('Export failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Export</h1>
        <p className="text-gray-600 mt-2">Download reports in CSV or PDF format</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Students Export" description="Export student information">
          <div className="space-y-3">
            <Button
              onClick={() => handleExport('students', 'csv')}
              variant="secondary"
              className="w-full"
              icon={<FileText className="w-5 h-5" />}
            >
              Export Students (CSV)
            </Button>
          </div>
        </Card>

        <Card title="Grades Export" description="Export all grades and reports">
          <div className="space-y-3">
            <Button
              onClick={() => handleExport('grades', 'csv')}
              variant="secondary"
              className="w-full"
              icon={<FileText className="w-5 h-5" />}
            >
              Export Grades (CSV)
            </Button>
            <Button
              onClick={() => handleExport('grades', 'pdf')}
              variant="secondary"
              className="w-full"
              icon={<FileDown className="w-5 h-5" />}
            >
              Export Grades (PDF)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
