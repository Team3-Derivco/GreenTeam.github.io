//load in HTML head 

<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js"></script>
 
<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-database.js"></script>

// Place in the html body befire the script link tag 
<script>
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyAR5C67Mg36TlW54xwPPCPNvhNniuuHndw",
            authDomain: "movienight2019-c65db.firebaseapp.com",
            databaseURL: "https://movienight2019-c65db.firebaseio.com",
            projectId: "movienight2019-c65db",
            storageBucket: "movienight2019-c65db.appspot.com",
            messagingSenderId: "442067583712",
            appId: "1:442067583712:web:b47be1cef089b1fb"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // create database 
        const database = firebase.database();
    </script>
