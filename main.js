const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload/preload.js"),
    },
  });

  win.loadFile("./src/index.html");
};
app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("message-from-renderer", (event, data) => {
  console.log(`Received from Renderer: ${data}`);
});
