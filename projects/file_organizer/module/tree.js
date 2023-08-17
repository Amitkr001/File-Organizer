const fs = require('fs');
const path = require('path');

// Function to display the directory tree
function treefn(dirPath) {
    if (dirPath === undefined) {
        // If no directory path is provided, display tree for current working directory
        treeHelper(process.cwd(), '');
        return;
    } else {
        // Check if the provided directory path exists
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            // Display tree for the provided directory path
            treeHelper(dirPath, '');
        } else {
            console.log('Please enter a correct path');
        }
    }
}

// Recursive function to display the directory tree structure
function treeHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile === true) {
        // If the path represents a file, display its name
        let fileName = path.basename(dirPath);
        console.log(indent + '├──' + fileName);
    } else {
        // If the path represents a directory, display its name and traverse its children
        let dirName = path.basename(dirPath);
        console.log(indent + '└──' + dirName);
        
        // Get the list of children (files and directories) within the current directory
        let children = fs.readdirSync(dirPath);
        
        // Recursively call treeHelper for each child
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(dirPath, children[i]);
            // Indentation for subdirectories is increased by a tab
            treeHelper(childPath, indent + '\t');
        }
    }
}

module.exports = {
    treekey: treefn
};
