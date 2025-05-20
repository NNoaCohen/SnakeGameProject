// אלמנטים של התחברות
const loginButton = document.getElementById("submit");
const password = document.getElementById("password");
const userName = document.getElementById("name");

// אלמנטים של הרשמה
const registerButton = document.getElementById("register");
const newUserName = document.getElementById("newName");
const newPassword = document.getElementById("newPassword");

let users = JSON.parse(localStorage.getItem("users")) || [];



// התחברות
if (loginButton) {
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const foundUser = users.find(user => user.userName === userName.value);

        if (!foundUser) {
            const shouldRegister = confirm("משתמש לא נמצא. לעבור להרשמה?");
            if (shouldRegister) {
                window.location.href = "../HTML/Register.html";
            }
        } else {
            checkPassword(foundUser.password);
        }
    });
}

function checkPassword(storedPassword) {
    if (password.value === storedPassword) {
        window.location.href = '../HTML/snake.html';
    } else {
        password.value = "";
        alert("סיסמה שגויה. נסה שוב.");
    }
}

// הרשמה
if (registerButton) {
    registerButton.addEventListener("click", function (event) {
        event.preventDefault();

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!regex.test(newPassword.value)) {
            alert("סיסמה חייבת להכיל אותיות גדולות, קטנות, מספרים ותו מיוחד.");
            return;
        }

        users.push({
            userName: newUserName.value,
            password: newPassword.value
        });
        localStorage.setItem("users", JSON.stringify(users));

        alert("נרשמת בהצלחה!");
        setTimeout(() => {
            window.location.href = '../HTML/login.html';
        }, 1000);
    });
}
