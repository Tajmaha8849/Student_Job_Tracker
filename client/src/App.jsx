import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import { BriefcaseIcon } from 'lucide-react';

function App() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSubmit = async (jobData) => {
    try {
      await axios.post(`${API_URL}/jobs`, jobData);
      fetchJobs();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/jobs/${id}`, { status: newStatus });
      fetchJobs();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredJobs = jobs
    .filter(job => statusFilter === 'All' || job.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Student Job Tracker</h1>
            </div>
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="All">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
          
          <div className="mb-8">
            <JobForm onSubmit={handleSubmit} />
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <JobList
              jobs={filteredJobs}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;