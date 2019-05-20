import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot()],
  exports: [
    TypeOrmModule
  ],
})
export class DatabaseModule {}