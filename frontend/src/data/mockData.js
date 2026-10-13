/* ============================================================
   Mock Data — Clearly Isolated for Initial UI
   All data here is synthetic. Replace with real API calls in Phase 9.
   ============================================================ */

// ── Seeded Users (matches DataSeeder.java) ─────────────────
export const SEEDED_USERS = [
  { username: 'superadmin',    password: 'SuperAdmin123!',    role: 'SUPER_ADMIN' },
  { username: 'hospitaladmin', password: 'HospitalAdmin123!', role: 'HOSPITAL_ADMIN' },
  { username: 'publicuser',    password: 'PublicUser123!',    role: 'PUBLIC_USER' },
];

// ── Hospitals ──────────────────────────────────────────────
export const mockHospitals = [
  { id: 1, name: 'City General Hospital',      location: 'Downtown, Metro City',   phone: '+91 44 2345 6789' },
  { id: 2, name: 'Green Valley Medical Center', location: 'Suburban Heights',        phone: '+91 44 3456 7890' },
  { id: 3, name: 'Sunrise Health Clinic',       location: 'East Park Avenue',        phone: '+91 44 4567 8901' },
  { id: 4, name: 'Lakewood Community Hospital', location: 'Lakewood District',       phone: '+91 44 5678 9012' },
  { id: 5, name: 'Metro Children\'s Hospital',  location: 'Central Business Zone',   phone: '+91 44 6789 0123' },
];

// ── Beds ───────────────────────────────────────────────────
export const mockBeds = [
  { id: 1,  type: 'General',   status: 'AVAILABLE',   hospital: mockHospitals[0] },
  { id: 2,  type: 'General',   status: 'OCCUPIED',    hospital: mockHospitals[0] },
  { id: 3,  type: 'ICU',       status: 'OCCUPIED',    hospital: mockHospitals[0] },
  { id: 4,  type: 'General',   status: 'AVAILABLE',   hospital: mockHospitals[0] },
  { id: 5,  type: 'Pediatric', status: 'OCCUPIED',    hospital: mockHospitals[0] },
  { id: 6,  type: 'ICU',       status: 'AVAILABLE',   hospital: mockHospitals[0] },
  { id: 7,  type: 'General',   status: 'OCCUPIED',    hospital: mockHospitals[1] },
  { id: 8,  type: 'Maternity', status: 'AVAILABLE',   hospital: mockHospitals[1] },
  { id: 9,  type: 'General',   status: 'OCCUPIED',    hospital: mockHospitals[1] },
  { id: 10, type: 'Surgery',   status: 'OCCUPIED',    hospital: mockHospitals[1] },
  { id: 11, type: 'General',   status: 'AVAILABLE',   hospital: mockHospitals[2] },
  { id: 12, type: 'ICU',       status: 'OCCUPIED',    hospital: mockHospitals[2] },
  { id: 13, type: 'General',   status: 'OCCUPIED',    hospital: mockHospitals[3] },
  { id: 14, type: 'Maternity', status: 'OCCUPIED',    hospital: mockHospitals[3] },
  { id: 15, type: 'General',   status: 'AVAILABLE',   hospital: mockHospitals[4] },
];

// ── Patients ───────────────────────────────────────────────
export const mockPatients = [
  { id: 1,  name: 'Arjun Mehta',        age: 45, gender: 'Male',   condition: 'Post-surgery recovery' },
  { id: 2,  name: 'Priya Sharma',       age: 32, gender: 'Female', condition: 'Pneumonia' },
  { id: 3,  name: 'Ravi Kumar',         age: 58, gender: 'Male',   condition: 'Cardiac monitoring' },
  { id: 4,  name: 'Lakshmi Devi',       age: 67, gender: 'Female', condition: 'Diabetes management' },
  { id: 5,  name: 'Arun Patel',         age: 29, gender: 'Male',   condition: 'Fracture — left femur' },
  { id: 6,  name: 'Sunita Reddy',       age: 41, gender: 'Female', condition: 'Appendectomy recovery' },
  { id: 7,  name: 'Vikram Singh',       age: 53, gender: 'Male',   condition: 'Chronic COPD' },
  { id: 8,  name: 'Ananya Iyer',        age: 8,  gender: 'Female', condition: 'Tonsillectomy' },
];

