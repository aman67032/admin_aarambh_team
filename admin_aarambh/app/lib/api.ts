// Type definitions for API requests and responses

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'cluster_head' | 'cohort_leader';
  cluster: string | null;
  cohort: string | null;
  phone?: string;
  studentId?: string;
}

export interface Student {
  _id: string;
  sno: number;
  applicationNo: string;
  name: string;
  gender: 'Male' | 'Female';
  course: 'B.Tech' | 'BBA' | 'B.Des';
  mobile: string;
  email: string;
  fatherName: string;
  fatherMobile: string;
  fatherEmail: string;
  city: string;
  district: string;
  state: string;
  studentUserId: string;
  region: 'North' | 'South';
  cluster: string;
  cohort: string;
  mailReceived: boolean;
  documentsVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  callCount: number;
  callLogs: CallLog[];
  confirmedAarambh: boolean;
  confirmedJklu: boolean;
  notContinuing: boolean;
  notComingAarambh: boolean;
  confirmationNote?: string;
  confirmedAt?: string;
  confirmedBy?: string;
  arrivalCode?: string;
  arrivalInfo?: {
    isFromJaipur: boolean;
    wantsBus?: boolean;
    arrivalDate?: string;
    arrivalTime?: string;
    transportMode?: string;
    pickupPoint?: string;
    city?: string;
    place?: string;
    declaredAt?: string;
  };
}

export interface CallLog {
  _id: string;
  notes: string;
  loggedBy: string;
  loggedByName: string;
  createdAt: string;
  verified?: boolean;
}

export interface CohortStats {
  cohortName: string;
  cluster: string;
  total: number;
  males: number;
  females: number;
  btech: number;
  bba: number;
  bdes: number;
}

export interface DistributionStats {
  totalStudents: number;
  northCount: number;
  southCount: number;
  cohorts: CohortStats[];
  clusters?: any[];
}

export interface DistributionPreviewResponse {
  success: boolean;
  stats: DistributionStats;
  students: any[];
}

const API_BASE = '/api';

