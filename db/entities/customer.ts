import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 255, unique: true, nullable: false })
    mobilePhone: string;

    @Column({ type: 'float', nullable: false })
    balance: number;
}
