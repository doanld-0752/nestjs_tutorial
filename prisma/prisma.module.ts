import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Đây là service bạn dùng để khởi tạo Prisma Client

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // QUAN TRỌNG: Phải export để các module khác có thể dùng
})
export class PrismaModule {}
