import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    TableInheritance,
  } from 'typeorm'
  
  @Entity()
  @TableInheritance({
    column: { type: 'varchar', name: 'type' },
  })
  export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
      unique: true,
    })
    login: string
    @Column()
    password: string
    @Column({
        nullable: true,
      })
      role?: string

  }
  