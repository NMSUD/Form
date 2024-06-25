import fs from 'fs';
import path from 'path';
import url from 'url';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);
const envTemplateFile = path.join(directory, '../.env.template');
const envConstantFile = path.join(directory, '../src/constants/generated/env.ts');

const outputLines = [
    '/* This is a generated file, to update this file run "npm run build:env" */',
    'export const EnvKey = {',
];

try {
    const fileString = fs.readFileSync(envTemplateFile, 'utf8');
    const lines = fileString.split('\n')
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        const line = lines[lineNum];
        if (line.length < 2){
            if ((lineNum + 1) < lines.length) {
                outputLines.push('')
            }
            continue;
        } 
        const indexOfEqual = line.indexOf('=')
        if (indexOfEqual < 1) {
            console.warn(`Line #${lineNum + 1} is missing a '=' sign!`)
            continue;
        }
        const envName = line.substring(0, indexOfEqual);
        // const friendlyName = envName.replace('VITE_', '').split('_').map((e, index) => {
        //     const lower = e.toLocaleLowerCase();
        //     if (index === 0) return lower;
        //     return [lower[0].toUpperCase(), ...lower.slice(1, lower.length)].join('');;
        // }).join('')
        outputLines.push(`\t${envName.replace('VITE_', '')}: '${envName}',`)
    }
    outputLines.push('} as const;')

    if (fs.existsSync(envConstantFile) === true) {
      fs.unlinkSync(envConstantFile);
    }
    fs.writeFileSync(envConstantFile, outputLines.join('\n'));
} catch (ex) {
    console.error(`Error while creating env file: ${envConstantFile}`, ex)
}
