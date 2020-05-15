var express = require('express');
var fetch = require("node-fetch");
var router = express.Router();

const API_URL_SOURCE = "https://jobs.github.com/positions"

router.get('/', function(req, res) {
    let description = req.query.description
    let location = req.query.location
    let fullTime = req.query.full_time ? JSON.parse(req.query.full_time) : false;

    fetch(`${API_URL_SOURCE}.json`)
    .then(response => response.json())
    .then(data => {
        let resultData = data.filter((item,index) => {
            let booleanDescription
            if (description) {
                booleanDescription = item.description.toString().toLowerCase().includes(description.toLowerCase());
            } else {
                booleanDescription = true
            }
            if (booleanDescription) {
                let booleanLocation
                if (location) {
                    booleanLocation = item.location.toString().toLowerCase().includes(location.toLowerCase());
                } else {
                    booleanLocation = true
                }
                if (booleanLocation) {
                    if (fullTime) {
                        return item.type.toString() === "Full Time"
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        })
        res.status(200).json({
            status : 'success',
            numData : resultData.length,
            results : resultData
        })
    })
    .catch(error => {
        res.status(400).json({
            status : 'error',
            message : error.message
        })
    })
});

router.get('/:id', function(req, res) {
    let dataId = req.params.id;
    fetch(`${API_URL_SOURCE}/${dataId}.json`)
    .then(response => response.json())
    .then(data => {
        res.status(200).json({
            status : 'success',
            result : data
        })
    })
    .catch(error => {
        res.status(400).json({
            status : 'error',
            message : error.message,
            result : {}
        })
    })
})

module.exports = router;
