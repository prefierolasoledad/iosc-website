'use client';
import axios from 'axios';
import { useState } from 'react';
import { Orbitron } from "next/font/google";
const orbitron = Orbitron({ weight: '900', subsets: ['latin'] });

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    yearBranch: '',
    event: '',
    teamName: '',
    teamMembers: '',
    github: '',
    linkedin: '',
  });

  const [loading, setLoading] = useState(false); // ✅ NEW STATE
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validateGmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateGitHub = (url) => /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/.test(url);
  const validateLinkedIn = (url) => /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/.test(url);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, github, linkedin } = formData;

    if (!validateGmail(email)) return alert("Please enter a valid Gmail address.");
    if (!validateGitHub(github)) return alert("Please enter a valid GitHub profile link.");
    if (!validateLinkedIn(linkedin)) return alert("Please enter a valid LinkedIn profile link.");

    setLoading(true);

    // ✅ Show your popup immediately (don’t create a new one)
    setShowSuccessPopup(true);

    const formPayload = new FormData();
    for (const key in formData) {
        formPayload.append(key, formData[key]);
    }

    try {
        await axios.post('https://my-backend-u5jv.onrender.com/register', formPayload, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("❌ Something went wrong! Please try again."); 
    }
  };


  return (
    <section className="bg-black text-white py-12 px-4 md:px-20">
      <div className="max-w-4xl mx-auto bg-[#0c0c0c] p-6 md:p-10 rounded-2xl shadow-lg border border-gray-700">
        <h2 className={`${orbitron.className} text-3xl md:text-4xl text-sky-400 mb-8 text-center`}>
          Event Registration
        </h2>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="input" required />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="input" required />
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="input" required />
            <input name="college" value={formData.college} onChange={handleChange} type="text" placeholder="College / University" className="input" required />
            <input name="yearBranch" value={formData.yearBranch} onChange={handleChange} type="text" placeholder="Year & Branch" className="input" required />
            <select name="event" value={formData.event} onChange={handleChange} className="input bg-black border-white" required>
              <option value="" className='text-black'>Select Event</option>
              <option value="hackathon" className='text-black'>Hackathon</option>
              <option value="workshop" className='text-black'>Workshop</option>
              <option value="ideathon" className='text-black'>Ideathon</option>
            </select>
          </div>

          <input name="teamName" value={formData.teamName} onChange={handleChange} type="text" placeholder="Team Name" className="input" required />
          <textarea name="teamMembers" value={formData.teamMembers} onChange={handleChange} placeholder="Team Member's Names" className="input h-24" required />

          <div className="grid md:grid-cols-2 gap-6">
            <input name="github" value={formData.github} onChange={handleChange} type="url" placeholder="GitHub Profile Link" className="input" required />
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} type="url" placeholder="LinkedIn Profile Link" className="input" required />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading} // ✅ Disable button while submitting
            className={`mt-8 w-full font-bold py-3 rounded-xl transition duration-300 
            ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {loading ? "Submitted" : "Submit Registration"} {/* ✅ Change text while loading */}
          </button>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-8 max-w-sm w-full shadow-2xl text-center">
            <h3 className="text-xl font-bold mb-4">✅ Registration Successful!</h3>
            <p className="mb-6">Thank you for registering. We’ll contact you soon.</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventRegistrationForm;
