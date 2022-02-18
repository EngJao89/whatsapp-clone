const { resolve, baseName } = require('path');
const { app, Menu, Tray, dialog } = require('electron');
const Store = require('electron-store');

const schema = {
  projects: {
    type: 'string'
  }
}

const store = new Store({ schema });

app.dock.hide();

app.on('ready', () => {
  const tray = new Tray(resolve(__dirname, 'assets', 'iconTemplate.png'));
  const storedProjects = store.get('projects');
  const projects = storedProjects ? JSON.parse(storedProjects) : [];

  const items = projects.map(project => ({ 
    label: project.name, 
    click: () => { 
      spawn.sync('code', [project.path]);
    }
  }));

  console.log(projects);

  const contextMenu = Menu.buildFromTemplate([
    ...items,
    { 
      type: 'separator',
    },
    { 
      label: 'Adicionar novo projeto...', 
      click: () => {
        const path = dialog.showOpenDialog({ properties: ['openDirectory'] });
        store.set('projects', JSON.stringify([...projects, {
          path,
          name: baseName(path),
        }]));
      }, 
    },
  ]);

  tray.setToolTip('This is my application');
  tray.setContextMenu(contextMenu);
});

