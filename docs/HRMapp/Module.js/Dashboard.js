// Module/Dashboard.js
export function showDashboard(app) {
  app.innerHTML = `
    <div class="dashboard-container">
      <h1>🎯 Trung tâm điều khiển HRM</h1>
      <p>Chào mừng bạn đến với hệ thống quản lý nhân sự.</p>
      
      <div class="dashboard-buttons">
        <button id="btnAddEmployee">Thêm nhân viên</button>
        <button id="btnViewEmployee">Xem danh sách nhân viên</button>
        <button id="btnLogout">Đăng xuất</button>
      </div>
    </div>
  `;

  // Thêm sự kiện nút
  document.getElementById("btnAddEmployee").addEventListener("click", () => {
    alert("Chuyển sang module Thêm nhân viên (sẽ thêm sau)");
  });

  document.getElementById("btnViewEmployee").addEventListener("click", () => {
    alert("Chuyển sang module Xem danh sách nhân viên (sẽ thêm sau)");
  });

  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  });
}
import { renderAddEmployee } from './AddEmployee.js';

document.getElementById("btnAddEmployee").addEventListener("click", () => {
  renderAddEmployee(document.getElementById('app'));
});