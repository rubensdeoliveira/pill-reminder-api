export const Routes = {
  // Session Routes
  SESSION: {
    DENTIST: {
      LOGIN: '/session/dentist/login',
      GOOGLE: {
        LOGIN: '/session/dentist/google',
        CALLBACK: '/session/google/callback',
      },
    },
    PATIENT: {
      LOGIN: '/session/patient/login',
    },
    REFRESH: '/session/refresh',
  },

  // Account Routes
  ACCOUNT: {
    DENTIST: {
      CREATE: '/account/dentist/create',
      GET: '/account/dentist',
    },
    PATIENT: {
      CREATE: '/account/patient/create',
      GET: '/account/patient',
    },
  },

  // Medicine Routes
  MEDICINE: {
    LIST: '/medicine',
    CREATE: '/medicine/create',
    EDIT: '/medicine/:id/edit',
  },
}
