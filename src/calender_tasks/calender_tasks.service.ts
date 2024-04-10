import { BadRequestException, Injectable } from '@nestjs/common';
import { CalenderTaskEntity } from 'src/entity/calender_tasks.entity';
import { CalenderTasksStatus } from 'src/entity/calender_tasks.enum';
import { AddTasksDTO, GetAllTasksDTO } from './dto/calender_tasks.dto';
import { endOfDay } from 'date-fns';


@Injectable()
export class CalenderTaskService {
  async getAllTasksAsync(getAllUserTasksDTO: GetAllTasksDTO) {
    try {
      const {startDate , endDate } = getAllUserTasksDTO;
      const endOfDayEndDate = endOfDay(new Date(endDate))
      let allTasks = await CalenderTaskEntity.createQueryBuilder('tasks')
      .where('tasks.startDate BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: endOfDayEndDate,
      })
      .orWhere('tasks.endDate BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: endOfDayEndDate,
      })
      .getMany();

      return allTasks;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  async createTaskAsync(addUserTasksDTO: AddTasksDTO) {
    try {
      const { title, startDate , endDate } = addUserTasksDTO;
      if (startDate < new Date() || endDate < new Date()) {
        throw new Error('Past date error');
      }
      let findTask = await CalenderTaskEntity.createQueryBuilder('tasks')
      .where('tasks.startDate BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: endDate,
      })
      .orWhere('tasks.endDate BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: endDate,
      })
      .getOne();

      if (findTask) {
        throw new Error('Task creation failed.Choose different time range to create new task');
      } else {
        let newTask = new CalenderTaskEntity();
        newTask.title = title;
        newTask.startDate = startDate;
        newTask.endDate = endDate
        await newTask.save();

        return newTask;
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async completeTaskAsync(id: number) {
    try {
      let findTask = await CalenderTaskEntity.findOne({ where: { id: id } });

      if (findTask) {
        if (findTask.status === CalenderTasksStatus.completed) {
          throw new Error('Task completed');
        } else {
          findTask.status = CalenderTasksStatus.completed;
          await findTask.save();

          return findTask;
        }
      } else {
        throw new Error('Task not found');
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteTaskAsync(id: number) {
    try {
      let findTask = await CalenderTaskEntity.findOne({ where: { id: id } });

      if (findTask) {
        await CalenderTaskEntity.createQueryBuilder('tasks')
          .where('(id = :id)', {
            id: id,
          })
          .softDelete()
          .execute();

        return findTask;
      } else {
        throw new Error('Task not found');
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
