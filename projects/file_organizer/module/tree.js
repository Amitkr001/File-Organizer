
// Function to display the directory tree
function treefn(dirPath) {
    if (dirPath === undefined) {
        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath, "");
        } else {
            console.log("Please enter a correct path");
        }
    }
}

// Function to display available commands
function treeHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile === true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let children = fs.readdirSync(dirPath);
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(dirPath, children[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports={
    treekey:treefn
}