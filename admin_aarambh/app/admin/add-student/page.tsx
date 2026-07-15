'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '../../components/Loader';

interface SuccessData {
  sno: number;
  name: string;
  cohort: string;
  cohortLeader: string;
  emailSent: boolean;
}

export default function AddStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessData | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    applicationNo: '',
    email: '',
    mobile: '',
    gender: 'Male',
    course: 'B.Tech',
    specialization: '',
    fatherName: '',
    fatherMobile: '',
    fatherEmail: '',
    pincode: '',
    city: '',
    district: '',
    state: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/admin/register-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to register student.');
      }

      setSuccess(result.student);
      // Reset form
      setFormData({
        name: '',
        applicationNo: '',
        email: '',
        mobile: '',
        gender: 'Male',
        course: 'B.Tech',
        specialization: '',
        fatherName: '',
        fatherMobile: '',
        fatherEmail: '',
        pincode: '',
        city: '',
        district: '',
        state: ''
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">Add New Student</h1>
        <p className="text-sm text-text-muted font-semibold mt-1">
          Manually register a student. They will be auto-assigned to the most underfilled cohort of their course, and an invitation email will be dispatched instantly.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-semibold flex items-center gap-3">
          <span className="text-lg">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-3 text-lg font-bold">
            <span>🎉</span>
            <span>Registration Successful!</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold pt-2">
            <div className="bg-card-bg/30 p-3 rounded-xl border border-card-border/50">
              <span className="text-text-muted text-xs block mb-1">Student Name</span>
              <span className="text-foreground text-base">{success.name}</span>
            </div>
            <div className="bg-card-bg/30 p-3 rounded-xl border border-card-border/50">
              <span className="text-text-muted text-xs block mb-1">Assigned S.No</span>
              <span className="text-foreground text-base">#{success.sno}</span>
            </div>
            <div className="bg-card-bg/30 p-3 rounded-xl border border-card-border/50">
              <span className="text-text-muted text-xs block mb-1">Assigned Cohort</span>
              <span className="text-foreground text-base font-bold text-accent">{success.cohort}</span>
            </div>
            <div className="bg-card-bg/30 p-3 rounded-xl border border-card-border/50">
              <span className="text-text-muted text-xs block mb-1">Cohort Leader</span>
              <span className="text-foreground text-base">{success.cohortLeader}</span>
            </div>
          </div>
          <div className="text-xs pt-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>
              {success.emailSent 
                ? 'Welcome email sent successfully with attachments!' 
                : 'Welcome email template not found or failed to send.'}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-8 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader scale={0.7} label="Registering student & sending email..." />
          </div>
        )}

        {/* Section: Credentials */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-card-border pb-2">Student Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Riddhi Agrawal"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="applicationNo" className="text-xs font-bold text-text-muted uppercase tracking-wider">Application Number <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="applicationNo"
                name="applicationNo"
                value={formData.applicationNo}
                onChange={handleChange}
                placeholder="e.g. JKLU/BDES/2026/0043"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. student@gmail.com"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="mobile" className="text-xs font-bold text-text-muted uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="e.g. +91 9343413508"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="gender" className="text-xs font-bold text-text-muted uppercase tracking-wider">Gender <span className="text-red-500">*</span></label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="course" className="text-xs font-bold text-text-muted uppercase tracking-wider">Course <span className="text-red-500">*</span></label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="BBA">BBA</option>
                <option value="B.Des">B.Des</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="specialization" className="text-xs font-bold text-text-muted uppercase tracking-wider">Specialization (Optional)</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. CS AI"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section: Parent Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-card-border pb-2">Parent Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="fatherName" className="text-xs font-bold text-text-muted uppercase tracking-wider">Parent Name <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="e.g. Vishal Agrawal"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="fatherMobile" className="text-xs font-bold text-text-muted uppercase tracking-wider">Parent Phone <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="fatherMobile"
                name="fatherMobile"
                value={formData.fatherMobile}
                onChange={handleChange}
                placeholder="e.g. +91 9039208000"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="fatherEmail" className="text-xs font-bold text-text-muted uppercase tracking-wider">Parent Email <span className="text-red-500">*</span></label>
              <input
                required
                type="email"
                id="fatherEmail"
                name="fatherEmail"
                value={formData.fatherEmail}
                onChange={handleChange}
                placeholder="e.g. parent@gmail.com"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section: Residential Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-card-border pb-2">Residential Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="pincode" className="text-xs font-bold text-text-muted uppercase tracking-wider">Pincode <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g. 462042"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="city" className="text-xs font-bold text-text-muted uppercase tracking-wider">City <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Bhopal"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="district" className="text-xs font-bold text-text-muted uppercase tracking-wider">District <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Bhopal"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="state" className="text-xs font-bold text-text-muted uppercase tracking-wider">State <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Madhya Pradesh"
                className="w-full bg-card-bg/50 border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover text-accent-foreground font-bold px-8 py-3.5 rounded-xl text-sm transition-transform active:scale-[0.98] shadow-lg shadow-accent/25 hover:shadow-accent/40"
          >
            Register Student & Send Email
          </button>
        </div>
      </form>
    </div>
  );
}
