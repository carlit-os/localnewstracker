const Build = require('newspaperjs').Build;
const Article = require('newspaperjs').Article
const zips= require("./public/data/helpers")
const zips_data = zips.elpaso_towns_zips

// const myAsyncLoopFunction = async (array, ) {
//     const allAsyncResults = []
  
//     for (const item of array) {
//       const asnycResult = await asyncFunction(item)
//       allAsyncResults.push(asyncResult)
//     }
  
//     return allAsyncResults
// }


const test = () =>{
    return Build.getArticlesUrl('https://www.ktsm.com').then(result=>{
        const zips_set = []
        
        const town_names = Object.keys(zips_data)

        for await (const link of result){ //parse article
            Article(link)
            .then(nlp=>{
                town_names.forEach(name => {
                    const town_idx = nlp.text.search(RegExp(`${name}`,"i"))
                    if(town_idx != -1){
                    zips_set.push(town_idx)
                    console.log("added")
                }
                })
            }) 
            .catch(reason=>{
                console.log(reason);
            })  
        }
        console.log(zips_set)

        
        //return articls
    }).catch(reason=>{
        console.log(reason)
    })
}

module.exports.test = test;