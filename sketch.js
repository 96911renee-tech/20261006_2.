// 儲存五道測驗題目
let questions = [
  // 第一題
  {
    // 設定第一題題目
    question: "在 p5.js 中，哪個函式會在程式開始時執行一次？",

    // 設定第一題四個選項
    options: ["draw()", "setup()", "start()", "init()"],

    // 設定正確答案為第二個選項
    answer: 1
  },

  // 第二題
  {
    // 設定第二題題目
    question: "在 p5.js 中，哪個函式會持續重複執行？",

    // 設定第二題四個選項
    options: ["loop()", "repeat()", "draw()", "run()"],

    // 設定正確答案為第三個選項
    answer: 2
  },

  // 第三題
  {
    // 設定第三題題目
    question: "哪個指令可以建立畫布？",

    // 設定第三題四個選項
    options: ["createCanvas()", "makeCanvas()", "canvas()", "newCanvas()"],

    // 設定正確答案為第一個選項
    answer: 0
  },

  // 第四題
  {
    // 設定第四題題目
    question: "哪個指令可以畫出橢圓形或圓形？",

    // 設定第四題四個選項
    options: ["circle()", "ellipse()", "round()", "drawCircle()"],

    // 設定正確答案為第二個選項
    answer: 1
  },

  // 第五題
  {
    // 設定第五題題目
    question: "哪個指令可以設定背景顏色？",

    // 設定第五題四個選項
    options: ["background()", "bgColor()", "setBackground()", "colorBackground()"],

    // 設定正確答案為第一個選項
    answer: 0
  }
];

// 設定目前題目編號
let currentQuestion = 0;

// 設定答對題數
let score = 0;

// 設定是否已經作答
let answered = false;

// 設定是否答錯
let wrongAnswer = false;

// 設定選項按鈕陣列
let optionButtons = [];

// 設定下一題按鈕
let nextButton;

// 設定動畫時間
let bounceTime = 0;

// 設定作答提示是否顯示
let showInstruction = true;

// 建立畫布與介面
function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平置中
  textAlign(CENTER, CENTER);

  // 設定文字垂直置中
  textStyle(NORMAL);

  // 設定中文顯示字型
  textFont("Arial");

  // 建立四個選項按鈕
  for (let i = 0; i < 4; i++) {
    // 建立空白按鈕
    let button = createButton("");

    // 設定按鈕文字大小
    button.style("font-size", "20px");

    // 設定按鈕內距
    button.style("padding", "14px");

    // 設定按鈕文字顏色
    button.style("color", "#023047");

    // 設定按鈕背景顏色
    button.style("background-color", "#ffffff");

    // 設定按鈕邊框
    button.style("border", "2px solid #8ecae6");

    // 設定按鈕圓角
    button.style("border-radius", "8px");

    // 設定滑鼠游標
    button.style("cursor", "pointer");

    // 設定按鈕被點擊時執行答案判斷
    button.mousePressed(function () {
      // 呼叫答案判斷函式
      checkAnswer(i);
    });

    // 將按鈕放入陣列
    optionButtons.push(button);
  }

  // 建立下一題按鈕
  nextButton = createButton("下一題");

  // 設定下一題按鈕文字大小
  nextButton.style("font-size", "20px");

  // 設定下一題按鈕內距
  nextButton.style("padding", "10px 28px");

  // 設定下一題按鈕文字顏色
  nextButton.style("color", "#ffffff");

  // 設定下一題按鈕背景顏色
  nextButton.style("background-color", "#023047");

  // 設定下一題按鈕邊框
  nextButton.style("border", "none");

  // 設定下一題按鈕圓角
  nextButton.style("border-radius", "8px");

  // 設定滑鼠游標
  nextButton.style("cursor", "pointer");

  // 設定下一題按鈕被點擊時切換題目
  nextButton.mousePressed(nextQuestion);

  // 隱藏下一題按鈕
  nextButton.hide();

  // 更新題目內容
  updateQuestion();

  // 設定介面位置
  positionButtons();
}

// 每一幀繪製畫面
function draw() {
  // 設定畫布背景顏色
  background("#f1faee");

  // 判斷是否已經完成測驗
  if (currentQuestion >= questions.length) {
    // 顯示測驗結果
    drawResult();

    // 結束本次繪圖
    return;
  }

  // 設定標題文字顏色
  fill("#023047");

  // 設定標題文字大小
  textSize(34);

  // 顯示測驗標題
  text("p5.js 簡易指令測驗", width / 2, 55);

  // 設定題數文字顏色
  fill("#219ebc");

  // 設定題數文字大小
  textSize(24);

  // 顯示目前題數
  text(
    "第 " + (currentQuestion + 1) + " 題 / 共 " + questions.length + " 題",
    width / 2,
    115
  );

  // 設定題目文字顏色
  fill("#023047");

  // 設定題目文字大小
  textSize(26);

  // 顯示題目文字
  text(questions[currentQuestion].question, width / 2, 175);

  // 判斷作答提示是否顯示
  if (showInstruction) {
    // 設定提示文字顏色
    fill("#023047");

    // 設定提示文字大小
    textSize(28);

    // 設定提示文字為粗體
    textStyle(BOLD);

    // 顯示作答提示
    text("請點擊一個選項作答", width / 2, getInstructionY());

    // 將文字樣式恢復為一般
    textStyle(NORMAL);
  }

  // 判斷是否需要播放跳動動畫
  if (wrongAnswer && !answered) {
    // 增加動畫時間
    bounceTime += 0.12;

    // 持續更新按鈕位置
    positionButtons();
  }
}