// ── Admissions ─────────────────────────────────────────────
export const mockAdmissions = [
  { id: 1, patient: mockPatients[0], bed: mockBeds[1],  status: 'ADMITTED',    admissionDate: '2026-10-10T08:30:00' },
  { id: 2, patient: mockPatients[1], bed: mockBeds[2],  status: 'ADMITTED',    admissionDate: '2026-10-11T14:00:00' },
  { id: 3, patient: mockPatients[2], bed: mockBeds[4],  status: 'ADMITTED',    admissionDate: '2026-10-09T09:15:00' },
  { id: 4, patient: mockPatients[3], bed: mockBeds[6],  status: 'ADMITTED',    admissionDate: '2026-10-12T11:45:00' },
  { id: 5, patient: mockPatients[4], bed: mockBeds[8],  status: 'DISCHARGED', admissionDate: '2026-10-05T16:30:00' },
  { id: 6, patient: mockPatients[5], bed: mockBeds[9],  status: 'ADMITTED',    admissionDate: '2026-10-13T07:00:00' },
];

// ── Ambulances ─────────────────────────────────────────────
export const mockAmbulances = [
  { id: 1, vehicleNumber: 'TN-01-AB-1234', location: 'Downtown — en route' },
  { id: 2, vehicleNumber: 'TN-01-CD-5678', location: 'City General Hospital — standby' },
  { id: 3, vehicleNumber: 'TN-01-EF-9012', location: 'East Park — responding' },
  { id: 4, vehicleNumber: 'TN-01-GH-3456', location: 'Green Valley — maintenance' },
  { id: 5, vehicleNumber: 'TN-01-IJ-7890', location: 'Lakewood — standby' },
];

// ── Dashboard Stats (HOSPITAL_ADMIN) ───────────────────────
export const dashboardStats = {
  bedOccupied: 87,
  staffCoverage: 35,
  operatingRooms: 72,
  departmentLoad: 90,
  equipmentHealth: 75,
  equipmentAvailable: 20,
  totalBeds: 15,
  availableBeds: 5,
  occupiedBeds: 10,
};

// ── Staff Members (for dashboard cards) ────────────────────
export const mockStaff = [
  { id: 1, name: 'Dr. Matsumoto Issei',  dept: 'Dental',      role: 'Dentist',      code: 'DNT-021', onDuty: true,  featured: true },
  { id: 2, name: 'Dr. Watanabe Daiki',   dept: 'Cardiology',  role: 'Cardiologist', code: 'CRD-015', onDuty: true,  featured: false },
  { id: 3, name: 'Dr. Takahashi Yuna',   dept: 'General',     role: 'General',      code: 'GEN-008', onDuty: true,  featured: false },
  { id: 4, name: 'Dr. Mori Natsuki',     dept: 'Neurology',   role: 'Neurologist',  code: 'NEU-003', onDuty: true,  featured: false },
  { id: 5, name: 'Dr. Okamoto Hinata',   dept: 'Surgery',     role: 'Surgeon',      code: 'SRG-012', onDuty: false, featured: false },
  { id: 6, name: 'Dr. Arai Keisuke',     dept: 'Emergency',   role: 'ER Physician', code: 'EMR-007', onDuty: false, featured: false },
];

// ── Staff Schedule (for calendar widget) ───────────────────
export const mockSchedule = [
  { time: '07:00 AM', staff: 'Dr. Matsumoto Issei', assistant: 'Takamura Yuki', dept: 'Dental' },
  { time: '08:00 AM', staff: 'Dr. Okamoto Hinata',  assistant: 'Matsuda Miku',  dept: 'Surgery' },
  { time: '08:00 AM', staff: 'Dr. Arai Keisuke',    assistant: 'Mori Masato',   dept: 'Emergency' },
  { time: '09:00 AM', staff: 'Dr. Matsumoto Issei', assistant: null,            dept: 'Dental' },
  { time: '09:00 AM', staff: 'Dr. Arai Keisuke',    assistant: 'Tanaka Haruto', dept: 'Emergency' },
];

