const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const usernameNotCapitalized = document
      .querySelector("#usernamesignup1")
      .value.trim();
    username =
      usernameNotCapitalized.charAt(0).toUpperCase() + usernameNotCapitalized.slice(1);
    const password = document.querySelector("#passwordsignup1").value.trim();
    const password2 = document.querySelector("#passwordsignup2").value.trim();
  
    if (username && password && password2 && password === password2) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // Creates slight delay before logging in to display toast "Account Created! Welcome!"
        $("#asdf2").toast("show");
        setTimeout(function () {
          document.location.replace("/");
        }, 2200);
      } else {
        // alert('Failed to sign up.');
        $("#incorrect2").toast("show");
      }
    } else {
      // alert('Failed to sign up.');
      $("#incorrect2").toast("show");
    }
  };

  document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);