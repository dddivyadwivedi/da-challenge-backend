import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { CalenderTaskService } from "./calender_tasks.service";
import { AddTasksDTO, GetAllTasksDTO } from "./dto/calender_tasks.dto";


@Controller('tasks')
export class CalenderTasksController{
    constructor (private readonly calenderTasksService : CalenderTaskService){}
    
    @Get('/getAllTasks')
    async getAllTasks(
      @Query(new ValidationPipe({ skipMissingProperties: false }))
      getAllTasksDTO:GetAllTasksDTO ,
    ) {
      return this.calenderTasksService.getAllTasksAsync(getAllTasksDTO);
    }
    
    @Post('/createTask')
    async createTask(
      @Body(new ValidationPipe({ skipMissingProperties: false }))
      addTasksDTO: AddTasksDTO,
    ) {
      return this.calenderTasksService.createTaskAsync(addTasksDTO);
    }
  
    @Patch('/completeTask/:id')
    async completeTask(@Param('id', ParseIntPipe) id: number) {
      return this.calenderTasksService.completeTaskAsync(id);
    }
  
    @Delete('/deleteTask/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
      return this.calenderTasksService.deleteTaskAsync(id);
    }
  
}