# Auto Snap Sender

First of all, you need to install the dependencies:

```bash
npm install
```

Then, you need to create a `.env` file and add the following:

```env
USR=your_username
PASSW=your_password
```

### Before running the script, you need to create a shortcut on Snapchat:
![img](https://i.ibb.co/htmGgMK/image.png)

Which one is the your shortcut, and then change the `index.js` file with the correct number.

```js
const buttons = await page.$$('button.c47Sk');
await buttons[0].click(); // 1 is the second button (0 is the first button) these are shortcut buttons
```

### Run the script:

```bash
node index.js
```

### If you want to run the script in the background, you can use Task Scheduler on Windows:

#### You should create a bat file to run the script:

```bat
@echo off
cd /d C:\path\to\your\project && node index.js
```

#### Then, you should create a task in Task Scheduler:
`Search App > Task Scheduler > Create Basic Task > Next > Browse > C:\path\to\your\bat\file.bat > Next > Next > Set the trigger > Set the actions > Set the conditions > Create > Ok`