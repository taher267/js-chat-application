const createError = require("http-errors");
const multer = require("multer");
const path = require('path');
const fs = require('fs');


module.exports = (subfolder_path, allowed_file_types, max_file_size, error_msg) => {

    const UPLOADS_FOLDER = `public/uploads/${subfolder_path}/`;
    if (!fs.existsSync(UPLOADS_FOLDER)) {
        const upArr = UPLOADS_FOLDER.split('/').filter(v => v.length > 0);
        let path = "";
        for (i = 0; i < upArr.length; i++) { path = path + `${upArr[i]}/`; if (!fs.existsSync(path)) fs.mkdirSync(path); }
    }
    // return upload;
    //define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {

            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
                "-" +
                Date.now();
            cb(null, fileName + fileExt);
        }
    });

    //prepare the final multer object upload object
    const upload = multer({
        storage,
        limits: { fileSize: max_file_size },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_msg));
            }
        }
    })
    return upload
};