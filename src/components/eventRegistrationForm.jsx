'use client';
import { useState, useEffect } from 'react';
import { Orbitron } from 'next/font/google';
import axios from 'axios';
import posterImg from '../assets/events/postercampusX.jpg';

const orbitron = Orbitron({ weight: '900', subsets: ['latin'] });

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    // team: '',
    year: '',
    github: '',
    linkedin: '',
    topic: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showMobilePoster, setShowMobilePoster] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 860) {
      setShowMobilePoster(true);
    }
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email } = formData;

    if (!validateEmail(email)) {
      return alert('Please enter a valid email address.');
    }

    if (!formData.fullName || !formData.college || !formData.phone || !formData.branch || !formData.year || !formData.topic) {
      return alert('Please fill out all required fields.');
    }

    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await axios.post(`${baseUrl}/register`, formData);

      setSubmitOk(true);
      setPopupMessage('Registration successful.');
      setShowPopup(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitOk(false);
      setPopupMessage('Registration failed. Please try again.');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  // Topic options with nested sub-topics
  const topicOptions = [
    { value: 'RAG', label: 'RAG' },
    { value: 'GenAI-Future', label: 'Gen-AI and LLMs — Future' },
    { value: 'GenAI-Limitations', label: 'Gen-AI and LLMs — Limitations' },
    { value: 'GenAI-RealWorld', label: 'Gen-AI and LLMs — Real World Projects' },
    { value: 'NLP', label: 'NLP and its Applications' },
    { value: 'VectorRAG-vs-Vectorless', label: 'Vector RAG vs Vectorless RAG' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── SPLIT LAYOUT: full viewport, no outer scroll ── */
        .page-wrapper {
          height: 100vh;
          width: 100vw;
          display: flex;
          background: #000;
          color: #fff;
          font-family: 'Rajdhani', sans-serif;
          overflow: hidden;
        }

        /* ────────────────────────────
           LEFT PANEL — poster / branding
        ──────────────────────────── */
        .left-panel {
          width: 44%;
          height: 100vh;
          flex-shrink: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(ellipse 90% 70% at 50% 30%, #0c2030 0%, #000 75%);
        }

        /* Animated grid lines */
        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPan 20s linear infinite;
          z-index: 0;
        }

        /* Soft right-edge fade blending into form panel */
        .left-panel::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 90px; height: 100%;
          background: linear-gradient(to right, transparent, #000);
          z-index: 2;
        }

        @keyframes gridPan {
          from { background-position: 0 0; }
          to   { background-position: 40px 40px; }
        }

        /* Glowing orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.28;
          pointer-events: none;
        }
        .orb-1 { width: 380px; height: 380px; background: #0ea5e9; top: -100px; left: -80px; z-index: 1; }
        .orb-2 { width: 260px; height: 260px; background: #6366f1; bottom: -30px; right: 30px; z-index: 1; }

        /* Content inside left panel */
        .poster-inner {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 36px;
          width: 100%;
        }

        .poster-img {
          width: 100%;
          max-width: 340px;
          border-radius: 12px;
          border: 1px solid rgba(56,189,248,0.25);
          box-shadow: 0 8px 40px rgba(14,165,233,0.18);
          margin-bottom: 24px;
        }

        .poster-badge {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: #38bdf8;
          text-transform: uppercase;
          border: 1px solid rgba(56,189,248,0.35);
          padding: 4px 14px;
          border-radius: 2px;
          margin-bottom: 14px;
        }

        .poster-title {
          font-size: clamp(1.7rem, 2.8vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -1px;
          text-align: center;
          line-height: 1;
          background: linear-gradient(135deg, #e0f2fe 0%, #38bdf8 50%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .poster-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(0.58rem, 0.9vw, 0.78rem);
          color: #94a3b8;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-top: 8px;
          text-align: center;
        }

        .poster-divider {
          width: 56px;
          height: 2px;
          background: linear-gradient(90deg, #0ea5e9, #6366f1);
          margin: 18px auto 0;
        }

        .poster-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
        }

        .poster-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          padding: 4px 10px;
          border: 1px solid rgba(99,102,241,0.4);
          border-radius: 2px;
          color: #a5b4fc;
          letter-spacing: 1px;
          background: rgba(99,102,241,0.08);
        }

        /* ────────────────────────────
           RIGHT PANEL — scrollable form
        ──────────────────────────── */
        .right-panel {
          flex: 1;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 24px;
          scrollbar-width: thin;
          scrollbar-color: #1e3a5f #000;
        }

        .right-panel::-webkit-scrollbar { width: 4px; }
        .right-panel::-webkit-scrollbar-track { background: #000; }
        .right-panel::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }

        /* ── FORM CARD ── */
        .form-card {
          width: 100%;
          max-width: 540px;
          background: #080c12;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 30px 26px;
          position: relative;
          box-shadow: 0 0 60px rgba(14,165,233,0.06);
        }

        /* Top accent bar */
        .form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #0ea5e9, #6366f1);
          border-radius: 16px 16px 0 0;
        }

        .form-heading {
          text-align: center;
          margin-bottom: 22px;
        }

        .form-heading h2 {
          font-size: clamp(1.1rem, 2vw, 1.6rem);
          color: #38bdf8;
          letter-spacing: 1px;
        }

        .form-heading p {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #475569;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 5px;
        }

        /* ── INPUTS ── */
        .field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .field-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: #64748b;
          text-transform: uppercase;
        }

        .field-label span { color: #f87171; margin-left: 2px; }

        .input-field {
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 7px;
          color: #e2e8f0;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 11px;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .input-field::placeholder { color: #374151; }

        .input-field:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
        }

        select.input-field {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 30px;
          cursor: pointer;
        }

        select.input-field option, .input-field option { background: #0d1117; color: #e2e8f0; }

        .section-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 14px 0;
        }

        /* Topic select – full width */
        .topic-wrapper { margin-top: 2px; }

        /* ── SUBMIT BUTTON ── */
        .submit-btn {
          width: 100%;
          margin-top: 16px;
          padding: 11px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.25s;
        }

        .submit-btn:not(:disabled) {
          background: linear-gradient(135deg, #0369a1, #4f46e5);
          color: #fff;
          box-shadow: 0 4px 20px rgba(14,165,233,0.22);
        }

        .submit-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(14,165,233,0.32);
        }

        .submit-btn:disabled {
          background: #1e293b;
          color: #475569;
          cursor: not-allowed;
        }

        .mobile-poster-btn {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.4);
          color: #38bdf8;
          padding: 10px 20px;
          border-radius: 8px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          cursor: pointer;
          margin-bottom: 24px;
          transition: all 0.2s;
        }
        
        .mobile-poster-btn:hover { background: rgba(14,165,233,0.2); }

        .poster-popup-card {
          position: relative;
          background: #080c12;
          padding: 8px;
          border-radius: 12px;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          box-shadow: 0 0 40px rgba(14,165,233,0.2);
        }

        .poster-popup-img {
          max-width: 100%;
          max-height: calc(90vh - 16px);
          object-fit: contain;
          border-radius: 8px;
        }

        .poster-popup-close {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #080c12;
          color: #fff;
          border: 1px solid #38bdf8;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        /* ── POPUP ── */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .popup-card {
          background: #0c111a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 40px 32px;
          max-width: 380px;
          width: 90%;
          text-align: center;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }

        .popup-icon  { font-size: 48px; margin-bottom: 16px; }

        .popup-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; }
        .popup-title.success { color: #34d399; }
        .popup-title.error   { color: #f87171; }

        .popup-msg {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 28px;
          font-family: 'Share Tech Mono', monospace;
        }

        .popup-btn {
          padding: 10px 32px;
          border: none;
          border-radius: 8px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .popup-btn.success { background: #059669; color: #fff; }
        .popup-btn.error   { background: #dc2626; color: #fff; }
        .popup-btn:hover   { opacity: 0.85; }

        /* ── RESPONSIVE: stack vertically on small screens ── */
        @media (max-width: 860px) {
          .page-wrapper  { flex-direction: column; height: auto; min-height: 100vh; overflow-y: auto; }
          .left-panel    { width: 100%; height: auto; padding: 40px 20px 10px; background: none; }
          .left-panel::after, .left-panel::before, .left-panel .orb { display: none; }
          .right-panel   { height: auto; padding: 10px 16px 48px; }
          .field-grid    { grid-template-columns: 1fr; }
          .poster-img { display: none; }
          .mobile-poster-btn { display: flex; }
        }
      `}</style>

      <div className="page-wrapper">

        {/* ── LEFT PANEL: poster + branding ── */}
        <div className="left-panel">
          <div className="orb orb-1" />
          <div className="orb orb-2" />

          <div className="poster-inner">
            {/* Actual event poster image */}
            <img src={posterImg?.src || posterImg} alt="Event Poster" className="poster-img" />

            <button className="mobile-poster-btn" onClick={() => setShowMobilePoster(true)}>
              🖼️ View Event Poster
            </button>

            <div className="poster-badge">Workshop · April 4,2026</div>
            <h1 className="poster-title">IoSc EDC × CampusX</h1>
            <p className="poster-sub">Intelligence. Innovation. Impact.</p>

            <div className="poster-divider" />

            <div className="poster-tags">
              <span className="poster-tag">RAG</span>
              <span className="poster-tag">Gen-AI &amp; LLMs</span>
              <span className="poster-tag">NLP</span>
              <span className="poster-tag">Vector Search</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: registration form ── */}
        <div className="right-panel">
          <div className="form-card">

            <div className="form-heading">
              <h2 className={orbitron.className}>Event Registration</h2>
              <p>Fill in your details below to register</p>
            </div>

            {/* Row 1: Personal info */}
            <div className="field-grid">
              <div className="field-group">
                <label className="field-label">Full Name <span>*</span></label>
                <input name="fullName" value={formData.fullName} onChange={handleChange}
                  type="text" placeholder="Your full name" className="input-field" required />
              </div>

              <div className="field-group">
                <label className="field-label">Email <span>*</span></label>
                <input name="email" value={formData.email} onChange={handleChange}
                  type="text" placeholder="you@example.com" className="input-field" required />
              </div>

              <div className="field-group">
                <label className="field-label">Phone <span>*</span></label>
                <input name="phone" value={formData.phone} onChange={handleChange}
                  type="text" placeholder="Phone number" className="input-field" required />
              </div>

              <div className="field-group">
                <label className="field-label">Graduation Year <span>*</span></label>
                <input name="year" value={formData.year} onChange={handleChange}
                  type="text" placeholder="e.g. 2026" className="input-field" required />
              </div>

              <div className="field-group">
                <label className="field-label">Branch <span>*</span></label>
                <input name="branch" value={formData.branch} onChange={handleChange}
                  type="text" placeholder="e.g. CSE, ECE" className="input-field" required />
              </div>

              <div className="field-group">
                <label className="field-label">School <span>*</span></label>
                <select name="college" value={formData.college} onChange={handleChange}
                  className="input-field" required>
                  <option value="">Select School</option>
                  <option value="USAR">USAR</option>
                  <option value="USAP">USAP</option>
                  <option value="USDI">USDI</option>
                  <option value="USMC">USMC</option>
                </select>
              </div>

              {/* <select name="team" value={formData.team} onChange={handleChange} className="input-field" required> */}
              {/* <option value="">Select Team</option>
                <option value="Team I3">Team I3</option>
                <option value="Team I5">Team I5</option>
                <option value="Team I7">Team I7</option>
                <option value="Team I9">Team I9</option>
                <option value="Team ARC">Team ARC</option>
              </select> */}
            </div>

            <hr className="section-divider" />

            {/* Topic selection – full width */}
            <div className="field-group topic-wrapper">
              <label className="field-label">Topic of Interest <span>*</span></label>
              <select name="topic" value={formData.topic} onChange={handleChange}
                className="input-field" required>
                <option value="">Select a Topic</option>

                {/* Group 1 */}
                <option value="RAG">RAG</option>

                {/* Group 2 – Gen-AI sub-topics */}
                <optgroup label="Gen-AI and LLMs">
                  <option value="GenAI-Future">Future</option>
                  <option value="GenAI-Limitations">Limitations</option>
                  <option value="GenAI-RealWorld">Real World Projects</option>
                </optgroup>

                {/* Group 3 */}
                <option value="NLP">NLP and its Applications</option>

                {/* Group 4 */}
                <option value="VectorRAG-vs-Vectorless">Vector RAG vs Vectorless RAG</option>
              </select>
            </div>

            <hr className="section-divider" />

            {/* Optional links */}
            <div className="field-grid">
              <div className="field-group">
                <label className="field-label">GitHub <span style={{ color: '#64748b' }}>(optional)</span></label>
                <input name="github" value={formData.github} onChange={handleChange}
                  type="url" placeholder="https://github.com/you" className="input-field" />
              </div>

              <div className="field-group">
                <label className="field-label">LinkedIn <span style={{ color: '#64748b' }}>(optional)</span></label>
                <input name="linkedin" value={formData.linkedin} onChange={handleChange}
                  type="url" placeholder="https://linkedin.com/in/you" className="input-field" />
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading} className="submit-btn">
              {loading ? 'Submitting…' : 'Submit Registration'}
            </button>
          </div>
        </div>

        {/* ── SUCCESS / ERROR POPUP ── */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-card">
              <div className="popup-icon">{submitOk ? '✅' : '❌'}</div>
              <h3 className={`popup-title ${submitOk ? 'success' : 'error'}`}>
                {submitOk ? 'Registration Successful!' : 'Registration Unsuccessful!'}
              </h3>
              <p className="popup-msg">{popupMessage}</p>
              <button
                onClick={() => setShowPopup(false)}
                className={`popup-btn ${submitOk ? 'success' : 'error'}`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ── MOBILE POSTER POPUP ── */}
        {showMobilePoster && (
          <div className="popup-overlay" onClick={() => setShowMobilePoster(false)}>
            <div className="poster-popup-card" onClick={e => e.stopPropagation()}>
              <button className="poster-popup-close" onClick={() => setShowMobilePoster(false)}>✕</button>
              <img src={posterImg?.src || posterImg} alt="Event Poster" className="poster-popup-img" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventRegistrationForm;