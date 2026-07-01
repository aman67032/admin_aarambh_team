'use client';

import React, { useState } from 'react';
import { api, DistributionStats } from '../../lib/api';

export default function StudentDistribution() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewStats, setPreviewStats] = useState<DistributionStats | null>(null);
  const [previewStudents, setPreviewStudents] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await api.distribution.preview(file);
      if (response.success) {
        setPreviewStats(response.stats);
        setPreviewStudents(response.students);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error parsing CSV file.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (previewStudents.length === 0) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await api.distribution.confirm(previewStudents);
      if (response.success) {
        setSuccessMessage(response.message);
        setPreviewStats(null);
        setPreviewStudents([]);
        setFile(null);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error saving distribution.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-foreground">Student Distribution Portal</h1>
        <p className="text-sm text-text-muted font-semibold mt-1">Upload student data to run the automated regional, gender, and course allocation algorithm.</p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <span className="text-xl">✅</span>
          <div>
            <span className="font-extrabold block">Success!</span>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <span className="text-xl">❌</span>
          <div>
            <span className="font-extrabold block">Error</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {!previewStats && (
        /* Upload Panel */
        <div className="glass-card p-10 max-w-xl mx-auto flex flex-col items-center">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full h-64 border-2 border-dashed border-card-border rounded-3xl flex flex-col items-center justify-center p-6 bg-card-bg/50 hover:bg-background/80 transition-all cursor-pointer relative group"
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</span>
            <span className="text-sm font-bold text-foreground">
              {file ? file.name : 'Drag & drop student registration CSV here'}
            </span>
            <span className="text-xs text-text-muted font-semibold mt-2">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Or click to browse files'}
            </span>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`mt-8 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg cursor-pointer flex items-center gap-2 ${
              file && !loading ? 'bg-primary hover:bg-primary-hover shadow-indigo-100' : 'bg-slate-300 shadow-none cursor-not-allowed'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Process and Preview
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {previewStats && (
        /* Preview Results Panel */
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground font-outfit">Allocation Preview</h2>
              <p className="text-sm text-text-muted font-semibold">Review the distribution parameters before confirming save to the database.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPreviewStats(null);
                  setPreviewStudents([]);
                  setFile(null);
                }}
                className="px-5 py-2.5 rounded-full border border-card-border text-text-muted hover:bg-card-bg/50 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Confirm & Save Distribution
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Students</span>
              <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{previewStats.totalStudents}</div>
            </div>
            <div className="glass-card p-6">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">North classification</span>
              <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{previewStats.northCount}</div>
            </div>
            <div className="glass-card p-6">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">South classification</span>
              <div className="text-3xl font-extrabold font-outfit text-foreground mt-2">{previewStats.southCount}</div>
            </div>
          </div>

          {/* Cohorts Allocations Details */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-card-border">
              <h3 className="text-lg font-extrabold font-outfit text-foreground">Cohort Breakdowns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-card-bg/50 border-b border-card-border text-xs font-bold text-text-muted uppercase">
                    <th className="p-4">Cohort</th>
                    <th className="p-4">Cluster</th>
                    <th className="p-4">Allocated Count</th>
                    <th className="p-4">Gender (M/F)</th>
                    <th className="p-4">Course Ratio (BTech / BBA / BDes)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border font-semibold text-foreground">
                  {previewStats.cohorts.map((cohort) => (
                    <tr key={cohort.cohortName} className="hover:bg-card-bg/50/50">
                      <td className="p-4 font-bold text-foreground">{cohort.cohortName}</td>
                      <td className="p-4">{cohort.cluster}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          cohort.total > 10 ? 'bg-amber-100 text-amber-800' : 'bg-background/80 text-foreground'
                        }`}>
                          {cohort.total}
                        </span>
                      </td>
                      <td className="p-4">
                        <span>{cohort.males} M / {cohort.females} F</span>
                      </td>
                      <td className="p-4 text-xs">
                        <span>B.Tech: {cohort.btech} | BBA: {cohort.bba} | B.Des: {cohort.bdes}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
