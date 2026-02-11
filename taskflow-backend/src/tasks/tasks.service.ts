import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  // CREATE
  async create(title: string) {
    const task = this.tasksRepository.create({ title });
    return this.tasksRepository.save(task);
  }

  // READ ALL
  async findAll() {
    return this.tasksRepository.find();
  }

  // READ ONE
  async findOne(id: number) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // UPDATE
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    Object.assign(task, updateTaskDto);

    return this.tasksRepository.save(task);
  }

  // DELETE
  async remove(id: number) {
    const task = await this.findOne(id);

    await this.tasksRepository.remove(task);

    return { message: 'Task deleted successfully' };
  }
}
