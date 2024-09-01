import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(
        private todoService :TodoService
    ){}
    @Get()
    findAll(): Promise<Todo[]>{
        return this.todoService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Todo>{
        return this.todoService.findOne(id);
    }
    @Post()
    create(@Body() todo: Partial<Todo>): Promise<Todo>{
        return this.todoService.create(todo);
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() todo: Partial<Todo> ){
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    remove(@Body('id') id: number){
        return this.todoService.delete(id);
    }

    @Patch(':id/done')
    markComplete(@Param('id') id: number){
        return this.todoService.markDone(id);
    }

}
