const { initializeApp } = require("firebase/app");
const { getStorage,ref,uploadBytes, getDownloadURL } =  require("firebase/storage");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// This firebase config should be excluded from the repo, only seen for testing interview purposes 
const firebaseConfig = {
    apiKey: "AIzaSyCrhW25Xhl9Db3yLtuRfhq2QgbumZ35CbM",
    authDomain: "vox-test-6e10a.firebaseapp.com",
    projectId: "vox-test-6e10a",
    storageBucket: "vox-test-6e10a.appspot.com",
    messagingSenderId: "250835765594",
    appId: "1:250835765594:web:70e48a358213ad74f40b63",
    measurementId: "G-GRM5SX5102",
    // storageBucket:'filesReport',
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const uploadFile = async(file, filename)=>{
    const storageRef = ref(storage,filename);
    await uploadBytes(storageRef, file); 
    return await getDownloadURL(storageRef);

};

module.exports = {storage, uploadFile};