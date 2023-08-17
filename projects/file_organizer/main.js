#!/usr/bin/env node

// Get command-line arguments excluding "node" and the script file name
let inputarr = process.argv.slice(2);
// Extract the command from the arguments
let command = inputarr[0];
const { dir } = require("console");

// Import required modules
let fs = require("fs");
let path = require("path");
let helpobj = require("./module/help");
let organizeobj = require("./module/organize");
let treeobj = require("./module/tree");

// Define file types and their corresponding categories
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg']
};

// Process the command and execute corresponding functions
switch (command) {
    case "organize":
        // Call the organizeKey function from the 'organize' module
        organizeobj.organizeKey(inputarr[1]);
        break;

    case "tree":
        // Call the treeKey function from the 'tree' module
        treeobj.treeKey(inputarr[1]);
        break;

    case "help":
        // Call the helpKey function from the 'help' module
        helpobj.helpKey();
        break;

    default:
        console.log("Please input a valid command");
        break;
}
