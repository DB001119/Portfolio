import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config.ts';
import { ContactSubmission } from '../services/contactService.ts';

const ContactAdmin: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const q = query(
          collection(db, 'contact-submissions'),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const submissionsData: ContactSubmission[] = [];
        
        querySnapshot.forEach((doc) => {
          submissionsData.push({
            id: doc.id,
            ...doc.data()
          } as ContactSubmission);
        });
        
        setSubmissions(submissionsData);
      } catch (err) {
        setError('Failed to fetch submissions');
        console.error('Error fetching submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center">Loading submissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Contact Form Submissions</h1>
      
      {submissions.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No submissions yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {submission.fullName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {submission.email}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      submission.status === 'new'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : submission.status === 'read'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}
                  >
                    {submission.status}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {submission.timestamp?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Subject: {submission.subject}
                </h4>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {submission.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactAdmin; 