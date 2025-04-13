import React, { useState } from 'react';
import axios from 'axios';

const NotificationResult = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const sendNotification = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/send-notification', {
        title,
        body,
        user_type: selectedOption,
      });

      if (response.data.success) {
        setResult({
          successCount: response.data.response.successCount,
          failureCount: response.data.response.failureCount,
        });
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border border-gray-200">
      <h1 className="text-xl font-semibold mb-4 text-center">Send Notification</h1>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Select Option</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="driver">User</option>
          <option value="normaluser">Driver</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Body</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter message body"
          rows="3"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button
        onClick={sendNotification}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl w-full transition"
        disabled={loading || !title || !body}
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </button>

      {result && (
        <div className="mt-6 bg-green-100 border border-green-400 text-green-800 p-4 rounded-xl">
          <p className="font-medium">Notification sent successfully!</p>
          <p>✅ Success: {result.successCount}</p>
          <p>❌ Failure: {result.failureCount}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationResult;
