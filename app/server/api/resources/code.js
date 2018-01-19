var express 	= require('express'); 
var router 		= express.Router(); 
var fs          = require('fs');
var path        = require('path');

router.post('/save', function(req, res) {
    console.log('lets save this!', req.body);

    html = req.body.html;
    style = req.body.style; 
    script = req.body.script;
    
    fs.writeFile('./app/client/public/test/index.html', html, function(err) {
        if(err) console.log('err: ', err) 

        console.log('html saved!');
    })
    console.log(path.dirname(__filename));
    fs.writeFile('./app/client/public/test/script.js', script, function(err) {
        if(err) console.log('err: ', err) 

        console.log('script saved!');
    })

    fs.writeFile('./app/client/public/test/style.css', style, function(err) {
        if(err) console.log('err: ', err)  

        console.log('css saved!');
    })
})

module.exports = router; 