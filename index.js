//
//  Apocalypse's simple boilerplate over protractor.
//
//
// http://www.protractortest.org
// https://github.com/angular/protractor/blob/master/docs/browser-support.md
//
// usage: 
//  
//  ./node_modules/.bin/webdriver-manager update
//  ./node_modules/.bin/webdriver-manager start
//  ./node_modules/.bin/protractor index.js [mode] (--firefox || --chrome || --firefox-headless || --chrome-headless)
//




const args = require("args-parser")(process.argv);
const fs = require('fs');

const targetFolder = './tests';
const testFileNames = fs.readdirSync(targetFolder);
const testFiles = testFileNames.map((file) => (targetFolder + '/' + file))

const configCommon = {
    disableChecks: true,
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: testFiles, // TODO: add tests autoload (e.g. load all *test.js)
};


if (args.chrome) {

    exports.config = {
        ...configCommon,

        capabilities: {
            browserName: 'chrome'
        }
    }

} else if (args.firefox) {

    exports.config = {
        ...configCommon,

        capabilities: {
            browserName: 'firefox'
        }
    }

} else if (args['chrome-headless']) {

    exports.config = {
        ...configCommon,

        capabilities: {
            browserName: 'chrome',
            chromeOptions: {
                args: ["--headless", "--disable-gpu", "--window-size=800,600"]
            }
        }
    }

} else if (args['firefox-headless']) {

    exports.config = {
        ...configCommon,

        capabilities: {
            browserName: 'firefox',

            'moz:firefoxOptions': {
                args: ["--headless"]
            }
        }
    }

} else {
    console.info(`
usage: 
 
 ./node_modules/.bin/webdriver-manager update
 ./node_modules/.bin/webdriver-manager start
 ./node_modules/.bin/protractor index.js [mode] (--firefox || --chrome || --firefox-headless || --chrome-headless)
 
`);

    console.log('No execution mode selected, aborting.');
    process.exit();
}