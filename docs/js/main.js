// 画面表示名
const kindName = ["砂漠", "森林", "牧草", "麦畑", "山地", "丘陵"];

// 盤面構成情報
const numberCount = [0, 0, 1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1];
const rootKindCount = [1, 4, 4, 4, 3, 3, 3];
const rootKindMap = [
  [1, 2, 2],
  [3, 4, 3, 1],
  [1, 5, 0, 4, 3],
  [3, 4, 1, 2],
  [5, 2, 5],
];
const rootNumberMap = [
  [6, 3, 8],
  [2, 4, 5, 10],
  [5, 9, 0, 6, 9],
  [10, 11, 3, 12],
  [8, 4, 11],
];

/* ダイスを振る */
function diceroll() {
  const random1 = Math.floor(Math.random() * 6 + 1);
  const random2 = Math.floor(Math.random() * 6 + 1);
  document.getElementById("dice-1").src = "./assets/" + random1 + ".png";
  document.getElementById("dice-2").src = "./assets/" + random2 + ".png";
}

/* マップ生成 */
function generate() {
  let kindCount = rootKindCount.slice();
  let kindMap = copyMatrix(rootKindMap);
  let numberMap = copyMatrix(rootNumberMap);

  let isGenerating = true;
  while (isGenerating) {
    shuffleKindMap(kindCount, kindMap, numberMap);
    if (kindGenerateSucceed(kindMap)) {
      isGenerating = false;
    }
  }

  const random = Math.floor(Math.random() * 4);
  if (random == 1 || random == 3) {
    kindMap.reverse();
  }
  if (random > 1) {
    shuffleNumberMap(numberMap);
  }
  if (random == 1 || random == 3) {
    numberMap.reverse();
  }

  viewScreen(kindMap, numberMap);
}

function kindGenerateSucceed(kindMap) {
  // check line

  return true;
}

/* 種別をシャッフルする */
function shuffleKindMap(kindCount, kindMap, numberMap) {
  // 砂漠入替準備
  let desertPositionX = 0;
  let desertPositionY = 0;

  // 種別を配置
  let beforeKind = -1;
  for (let i = 0; i < kindMap.length; i++) {
    for (let j = 0; j < kindMap[i].length; j++) {
      let continued = true;
      while (continued) {
        const random = Math.floor(Math.random() * 6);

        // 前回と同じ出目の場合は振り直し
        if (random === beforeKind) {
          continue;
        }
        beforeKind = random;

        // まだ設置するものが残っているか
        if (kindCount[random] > 0) {
          kindMap[i][j] = random;
          kindCount[random] -= 1;
          continued = false;

          if (random == 0) {
            desertPositionX = i;
            desertPositionY = j;
          }
        }
      }
    }
  }

  // 砂漠ランダム設定か
  const desertCheckbox = document.getElementById("check-desert");
  if (desertCheckbox.checked) {
    // 砂漠の数値を0に
    const wNum = numberMap[2][2];
    numberMap[2][2] = numberMap[desertPositionX][desertPositionY];
    numberMap[desertPositionX][desertPositionY] = wNum;
  } else {
    // 種別で砂漠を中心に
    const wNum = kindMap[2][2];
    kindMap[2][2] = kindMap[desertPositionX][desertPositionY];
    kindMap[desertPositionX][desertPositionY] = wNum;
  }
}

/* 番号をシャッフルする */
function shuffleNumberMap(numberMap) {
  for (let i = 0; i < numberMap.length; i++) {
    for (let j = 0; j < numberMap[i].length; j++) {
      // replace logic
      const num = numberMap[i][j];
      switch (num) {
        case 2:
          numberMap[i][j] = 12;
          break;
        case 3:
          numberMap[i][j] = 11;
          break;
        case 4:
          numberMap[i][j] = 10;
          break;
        case 5:
          numberMap[i][j] = 9;
          break;
        case 6:
          numberMap[i][j] = 8;
          break;
        case 8:
          numberMap[i][j] = 6;
          break;
        case 9:
          numberMap[i][j] = 5;
          break;
        case 10:
          numberMap[i][j] = 4;
          break;
        case 11:
          numberMap[i][j] = 3;
          break;
        case 12:
          numberMap[i][j] = 2;
          break;
        default:
          // pass
          break;
      }
    }
  }
}

/* 画面へ埋め込み */
function viewScreen(kindMap, numberMap) {
  let screenId = 0;
  for (let i = 0; i < kindMap.length; i++) {
    for (let j = 0; j < kindMap[i].length; j++) {
      const target = document.getElementById(++screenId);

      // view text
      let htmlStr = kindName[kindMap[i][j]];
      htmlStr += "<br>";
      if (numberMap[i][j] < 10) {
        htmlStr += "0";
      }
      htmlStr += numberMap[i][j];
      target.innerHTML = htmlStr;

      // backgroud-color reset
      target.classList.remove("bg-yellow");
      target.classList.remove("bg-green");
      target.classList.remove("bg-yellowgreen");
      target.classList.remove("bg-blue");
      target.classList.remove("bg-orange");
      target.classList.remove("bg-red");
      target.classList.remove("bg-none");

      // background-color add
      switch (kindMap[i][j]) {
        case 0:
          target.classList.add("bg-yellow");
          break;
        case 1:
          target.classList.add("bg-green");
          break;
        case 2:
          target.classList.add("bg-yellowgreen");
          break;
        case 3:
          target.classList.add("bg-orange");
          break;
        case 4:
          target.classList.add("bg-blue");
          break;
        case 5:
          target.classList.add("bg-red");
          break;
        default:
          target.classList.add("bg-none");
      }
    }
  }
}

/* 2d array deep copy */
function copyMatrix(base) {
  const result = [];
  for (const line of base) {
    result.push([...line]);
  }
  return result;
}

/* for debug */
// function viewMap(kindMap, numberMap) {
//   console.log("***** 生成マップ *****");
//   for (let i = 0; i < kindMap.length; i++) {
//     let array = [];
//     for (let j = 0; j < kindMap[i].length; j++) {
//       array.push(kindName[kindMap[i][j]] + ":" + numberMap[i][j]);
//     }
//     console.log(array);
//     console.log("*******************");
//   }
// }
// function viewKindNameMap(kindMap) {
//   kindMap.forEach(function (row) {
//     let array = [];
//     row.forEach(function (value) {
//       array.push(kindName[value]);
//     });
//     console.log(array);
//   });
// }
// function viewNumberMap(numberMap) {
//   numberMap.forEach(function (row) {
//     console.log(row);
//   });
// }
