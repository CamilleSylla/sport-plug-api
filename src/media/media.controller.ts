import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from './media.pipe';
import { MediaService } from './media.service';
import { User } from 'src/users/dto/users.outputs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/users/user.decorator';
import { Response } from 'express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/image/club/logo/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return await this.mediaService.saveClubLogo(file, user);
  }

  @Get("/image/:path(*)")
  async getImage(@Param('path') path: string, @Res() res: Response) {
    return await this.mediaService.image(path, res)
  } 
}
