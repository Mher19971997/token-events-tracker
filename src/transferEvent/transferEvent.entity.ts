import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransferEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  value: string;

  @Column()
  transactionHash: string;

  @Column()
  blockNumber: number;
}
