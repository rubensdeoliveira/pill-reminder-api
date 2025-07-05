export const Routes = {
  AUTH: {
    CREATE_DENTIST_SESSION_GOOGLE: '/auth/dentist-session/google',
    CREATE_DENTIST_SESSION: '/auth/dentist-session',
    CREATE_PATIENT_SESSION: '/auth/patient-session',
    REFRESH_SESSION: '/auth/refresh-session',
  },
  DENTIST: {
    CREATE: '/dentist/create',
    GET: '/dentist',
  },
  MEDICINE: {
    CREATE: '/medicine/create',
    UPDATE: '/medicine/:id/edit',
    GET: '/medicine',
    DELETE: '/medicine/:id/delete',
    LIST: '/medicine',
  },
  PATIENT: {
    CREATE: '/patient/create',
    GET: '/patient',
  },
}
