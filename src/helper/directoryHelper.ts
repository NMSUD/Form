import fs from 'fs';
import path from 'path';

export const searchFile = (dir: string) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
            searchFile(filePath);
        }
        console.log(filePath);
    }
}