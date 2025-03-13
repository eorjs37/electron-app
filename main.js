const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("node:path");
let win = null;
/**
 * @description 윈도우 창 생성, app ready된 이후 생성이 가능하다.
 */
const createWindow = () => {
  // 메인프로세스로 부터 BrowserWindow 으로 윈도우 창을 생성
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload/preload.js"),
    },
  });

  // 로드해야할 파일
  win.loadFile("./src/index.html");

  /**
   * @description 윈도우 창의 이벤트이며, 기본이벤트를 막지않으면, 창이 종료된다
   */
  win.on("close", (event) => {
    console.log("window close");

    event.preventDefault();
    win.hide();
  });
};
/**
 * @description 앱 초기화 함수
 */
app.whenReady().then(() => {
  createWindow();
});

/**
 * @description 앱의 closed 될때 발생하는 이벤트이며, 기본적으로 window-all-closed구독하지 않으면, 앱이 종료되고, 구독할경우 동작이벤트를 작성해줘야 한다
 */
app.on("window-all-closed", () => {
  console.log("2.app window-all-closed");
  app.quit();
});

/**
 * @description 앱이 activate가 될때, 앱이 최초에 구동될때, dock에서 Icon 누를때
 * @os : macOs
 */
app.on("activate", () => {
  if (win) {
    win.show();
    return;
  }
});

/**
 * @description : 윈도이 창이 종료될때, 발생하는 이벤트, MacOs에서는 아이콘 우클릭 하고 "종료"버튼을 누르면 발동한다
 */
app.on("before-quit", (event) => {
  if (win) {
    console.log("1.app before-quit");
    win.destroy();
  }
});

ipcMain.on("message-from-renderer", (event, data) => {
  console.log(`Received from Renderer: ${data}`);
  dialog.showOpenDialog({ title: "TEST", message: "TEST2" });
  event.sender.send("message-from-main", "WELCOME");
});
