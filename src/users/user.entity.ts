import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer'
import { Book } from './book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Expose({groups: ['detail']})
  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column({ unique: true })
  organizationId: string;

  @Column({ type: 'text', nullable: true })
  __privateInformation: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[]

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName ?? ''}`;
  }
}