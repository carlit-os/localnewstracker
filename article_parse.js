const Build = require('newspaperjs').Build;
const Article = require('newspaperjs').Article
const zips= require("./public/data/helpers")
const zips_data = zips.elpaso_towns_zips

const article_search = async (nlp, town_names) => { //returns matching town or null
    const result = []
    for(const name of town_names){
        const town_idx = nlp.text.search(RegExp(`${name}`,'i'))
        if(town_idx != -1){
            result.push(name)
        }}
    if(result.length === 0){
        return null
    }else{
        return result
    }
}


const test = async () =>{
    return Build.getArticlesUrl('https://www.ktsm.com').then(result=>{
        const zips_set = []
        const town_names = Object.keys(zips_data)
        result.forEach(link => { //parse article
            Article(link)
            .then(nlp=>{
                const town_match = article_search(nlp,town_names)
                if(town_match!== null){
                    zips_set.push(town_match)
                    console.log(town_match)
                }
                console.log("checked story")
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