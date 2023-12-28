import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false }) // Default value is set to false
  isCompleted: boolean;

  @CreateDateColumn()
  date: Date;

  @ManyToOne((type) => User, (user) => user.tasks)
  user: User;

  @ManyToOne((type) => Category, (category) => category.tasks)
  category: Category;
}
