const Build = require('newspaperjs').Build;
const Article = require('newspaperjs').Article



const test = () =>{
    return Article('https://www.nytimes.com/2017/06/10/us/politics/sessions-senate-russia-election.html')
    .then(result=>{
        // console.log(result);
        //res.send(result)
        //resolve(result)
        return result
    }).catch(reason=>{
        console.log(reason);  
    })
}

module.exports.test = test;