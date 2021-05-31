const Build = require('newspaperjs').Build;
const Article = require('newspaperjs').Article
const zips= require("./public/data/helpers")
const zips_data = zips.elpaso_towns_zips


const test = () =>{
    // Build.getCategoriesUrl('https://www.nytimes.com', ['politics', 'sports', 'technology']).then(categories=>{
    //     //console.log(categories); 
    // }).catch(reason=>{
    //     //console.log(reason);
    // })
    return Build.getArticlesUrl('https://www.ktsm.com').then(result=>{
        const zips_set = []
        
        const town_names = Object.keys(zips_data)

        result.forEach(link => { //parse article
            Article(link)
            .then(nlp=>{
                Object.keys(zips_data).forEach(name => {
                    const search = nlp.text.search(RegExp(`${name}`,"i"))

                    console.log(search)
                })
                //console.log(result.text);
            }).catch(reason=>{
                console.log(reason);
            })
        });

        //return articls
    }).catch(reason=>{
        console.log(reason)
    })
}

module.exports.test = test;