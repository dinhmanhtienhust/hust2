import promptSync from "prompt-sync";
import fs from "fs";

// Sử dụng thư viện prompt-sync để nhận đầu vào từ người dùng
const prompt = promptSync();
console.clear();

const filePath = './dataStudent.json'; // Đường dẫn tệp JSON

export function count(minCPA, maxCPA) {
  // Đọc và xử lý tệp JSON
  let students;
  try {
    const data = fs.readFileSync(filePath, 'utf8'); // Đọc tệp JSON đồng bộ
    students = JSON.parse(data); // Chuyển đổi JSON thành đối tượng
  } catch (err) {
    console.error("Lỗi khi đọc hoặc phân tích cú pháp tệp JSON:", err.message);
    process.exit(1); // Thoát chương trình nếu có lỗi
  }

  function filterByCPA(data, minCPA, maxCPA) {
  const filtered = [];
  let index = 0;  // Cho index = 0 để bắt đầu đếm số lượng
  for (let i = 0; i < data.length; i++) {
  const cpa = parseFloat(data[i].cpa);
    // Đièu kiện của CPA
    if (cpa >= minCPA && cpa <= maxCPA) {
      filtered[index] = data[i]; // Thêm sinh viên vào mảng nếu mà CPA đó hợp lệ
      index++; 
    }
  }
  return filtered;
}
const filteredStudents = filterByCPA(students, minCPA, maxCPA);

  console.log(`Số lượng sinh viên có CPA từ ${minCPA} đến ${maxCPA}: ${filteredStudents.length}`);
  prompt("Nhấn phím Enter để tiếp tục..."); // Chờ người dùng nhấn Enter để tiếp tục
  return;
}
