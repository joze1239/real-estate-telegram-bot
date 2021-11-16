import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { TypeORMLogger } from '~database/utils/logger';
import { SnakeCaseNamingStrategy } from '~database/utils/snake-naming.strategy';

export function typeOrmSettings(
  options: TypeOrmModuleOptions,
): TypeOrmModuleOptions {
  const src = path.join(__dirname, '..', '..');
  return {
    ...options,
    synchronize: false, // never use synchronize
    logger: new TypeORMLogger(options.logging),
    entities: [path.join(src, '**', '*.entity{.ts,.js}')],
    migrations: [path.join(src, 'database', 'migrations', '*{.ts,.js}')],
    namingStrategy: new SnakeCaseNamingStrategy(),
  };
}
