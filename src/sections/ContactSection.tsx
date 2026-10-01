import React, { useState } from 'react';
import { Mail, MapPin, Send, Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    submitting: boolean;
    success: boolean | null;
    message: string;
  }>({
    submitting: false,
    success: null,
    message: ''
  });

  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'confirm' | 'done'>('date');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableDates = [
    { day: 'Mon', date: 15, full: 'May 15, 2026' },
    { day: 'Tue', date: 16, full: 'May 16, 2026' },
    { day: 'Wed', date: 17, full: 'May 17, 2026' },
    { day: 'Thu', date: 18, full: 'May 18, 2026' },
    { day: 'Fri', date: 19, full: 'May 19, 2026' }
  ];

  const availableTimes = ['10:00 AM', '02:00 PM', '04:30 PM', '07:00 PM'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          submitting: false,
          success: true,
          message: 'Thank you! Your message has been sent successfully. I will get back to you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus({
          submitting: false,
          success: false,
          message: data.message || 'Failed to send message. Please try again later.'
        });
      }
    } catch (err) {
      setFormStatus({
        submitting: false,
        success: false,
        message: 'Network error. Please try again later or reach out directly via email.'
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto">
      <div className="flex flex-col space-y-3 mb-12 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">Contact</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Get in Touch</p>
        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column - Details & Contact Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Let's Connect</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              I am open to new opportunities, software development projects, and technical collaborations. Send me a message using the form below or connect via email.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card card-hover p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Email Me</span>
                <a href="mailto:sumantkumaryadav526@gmail.com" className="text-xs font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block">
                  sumantkumaryadav526@gmail.com
                </a>
              </div>
            </div>

            <div className="card card-hover p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Location</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Bhopal, MP, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="card card-elevated p-6 space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Send a Direct Message</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Sumant Yadav"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="visitor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject *</label>
              <input
                id="subject"
                type="text"
                name="subject"
                required
                placeholder="Project Inquiry / Hiring"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="input-field resize-none"
              ></textarea>
            </div>

            {formStatus.success !== null && (
              <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                formStatus.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50'
              }`}>
                {formStatus.success ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                <span>{formStatus.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus.submitting}
              className="btn-primary w-full py-3 text-xs sm:text-sm font-bold"
            >
              {formStatus.submitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center space-x-3 pt-2 text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Social Links:</span>
            <div className="flex space-x-2">
              <a
                href="https://github.com/Sumantkumaryadav8668"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/yadavsumant/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://leetcode.com/u/Suman_tkumaryadav/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <SiLeetcode className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - 30-Minute Intro Call Booking Widget */}
        <div className="lg:col-span-5 card card-elevated p-6 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Schedule 1-on-1 Intro Call</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">30-Minute Discussion & Technical Review</p>
            </div>
          </div>

          {bookingStep === 'date' && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Select an available date:</span>
              <div className="grid grid-cols-5 gap-2">
                {availableDates.map((item) => (
                  <button
                    key={item.date}
                    onClick={() => {
                      setSelectedDate(item.date);
                      setBookingStep('time');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDate === item.date
                        ? 'bg-blue-600 border-blue-600 text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500/50'
                    }`}
                  >
                    <span className="text-[10px] uppercase block font-bold text-slate-400 dark:text-slate-500">{item.day}</span>
                    <span className="text-sm font-extrabold">{item.date}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {bookingStep === 'time' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Select a time slot:</span>
                <button
                  onClick={() => setBookingStep('date')}
                  className="text-[10px] text-blue-600 dark:text-blue-400 underline hover:text-slate-900 dark:hover:text-white"
                >
                  Change Date
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setBookingStep('confirm');
                    }}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                      selectedTime === time
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500/50'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {bookingStep === 'confirm' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Call Details Summary</span>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p>📅 Date: <span className="font-semibold text-slate-900 dark:text-white">May {selectedDate}, 2026</span></p>
                  <p>⏰ Time: <span className="font-semibold text-slate-900 dark:text-white">{selectedTime} IST</span></p>
                  <p>⏳ Duration: <span className="font-semibold text-slate-900 dark:text-white">30 Minutes</span></p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setBookingStep('time')}
                  className="btn-secondary flex-1 py-2 text-xs"
                >
                  Back
                </button>
                <button
                  onClick={() => setBookingStep('done')}
                  className="btn-primary flex-1 py-2 text-xs"
                >
                  Confirm Slot
                </button>
              </div>
            </div>
          )}

          {bookingStep === 'done' && (
            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Slot Reserved!</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                Your 30-minute intro call slot for May {selectedDate} at {selectedTime} has been reserved. Look forward to connecting!
              </p>
              <button
                onClick={() => {
                  setBookingStep('date');
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                className="text-[10px] text-emerald-800 dark:text-emerald-300 underline font-bold mt-2 inline-block cursor-pointer"
              >
                Book Another Slot
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
