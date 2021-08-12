const puppeteer = require('puppeteer')
const express = require('express')
const server = express()

async function testeHttp() {

	try {

		const chromeOptions = {
	    headless: true,
	    args: [
	        	'--no-sandbox',
	        	'--disable-setuid-sandbox',
        		'--disable-dev-shm-usage'
	    	],
		};

		console.log('Instancia Puppeteer');
		const browser = await puppeteer.launch(chromeOptions);

		console.log('Abre navegador');
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 })

		console.log('Acessa pagina sistematizandolp.com.br');
		await page.goto('https://sistematizandolp.com.br');

		console.log('Tira um printscreen do site');
		await page.screenshot({ path: 'print.png' });

		console.log('Fecha o navegador e FIM !');
		await browser.close();

	} catch(err) {
		console.error(err);
	}

}

server.get('/', (req, res) => {
	res.send(`<button type="button" onclick="document.location.assign('/robo')">SCREENSHOT</button>`)
})

server.get('/favicon.ico', (req, res) => {
	res.send(`<button type="button" onclick="document.location.assign('/robo')">SCREENSHOT</button>`)
})

server.get('/robo', (req, res) => {

	testeHttp()
	res.send(`<button type="button" onclick="document.location.assign('/')">BACK</button>`)

})

var port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log('Server in port: '+port)
})
