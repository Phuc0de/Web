// DOM phần tử
const openForm = document.getElementById("openRegisterForm");
const closeForm = document.getElementById("closeRegisterForm");
const registerOverlay = document.getElementById("registerForm");

const openForm2 = document.getElementById("openLoginForm");
const closeForm2 = document.getElementById("closeLoginForm");
const loginOverlay = document.getElementById("loginForm");

const clickRegisterOverlay = document.getElementById("button3");

// Mở form đăng ký
openForm.addEventListener("click", () => {
    registerOverlay.style.display = "flex";
    loginOverlay.style.display = "none";
});

// Đóng form đăng ký
closeForm.addEventListener("click", () => {
    registerOverlay.style.display = "none";
});

// Mở form đăng nhập
openForm2.addEventListener("click", () => {
    loginOverlay.style.display = "flex";
    registerOverlay.style.display = "none";
});

// Đóng form đăng nhập
closeForm2.addEventListener("click", () => {
    loginOverlay.style.display = "none";
});

// Chuyển từ đăng nhập sang đăng ký
clickRegisterOverlay.addEventListener("click", () => {
    registerOverlay.style.display = "flex";
    loginOverlay.style.display = "none";
});

// Đóng form khi click ra ngoài
window.addEventListener("click", (e) => {
    if (e.target === registerOverlay) {
        registerOverlay.style.display = "none";
    }
    if (e.target === loginOverlay) {
        loginOverlay.style.display = "none";
    }
});

// Hàm xử lý đăng ký
async function register(event) {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && email && password) {
        try {
            const response = await fetch("http://localhost:3000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.text();
            alert("✅ Đăng ký thành công!");
            registerOverlay.style.display = "none"; // Ẩn form
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("❌ Đăng ký thất bại!");
        }
    } else {
        alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
    }
}

// Xử lý đăng nhập
const loginFormElement = document.getElementById("loginFormElement");

loginFormElement.addEventListener("submit", async (e) => {
    e.preventDefault(); // Ngăn reload trang

    const formData = new FormData(loginFormElement);
    const data = {
        email: formData.get("username"), // nếu login bằng gmail
        password: formData.get("password")
    };

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();

        if (result.success) {
            alert("✅ Đăng nhập thành công!");
            window.location.href = "about.html";
        } else {
            alert("❌ Sai email hoặc mật khẩu!");
        }
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        alert("❌ Có lỗi xảy ra, vui lòng thử lại.");
    }
});
