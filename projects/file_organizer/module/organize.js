const fs = require('fs');
const path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
// Function to organize files in a directory
function organizefn(dirPath) {
    if (dirPath === undefined) {
        organizeHelper(process.cwd(), dirPath);
        return;
    } else {
        let isExist = fs.existsSync(dirPath);
        if (isExist) {
            // Create a directory for organized files
            let desPath = path.join(dirPath, "organized_files");
            if (!fs.existsSync(desPath)) {
                fs.mkdirSync(desPath);
            }
            organizeHelper(dirPath, desPath);
        } else {
            console.log("Please enter a valid path");
        }
    }
}

// Helper function to organize files
function organizeHelper(dirPath, desPath) {
    // Get the names of files in the directory
    let childNames = fs.readdirSync(dirPath);
    for (let i = 0; i < childNames.length; i++) {
        let childadd = path.join(dirPath, childNames[i]);
        let isfile = fs.lstatSync(childadd).isFile();
        if (isfile) {
            // Get the category based on the file extension
            let category = getCategorize(childNames[i]);
            // Move the file to the appropriate category directory
            sendFile(childadd, desPath, category);
        }
    }
}

// Function to categorize files based on their extension
function getCategorize(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let cType = types[type];
        for (let i = 0; i < cType.length; i++) {
            if (ext === cType[i]) {
                return type;
            }
        }
    }
    return "other";
}

// Function to move files to categorized directories
function sendFile(dirPath, desPath, category) {
    let categoryPath = path.join(desPath, category);
    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(dirPath);
    let desFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(dirPath, desFilePath);
    console.log(fileName, "copied to this location", category);
    fs.unlinkSync(dirPath);
}

module.exports={
    organizeKey: organizefn
}
