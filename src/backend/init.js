import { initHTML } from "./generateHTML.js";
import { initCSS } from "./generateCSS.js";

async function main() {
	await initHTML();
	await initCSS();
}

main();
