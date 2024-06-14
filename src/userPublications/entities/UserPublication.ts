import { User } from '@users/entities/User';
import { PublicationImage } from '@publicationImages/entities/PublicationImage';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Applications } from '@applications/entities/Applications';

@Entity('users_publication')
export class UserPublication {
    @PrimaryColumn()
    id!: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    service: string;

    @Column()
    available: boolean;

    @Column({ type: 'varchar', nullable: true })
    hiredArtist: string | null;

    //image relation
    @OneToMany(() => PublicationImage, image => image.userPublication, { cascade: true })
    images: PublicationImage[];

    //user relalation
    @ManyToOne(() => User, {
        cascade: true,
    })
    user: User;

    //relation with applications
    @OneToMany(() => Applications, applications => applications.userPublication, { cascade: true })
    applications: Applications[];

    @CreateDateColumn()
    created_at: Date;

    constructor(title: string, description: string, service: string, available: boolean) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.service = service;
        this.available = true;
        this.hiredArtist = null;
        this.available = available;
    }
}

