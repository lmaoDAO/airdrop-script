const fs = require("fs");

let final = "";

//
// BBB
//
fs.readdirSync(`${process.env.INPUT_DIR}/bbb`).forEach((fn) => {
  const file = fs.readFileSync(`${process.env.INPUT_DIR}/bbb/${fn}`, "utf8");
  // trim open [ and close ]
  const trimmed = file
    .substring(1, file.length - 1)
    .substring(0, file.length - 2);

  final += trimmed.replaceAll(",", "\n").replaceAll('"', "");
});

fs.writeFileSync(`${process.env.OUTPUT_DIR}/bbb-addresses.txt`, final);

//
// BGT
//
final = "";

fs.readdirSync(`${process.env.INPUT_DIR}/bgt`).forEach((fn) => {
  const file = fs.readFileSync(`${process.env.INPUT_DIR}/bgt/${fn}`, "utf8");
  // trim open [ and close ]
  const trimmed = file
    .substring(1, file.length - 1)
    .substring(0, file.length - 2);

  final += trimmed.replaceAll(",", "\n").replaceAll('"', "");
});

fs.writeFileSync(`${process.env.OUTPUT_DIR}/bgt-addresses.txt`, final);
