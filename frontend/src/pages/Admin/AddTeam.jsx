import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  addTeamMember,
  fetchTeamMembers,
  deleteTeamMember,
} from "../../api/team";

const AddTeam = () => {
  const { register, handleSubmit, reset } = useForm();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    formData.append("category", data.category);
    formData.append("photo", data.photo[0]);

    try {
      await addTeamMember(formData);
      reset();
      loadMembers();
    } catch (error) {
      setError("Failed to add team member.");
    }
  };

  const loadMembers = async () => {
    try {
      const response = await fetchTeamMembers();
      setMembers(response);
    } catch (error) {
      setError("Failed to fetch team members.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id);
      loadMembers();
    } catch (error) {
      setError("Failed to delete team member.");
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-24">
      <h1 className="text-2xl font-bold mb-4">Add Team Member</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="position" className="block font-medium">
            Position
          </label>
          <input
            type="text"
            id="position"
            {...register("position", { required: true })}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className="w-full border rounded-md p-2"
          >
            <option value="General Assembly">General Assembly</option>
            <option value="Control Committee">Control Committee</option>
            <option value="Executive Leadership">Executive Leadership</option>
            <option value="Division Leadership">Division Leadership</option>
            <option value="Branch Network">Branch Network</option>
            <option value="Our Dedicated Staff">Our Dedicated Staff</option>
            <option value="Our Team Members">Our Team Members</option>
          </select>
        </div>
        <div>
          <label htmlFor="photo" className="block font-medium">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            {...register("photo", { required: true })}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Member
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Manage Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.id} className="border rounded-md p-4">
            <img
              src={`https://soserunion.com/${member.photo}`}
              alt={member.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold">{member.name}</h3>
            <p>{member.position}</p>
            <p className="text-sm text-gray-500">{member.category}</p>
            <button
              onClick={() => handleDelete(member.id)}
              className="bg-red-500 text-white px-2 py-1 mt-2 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTeam;
