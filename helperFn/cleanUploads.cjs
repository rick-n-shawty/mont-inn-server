const path = require("path"); 
const fs = require("fs");
const folderPath = path.join(__dirname, '..', 'uploads'); 
function cleanUp(){
    return new Promise((resolve, reject) =>{
        fs.readdir(folderPath, function(err, files){
            if(err){
                console.log(err)
                reject(err)
                return 
            }
            const deletePromises = files.map((file) =>{
                return new Promise((resolve, reject)=>{
                    fs.unlink(path.join(folderPath, file), function(err){
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    })
                })
            })
            Promise.all(deletePromises)
            .then(() => {
                console.log('All files have been deleted')
                resolve()
            }).catch(err =>{
                console.log(`Failed to delete all files in folder ${folderPath}`)
                reject(err)
            })
        })
    })
} 

module.exports = cleanUp