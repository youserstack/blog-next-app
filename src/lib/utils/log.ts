const some = () => {
  console.log("\x1b[30m%s\x1b[0m", "Black"); // 검정
  console.log("\x1b[31m%s\x1b[0m", "Red"); // 빨강
  console.log("\x1b[32m%s\x1b[0m", "Green"); // 초록
  console.log("\x1b[33m%s\x1b[0m", "Yellow"); // 노랑
  console.log("\x1b[34m%s\x1b[0m", "Blue"); // 파랑
  console.log("\x1b[35m%s\x1b[0m", "Magenta"); // 마젠타
  console.log("\x1b[36m%s\x1b[0m", "Cyan"); // 시안
  console.log("\x1b[37m%s\x1b[0m", "White"); // 흰색

  console.log("\x1b[38;2;255;100;0m%s\x1b[0m", "Orange");
  console.log("\x1b[38;2;0;255;0m%s\x1b[0m", "Lime");
  console.log("\x1b[38;2;0;255;255m%s\x1b[0m", "Cyan");
  console.log("\x1b[38;2;255;0;255m%s\x1b[0m", "Magenta");
  console.log("\x1b[38;2;0;0;255m%s\x1b[0m", "Blue");
};

export const logUrlCategory = (category: string[]) => {
  const log = `\n\x1b[34m[categories/${category
    .map((v: string) => decodeURI(v))
    .join("/")}]\x1b[0m`;
  console.log(log);
};
