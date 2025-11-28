import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LIMIT_REQUEST, TTL_REQUEST } from 'src/common/constants/auth.const';
import { I18nModule, AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { DEFAULT_I18N_DIR, DEFAULT_LANGUAGE } from 'src/common/constants/app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => dataSourceOptions,
    }),
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot([{
      ttl: LIMIT_REQUEST,
      limit: TTL_REQUEST,
    }]),
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANGUAGE, // Default language
      loaderOptions: {
        path: path.join(__dirname, DEFAULT_I18N_DIR), // Path to translation files
        watch: true, // Watch for changes in translation files
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // Resolve language from query parameter (e.g., ?lang=es)
        AcceptLanguageResolver, // Resolve language from Accept-Language header
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
