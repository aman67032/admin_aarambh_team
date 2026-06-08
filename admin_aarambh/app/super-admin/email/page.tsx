'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function EmailSystem() {
  const [testEmail, setTestEmail] = useState('');
  const [subject, setSubject] = useState('Welcome to JKLU Aarambh 2026!');
  const [bodyTemplate, setBodyTemplate] = useState(`<h3>Dear {{name}},</h3>
<p>Congratulations on your admission to the <strong>{{course}}</strong> program at JK Lakshmipat University!</p>
<p>We are thrilled to welcome you to <strong>Aarambh 2026</strong>, our official student orientation program.</p>
<p>To help you settle in, you have been assigned to <strong>Cohort {{cohort}}</strong>.</p>
<p>Your Cohort Leader is <strong>{{cohortLeaderName}}</strong>. You can reach out to them for any queries and document verification at:</p>
<ul>
  <li><strong>Phone:</strong> {{cohortLeaderPhone}}</li>
</ul>
<p>Looking forward to welcoming you on campus!</p>
<br/>
<p>Best Regards,<br/>
<strong>Student Affairs Office</strong><br/>
JK Lakshmipat University, Jaipur</p>`);

  const [bcc, setBcc] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [rateStatus, setRateStatus] = useState<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'send' | 'logs'>('send');

  const fetchLogsAndRate = async () => {
    try {
      const logData = await api.email.getLogs();
      setLogs(logData);
      const rate = await api.email.getRateStatus();
      setRateStatus(rate);
    } catch (err) {
      console.error('Failed to load email system data:', err);
    }
  };

  useEffect(() => {
    fetchLogsAndRate();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLogsAndRate, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSendTrial = async () => {
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const res = await api.email.sendTrial(testEmail || undefined);
      if (res.success) {
        setSuccessMsg(res.message);
        fetchLogsAndRate();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending trial email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendBulk = async () => {
    if (!confirm('Are you sure you want to trigger emails to ALL distributed students?')) return;
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const res = await api.email.sendBulk({
        subject,
        bodyTemplate,
        bcc: bcc || undefined
      });
      if (res.success) {
        setSuccessMsg(res.message);
        fetchLogsAndRate();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error triggering bulk emails.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-slate-900">Email Outreach Center</h1>
        <p className="text-sm text-slate-500 font-semibold mt-1">Send communication emails to new students using Outlook SMTP. CCs Cohort Leaders and respects strict rate limits.</p>
      </div>

      {/* Success/Error alerts */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <span className="text-xl">✅</span>
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <span className="text-xl">❌</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tabs & Quota display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left/Middle content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex border-b border-card-border gap-6">
            <button
              onClick={() => setActiveTab('send')}
              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'send' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
              }`}
            >
              Compose & Send
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'logs' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
              }`}
            >
              Email Logs ({logs.length})
            </button>
          </div>

          {activeTab === 'send' ? (
            /* Compose Tab */
            <div className="glass-card p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 font-semibold"
                    placeholder="Enter email subject"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">HTML Body Template</label>
                  <textarea
                    rows={12}
                    value={bodyTemplate}
                    onChange={(e) => setBodyTemplate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">
                    Available variables: &#123;&#123;name&#125;&#125;, &#123;&#123;applicationNo&#125;&#125;, &#123;&#123;course&#125;&#125;, &#123;&#123;cohort&#125;&#125;, &#123;&#123;cohortLeaderName&#125;&#125;, &#123;&#123;cohortLeaderPhone&#125;&#125;
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom BCC Addresses (Optional, comma-separated)</label>
                  <input
                    type="text"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 font-medium"
                    placeholder="e.g. registrar@jklu.edu.in, dean@jklu.edu.in"
                  />
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">
                    Note: deepaksogani@jklu.edu.in is automatically BCC&apos;d on all student emails.
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={handleSendBulk}
                  disabled={loading || !rateStatus?.allowed}
                  className={`px-6 py-3 rounded-full text-xs font-bold text-white shadow-md cursor-pointer ${
                    rateStatus?.allowed && !loading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed shadow-none'
                  }`}
                >
                  {loading ? 'Sending...' : 'Trigger Bulk Mail to All Students'}
                </button>
              </div>
            </div>
          ) : (
            /* Logs Tab */
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-card-border text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Recipient</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {logs.map((log) => (
                      <tr key={log._id} className="hover:bg-slate-50/50">
                        <td className="p-4 truncate max-w-[150px]" title={log.to}>{log.to}</td>
                        <td className="p-4 truncate max-w-[200px]" title={log.subject}>{log.subject}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            log.status === 'sent' ? 'bg-emerald-50 text-emerald-600' :
                            log.status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {log.status}
                          </span>
                          {log.errorMessage && (
                            <span className="text-[10px] text-red-500 font-normal block mt-1 max-w-[150px] truncate" title={log.errorMessage}>
                              {log.errorMessage}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-xs text-slate-400">
                          {log.sentAt ? new Date(log.sentAt).toLocaleTimeString() : new Date(log.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                    {logs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-slate-400 font-bold">No emails sent yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Quota Gauges and Trial Send */}
        <div className="space-y-6">
          {/* Quota gauges */}
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-md font-extrabold text-slate-900 font-outfit">Outbox Quota Status</h3>
            
            {rateStatus && (
              <div className="space-y-6 font-semibold">
                {/* Hourly limit check */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Hourly Limit</span>
                    <span className="text-slate-800">{rateStatus.hourlyCount} / {rateStatus.hourlyLimit}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rateStatus.hourlyCount >= rateStatus.hourlyLimit ? 'bg-red-500' :
                        rateStatus.hourlyCount >= rateStatus.hourlyLimit * 0.8 ? 'bg-amber-500' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min((rateStatus.hourlyCount / rateStatus.hourlyLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Daily limit check */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Daily Limit</span>
                    <span className="text-slate-800">{rateStatus.dailyCount} / {rateStatus.dailyLimit}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rateStatus.dailyCount >= rateStatus.dailyLimit ? 'bg-red-500' :
                        rateStatus.dailyCount >= rateStatus.dailyLimit * 0.8 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min((rateStatus.dailyCount / rateStatus.dailyLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {!rateStatus.allowed && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-800 text-[10px] font-bold">
                    ⚠️ Sending is blocked temporarily: {rateStatus.reason}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trial mail sender */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-md font-extrabold text-slate-900 font-outfit">Outlook SMTP Trial Mail</h3>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Verify SMTP server connectivity by sending a test email. Leave blank to send to yourself.
            </p>
            <div>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test-email@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
              />
            </div>
            <button
              onClick={handleSendTrial}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-all cursor-pointer"
            >
              {loading ? 'Sending...' : 'Send Trial Mail'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
