import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
  })
  id: string

  @Column({
    name: "username",
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  username: string
  
  @Column({
    name: "email",
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string

  @Column({
    name: "full_name",
    type: 'varchar',
    nullable: false,
  })
  fullName: string

  @Column({
    name: "password",
    type: 'varchar',
    nullable: false,
  })
  password: string

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date
}