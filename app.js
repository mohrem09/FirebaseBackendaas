  
  var firebaseConfig = {
  apiKey: "AIzaSyCeRIqF9eCme82fMT1ji--Z6QFfxClkHls",
  authDomain: "remdr-pro.firebaseapp.com",
  databaseURL: "https://remdr-pro-default-rtdb.firebaseio.com",
  projectId: "remdr-pro",
  storageBucket: "remdr-pro.appspot.com",
  messagingSenderId: "744470897803",
  appId: "1:744470897803:web:9ffa049514d894699ca08e",  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    var uploadTask;
    document.getElementById('file').addEventListener('change', (event) => {
      document.getElementById("next").style.display = "block";
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref('images/' + file.name);
   uploadTask = storageRef.put(file).on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        const progressBar = document.getElementById('progress_bar');
        progressBar.value = progress;

       



});
});




next.addEventListener('click',(e)=>{
  window.location.href = "afterSignUp01.html";
 
});




