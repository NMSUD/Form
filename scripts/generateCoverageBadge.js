import { parse } from 'node-html-parser';
import fs from 'fs';
import url from 'url';
import path from 'path';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);
const coverageHtml = path.join(directory, '../coverage/index.html');
const coverageBadge = path.join(directory, '../coverage/coverageBadge.json');

try {
    const coverageHtmlString = fs.readFileSync(coverageHtml, 'utf8');
    const root = parse(coverageHtmlString);
    const allFilesStatementsNode = root.querySelector('.wrapper .clearfix .fl.pad1y.space-right2')
    const percentage = allFilesStatementsNode.querySelector('.strong')
    // const numberOfFiles = allFilesStatementsNode.querySelector('.fraction')

    let coverageLogoColour = 'red'
    const percentageNum = parseInt(percentage.innerText.toString().replace('%', ''))
    if (percentageNum > 50) coverageLogoColour = 'orange'
    if (percentageNum > 65) coverageLogoColour = 'lightblue'
    if (percentageNum > 80) coverageLogoColour = 'green'

    const shieldsJson = {
        schemaVersion: 1, 
        label: 'Code Coverage',
        message: percentage.innerText.trim(),
        style: 'for-the-badge',
        namedLogo: 'vitest',
        color: coverageLogoColour,
    }

    if (fs.existsSync(coverageBadge) === true) {
      fs.unlinkSync(coverageBadge);
    }
    fs.writeFileSync(coverageBadge, JSON.stringify(shieldsJson));
} catch (ex) {
    console.error(`Error while creating coverage badge: ${coverageHtml}`, ex)
}
