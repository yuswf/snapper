import {config} from 'dotenv';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// plugins
puppeteer.use(StealthPlugin());

// dotenv configuration
config();

// message & sleep & date format functions
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const dateFormat = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Istanbul',
        hour12: true,
        long: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        milliseconds: '3-digit',
    });
}
const message = (msg) => console.log(`[${dateFormat()}] ${msg}`);

// get the environment variables
const usr = process.env.USR;
const passw = process.env.PASSW;
// const session = process.env.SESSION || null;
const url = process.env.URL;
const chat = process.env.CHAT;

// proxies
const proxies = [];
const getRandomProxy = () => proxies[Math.floor(Math.random() * proxies.length)];

// user agent & headers functions
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.2478.100',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.2478.88',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15'
];
const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];
/*
const getRandomHeaders = () => ({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*\/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': getRandomUserAgent(),
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0'
});
*/

// main function
(async () => {
    message('Starting the browser...');
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--start-maximized',
            '--window-size=1920,1080',
            // '--proxy-server=' + getRandomProxy()
        ],
    });

    message('Opening the page...');
    const page = await browser.newPage();

    message('Setting the user agent...');
    await page.setUserAgent(getRandomUserAgent());

    message('Overriding the permissions...');
    await browser.defaultBrowserContext().overridePermissions(chat, ['camera']);

    /*
    message('Setting the cookies...');
    await page.setCookie({
        name: '',
        value: '',
        domain: '.web.snapchat.com'
    });
    */

    message('Navigating to the page...');
    await page.setViewport({width: 1920, height: 1080});
    await page.goto('https://accounts.snapchat.com/accounts/v2/login', {
        waitUntil: 'networkidle2',
        timeout: 60000
    });

    message('Waiting for the username input...');
    await page.waitForSelector('#accountIdentifier', {timeout: 30000});

    message('Typing the username...');
    await page.type('#accountIdentifier', usr, {delay: 5});
    await page.keyboard.press('Enter');

    message('Waiting for the password input...');
    await page.waitForSelector('#password', {timeout: 30000});

    message('Typing the password...');
    await page.type('#password', passw, {delay: 5});
    await page.keyboard.press('Enter');

    message('Waiting for the webchat button...');
    await page.waitForSelector('.WebChatBanner_webchatButton__g_7ti', {timeout: 30000});

    message('Clicking the webchat button...');
    await page.click('.WebChatBanner_webchatButton__g_7ti');

    message('Waiting for the modal...');
    await page.waitForSelector('.cV8g1', {timeout: 30000});

    message('Closing the modal...');
    await page.click('.cV8g1');

    message('Waiting for the camera button...');
    await page.waitForSelector('.aC3Y8', {timeout: 30000});

    message('Clicking the camera button...');
    await page.click('.aC3Y8');
    await sleep(2000);

    message('Waiting for the shotting button...');
    await page.waitForSelector('.FBYjn.gK0xL.A7Cr_.m3ODJ', {timeout: 30000});

    message('Clicking the shotting button...');
    await page.evaluate(() => {
        const button = document.querySelector('.FBYjn.gK0xL.A7Cr_.m3ODJ');
        button.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        }));
    });
    await sleep(1000);

    /*
    const shootButton = await page.$('.FBYjn.gK0xL.A7Cr_.m3ODJ');

    await shootButton.evaluate(b => b.click());
    await sleep(1000);

    message('Clicking the shotting button...');
    await page.click('.FBYjn.gK0xL.A7Cr_.m3ODJ');

    const button = await page.$('.FBYjn.gK0xL.A7Cr_.m3ODJ');
    const box = await button.boundingBox();

    message('Clicking the shotting button...');
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    */

    message('Waiting for the submit button...');
    await page.waitForSelector('.YatIx.fGS78.eKaL7.Bnaur', {timeout: 30000});

    message('Clicking the submit button...');
    await page.click('.YatIx.fGS78.eKaL7.Bnaur');

    message('Waiting for the filter button...');
    await page.waitForSelector('.c47Sk', {timeout: 30000});

    const buttons = await page.$$('button.c47Sk');

    message('Clicking the filter button...');
    await buttons[0].click(); // 1 is the second button (0 is the first button) these are shortcut buttons

    message('Waiting for the select button...');
    await page.waitForSelector('.Y7u8A', {timeout: 30000});

    message('Clicking the select button...');
    await page.click('.Y7u8A');

    message('Waiting for the send button...');
    await page.waitForSelector('.TYX6O.eKaL7.Bnaur', {timeout: 30000});

    message('Clicking the send button...');
    await page.click('.TYX6O.eKaL7.Bnaur');

    message('Snap sent!');
    message('Browser will close in 10 seconds...');
    setTimeout(async () => {
        message('Closed the browser...');
        await browser.close();
    }, 10000);
})();
