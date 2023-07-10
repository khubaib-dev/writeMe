import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class Verification {
    @PrimaryGeneratedColumn()
    id: number

    @Exclude()
    @Column()
    verification_code: string
}
