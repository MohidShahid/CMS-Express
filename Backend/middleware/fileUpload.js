const multer = require('multer');

// Configure Multer
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        const fileExtension = file.mimetype.split("/")[1]; 
        cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
    },
});

const upload = multer({ storage: storage });


module.exports = upload;