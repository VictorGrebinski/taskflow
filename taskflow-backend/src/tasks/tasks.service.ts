import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  create(title: string) {
    const task = this.tasksRepository.create({ title });
    return this.tasksRepository.save(task);
  }

  findAll() {
    return this.tasksRepository.find();
  }
  update(id: number, updateTaskDto: any) {
    return this.tasksRepository.update(id, updateTaskDto);
  }
  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
