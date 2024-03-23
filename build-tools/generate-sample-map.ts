import * as fs from 'fs';
import * as path from 'path';
import { Project, VariableDeclarationKind } from 'ts-morph';

const inputFolder = path.join(__dirname, '../src/samples');
const outputFile = path.join(__dirname, '../generated/samples.ts');

const project = new Project();
const sourceFile = project.createSourceFile(outputFile, undefined, {
  overwrite: true,
});

(async () => {
  const instrumentFolders = await new Promise<string[]>((resolve, reject) => {
    fs.readdir(inputFolder, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

  const samples = {};

  await Promise.all(
    instrumentFolders.map(async (instrumentFolder) => {
      const instrumentPath = path.join(inputFolder, instrumentFolder);

      const sampleFiles = await new Promise<string[]>((resolve, reject) => {
        fs.readdir(instrumentPath, (err, files) => {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      });

      samples[instrumentFolder] = {};

      sampleFiles.forEach((sampleFile) => {
        if (path.extname(sampleFile) !== '.mp3') {
          return;
        }

        const key = path.basename(sampleFile, '.mp3').replace('s', '#');
        samples[instrumentFolder][key] =
          `samples/${instrumentFolder}/${sampleFile}`;
      });
    }),
  );

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        name: 'samples',
        initializer: JSON.stringify(samples, null, 3) + ' as const',
      },
    ],
  });

  sourceFile.saveSync();
})();
