import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// const configNewProject = {
//   apiKey: "AIzaSyDnErdGq3meYlNiejsPF3drWeIzpZE98vw",
//   authDomain: "hospital-db-7c501.firebaseapp.com",
//   databaseURL: "https://hospital-db-7c501.firebaseio.com",
//   projectId: "hospital-db-7c501",
//   storageBucket: "hospital-db-7c501.appspot.com",
//   messagingSenderId: "482668525277"
// };

const configMyProject = {
  apiKey: "AIzaSyARhr8QKlnvfuOQM52jGjy1ylSLFalkkF8",
  authDomain: "my-project-6c9cc.firebaseapp.com",
  databaseURL: "https://my-project-6c9cc.firebaseio.com",
  projectId: "my-project-6c9cc",
  storageBucket: "my-project-6c9cc.appspot.com",
  messagingSenderId: "415624750329"
};

class Firebase {
  constructor() {
    app.initializeApp(configMyProject);
    this.auth = app.auth();
    this.db = app.database();
  }

  /*
    Firebase Authentications Methods
  */

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  hospital = uid => this.db.ref(`hospitals/${uid}`);
  
  hospitals = () => this.db.ref('hospitals');

  emergency = uid => this.db.ref(`emergencies/${uid}`);

  emergencies = () => this.db.ref('users');

  helpers = () => this.db.ref('helpers');
}

export default Firebase;
