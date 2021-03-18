const numberCount = [0, 0, 1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1];
const kindName = ["砂漠", "森林", "牧草", "麦畑", "山地", "丘陵"];

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

function diceroll() {
  const random1 = Math.floor(Math.random() * 6 + 1);
  const random2 = Math.floor(Math.random() * 6 + 1);
  document.getElementById("dice-1").src = "assets/" + random1 + ".png";
  document.getElementById("dice-2").src = "assets/" + random2 + ".png";
}

function generate() {
  let kindCount = rootKindCount.slice();
  let kindMap = copyMatrix(rootKindMap);
  let numberMap = copyMatrix(rootNumberMap);

  shuffleKindMap(kindCount, kindMap);
  const random = Math.floor(Math.random() * 4);
  // console.log(random);
  if (random == 1 || random == 3) {
    kindMap.reverse();
  }
  if (random > 1) {
    shuffleNumberMap(numberMap);
  }
  if (random == 1 || random == 3) {
    numberMap.reverse();
  }

  console.log("***** 生成マップ *****");
  viewMap(kindMap, numberMap);
  console.log("*******************");

  viewScreen(kindMap, numberMap);
}

function shuffleNumberMap(numberMap) {
  for (let i = 0; i < numberMap.length; i++) {
    for (let j = 0; j < numberMap[i].length; j++) {
      // replace
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

function shuffleKindMap(kindCount, kindMap) {
  let desertPositionX = 0;
  let desertPositionY = 0;

  for (let i = 0; i < kindMap.length; i++) {
    for (let j = 0; j < kindMap[i].length; j++) {
      let continued = true;
      while (continued) {
        const random = Math.floor(Math.random() * 6);
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

  // 砂漠を中心に
  const wNum = kindMap[2][2];
  kindMap[2][2] = kindMap[desertPositionX][desertPositionY];
  kindMap[desertPositionX][desertPositionY] = wNum;
}

function viewMap(kindMap, numberMap) {
  for (let i = 0; i < kindMap.length; i++) {
    let array = [];
    for (let j = 0; j < kindMap[i].length; j++) {
      array.push(kindName[kindMap[i][j]] + ":" + numberMap[i][j]);
    }
    console.log(array);
  }
}

function viewScreen(kindMap, numberMap) {
  let screenId = 0;
  for (let i = 0; i < kindMap.length; i++) {
    let array = [];
    for (let j = 0; j < kindMap[i].length; j++) {
      document.getElementById(++screenId).innerHTML =
        kindName[kindMap[i][j]] + ":" + numberMap[i][j];
    }
  }
}

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

function copyMatrix(base) {
  const result = [];
  for (const line of base) {
    result.push([...line]);
  }
  return result;
}
