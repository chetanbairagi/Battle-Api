const csv=require('csvtojson');

module.exports = function (app) {
    const csvFilePath='./file/battles.csv';
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        let collection = app.schema.battles;
        jsonObj.forEach(object => {
            app.crud.createDocument(object, collection, function(err, doc) {
                if(err){
                    console.log("Error in saving doc : ",err)
                }else{
                    console.log("Documetn inserted successfully");
                }
            });
        });
    });
     
    const jsonArray= csv().fromFile(csvFilePath);
}