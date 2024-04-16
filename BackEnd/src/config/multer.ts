import crypto from 'crypto' //Vai criptografar a hash das imagens, para que nomes iguais n se repitam
import multer from 'multer'

import {extname, resolve} from 'path'

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
               destination: resolve(__dirname, '..','..', folder),
               filename: (request, file, callback) =>{
                 const fileHash = crypto.randomBytes(16).toString("hex");
                 const fileName = `${fileHash}-${file.originalname}`;

                 return callback(null, fileName)
               }
            })
        }
    }
}

