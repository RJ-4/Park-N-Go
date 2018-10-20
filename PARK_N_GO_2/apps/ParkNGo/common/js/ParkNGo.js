
( function () {
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDJeG9vtrdD1pa4yt3Oran_35__5oTM2o0",
  authDomain: "parkngo-b641a.firebaseapp.com",
  databaseURL: "https://parkngo-b641a.firebaseio.com",
  projectId: "parkngo-b641a",
  storageBucket: "",
  messagingSenderId: "941099461969"
};
firebase.initializeApp(config);
} ());




function loginUser() {
	  
	  var provider = new firebase.auth.GoogleAuthProvider();    //new login on our app so take permissions
	  firebase.auth().signInWithRedirect(provider);
	}

function logout() {
	  firebase.auth().signOut().then(logSucc, logFail); 
	  window.location.href = "#login";

}
function logSucc(){
	  alert('You logged out successfully.');
};
function logFail(){
	  alert('Log out failed');
};



//**********************************REGISTRATION FUNCTIONS*************************************//
function reg()
{
	
	var a=$("#ownname").val();
	var b=$("#ownmobile").val();
	var c=$("#vno").val();
	var d=$("#man").val();
	var e=$("#model").val();
	var f=$("#col").val();
	var g=$("#manyear").val();
	var h=$("#fuel").val();
	
	if(a.match(/[0-9]/)||a=="")
	{
		alert("Enter a valid name!!!");
		//onFailure();
		failure();
	}
	else if(b.match(/[a-z]/)||b=="" || b > 9999999999)
		{
		alert("Enter a valid mobile number!!!");
		//onFailure();
		failure();
		}
	else if(c==""){
		alert("Enter a valid registration number!!!");
		//onFailure();
		failure();
	}
	else if(d=="Select Manufacturer"){
		alert("Select a manufacturer!!!");
		//onFailure();
		failure();
	}
	else if(e==""){
		alert("Enter a valid model!!!");
		//onFailure();
		failure();
	}
	else if(f.match(/[0-9]/)||f==""){
		alert("Enter a valid color!!!");
		//onFailure();
		failure();
	}
	else if(g.match(/[a-z]/)||g==""||g<0||g>2018){
		alert("Enter a valid Manufacturing Year!!!");
		//onFailure();
		failure();
	}
	else if(h=="Select Fuel Type of Vehicle"){
		alert("Select Fuel Type of Vehicle!!!");
		//onFailure();
		failure();
	}
	
	else
	{
		var userData = {					//	user data object consisting all user data
			    ownname: a,
			    ownmobile: b,
			    vno: c,
			    man: d,
			    model: e,
			    col: f,
			    manyear: g,
			    fuel: h,
			  };
		 var vehicleNo = c;
		 
		 var database = firebase.database();
		 database.ref('users/' + vehicleNo).set(userData).then(success, failure);						//saving data to firebase db

	}

}


function success() {
	console.log('Registration successful');
	alert('Registration successful');
}

function failure() {
	console.log('Registration failed');
	alert('Regsitration failed');
}

	
	/*
	var invocation={
			adapter:'Registration',
			procedure:'procedure1',
			parameters:[a,b,c,d,e,f,g,h]		
	};
	
	var options={
			onSuccess:succ,
			onFailure:fail
	};
	WL.Client.invokeProcedure(invocation, options);
}
function succ()
{
	alert("Registration successful!!!");
}
function fail()
{
	//alert("Registration Failed!!! Please Try Again!!!");
	alert("Vehicle already registered!!!");
}
*/
//******************************************************************************************


//***********************************SEARCH FUNCTIONS*********************************************//
function search1()
{
	var a=$("#searching").val();
	if(a=="")
		{
		alert("Enter a valid Registration Number!!!");
		}
	
	  var vehicleNo = a;         //get searched vehicle num
	  console.log(vehicleNo);
	  var database = firebase.database();                                  //firebase DB
	  var data;
	  database.ref('users').child(vehicleNo)            //   database.ref('/users/' + vehicleNo) --> Other way
	  .once('value')
	  .then( function (snapshot) { 
	    console.log(snapshot.val());
	    data = snapshot.val();
	    succ1(data);
	   });

	
	
	/*
	var invocation={
			adapter:'Searchadap',
			procedure:'procedure1',
			parameters:[a]
	};
	var options={
			onSuccess:succ1,
			onFailure:fail1
	};
	WL.Client.invokeProcedure(invocation, options);
	*/
}


