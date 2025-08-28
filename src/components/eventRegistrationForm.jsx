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
    year: '',
    branch:'',
    github: '',
    linkedin: '',
  });

  const [loading, setLoading] = useState(false); // ✅ NEW STATE
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validateGmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const requiredFields = ["fullName", "email", "phone", "college", "year", "branch"];
  const isFormValid = requiredFields.every((field) => formData[field].trim() !== "");

  const handleSubmit = async () => {
    const { email} = formData;
    if (!isFormValid) return alert("Please fill all required fields.");
    if (!validateGmail(email)) return alert("Please enter a valid Gmail address.");
    setLoading(true);

    // ✅ Show your popup immediately (don’t create a new one)
    setShowSuccessPopup(true);

    const formPayload = new FormData();
    for (const key in formData) {
        formPayload.append(key, formData[key]);
    }

    // try {
    //     await axios.post('https://my-backend-u5jv.onrender.com/register', formPayload, {
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    // } catch (error) {
    //     console.error("Error submitting form:", error);
    //     alert("❌ Something went wrong! Please try again."); 
    // }
  };


  return (
    <section className="bg-black text-white py-12 px-4  md:h-[100vh] w-[100vw] items-center md:px-20">
      <div className="max-w-4xl mx-auto bg-[#0c0c0c] p-6 md:p-10 rounded-2xl shadow-lg border border-gray-700">
        <h2 className={`${orbitron.className} text-3xl md:text-4xl text-sky-400 mb-8 text-center`}>
          Event Registration
        </h2>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="input" required />
            <input name="email" value={formData.email} onChange={handleChange} type="text" placeholder="Gmail" className="input" required />
            <input name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="Phone Number" className="input" required />
            <input name="year" value={formData.year} onChange={handleChange} type="text" placeholder="Graduation Year" className="input" required />
            <input name="branch" value={formData.branch} onChange={handleChange} type="text" placeholder="Branch" className="input" required />
            <select name="college" value={formData.college} onChange={handleChange} className="input bg-black border-white" required>
              <option value="" className='text-black'>Select School</option>
              <option value="USAR" className='text-black'>USAR</option>
              <option value="USAP" className='text-black'>USAP</option>
              <option value="USDI" className='text-black'>USDI</option>
              <option value="USMC" className='text-black'>USMC</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input name="github" value={formData.github} onChange={handleChange} type="url" placeholder="GitHub Profile Link (optional)" className="input" />
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} type="url" placeholder="LinkedIn Profile Link (optional)" className="input" />
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
            <h3 className="text-xl font-bold mb-4">
              {/* ✅  */}
              ❌ 
              Registration Closed!</h3>
            <p className="mb-6">Please reach out the core team.</p>
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
