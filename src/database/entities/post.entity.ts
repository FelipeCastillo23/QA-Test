import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number

  @ManyToOne(() => User, user => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  user: User
  
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string
  
  @Column({
    type: 'varchar',
    nullable: false,
    length: 300
  })
  text: string

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date
}