import path from 'path';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as orm from '~/utils/orm';
import ormconfig from '../../ormconfig';

export const appDatabase = async (): Promise<any> => {
  try {
    const connectionOptions = await getConnectionOptions();

    Object.assign(connectionOptions, {
      entities: orm.getRequiredFiles(
        path.resolve(__dirname, '../../', ormconfig.cli.entitiesDir),
      ),
      migrations: orm.getRequiredFiles(
        path.resolve(__dirname, '../../', ormconfig.cli.migrationsDir),
        'migrations',
      ),
      subscribers: orm.getRequiredFiles(
        path.resolve(__dirname, '../../', ormconfig.cli.subscribersDir),
      ),
      namingStrategy: new SnakeNamingStrategy(),
    });

    await createConnection(connectionOptions);
  } catch (error) {
    throw error;
  }
};
