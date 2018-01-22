var express 	= require('express'); 
var router 		= express.Router(); 
var fs          = require('fs');
var path        = require('path');

router.post('/save', function(req, res) {
    console.log('lets save this!', req.body);

    html = req.body.html;
    //style = req.body.style; 
    //script = req.body.script;
    
    if(process.env.NODE_ENV === 'production') {
        fs.writeFile('./app/client/build/test/index.html', html, function(err) {
            if(err) console.log('err: ', err) 
    
            console.log('html on prod saved!');
        })
        /*console.log(path.dirname(__filename));
        fs.writeFile('./app/client/build/test/script.js', script, function(err) {
            if(err) console.log('err: ', err) 
    
            console.log('script on prod saved!');
        })
    
        fs.writeFile('./app/client/build/test/style.css', style, function(err) {
            if(err) console.log('err: ', err)  
    
            console.log('css on prod saved!');
        })*/
    } else {
        fs.writeFile('./app/client/public/test/index.html', html, function(err) {
            if(err) console.log('err: ', err) 
    
            console.log('html saved!');
        })
       /* console.log(path.dirname(__filename));
        fs.writeFile('./app/client/public/test/script.js', script, function(err) {
            if(err) console.log('err: ', err) 
    
            console.log('script saved!');
        })
    
        fs.writeFile('./app/client/public/test/style.css', style, function(err) {
            if(err) console.log('err: ', err)  
    
            console.log('css saved!');
        })*/
    }

    
})

module.exports = router; 