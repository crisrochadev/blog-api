
import multer from 'multer';
const fileFilter = function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/svg') {
        cb(null,true)
    }else{
        cb(null,false)
    }
};
const storage = multer.diskStorage({
    destination: function (req, file,cb) {
        cb(null,'./database/images');
    },
    filename: function (req, file,cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const upload = multer({
    storage:storage,
    limits:{
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
});


export default upload;