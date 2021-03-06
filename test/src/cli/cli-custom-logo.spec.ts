import * as chai from 'chai';
import {temporaryDir, shell, pkg, exists, exec, read, shellAsync, stats} from '../helpers';
const expect = chai.expect,
      tmp = temporaryDir();

interface Image {
    size: number;
}

describe('CLI custom logo', () => {

    const distFolder = tmp.name + '-logo';

    describe('when specifying a custom logo', () => {
        before(function (done) {
            tmp.create(distFolder);
            let ls = shell('node', [
                './bin/index-cli.js',
                '-p', './test/src/todomvc-ng2/src/tsconfig.json',
                '-d', distFolder,
                '--customLogo', './test/src/todomvc-ng2/logo.png']);

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }

            done();
        });
        after(() => tmp.clean(distFolder));

        it('should have copied the customLogo', () => {
            let isFileExists = exists(`${distFolder}/images/logo.png`);
            expect(isFileExists).to.be.true;
            let originalFileSize = (stats('test/src/todomvc-ng2/logo.png') as Image).size,
                copiedFileSize = (stats(`${distFolder}/images/logo.png`) as Image).size;
            expect(originalFileSize).to.equal(copiedFileSize);
        });
    });

});