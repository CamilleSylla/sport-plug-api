import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const validMimeTypes = ['image/jpeg', 'image/png'].includes(value.mimetype);
    const validSize = value.size <= 1000000;
    if (validMimeTypes && validSize) return value;
    if (!validMimeTypes) throw new BadRequestException('Invalid mime type');
    if (!validSize) throw new BadRequestException('Invalid size');
  }
}
