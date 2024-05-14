function togglePasswordVisibility() {
    var passwordInput = document.getElementById("Password");
    var toggleIcon = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
}

function toggleConfirmPasswordVisibility() {
    var confirmPasswordInput = document.getElementById("ConfirmPassword");
    var toggleIcon = document.getElementById("toggleConfirmPassword");

    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    } else {
        confirmPasswordInput.type = "password";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var passwordInput = document.getElementById("Password");
    var confirmPasswordInput = document.getElementById("ConfirmPassword");
    var confirmPasswordError = document.getElementById("confirmPasswordError");

    confirmPasswordInput.addEventListener("input", function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.style.display = "block";
        } else {
            confirmPasswordError.style.display = "none";
        }
    });
});
