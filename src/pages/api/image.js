export default function imageHandler(req, res) {
	var filePath = path.join(__dirname, "FOTO");
	var stat = fileSystem.statSync(filePath);

	response.writeHead(200, {
		"Content-Type": "image/jpeg",
		"Content-Length": stat.size,
	});

	var readStream = fileSystem.createReadStream(filePath);
	// We replaced all the event handlers with a simple call to readStream.pipe()
	readStream.pipe(response);
}
