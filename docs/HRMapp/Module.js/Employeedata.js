// module cơ sở dữ liệu nhân viên 
// Module/EmployeeDb.js
import { loadData, saveData } from './Storage.js';

const KEY = 'hrm_employees';

// fake delay để mô phỏng async (dùng async/await)
const fakeDelay = (ms = 300) => new Promise(res => setTimeout(res, ms));

// init mặc định 5 nhân viên nếu chưa có
export function initSampleEmployees() {
  const exist = storage.load(KEY, null);
  if (exist && Array.isArray(exist) && exist.length > 0) return;
  const samples = [
    { id: 1, name: 'Nguyễn Văn A', departmentId: 1, positionId: 1, salary: 8000000, hireDate: '2022-01-10', bonus:0, deduction:0 },
    { id: 2, name: 'Trần Thị B', departmentId: 2, positionId: 2, salary: 9000000, hireDate: '2021-05-15', bonus:0, deduction:0 },
    { id: 3, name: 'Lê Văn C', departmentId: 1, positionId: 3, salary: 7000000, hireDate: '2023-03-20', bonus:0, deduction:0 },
    { id: 4, name: 'Phạm Thị D', departmentId: 3, positionId: 2, salary: 8500000, hireDate: '2020-09-01', bonus:0, deduction:0 },
    { id: 5, name: 'Hoàng Văn E', departmentId: 2, positionId: 1, salary: 7500000, hireDate: '2019-11-11', bonus:0, deduction:0 }
  ];
  storage.save(KEY, samples);
}

// trả về tất cả nhân viên (async)
export async function getAllEmployees() {
  await fakeDelay(150);
  return loadData(KEY,);
}

export async function getEmployeeById(id) {
  const list = await getAllEmployees();
  return list.find(e => String(e.id) === String(id)) || null;
}

export async function saveEmployees(list) {
  await fakeDelay(200);
  storage.save(KEY, list);
  return true;
}

// add employee — tự sinh id bằng timestamp nếu không có
export async function addEmployee(emp) {
  const list = await getAllEmployees();
  const newEmp = { ...emp, id: emp.id ?? Date.now() };
  list.push(newEmp);
  await saveEmployees(list);
  return newEmp;
}

// higher-order filter: truyền 1 array of predicates hoặc 1 predicate
// ví dụ: filterEmployees(list => list.salary > 5000000)
export async function filterEmployees(predicate) {
  const list = await getAllEmployees();
  if (!predicate) return list;
  // nếu predicate là function đơn, apply; nếu là hàm tạo filter (HOF), vẫn hợp
  return list.filter(predicate);
}

// sort utility: key là thuộc tính, dir = 'asc'|'desc'
export function sortEmployees(list, key = 'id', dir = 'asc') {
  const s = [...list].sort((a, b) => {
    if (a[key] == null) return -1;
    if (b[key] == null) return 1;
    if (typeof a[key] === 'number') return a[key] - b[key];
    return String(a[key]).localeCompare(String(b[key]));
  });
  return dir === 'desc' ? s.reverse() : s;
}
