import { list } from "./list.js";
import { find } from "./find.js";
import { modify } from "./modify.js";
import { findTop } from "./findTop.js";
import { findBottom } from "./findBottom.js";
import { findWarning } from "./findWarning.js";
import { count } from "./count.js"; 
import { countSuspended } from "./countSuspended.js";
import promptSync from "prompt-sync";
import { classify } from "./classify.js";
// Sử dụng thư viện prompt-sync để nhận đầu vào từ người dùng
const prompt = promptSync();
let exit = false;

function error(){
  console.clear();
  console.log("Lệnh này không hợp lệ");
  let comand = prompt("Nhấn phím Enter để tiếp tục");
  return;
}

while (!exit) {
  //console.clear();
  console.log("Quản lý kết quả sinh viên Đại học Bách Khoa Hà Nội");
  console.log("Danh sách chức năng: ");
  console.log("1.list: In ra danh sách sinh viên");
  console.log("2.find <mssv>: Tìm sinh viên với MSSV");
  console.log("3.modify cpa <mssv> <cpa>: Cập nhật điểm CPA của sinh viên");
  console.log("4.findTop n: Tìm n sinh viên có CPA cao nhất");
  console.log("5.findBottom n: Tìm n sinh viên có CPA thấp nhất");
  console.log("6.findWarning: Tìm các sinh viên đang bị cảnh cáo, kèm mức cảnh cáo");
  console.log("7.count a b: Đếm số sinh viên có điểm cpa nằm trong đoạn [a,b]");
  console.log("8.countSuspended: Đếm số sinh viên phải đình chỉ học kèm diều kiện");
  console.log("9.classify: [Tự phát triển] Đếm số sinh viên theo học lực");
  console.log("0.exit: Thoát chương trình, nhập 0 để thoát");

  let command = prompt("Nhập lệnh theo cú pháp như trên: ");
  let commandArr = command.split(" ");
  
  // Kiểm tra thoát chương trình
  if (commandArr[0] === "exit" || commandArr[0] === "0") {
    exit = true;
    console.clear();
    console.log("Đang thoát chương trình...");
    break;
  } else {
    switch (commandArr[0]) {
      case 'list':
        list();
        break; 
      case 'find':
        if (commandArr.length === 2) {
          const mssv = commandArr[1];
          find(mssv);
        } else {
         console.log("Lệnh find không hợp lệ. Vui lòng nhập lệnh theo định dạng: find <mssv>");
        }
        break;


      case 'modify':
        if (commandArr.length === 4) {
          if (commandArr[1] === 'cpa' && commandArr.length === 4) {
            const mssv = commandArr[2];
            const newCPA = parseFloat(commandArr[3]);
            if (newCPA <0 || newCPA > 4) {
              console.log('CPA không hợp lệ, vui lòng nhập lại');
            } else {
                // Gọi hàm modifyCPA từ modify.js
                modify(mssv, newCPA); }
            }
            prompt("Nhấn phím Enter để tiếp tục...");
        }  else {
          error();
        }
        break;

      case 'findTop':
        if (commandArr.length === 2) {
          findTop(commandArr[1]);
        } else {
          error();
        }
        break;
      case 'findBottom':
        if (commandArr.length === 2) {
          findBottom(commandArr[1]);
        } else {
          error();
        }
        break; 
      case 'findWarning':
        findWarning();
        break;
       case 'count':
        if (commandArr.length === 3) {
          count(commandArr[1], commandArr[2]);
        } else {
          error();
        }
        break; 

      case 'countSuspended':
        if (commandArr.length === 1) {
          countSuspended(commandArr[0]);
        } else {
          error();
        }
        break; 
        case 'classify':
          if (commandArr.length === 1) {
            classify(commandArr[0]);
          } else {
            error();
          }
          break; 
         default:
          error(); 
      //default:
        //error();
    }
  }
}



