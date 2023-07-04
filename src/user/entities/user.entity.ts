import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm'

enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
  }

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    login: string
    
    @Column({})
    first_name: string

    @Column({})
    last_name: string
    
    @Column({})
    user_name: string

    @Column()
    email: string

    @Column({nullable: true, type: 'timestamp',
     default: () => 'CURRENT_TIMESTAMP'})
    email_verified_at: Date

    @Column()
    password: string

    @Column({nullable: true})
    remember_token: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    type: UserRole

    @Column({nullable: true, type: 'integer'})
    last_artical_id: number

    @Column({nullable: true, type: 'integer'})
    last_temp_artical_id: number

    @Column({nullable: true})
    verify_code: string

    @Column({nullable: true})
    amember_id: string

    @Column({nullable: true})
    pic: string

    @Column({nullable: true})
    token_for_business: string

    @Column({nullable: true})
    login_type: string

}