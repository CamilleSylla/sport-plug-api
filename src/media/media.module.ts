import { Module, forwardRef } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ClubModule } from 'src/club/club.module';

@Module({
  imports: [forwardRef(() => ClubModule)],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
