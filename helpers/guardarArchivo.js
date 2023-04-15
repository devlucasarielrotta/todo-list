import fs from 'fs';
const archivo = './db/data.json';

const guardarDB = async (data) => {
    

    const guardar = await new Promise((resolve,reject) => {
        try {
            fs.writeFile(archivo,JSON.stringify(data),err => {
                if(err) reject('Hubo un error al escribir el archivo');
                resolve(data);
            });
        }catch(error){
            console.log(error)
        }
       
    })

    return guardar;
}
const leerDB = async () => {

    if(!fs.existsSync(archivo)){
        return null;
    }

    const info = await new Promise((resolve, reject) => {
        try {
            fs.readFile(archivo,'utf-8', (error, data) => {
                if (error) reject('Hubo un error al leer el archivo');
                resolve(JSON.parse(data));
            });
        }catch(error){
            throw new Error ('Hubo un error.', error.message)
        }
        
    });
    
    return info;
}
export {
    guardarDB,
    leerDB
}