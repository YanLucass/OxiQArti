import path from "node:path";
import crypto from "node:crypto";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import { AppError } from "@shared/errors/AppError";
import { Request } from "express";

// Make it easier to know what is inside the object config
type UploadConfig = {
   directory: string;
   storage: StorageEngine;
   fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => void;
};

//accepted files
const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
   const allowMimes = ["image/jpeg", "image/png", "image/jpg"];
   if (allowMimes.includes(file.mimetype)) {
      callback(null, true); //true to accept file
   } else {
      callback(new AppError("Tipo de arquivo inválido. Apenas JPEG, JPG E PNG são permitidos!"));
   }
};

// Resolve the upload folder path
const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default {
   directory: uploadFolder,
   storage: multer.diskStorage({
      // Specify the destination where files will be saved with the url
      destination(req, file, callback) {
         //send to folder user photo
         if (req.baseUrl.includes("users")) {
            callback(null, path.join(uploadFolder, "usersProfile"));
         }
         //send to folder artists photo
         else if (req.baseUrl.includes("artists")) {
            callback(null, path.join(uploadFolder, "artistsProfile"));
         }
         //post imagens
         else if (req.baseUrl.includes("publicationImage")) {
            callback(null, path.join(uploadFolder, "publicationImage"));
         } else if (req.baseUrl.includes("userPublication")) {
            callback(null, path.join(uploadFolder, "userPublication"));
         } else {
            throw new Error("Nenhuma pasta encontrada com esse caminho");
         }
      },

      // Define the filename for each uploaded file
      filename(req, file, callback) {
         // Generate a file hash using crypto.randomBytes
         const fileHash = crypto.randomBytes(10).toString("hex");
         // Create a filename by combining the hash and the original filename
         const fileName = `${fileHash}_${file.originalname}`;
         callback(null, fileName);
      },
   }),

   fileFilter: fileFilter,
} as UploadConfig;
