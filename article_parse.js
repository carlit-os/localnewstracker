const Build = require('newspaperjs').Build;
const Article = require('newspaperjs').Article
const zips= require("./public/data/helpers")
const zips_data = zips.elpaso_towns_zips

// const article_search = async (nlp, town_names) => {
//     for(const name of town_names){
//         const town_idx = nlp.text.search(RegExp(`${name}`,"i"))
//         if(town_idx != -1){
//         zips_set.push(town_idx)
//         console.log("added")
//     }
// }}


const test = async () =>{
    return Build.getArticlesUrl('https://www.ktsm.com').then(result=>{
        const zips_set = []
        
        const town_names = Object.keys(zips_data)

        result.forEach(link => { //parse article
            Article(link)
            .then(nlp=>{
                if(town_names.some(substring => nlp.text.toLowerCase().includes(substring))){ //consider better search
                    console.log("found")
                }
            }) 
            .catch(reason=>{
                console.log(reason);
            })  
        })

        console.log(zips_set)

        
        //return articls
    }).catch(reason=>{
        console.log(reason)
    })
}

module.exports.test = test;