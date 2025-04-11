import React from 'react';
import { format } from 'date-fns';
import { Trash2, ExternalLink } from 'lucide-react';

export function JobList({ jobs, onDelete, onStatusChange }) {
  const getStatusColor = (status) => {
    const colors = {
      Applied: 'bg-yellow-100 text-yellow-800',
      Interview: 'bg-blue-100 text-blue-800',
      Offer: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{job.company}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{job.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={job.status}
                  onChange={(e) => onStatusChange(job._id, e.target.value)}
                  className={`text-sm rounded-full px-3 py-1 font-semibold ${getStatusColor(job.status)}`}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(new Date(job.appliedDate), 'MMM dd, yyyy')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900"
                >
                  <ExternalLink className="h-5 w-5 inline" />
                </a>
                <button
                  onClick={() => onDelete(job._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5 inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}