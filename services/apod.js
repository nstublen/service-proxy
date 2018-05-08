var express = require('express');
var fetch = require('isomorphic-fetch');
var process = require('process');

var router = express.Router();

let apiKey = process.env.APOD_KEY || "DEMO_KEY";

router.all('*', function (req, res, next) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    for (header of Object.keys(req.headers)) {
        if (header == "host" ||
            header == "user-agent") {
            continue;
        }
        headers.append(header, req.header(header));
    }

    let opts = {
        method: req.method,
        headers,
        body: req.body,
        redirect: "follow",
        referrer: "no-referrer"
    };

    let path = req.path.split("/").slice(1).join("/");

    let queryParams = [];
    for (param in req.query) {
        queryParams.push(`${param}=${req.query[param]}`);
    }
    queryParams.push(`api_key=${apiKey}`);
    let query = queryParams.join("&");

    let url = `https://api.nasa.gov/planetary/apod?${query}`;

    fetch(url, opts)
        .then(response => response.json())
        .then(json =>
            res.send(JSON.stringify(json))
        )
        .catch(error => {
            console.log(error);
            res.status = 500;
            res.send("Server error");
        });
});

module.exports = router