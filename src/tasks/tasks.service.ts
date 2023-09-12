import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({where:{ id : id }});
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string) {
    const result = await this.tasksRepository.delete({ id: id });

    if(result.affected === 0){
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  //   getAllTasks(): Task[] {
  //     return this.tasks;
  //   }
  //   deleteTask(id: string) {
  //     const found = this.getTaskById(id);
  //     return found;
  //   }
  //   getTaskById(id: string): Task {
  //     const found = this.tasks.find((task) => task.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Task with id ${id} not found!`);
  //     }
  //     return found;
  //   }

  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;
  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };

  //     this.tasks.push(task);
  //     return task;
  //   }

  //   getTasksWithFilters(filterDto: any): Task[] {
  //     const { status, search } = filterDto;
  //     let tasks = this.getAllTasks();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter(
  //         (task) =>
  //           task.title.includes(search) || task.description.includes(search),
  //       );
  //     }
  //     return tasks;
  //   }

  //   updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  //   }
}
