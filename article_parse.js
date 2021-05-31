const Build = require('newspaperjs').Build;
const Article = require('newspaperjs').Article



const test = () =>{
    // Build.getCategoriesUrl('https://www.nytimes.com', ['politics', 'sports', 'technology']).then(categories=>{
    //     //console.log(categories); 
    // }).catch(reason=>{
    //     //console.log(reason);
    // })
    return Build.getArticlesUrl('https://www.nytimes.com/pages/politics').then(result=>{
        return result
    }).catch(reason=>{
        console.log(reason)
    })
}

module.exports.test = test;