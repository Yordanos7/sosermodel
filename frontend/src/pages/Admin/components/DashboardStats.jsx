
import React from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { TrendingUp } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const dashboardCards = [
    {
      title: 'Total Members',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Pending Payments',
      value: stats.totalPayments,
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-green-600',
      change: '+5',
      changeType: 'increase'
    },
    {
      title: 'Active Announcements',
      value: stats.totalAnnouncements,
      icon: DocumentTextIcon,
      color: 'from-purple-500 to-purple-600',
      change: '+3',
      changeType: 'increase'
    },
    {
      title: 'Upcoming Events',
      value: stats.totalEvents,
      icon: CalendarDaysIcon,
      color: 'from-orange-500 to-orange-600',
      change: '+2',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {dashboardCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4" />
              <span>{card.change}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {stats.totalUsers === 0 ? (
              <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              card.value.toLocaleString()
            )}
          </h3>
          <p className="text-gray-600 text-sm">{card.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
