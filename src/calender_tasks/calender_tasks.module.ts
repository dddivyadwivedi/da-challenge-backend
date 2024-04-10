import { Module } from "@nestjs/common";
import { CalenderTaskService } from "./calender_tasks.service";
import { CalenderTasksController } from "./calender_tasks.controller";

@Module({
    imports: [],
    controllers: [CalenderTasksController],
    providers: [CalenderTaskService],
})
export class CalenderTasksModule{}