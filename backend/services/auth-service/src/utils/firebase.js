import admin from 'firebase-admin';
import service_account from '../../config/firebase_service.js';

admin.initializeApp({
  credential: admin.credential.cert(service_account),
});

export default admin;
