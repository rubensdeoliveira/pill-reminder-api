export const Routes = {
  // Session Routes
  SESSION: {
    DENTIST: {
      CREATE: '/session/dentist',
      GOOGLE: {
        CREATE: '/session/dentist/google',
        CALLBACK: '/session/google/callback',
      },
    },
    PATIENT: {
      CREATE: '/session/patient',
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
