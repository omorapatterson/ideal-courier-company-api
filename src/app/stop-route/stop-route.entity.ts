import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
//
import { Route } from '../route/route.entity';
import { Stop } from '../stop/stop.entity';

@Entity()
export class StopRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  sequence: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
  
  @ManyToOne(type => Route)
  @JoinColumn({ name: "route", referencedColumnName: 'id' })
  route: Route;

  @ManyToOne(type => Stop)
  @JoinColumn({ name: "stop", referencedColumnName: 'id' })
  stop: Stop;
}