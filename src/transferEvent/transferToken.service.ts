import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ethers } from 'ethers';
import { Cron } from '@nestjs/schedule';
import { TransferEvent } from './transferEvent.entity';

@Injectable()
export class TokenService implements OnModuleInit {
    private provider;
    private contract;

    constructor(
        @InjectRepository(TransferEvent)
        private transferRepository: Repository<TransferEvent>,
    ) {
        this.provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL);
        this.contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS as string,
            ['event Transfer(address indexed from, address indexed to, uint256 value)'],
            this.provider,
        );
    }

    async onModuleInit() {
        await this.fetchPastEvents();
    }

    @Cron('*/5 * * * *')
    async fetchNewEvents() {
        const lastEvent = await this.transferRepository.findOne({
            order: { blockNumber: 'DESC' },
        });

        const startBlock = lastEvent ? lastEvent.blockNumber + 1 : 0;
        const events = await this.contract.queryFilter('Transfer', startBlock);

        for (const event of events) {
            await this.transferRepository.save({
                from: event.args.from,
                to: event.args.to,
                value: event.args.value.toString(),
                transactionHash: event.transactionHash,
                blockNumber: event.blockNumber,
            });
        }
    }

    private async fetchPastEvents() {
        const lastEvent = await this.transferRepository.findOne({
            order: { blockNumber: 'DESC' },
        });

        const startBlock = lastEvent ? lastEvent.blockNumber + 1 : 0;

        const events = await this.contract.queryFilter('Transfer', startBlock);

        for (const event of events) {
            await this.transferRepository.save({
                from: event.args.from,
                to: event.args.to,
                value: event.args.value.toString(),
                transactionHash: event.transactionHash,
                blockNumber: event.blockNumber,
            });
        }
    }

    async getEvents(page: number, limit: number) {
        const [result, total] = await this.transferRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { blockNumber: 'DESC' },
        });
        return [result, total];
    }

}