// ── Equipment Types ────────────────────────────────────────
export const equipmentTypes = [
  { name: 'Ventilator',     count: 12, active: 10 },
  { name: 'Incubator',      count: 8,  active: 6 },
  { name: 'Infusion Pump',  count: 20, active: 18 },
  { name: 'Patient Monitor', count: 15, active: 14 },
];

// ── Departments ────────────────────────────────────────────
export const departments = [
  'All', 'Dental', 'Cardiology', 'Neurology', 'Surgery', 'Emergency', 'Maternity', 'ICU', 'Pulmonology'
];

// ── Calendar Days ──────────────────────────────────────────
export const calendarDays = [
  { day: 'Sun', date: 21 },
  { day: 'Mon', date: 22 },
  { day: 'Tue', date: 23, isToday: true },
  { day: 'Wed', date: 24 },
  { day: 'Thu', date: 25 },
  { day: 'Fri', date: 26 },
  { day: 'Sat', date: 27 },
];

// ── Super Admin System Stats ───────────────────────────────
export const systemStats = {
  totalHospitals: 5,
  totalBeds: 15,
  totalPatients: 8,
  totalAdmissions: 6,
  totalAmbulances: 5,
  activeAdmissions: 5,
  discharged: 1,
  occupancyRate: 67,
  avgLengthOfStay: 3.2,
};

// ── Navigation Items per Role ──────────────────────────────
export const navConfig = {
  SUPER_ADMIN: [
    { key: 'dashboard',  label: 'Dashboard',   icon: 'LayoutDashboard', path: '/super-admin' },
    { key: 'hospitals',  label: 'Hospitals',    icon: 'Building2',       path: '/super-admin/hospitals' },
    { key: 'beds',       label: 'Beds',         icon: 'BedDouble',       path: '/super-admin/beds' },
    { key: 'patients',   label: 'Patients',     icon: 'Users',           path: '/super-admin/patients' },
    { key: 'admissions', label: 'Admissions',   icon: 'ClipboardList',   path: '/super-admin/admissions' },
    { key: 'ambulances', label: 'Ambulances',   icon: 'Truck',           path: '/super-admin/ambulances' },
    { key: 'users',      label: 'Users',        icon: 'UserCog',         path: '/super-admin/users' },
    { key: 'analytics',  label: 'Analytics',    icon: 'BarChart3',       path: '/super-admin/analytics' },
  ],
  HOSPITAL_ADMIN: [
    { key: 'overview',   label: 'Overview',     icon: 'LayoutDashboard', path: '/hospital-admin' },
    { key: 'patients',   label: 'Patients',     icon: 'Users',           path: '/hospital-admin/patients' },
    { key: 'resources',  label: 'Resources',    icon: 'Activity',        path: '/hospital-admin/resources' },
    { key: 'beds',       label: 'Beds',         icon: 'BedDouble',       path: '/hospital-admin/beds' },
    { key: 'admissions', label: 'Admissions',   icon: 'ClipboardList',   path: '/hospital-admin/admissions' },
    { key: 'ambulances', label: 'Ambulances',   icon: 'Truck',           path: '/hospital-admin/ambulances' },
    { key: 'analytics',  label: 'Analytics',    icon: 'BarChart3',       path: '/hospital-admin/analytics' },
  ],
  PUBLIC_USER: [
    { key: 'dashboard',   label: 'Dashboard',      icon: 'LayoutDashboard', path: '/public' },
    { key: 'hospitals',   label: 'Find Hospitals',  icon: 'Search',          path: '/public/hospitals' },
    { key: 'beds',        label: 'Bed Availability', icon: 'BedDouble',       path: '/public/beds' },
  ],
};
