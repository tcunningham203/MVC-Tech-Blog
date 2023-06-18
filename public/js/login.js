const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#usernamelogin1").value.trim();
  const password = document.querySelector("#passwordlogin1").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Creates slight delay before logging in to display toast "Welcome back!"
      $("#asdf1").toast("show");
      setTimeout(function () {
        document.location.replace('/dashboard');
      }, 1200);
    } else {
      // toast('Incorrect username or password.');
    
      $("#incorrect1").toast("show");
    }
  } else {
    // alert('Incorrect username or password.');
  
    $("#incorrect1").toast("show");
  }
};


document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);


  

