
import React from 'react';
import { motion } from 'framer-motion';

const RecentActivity = () => {
  const recentActivity = [
    {
      type: 'payment',
      description: 'New payment submission from John Doe',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      type: 'member',
      description: 'New member registration: Jane Smith',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      type: 'announcement',
      description: 'Mobile Banking Update announcement published',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      type: 'event',
      description: 'Community Meeting event created',
      time: '1 day ago',
      status: 'completed'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-3 h-3 rounded-full mt-2 ${
              activity.status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'
            }`}></div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 mb-1">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
        View All Activity
      </button>
    </motion.div>
  );
};

export default RecentActivity;
