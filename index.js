const puppeteer = require('puppeteer')
const express = require('express')
const server = express()

async function testeHttp() {

	try {

		const chromeOptions = {
	    headless: true,
	    args: [
	        "--no-sandbox"
	    ],
		};

		const browser = await puppeteer.launch(chromeOptions);

	  const page = await browser.newPage();
	  await page.setViewport({ width: 1280, height: 800 })
	  await page.goto('https://sistematizandolp.com.br');

	  await page.screenshot({ path: 'print.png' });

	  await browser.close();

	} catch(err) {
		console.error(err);
	}

}

server.get('/', (req, res) => {
	res.send(`<button type="button" onclick="document.location.assign('/robo')">INICIAR ROBO</button>`)
})

server.get('/favicon.ico', (req, res) => {
	res.send(`<button type="button" onclick="document.location.assign('/robo')">INICIAR ROBO</button>`)
})

server.get('/robo', (req, res) => {

	testeHttp()
	res.send(`<button type="button" onclick="document.location.assign('/')">VOLTAR</button>`)

})

var port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log('Servidor rodando na porta: '+port)
})