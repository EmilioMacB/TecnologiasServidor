import { Request } from "express";
import multer, {diskStorage, FileFilterCallback} from "multer";


const validExtensions = {
    image: ['jpg', 'jpeg', 'png', 'gif'],
    document: ['pdf', 'doc', 'docx', 'txt']
}

const multerStorage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const nombre = new Date().getTime().toString;
        const extensoin = file.originalname.split('.').pop();
        cb(null, `${nombre}.${extensoin}`);
    }
});

const filters = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const extension = file.originalname.split('.').pop();
    // const acceptFile = validExtensions.includes(extension?.toLowerCase()!);
    let acceptFile = false;
    if (req.path.includes('profile')) {
        acceptFile = validExtensions.image.includes(extension?.toLowerCase()!);
    } else if (req.path.includes('documents')) {
        acceptFile = validExtensions.document.includes(extension?.toLowerCase()!);
    }

    cb(null, acceptFile);


}

export const upload = multer({ storage: multerStorage, fileFilter: filters});



// crear 2 enpoints y hacer middleware que soporte distintos usos un enpoint sube imagenes y en el otro un doc por ejemplo, 
// pero dentro de un mismo middleware