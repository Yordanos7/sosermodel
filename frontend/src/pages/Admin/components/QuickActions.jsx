import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  PhotoIcon,
  UsersIcon,
  CreditCardIcon,
  ChartBarIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  getComments,
  updateComment,
  deleteComment,
} from "../../../api/comment";
import { useToast } from "@/components/ui/use-toast";

const QuickActions = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const data = await getComments();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleMarkAsSeen = async (id) => {
    try {
      await updateComment(id, { seen: true });
      toast({
        title: "Success",
        description: "Comment marked as seen.",
      });
      fetchComments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark comment as seen.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      toast({
        title: "Success",
        description: "Comment deleted successfully.",
      });
      fetchComments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment.",
        variant: "destructive",
      });
    }
  };

  const quickActions = [
    {
      title: "Add Announcement",
      description: "Create a new announcement for members",
      icon: DocumentTextIcon,
      link: "/admin/add-announcement",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Add Event",
      description: "Schedule a new community event",
      icon: CalendarDaysIcon,
      link: "/admin/add-event",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Post Vacancy",
      description: "Add a new job vacancy posting",
      icon: BriefcaseIcon,
      link: "/admin/add-vacancy",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Manage Gallery",
      description: "Upload and organize gallery images",
      icon: PhotoIcon,
      link: "/admin/manage-gallery",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "View Users",
      description: "See registered users and their details",
      icon: UsersIcon,
      link: "/admin/users",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Manage Payments",
      description: "View and process payment transactions",
      icon: CreditCardIcon,
      link: "/admin/payments",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Manage Testimonials",
      description: "Create, update, and delete testimonials",
      icon: UsersIcon,
      link: "/admin/manage-testimonials",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Manage Documents",
      description: "Upload and manage documents",
      icon: DocumentTextIcon,
      link: "/admin/manage-documents",
      color: "from-gray-500 to-gray-600",
    },
    {
      title: "Manage Videos",
      description: "Upload and organize videos",
      icon: PhotoIcon,
      link: "/admin/manage-videos",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="lg:col-span-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-2 text-gray-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              to={action.link}
              className="group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
              aria-label={`Navigate to ${action.title}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group-hover:border-blue-300 bg-gray-50/50"
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mr-3`}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 text-base">
                    {action.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {action.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6 mt-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <UsersIcon className="w-6 h-6 mr-2 text-gray-600" />
          Recent Comments
        </h2>
        <div className="space-y-4">
          {comments.slice(0, 5).map((comment) => (
            <div
              key={comment.id}
              className={`p-4 border rounded-lg ${
                comment.seen ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-sm text-gray-500">{comment.email}</p>
                  <p className="text-sm text-gray-500">{comment.phone}</p>
                  <p className="mt-2">{comment.comment}</p>
                </div>
                <div className="flex space-x-2">
                  {!comment.seen && (
                    <button
                      onClick={() => handleMarkAsSeen(comment.id)}
                      className="p-2 text-green-500 hover:text-green-700"
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickActions;
