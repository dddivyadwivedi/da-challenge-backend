import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { CalenderTasksStatus } from './calender_tasks.enum';
  
  @Entity()
  export class CalenderTaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null })
    title: string;

    @Column({ default: null })
    startDate: Date;

    @Column({ default: null })
    endDate: Date;
  

    @Column({
      type: 'enum',
      enum: CalenderTasksStatus,
      default: CalenderTasksStatus.pending,
    })
    status: CalenderTasksStatus;
  
    @CreateDateColumn()
    createdOn: Date;
  
    @UpdateDateColumn()
    updatedOn: Date;
  
    @DeleteDateColumn()
    deletedOn: Date;
  }
  