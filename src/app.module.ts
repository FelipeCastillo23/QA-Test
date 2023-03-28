import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT_DB'),
        username: configService.get<string>('USERNAME_DB'),
        password: configService.get<string>('PASSWORD_DB'),
        database: configService.get<string>('DATABASE'),
        autoLoadEntities: configService.getOrThrow<boolean>('AUTOLOADENTITIES'),
        synchronize: configService.getOrThrow<boolean>('SYNCHRONIZE'),
        logger: 'advanced-console',
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