// 更新題目與選項內容
function updateQuestion() {
  // 判斷是否已經完成全部題目
  if (currentQuestion >= questions.length) {
    // 隱藏所有選項按鈕
    for (let button of optionButtons) {
      // 隱藏選項按鈕
      button.hide();
    }

    // 隱藏下一題按鈕
    nextButton.hide();

    // 關閉作答提示
    showInstruction = false;

    // 結束函式
    return;
  }

  // 設定尚未作答
  answered = false;

  // 設定尚未答錯
  wrongAnswer = false;

  // 重設跳動時間
  bounceTime = 0;

  // 顯示作答提示
  showInstruction = true;

  // 取得目前題目
  let questionData = questions[currentQuestion];

  // 更新四個選項按鈕
  for (let i = 0; i < optionButtons.length; i++) {
    // 設定選項按鈕文字
    optionButtons[i].html(
      String.fromCharCode(65 + i) + ". " + questionData.options[i]
    );

    // 顯示選項按鈕
    optionButtons[i].show();

    // 恢復按鈕背景顏色
    optionButtons[i].style("background-color", "#ffffff");

    // 恢復按鈕文字顏色
    optionButtons[i].style("color", "#023047");

    // 恢復按鈕邊框顏色
    optionButtons[i].style("border", "2px solid #8ecae6");

    // 恢復按鈕位置變形
    optionButtons[i].style("transform", "translateY(0px)");
  }

  // 隱藏下一題按鈕
  nextButton.hide();

  // 更新所有元件位置
  positionButtons();
}

// 判斷使用者選擇的答案
function checkAnswer(selectedIndex) {
  // 防止重複作答
  if (answered) {
    // 結束函式
    return;
  }

  // 取得目前題目的正確答案
  let correctIndex = questions[currentQuestion].answer;

  // 判斷答案是否正確
  if (selectedIndex === correctIndex) {
    // 增加答對題數
    score++;

    // 設定已完成作答
    answered = true;

    // 關閉作答提示
    showInstruction = false;

    // 將選取的按鈕設定為綠色
    optionButtons[selectedIndex].style("background-color", "#90be6d");

    // 將選項文字改為白色
    optionButtons[selectedIndex].style("color", "#ffffff");

    // 顯示下一題按鈕
    nextButton.show();

    // 更新按鈕位置
    positionButtons();
  } else {
    // 設定答錯狀態
    wrongAnswer = true;

    // 關閉作答提示
    showInstruction = false;

    // 將正確選項設定為 #219ebc
    optionButtons[correctIndex].style("background-color", "#219ebc");

    // 將正確選項文字設定為白色
    optionButtons[correctIndex].style("color", "#ffffff");

    // 將正確選項邊框設定為 #219ebc
    optionButtons[correctIndex].style("border", "2px solid #219ebc");

    // 顯示下一題按鈕
    nextButton.show();

    // 更新按鈕位置
    positionButtons();
  }
}

// 切換下一題
function nextQuestion() {
  // 增加目前題目編號
  currentQuestion++;

  // 更新題目內容
  updateQuestion();
}

// 計算作答提示文字的垂直位置
function getInstructionY() {
  // 設定選項按鈕起始位置
  let startY = 240;

  // 計算提示文字位置
  return startY + optionButtons.length * 70 + 28;
}

// 設定所有按鈕位置
function positionButtons() {
  // 計算按鈕寬度
  let buttonWidth = min(600, width * 0.8);

  // 設定按鈕起始位置
  let startY = 240;

  // 逐一設定選項按鈕位置
  for (let i = 0; i < optionButtons.length; i++) {
    // 計算按鈕基本位置
    let y = startY + i * 70;

    // 設定跳動距離
    let bounceOffset = 0;

    // 判斷目前是否答錯且是正確選項
    if (
      wrongAnswer &&
      !answered &&
      i === questions[currentQuestion].answer
    ) {
      // 計算上下跳動距離
      bounceOffset = sin(bounceTime) * 15;
    }

    // 設定選項按鈕位置
    optionButtons[i].position(
      width / 2 - buttonWidth / 2,
      y + bounceOffset
    );

    // 設定選項按鈕寬度
    optionButtons[i].style("width", buttonWidth + "px");
  }

  // 判斷下一題按鈕是否顯示
  if (nextButton.elt.style.display !== "none") {
    // 設定下一題按鈕位置
    nextButton.position(width / 2 - 70, getInstructionY() + 50);
  }
}

// 顯示測驗結果
function drawResult() {
  // 設定結果標題顏色
  fill("#023047");

  // 設定結果標題大小
  textSize(38);

  // 顯示測驗完成
  text("測驗完成！", width / 2, height / 2 - 80);

  // 設定成績文字顏色
  fill("#219ebc");

  // 設定成績文字大小
  textSize(32);

  // 顯示答對題數
  text(
    "你答對了 " + score + " / " + questions.length + " 題",
    width / 2,
    height / 2
  );

  // 設定鼓勵文字顏色
  fill("#023047");

  // 設定鼓勵文字大小
  textSize(24);

  // 顯示鼓勵文字
  text("歡迎繼續練習 p5.js！", width / 2, height / 2 + 75);
}

// 當視窗大小改變時重新調整畫面
function windowResized() {
  // 調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新設定按鈕位置
  positionButtons();
}