import fs from "fs";
import { forEver } from "waitasecond";

const Cite = require('citation-js');

let templateName = 'myFormat'
let template = fs.readFileSync('data/format.csl', 'utf8');

let config = Cite.plugins.config.get('@csl');
config.templates.add(templateName, template);

(async () => {
    const content = fs.readFileSync("data/source.bib");
    const parsed = Cite.parse.bibtex.text(content.toString());

    const result = Object.values(parsed).map((entry) => {
        const cite = new Cite();
        cite.set(entry);

        return cite.format('bibliography', {
            format: 'html',
            template: 'myFormat'
        });
    }).join("\n");

    fs.writeFileSync("data/output.html", result);

    await forEver();
})();