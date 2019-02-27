// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");

const reader = new mailgunReader(mailgunConfig);

/**
 * Get and return the URL content from the mailgun API
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = function(req, res){
	let params = req.query
	let mailKey = params.mailKey
	if (mailKey == null || mailKey === ""){
		res.status(400).send('{ "error" : "No `mailKey` param found" }');
	}

	reader.getKey(mailKey).then(response => {
		let body = response["body-html"] || response["body-plain"]
		if( body === undefined || body == null) {
			body = 'The kittens found no messages :('
		}
		res.status(200).send(body)
	})
	.catch(e => {
			res.status(500).send("{error: '"+e+"'}")
	});
}
