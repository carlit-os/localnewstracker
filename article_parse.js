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

//const town_handler = async ()

const link_handler = async (res, callback, link_set) => {
    
    const town_names = Object.keys(zips_data)

    const town_set = await Promise.all(link_set.map(Article))
    .then(nlp_set => {
        Promise.all(nlp_set.map(nlp => article_search(nlp,town_names)))
        .then(town_list => {
            const result = town_list.filter(x => !!x)
            callback(res,result)
        })
    })
}


const test = async (res, callback) =>{
    const news_link_set = await Build.getArticlesUrl('https://www.ktsm.com');

    // console.log(news_link_set)

    const town_list = link_handler(res, callback, news_link_set)
    console.log(town_list)
    return town_list
}

module.exports.test = test;