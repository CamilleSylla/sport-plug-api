import { SportEntity } from 'src/sport/sport.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => SportEntity, (sport) => sport.clubs)
  sport: SportEntity;
}
