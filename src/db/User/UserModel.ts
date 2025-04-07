import "reflect-metadata";
import { Entity, Column, BaseEntity, Index, PrimaryColumn } from "typeorm"

@Entity({ name: 'User' })
export class User extends BaseEntity {
    @Index({ unique: true })
    @PrimaryColumn()
    public userId!: string

    @Column({ default: 0 })
    public online!: number;
}