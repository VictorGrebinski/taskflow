import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body('title') title: string) {
    return this.tasksService.create(title);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
}
