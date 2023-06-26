import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ClubService } from 'src/club/club.service';
import { User } from 'src/users/dto/users.outputs';

@Injectable()
export class MediaService {
  private readonly bucket = new Storage().bucket(
    this.config.get('GCS_BUCKET_ID'),
  );
  constructor(
    private readonly config: ConfigService,
    private readonly clubService: ClubService,
  ) {}

  async saveClubLogo(file: Express.Multer.File, user: User) {
    const club = await this.clubService.findByUserId(user.id);
    const extention = '.' + (await this.extentionByMimeType(file.mimetype));
    return new Promise((resolve, reject) => {
      const gsFile = this.bucket.file(
        `/${club.id}-${club.name.toLocaleLowerCase().replace(/ /g, '')}/logo/${
          club.name.toLocaleLowerCase().replace(/ /g, '') + '-logo' + extention
        }`,
      );
      const stream = gsFile.createWriteStream();
      stream.on('error', reject);
      stream.on('finish', () => {
        resolve({ fileUrl: '/media/image' + gsFile.cloudStorageURI.pathname });
      });
      stream.end(file.buffer);
    });
  }

  async image(path: string, res: Response) {
    const [files] = await this.bucket.getFiles({ prefix: '/' + path });
    const file = files.pop();
    res.setHeader('Content-Type', file.metadata.contentType);
    const fileStream = file.createReadStream();
    fileStream.pipe(res);
  }

  private async extentionByMimeType(mimeType: string) {
    return mimeType.split('/')[1];
  }
}
