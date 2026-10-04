import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Phone, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import profileData from '../data/profile.json';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#10b981', '#ffffff', '#818cf8']
      });
    } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in your name, email, and message.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setStatusMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Path A: If EmailJS environment variables are configured
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'Portfolio Inquiry',
            message: formData.message,
            to_name: profileData.name
          },
          publicKey
        );

        setStatus('success');
        setStatusMessage(`Message delivered! Sent directly to ${profileData.email}.`);
        setFormData({ name: '', email: '', subject: '', message: '' });
        triggerConfetti();
        return;
      } catch (err) {
        console.warn('EmailJS delivery failed, trying FormSubmit pipeline:', err);
      }
    }

    // Path B: Direct Email dispatch to arghakundu9999@gmail.com via FormSubmit.co
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profileData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject 
            ? `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`
            : `[Portfolio Message] New message from ${formData.name}`,
          message: formData.message,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setStatusMessage(`Message sent successfully! It has been delivered directly to ${profileData.email}.`);
        setFormData({ name: '', email: '', subject: '', message: '' });
        triggerConfetti();
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        // First-time setup: FormSubmit sends a 1-time activation confirmation to Argha's Gmail
        setStatus('activation_needed');
        setStatusMessage(
          `One-time activation required: FormSubmit has sent a confirmation email to ${profileData.email}. Please open Gmail and click "Activate Form" once. After activating, all future visitor messages will arrive directly in your inbox!`
        );
      } else {
        throw new Error(data.message || 'Delivery service returned an unexpected status.');
      }
    } catch (err) {
      console.error('Email delivery error:', err);
      setStatus('error');
      setStatusMessage(
        'Unable to send message automatically through the web gateway. You can send it directly to my email below:'
      );
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-header">
            <span className="section-label">// Get In Touch</span>
            <h2 className="section-title">Let's build something.</h2>
            <p className="section-desc">
              Have an interesting project, opportunity, or idea? Let's talk.
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Details & Info Card */}
            <div className="contact-info-card card">
              <h3 className="contact-info-title">Contact Information</h3>
              <p className="contact-info-desc">
                Feel free to reach out directly via email, message on LinkedIn, or submit the contact form.
              </p>

              <div className="contact-details-list">
                <a 
                  href={`mailto:${profileData.email}`} 
                  className="contact-detail-row"
                  title="Send email"
                >
                  <div className="contact-icon-box">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="detail-label">Email</span>
                    <strong className="detail-value">{profileData.email}</strong>
                  </div>
                </a>

                <div className="contact-detail-row">
                  <div className="contact-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="detail-label">Location</span>
                    <strong className="detail-value">{profileData.location}</strong>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-icon-box">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="detail-label">Availability</span>
                    <strong className="detail-value">Open to Backend & AI engineering discussions</strong>
                  </div>
                </div>
              </div>

              <div className="contact-direct-actions">
                <a
                  href={`mailto:${profileData.email}?subject=Hello%20from%20Portfolio`}
                  className="btn btn-secondary btn-sm"
                >
                  <Mail size={14} />
                  <span>Direct Mail</span>
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <span>LinkedIn Message</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="contact-form-card card">
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Engineering Discussion"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className="form-input form-textarea"
                  />
                </div>

                {/* Status Feedback Messages */}
                {status === 'success' && (
                  <div className="form-status-alert alert-success" role="alert">
                    <CheckCircle2 size={18} />
                    <div>
                      <strong>Success!</strong>
                      <p className="status-text">{statusMessage || 'Your message has been delivered to Argha.'}</p>
                    </div>
                  </div>
                )}

                {status === 'activation_needed' && (
                  <div className="form-status-alert alert-info" role="alert">
                    <AlertCircle size={18} />
                    <div>
                      <strong>1-Time Activation Email Sent</strong>
                      <p className="status-text">{statusMessage}</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="form-status-alert alert-error" role="alert">
                    <AlertCircle size={18} />
                    <div className="status-error-content">
                      <p className="status-text">{statusMessage || 'Something went wrong. Please try again.'}</p>
                      <a
                        href={`mailto:${profileData.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Message')}&body=${encodeURIComponent(`Hi Argha,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`}
                        className="btn btn-secondary btn-xs mail-fallback-btn"
                      >
                        <Mail size={13} />
                        <span>Send via Email Client / Gmail</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary submit-btn"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="spinner-dots"></span>
                        <span>Dispatching to Email...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <div className="form-email-guarantee">
                    <CheckCircle2 size={13} />
                    <span>Directly notifies Argha at {profileData.email}</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
