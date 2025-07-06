export const ROUTES = {
  AUTH: {
    CREATE_DENTIST_SESSION_GOOGLE: '/auth/dentist/google',
    CREATE_DENTIST_SESSION: '/auth/dentist',
    CREATE_PATIENT_SESSION: '/auth/patient',
    REFRESH_SESSION: '/auth/refresh',
  },
  DENTIST: {
    CREATE: '/dentist',
    ME: '/dentist/me',
  },
  MEDICINE: {
    CREATE: '/medicine',
    UPDATE: '/medicine/:id',
    GET: '/medicine/:id',
    DELETE: '/medicine/:id',
    LIST: '/medicine',
  },
  PATIENT: {
    CREATE: '/patient',
    ME: '/patient/me',
  },
}
