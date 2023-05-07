import { Injectable } from '@nestjs/common';
import { DataSource, In, Point, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './entities/machine.entity';

import seedData from './seed/machine-seed.json';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private machineRepo: Repository<Machine>,

    @InjectDataSource() private dataSource: DataSource,
  ) {
    this.seed();
  }

  async seed() {
    const seedIds = seedData.map((s) => s.id);
    const exists = await this.machineRepo.find({
      where: { id: In(seedIds) },
      select: ['id'],
    });

    const existsIds = exists.map((e) => e.id);
    const nonExistData = seedData.filter((s) => !existsIds.includes(s.id));

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const s of nonExistData) {
        await queryRunner.manager.save(
          this.machineRepo.create({
            ...s,
            location: {
              type: 'Point',
              coordinates: s.location,
            },
          }),
        );
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  create(createMachineDto: CreateMachineDto) {
    return 'This action adds a new machine';
  }

  findAll() {
    return this.machineRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} machine`;
  }

  update(id: number, updateMachineDto: UpdateMachineDto) {
    return `This action updates a #${id} machine`;
  }

  remove(id: number) {
    return `This action removes a #${id} machine`;
  }
}
