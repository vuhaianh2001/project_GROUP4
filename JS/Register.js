function send(){
    var arr = document.getElementsByTagName('input');
    var fullname = arr[0].value;
    var username = arr[1].value;
    var age = arr[2].value;
    var mail= arr[3].value;
    var pass = arr[4].value;
    if(fullname == "" || username == "" || age == "" || mail == "" || pass == ""){
        alert("Please fill all fields");
        return;
    }
    var choice = confirm('Please confirm your information\n' +'Full name :'+fullname+"\n"+'User name :'+username+"\n"+'Age :'+age+"\n"+'Mail Address :'+mail+"\n"+'Pass word :'+pass+"\n");

    if (choice == 1) {
        alert('Register successfully');

    }
}