// Helper for sending requests
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Include credentials for session cookies
  options.credentials = 'include';
  options.headers = headers;

  const response = await fetch(`${API_BASE}${url}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Auth
  auth: {
    login: (credentials: { email: string; password: string }) => 
      request<{ message: string; token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      }),
    logout: () => 
      request<{ message: string }>('/auth/logout', { method: 'POST' }),
    me: () => 
      request<{ user: User }>('/auth/me')
  },

  // Distribution
  distribution: {
    preview: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return request<DistributionPreviewResponse>('/distribution/preview', {
        method: 'POST',
        body: formData
      });
    },
    confirm: (students: any[]) => 
      request<{ success: boolean; message: string; count: number }>('/distribution/confirm', {
        method: 'POST',
        body: JSON.stringify({ students })
      }),
    getStats: () => 
      request<DistributionStats>('/distribution/stats')
  },

  // Email
  email: {
    sendTrial: (testEmail?: string) => 
      request<{ success: boolean; message: string }>('/email/send-trial', {
        method: 'POST',
        body: JSON.stringify({ testEmail })
      }),
    sendTestBulk: (formData: FormData) => 
      request<{ 
        success: boolean; 
        message: string; 
        sentCount: number; 
        failedCount: number;
        errors: any[];
      }>('/email/send-test-bulk', {
        method: 'POST',
        body: formData
      }),
    sendBulk: (data: { studentIds?: string[]; subject: string; bodyTemplate: string; bcc?: string }) => 
      request<{ 
        success: boolean; 
        message: string; 
        sentCount: number; 
        queuedCount: number; 
        failedCount: number;
        errors: any[];
      }>('/email/send-bulk', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    getRateStatus: () => 
      request<{ 
        success: boolean; 
        allowed: boolean; 
        reason: string | null; 
        hourlyCount: number; 
        hourlyLimit: number; 
        dailyCount: number; 
        dailyLimit: number; 
      }>('/email/rate-status'),
    getLogs: () => 
      request<any[]>('/email/logs'),
    getStudentsStatus: () =>
      request<any[]>('/email/students')
  },

  // Cluster Head Dashboard
  cluster: {
    getCohorts: () => 
      request<{ 
        cluster: string; 
        cohorts: Array<{
          cohortName: string;
          leader: { id: string; name: string; email: string; phone: string } | null;
          students: Student[];
        }>;
        notPublished?: boolean;
      }>('/cluster/cohorts'),
    verifyDocs: (studentId: string, data: { mailReceived: boolean; documentsVerified: boolean }) => 
      request<{ success: boolean; student: Student }>(`/cluster/verify/${studentId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    addCallLog: (studentId: string, notes: string) => 
      request<{ success: boolean; student: Student }>(`/cluster/call-log/${studentId}`, {
        method: 'POST',
        body: JSON.stringify({ notes })
      }),
    confirmStatus: (studentId: string, status: { 
      confirmedAarambh?: boolean; 
      confirmedJklu?: boolean; 
      notContinuing?: boolean; 
      notComingAarambh?: boolean;
      confirmationNote?: string; 
    }) => 
      request<{ success: boolean; student: Student }>(`/cluster/confirm/${studentId}`, {
        method: 'PUT',
        body: JSON.stringify(status)
      }),
    verifyCallLog: (studentId: string, logId: string) =>
      request<{ success: boolean; student: Student }>(`/cluster/verify-call-log/${studentId}/${logId}`, {
        method: 'PUT'
      })
  },

  // Cohort Leader Dashboard
  cohort: {
    getMyStudents: () =>
      request<{
        cohortName: string;
        clusterName: string;
        leaderName: string;
        coordinatorName: string;
        students: Student[];
        notPublished?: boolean;
      }>('/cohort/my-students'),
    addCallLog: (studentId: string, notes: string) =>
      request<{ success: boolean; student: Student }>(`/cohort/call-log/${studentId}`, {
        method: 'POST',
        body: JSON.stringify({ notes })
      })
  },

  // Admin Dashboard
  admin: {
    getOverview: () => 
      request<{
        summary: {
          totalStudents: number;
          verified: number;
          totalCalls: number;
          confirmedAarambh: number;
          confirmedJklu: number;
          notContinuing: number;
          verificationRate: number;
          confirmationRate: number;
        };
        clusters: Array<{
          cluster: string;
          headName: string;
          total: number;
          verified: number;
          calls: number;
          confirmedAarambh: number;
          confirmedJklu: number;
          notContinuing: number;
        }>;
        notPublished?: boolean;
      }>('/admin/overview'),
    getDistributionCheck: () => 
      request<{
        success: boolean;
        stats: {
          totalCohortsAnalyzed: number;
          correctCohorts: number;
          warningCohorts: number;
          status: 'Optimal' | 'Needs Review';
        };
        cohorts: Array<{
          cohort: string;
          cluster: string;
          total: number;
          males: number;
          females: number;
          btech: number;
          bba: number;
          bdes: number;
          isSouth: boolean;
          genderIssue: boolean;
          courseIssue: boolean;
          status: 'Correct' | 'Warning';
          reasons: string[];
        }>;
      }>('/admin/distribution-check'),
    getNotContinuing: () => 
      request<Student[]>('/admin/not-continuing'),
    getClusterDetails: (clusterId: string) => 
      request<{ 
        cluster: string;
        clusterHead: { name: string; email: string; phone: string } | null;
        cohorts: Array<{
          cohortName: string;
          leader: { id: string; name: string; email: string; phone: string } | null;
          students: Student[];
        }>;
      }>(`/admin/cluster/${clusterId}`),
    getAarambhVerification: () =>
      request<{
        success: boolean;
        usingFallback: boolean;
        fallbackReason: string;
        summary: {
          totalStudents: number;
          registered: number;
          notRegistered: number;
          registrationRate: number;
        };
        students: Array<{
          _id: string;
          name: string;
          applicationNo: string;
          cohort: string;
          cluster: string;
          registeredOnPortal: boolean;
        }>;
      }>('/admin/aarambh-verification'),
    getSettings: () =>
      request<{ studentsPublished: boolean }>('/admin/settings'),
    updateSettings: (studentsPublished: boolean) =>
      request<{ success: boolean; studentsPublished: boolean }>('/admin/settings', {
        method: 'POST',
        body: JSON.stringify({ studentsPublished })
      }),
    backupDatabase: () =>
      request<{ success: boolean; message: string }>('/admin/backup', {
        method: 'POST'
      })
  }
};
