import { readdirSync } from 'fs';
import path from 'path';

/**
 * Import files automatically for entities, migrations, and subscribers (TypeORM)
 * @param filesPath use package `path.join` or `path.resolve`
 */
export const getRequiredFiles = (
  filesPath: string,
  type?: 'migrations',
): Function[] => {
  const rootPath = path.resolve(__dirname, '../../');
  const absolutePath = path.resolve(rootPath, filesPath);
  const pathToFiles = absolutePath.replace(`${rootPath}/src/`, '');

  const files = readdirSync(absolutePath).map(
    (file): any => {
      const nameWithoutExt = file.replace('.ts', '');
      const nameWithoutDash = nameWithoutExt.split('-');
      const nameReserved = nameWithoutDash[1] + nameWithoutDash[0];

      let name;
      if (type) {
        name = nameReserved;
      } else {
        name = nameWithoutExt;
      }

      // eslint-disable-next-line
      const result = require(`../${pathToFiles}/${file}`)[name];
      return result;
    },
  );

  return files;
};
