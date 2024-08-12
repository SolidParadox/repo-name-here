import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { EntriesModule } from './entries/entries.module';

import { Entry } from './entries/entities/entry.entity'; // Adjust the path as needed
import { FrontendModule } from './frontend/frontend.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'raptor_password',
      username: 'postgres',
      entities: [Entry],
      database: 'raptor',
      synchronize: true, // must change in production
      logging: true,
    }),
    EntriesModule,
    FrontendModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
