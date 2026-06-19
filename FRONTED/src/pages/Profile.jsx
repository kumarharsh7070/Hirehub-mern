import { useState } from "react";
import api from "../services/api";


function Profile() {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Update profile
    await api.patch("/users/profile", {
      bio,
      skills: skills
        .split(",")
        .map((skill) => skill.trim()),
      education,
      experience,
      github,
      linkedin,
    });

    // Upload profile photo
    if (profilePhoto) {
      const formData = new FormData();

      formData.append(
        "avatar",
        profilePhoto
      );

      const response = await api.post(
        "/users/upload-avatar",
        formData
      );

      console.log(response.data);
    }
   if (resume) {

  const formData =
    new FormData();

  formData.append(
    "resume",
    resume
  );

  const response =
    await api.post(
      "/users/upload-resume",
      formData
    );

  console.log(response.data);
}
    alert("Profile, avatar and resume uploaded successfully!");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }

  
};


  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-8">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Bio */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Bio
            </label>

            <textarea
              rows="4"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Skills
            </label>

            <input
              type="text"
              placeholder="React, Node.js, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Education */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Education
            </label>

            <input
              type="text"
              placeholder="B-tech"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Experience
            </label>

            <input
              type="text"
              placeholder="Fresher / 1 Year"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Github */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              GitHub
            </label>

            <input
              type="url"
              placeholder="https://github.com/username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {/* Linkedin */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              LinkedIn
            </label>

            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {profilePhoto && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {profilePhoto.name}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {resume && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {resume.name}
              </p>
            )}
          </div>
          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;