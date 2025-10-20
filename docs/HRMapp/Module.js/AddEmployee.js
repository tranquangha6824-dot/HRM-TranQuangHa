// module thêm nhân viên
// Module/AddEmployee.js
import { addEmployee } from './EmployeeDb.js';

// render form thêm nhân viên vào 'container' (DOM element)
export function renderAddEmployee(container = document.getElementById('app')) {
  container.innerHTML = `
    <section class="add-employee">
      <h2>Thêm nhân viên</h2>
      <form id="addEmpForm">
        <label>Tên</label><input type="text" id="empName" required />
        <label>Phòng ban (id)</label><input type="number" id="empDept" value="1" required />
        <label>Vị trí (id)</label><input type="number" id="empPos" value="1" required />
        <label>Lương</label><input type="number" id="empSalary" value="5000000" required />
        <label>Ngày tuyển (YYYY-MM-DD)</label><input type="date" id="empHireDate" required />
        <div style="margin-top:.6rem;">
          <button type="submit">Lưu</button>
          <button type="button" id="cancelAdd">Hủy</button>
        </div>
        <p id="addEmpMsg"></p>
      </form>
    </section>
  `;

  const form = document.getElementById('addEmpForm');
  const msg = document.getElementById('addEmpMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';

    const name = document.getElementById('empName').value.trim();
    const dept = Number(document.getElementById('empDept').value);
    const pos = Number(document.getElementById('empPos').value);
    const salary = Number(document.getElementById('empSalary').value);
    const hireDate = document.getElementById('empHireDate').value;

    // validation
    if (!name) { msg.style.color = 'red'; msg.textContent = 'Tên không được để trống'; return; }
    if (!salary || salary <= 0) { msg.style.color = 'red'; msg.textContent = 'Lương phải > 0'; return; }
    if (!hireDate) { msg.style.color = 'red'; msg.textContent = 'Chọn ngày tuyển'; return; }

    // chuẩn bị object
    const emp = { name, departmentId: dept, positionId: pos, salary, hireDate, bonus:0, deduction:0 };
    try {
      const created = await addEmployee(emp);
      msg.style.color = 'green';
      msg.textContent = `Thêm thành công: ${created.name} (id: ${created.id})`;
      // phát event để app/dashboard có thể refresh danh sách
      document.dispatchEvent(new CustomEvent('employee:added', { detail: created }));
      form.reset();
    } catch (err) {
      console.error(err);
      msg.style.color = 'red';
      msg.textContent = 'Lỗi khi lưu dữ liệu';
    }
  });

  document.getElementById('cancelAdd').addEventListener('click', () => {
    // đơn giản trả về dashboard (nếu bạn muốn)
    document.getElementById('app').innerHTML = '<p>Hủy thêm — quay lại dashboard</p>';
  });
}