function succ1(data)
{
	
	document.getElementById('on').innerHTML = ''; 
	document.getElementById('mn').innerHTML = '';
	document.getElementById('rn').innerHTML = '';
	document.getElementById('mr').innerHTML = '';
	document.getElementById('ml').innerHTML = '';
	document.getElementById('cr').innerHTML = '';
	document.getElementById('my').innerHTML = '';
	document.getElementById('ft').innerHTML = '';
	
	
	document.getElementById('on1').innerHTML = '';
	document.getElementById('mn1').innerHTML = '';
	document.getElementById('rn1').innerHTML = '';
	document.getElementById('mr1').innerHTML = '';
	document.getElementById('ml1').innerHTML = '';
	document.getElementById('cr1').innerHTML = '';
	document.getElementById('my1').innerHTML = '';
	document.getElementById('ft1').innerHTML = '';
	
	
	var a=data.ownname;           //all details of searched user from userData obj come from firebase DB
	var b=data.ownmobile;
	var c=data.vno;
	var d=data.man;
	var e=data.model;
	var f=data.col;
	var g=data.manyear;
	var h=data.fuel;
	
	
	var o=$("#on");
	var mob=$("#mn");
	var r=$("#rn");
	var man=$("#mr");
	var mod=$("#ml");
	var co=$("#cr");
	var m=$("#my");
	var fu=$("#ft");
	
	var o1=$("#on1");
	var mob1=$("#mn1");
	var r1=$("#rn1");
	var man1=$("#mr1");
	var mod1=$("#ml1");
	var co1=$("#cr1");
	var m1=$("#my1");
	var fu1=$("#ft1");
	
	var a1=$('<td>').html(a);
	var b1=$('<td>').html(b);
	var c1=$('<td>').html(c);
	var d1=$('<td>').html(d);
	var e1=$('<td>').html(e);
	var f1=$('<td>').html(f);
	var g1=$('<td>').html(g);
	var h1=$('<td>').html(h);
	
	
	o1.append("Owner's Name: ");
	mob1.append("Mobile No: ");
	r1.append("Registration No: ");
	man1.append("Manufacturer: ");
	mod1.append("Model: ");
	co1.append("Color: ");
	m1.append("Manufacture Year: ");
	fu1.append("Fuel Type: ");
	
	o.append(a1);
	mob.append(b1);
	r.append(c1);
	man.append(d1);
	mod.append(e1);
	co.append(f1);
	m.append(g1);
	fu.append(h1);
	
}
function fail1(result)
{
	alert("Vehicle Not Registered!!!");
}
//********************************************************************************************************


//****************************************CONTACT US FUNCTIONS*********************************************
function query_submit()
{
	var contact_n=$("#contact_name").val();
	var contact_e=$("#contact_email").val();
	var contact_q=$("#contact_query").val();
	console.log('contact name', contact_n);
	console.log('contact email', contact_e);
	console.log('contact query', contact_q);

	var atpos=contact_e.indexOf("@");
	var dotpos=contact_e.lastIndexOf(".");

	if(contact_n.match(/[0-9]/)||contact_n==""){
		alert("Enter a valid name!!!");
		fail2();
	}
	
	else if(atpos<1||dotpos-atpos<2){
		alert("Enter a valid email id!!!");
		fail2();
	}
	else if(contact_q==""){
		alert("Enter your query!!!");
		fail2();
	}
	else {
	var contactData = {
			name: contact_n,
			email: contact_e,
			message: contact_q
	};
	
	var usrEmail = contact_e;
	usrEmail = usrEmail.replace('.','dot');
	console.log('user email', usrEmail);
	var database = firebase.database();
	 database.ref('contact/' + usrEmail).set(contactData).then(succ2, fail2);	
	}
}
	/* old code
	var invocation={
			adapter:'ContactAdap',
			procedure:'procedure1',
			parameters:[contact_n, contact_e, contact_q]
	};
	var options={
			onSuccess:succ2,
			onFailure:fail2
	};
	WL.Client.invokeProcedure(invocation, options);
	*/

 function succ2()
 {
 	alert("Query Sent!!!");
 	console.log('Query sent from contact_query');
 }
 function fail2()
 {
	console.log('Query failed from query function');
 	alert("Query not sent!!! Please try again!!!");
 }
 
 
 function app(user) {
	  console.log("You are in app now");
	  window.location.href = "#home";
	  //run this,
 }
 
 
 firebase.auth().onAuthStateChanged(function(user) {          //user logged in or not?
	  if(user) {
	    console.log("you are logged in", user);
	    app(user);
	  } else {
	    console.log("not logged in");
	  }

	});

//**********************************************************************************************