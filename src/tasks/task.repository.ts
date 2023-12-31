import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CustomRepository } from './typeorm-ex.decorator';
import { TaskStatus } from './tasks-status.enum';

@CustomRepository(Task)
export class TasksRepository extends Repository<Task> {

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        
        if(status){
            query.andWhere('task.status = :status', {status});
        }

        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`});
        }


        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = CreateTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.DONE,
        });

        await this.save(task);

        return task;
    }
}
