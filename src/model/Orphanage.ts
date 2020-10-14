import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm";

@Entity('orphanages')
export default class Orphanage {

  @PrimaryGeneratedColumn('increment')

  @Column()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  latitude: number;
  
  @Column()
  longitude: number;
  
  @Column()
  about: string;
  
  @Column()
  instructions: string;
  
  @Column()
  open_hours: string;
  
  @Column()
  open_on_weekends: boolean;
  
}
