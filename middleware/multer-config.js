const multer = require('multer')

//dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './images')
    },
    filename: (req, file, callback) => {
        //file = req.files;
        //dictionnaire
        const MIME_TYPES = {
            'image/jpg': 'jpg',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'application/pdf': 'pdf'
        };
        const name = file.originalname.split('.')[0].split(' ').join('_').split('x').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).fields([{ name: 'pdfArrete' }, { name: 'pdfDemande' }, { name: 'photo' }]);