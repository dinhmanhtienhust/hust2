import promptSync from "prompt-sync";
import fs from 'fs'; // nhập thư viện fs

export function find(mssv) {
  // Đường dẫn tới file JSON chứa dữ liệu sinh viên
  const filename = './dataStudent.json';
  const prompt = promptSync();

  // Đọc file JSON đồng bộ (readFileSync)
  const data = fs.readFileSync(filename, 'utf8');

  // Chuyển đổi dữ liệu JSON thành mảng sinh viên mà không dùng JSON.parse
  const arrSV = [];
  let temp = '';
  let inObject = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i] === '{') {
      inObject = true;
      temp = '';
    }
    if (inObject) {
      temp += data[i];
    }
    if (data[i] === '}') {
      inObject = false;
      arrSV.push(eval('(' + temp + ')'));
    }
  }

  console.clear(); // Xóa màn hình

  const arrlength = arrSV.length; // Lấy số lượng sinh viên
  let found = false; // Biến để kiểm tra nếu tìm thấy sinh viên

  // Duyệt qua từng sinh viên trong mảng để tìm MSSV
  for (let i = 0; i < arrlength; i++) {
    let currentMSSV = '';
    let targetMSSV = '';

    // Chuyển đổi MSSV của sinh viên hiện tại thành số
    for (let j = 0; j < arrSV[i].mssv.toString().length; j++) {
      currentMSSV += arrSV[i].mssv.toString()[j];
    }

    // Chuyển đổi MSSV mục tiêu thành số
    for (let k = 0; k < mssv.toString().length; k++) {
      targetMSSV += mssv.toString()[k];
    }

    if (parseInt(currentMSSV) === parseInt(targetMSSV)) {  // Kiểm tra xem MSSV có khớp không
      console.log(`MSSV: ${arrSV[i].mssv} - Tên: ${arrSV[i].name} - CPA: ${arrSV[i].cpa} - Mức cảnh cáo: ${arrSV[i].canhcao}`);
      found = true; // Đánh dấu đã tìm thấy sinh viên
    }
  }

  // Nếu không tìm thấy sinh viên
  if (!found) {
    console.log("undefine");
  }

  prompt("Nhấn phím Enter để tiếp tục..."); // Chờ người dùng nhấn Enter để tiếp tục
  return;
};
