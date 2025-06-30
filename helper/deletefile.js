const fs = require("fs");
const path = require("path");

function deleteOldImage(folderName, fileName) {
    if (!fileName) {
        console.log("No old image to delete.");
        return;
    }
    const filePath = path.join(__dirname, "..", folderName, fileName);
    console.log("filePath be deleted ", filePath);
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(`Failed to delete old image : ${fileName}`, err);
            } else {
                console.log(`Successfully deleted old image: ${fileName}`);
            }
        });
    } else {
        console.warn(`File not found for deletion: ${fileName}`);
    }
}
module.exports = deleteOldImage;
