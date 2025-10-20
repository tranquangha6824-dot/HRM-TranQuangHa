// Module/Auth.js
// ====================
// module đăng nhập
// module đăng ký

export function showLoginForm(container) {
  // Hiển thị form đăng nhập
  container.innerHTML = `
    <div class="login-container">
      <h2>Đăng nhập hệ thống</h2>
      <form id="loginForm">
        <input type="text" id="username" placeholder="Tên đăng nhập" required />
        <input type="password" id="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
      </form>
      <p id="loginMessage"></p>
    </div>
  `;

  const form = document.getElementById("loginForm");
  form.addEventListener("submit", handleLogin); // 👈 sửa chính tả
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim(); // 👈 sửa varlue
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  // Giả lập tài khoản
  const adminUser = "admin";
  const adminPass = "admin123";

  if (username === adminUser && password === adminPass) {
    localStorage.setItem("session", "loggedIn"); // Lưu trạng thái đăng nhập
    message.textContent = "Đăng nhập thành công!";
    message.style.color = "green";
    setTimeout(() => location.reload(), 1000); // Tải lại trang sau 1 giây
  } else {
    message.textContent = "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin";
    message.style.color = "red";
  }
}

export async function checkSession() {
  const session = localStorage.getItem("session");
  return session === "loggedIn";
}
