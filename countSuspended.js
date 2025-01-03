import promptSync from "prompt-sync";
// Sử dụng thư viện prompt-sync để nhận đầu vào từ người dùng
const prompt = promptSync();
import fs from 'fs';
console.clear();

export function countSuspended() {
  const filePath = './dataStudent.json'; // Đường dẫn tệp JSON

  // Đọc dữ liệu từ tệp JSON được cung cấp
  let students;
  try {
    const Data = fs.readFileSync(filePath, 'utf-8');
    students = JSON.parse(Data); // Chuyển đổi dữ liệu JSON thành đối tượng
  } catch (err) {
    console.error("Lỗi khi đọc hoặc phân tích cú pháp tệp JSON:", err.message);
    return; // Dừng chương trình nếu có lỗi
  }

  
  let lowCPA = 0;
  let longDuration = 0;
  const currentYear = 2024;

for (let i = 0; i < students.length; i++) {
    const student = students[i];

    // Chuyển đổi CPA thành số thực
    const cpa = parseFloat(student.cpa);
    if (cpa <= 1.5) {
      lowCPA++;
    }

  const mssv = student.mssv.toString();  // Chuyển mssv thành chuỗi 
  const yearOfEntry = parseInt(mssv.substring(0, 4), 10); // Trích xuất năm nhập học từ MSSV
  const studyDuration = currentYear - yearOfEntry;
        
    if (studyDuration > 5) {
      longDuration++;
    }
  }

  const totalSuspended = lowCPA + longDuration;

  
  
  console.clear();
  
  // Tìm danh sách các sinh viên bị đình chỉ

  console.log(`Số lượng sinh viên bị đình chỉ do CPA <= 1.5: ${lowCPA}`);
  console.log(`Số lượng sinh viên bị đình chỉ do thời gian học > 5 năm: ${longDuration}`);
  console.log(`Tổng số sinh viên bị đình chỉ: ${totalSuspended}`);

  prompt("Nhấn phím Enter để tiếp tục..."); // Chờ người dùng nhấn Enter để tiếp tục
  return;
}
