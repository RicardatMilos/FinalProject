let inpEmail = document.getElementById('email');
let inpPassword = document.getElementById('password');
let submitButton = document.getElementById('submit-button');
let loginForm = document.querySelector('form');

function handleLogin(e){
    e.preventDefault()

    let email = inpEmail.value;
    let password = inpPassword.value;

    if(!email || !password) {
        alert("Vui Lòng Điền Đầy Đủ")
        return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            let user = userCredential.user
            alert("Đăng Nhập Thành Công")

            const userSession = {
                user: user,
                expiry: new Date().getTime() + 2*60*60*1000
            }

            localStorage.setItem("user_session", JSON.stringify(userSession))

            window.location.href = "../html/main.html"
        })

        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Mật Khẩu Không Đúng")
        })
}

loginForm.addEventListener("submit",handleLogin)