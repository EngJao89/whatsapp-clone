const { resolve } = require('path');
const { app, Menu, Tray, dialog } = require('electron');

app.dock.hide();

app.on('ready', () => {
  const tray = new Tray(resolve(__dirname, 'assets', 'iconTemplate.png'));

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', checked: true, click: () => {
      const path = dialog.showOpenDialog({ properties: ['openDirectory'] });
        console.log(path);
    } }
  ]);

  tray.setToolTip('This is my application');
  tray.setContextMenu(contextMenu);
});

