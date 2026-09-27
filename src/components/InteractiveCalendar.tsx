import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle, User, Mail, FileText } from 'lucide-react';

export const InteractiveCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 1: Date/Time, 2: Details, 3: Success

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      fullString: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
  });

  const times = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStep(3);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-brand-card/30 backdrop-blur-md rounded-2xl border border-brand-border p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-accent">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-brand-text">30-Minute Intro Call</h4>
          <p className="text-sm text-brand-muted">Book a 30-minute intro call with Sumant</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm font-medium text-brand-text mb-3 block">Select a Date</span>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {days.map((d, index) => {
                  const isSelected = selectedDate === d.fullString;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d.fullString);
                        setSelectedTime('');
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-brand-primary border-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/20 scale-105 ring-2 ring-brand-primary/50'
                          : 'bg-brand-bgSec/60 border-brand-border text-brand-muted hover:border-brand-accent/50 hover:text-brand-text'
                      }`}
                    >
                      <span className="text-xs uppercase">{d.dayName}</span>
                      <span className="text-lg font-bold my-0.5">{d.dateNum}</span>
                      <span className="text-[10px]">{d.month}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-brand-text mb-3 block">Select a Time (IST)</span>
              {!selectedDate ? (
                <div className="p-4 bg-brand-bgSec/30 border border-brand-border/40 rounded-xl text-center">
                  <p className="text-xs text-brand-muted">Select a date to view available times</p>
                </div>
              ) : times.length === 0 ? (
                <div className="p-4 bg-brand-bgSec/30 border border-brand-border/40 rounded-xl text-center">
                  <p className="text-xs text-brand-muted">No available slots for this date</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {times.map((t, index) => {
                    const isSelected = selectedTime === t;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`flex items-center justify-center p-3 rounded-xl border text-sm transition-all ${
                          isSelected
                            ? 'bg-brand-primary border-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/20 scale-105'
                            : 'bg-brand-bgSec/60 border-brand-border text-brand-muted hover:border-brand-accent/50 hover:text-brand-text'
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {t}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between">
              {!selectedDate || !selectedTime ? (
                <span className="text-[11px] text-brand-muted">
                  {!selectedDate ? 'Please select a date' : 'Please select a time slot'}
                </span>
              ) : <div></div>}
              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
                className="btn btn-primary px-6 py-2 rounded-xl text-white normal-case font-semibold disabled:opacity-40 flex items-center space-x-1"
              >
                <span>Continue &rarr;</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            onSubmit={handleBooking}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-xl p-3 text-sm text-brand-muted flex items-start space-x-2">
              <CalendarIcon className="w-4 h-4 text-brand-accent mt-0.5" />
              <div>
                <span className="text-brand-text font-medium">Selected Slot: </span>
                <span>{selectedDate} at {selectedTime}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted mb-1 block uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-brand-muted" />
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-bgSec/80 border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted mb-1 block uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-brand-muted" />
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-bgSec/80 border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted mb-1 block uppercase">Topic / Note (Optional)</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-brand-muted" />
                <textarea
                  placeholder="Discussing opportunities, projects, or collaborations..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="w-full bg-brand-bgSec/80 border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-ghost px-4 py-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-transparent normal-case"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary px-6 py-2 rounded-xl text-white normal-case font-semibold"
              >
                Confirm Booking
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            <div>
              <h4 className="text-xl font-bold text-brand-text">Booking Confirmed!</h4>
              <p className="text-sm text-brand-muted mt-2 max-w-sm">
                Thanks, {name}! A calendar invite and Google Meet link have been dispatched to <span className="text-brand-accent">{email}</span>.
              </p>
              <div className="mt-4 inline-block bg-brand-bgSec/60 border border-brand-border rounded-xl px-4 py-2 text-xs text-brand-muted">
                {selectedDate} at {selectedTime}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setSelectedDate('');
                setSelectedTime('');
                setName('');
                setEmail('');
                setNote('');
              }}
              className="btn btn-ghost text-sm text-brand-accent hover:bg-transparent mt-4"
            >
              Book another call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
