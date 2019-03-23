const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
	const httpMethod = req.method
	
	switch(httpMethod) {
		case 'POST':

			let bodyPost = [];

			req.on('data', chunk => {
				bodyPost.push(chunk)
			});
			req.on('end', () => {
				bodyPost = Buffer.concat(bodyPost).toString()
				const fecha = Date.now()

				let output = fs.createWriteStream(`${ fecha }-save.txt`)
				output.write(bodyPost)
				output.end()

				res.writeHead(200, {
					'Content-Type': 'application/json',
				});

				return res.end(bodyPost)

			})


			break
	}
	
	// return res.end();

})

server.listen(8080, () => {
	console.log('Listening on port 8080');
});