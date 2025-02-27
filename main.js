const { exec } = require("child_process");
const { app, BrowserWindow } = require('electron')

exec("podman-compose up -d", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Podman: ${error.message}`);
    return;
  }
  console.log(`Podman started: ${stdout}`);
});
console.log("Podman is starting...");

console.log('Hello from Electron 👋')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})