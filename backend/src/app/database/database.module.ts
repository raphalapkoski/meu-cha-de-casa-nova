import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
