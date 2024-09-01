import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository : Repository<Todo>
    ){}

    findAll() : Promise<Todo[]> {
        return this.todoRepository.find();
    }
    findOne(id: number) : Promise<Todo> {
        return this.todoRepository.findOne({where : {id}});
    }
    create(todo : Partial<Todo>) :Promise<Todo>{
        return this.todoRepository.save(todo);
    }
    async update(id: number, todo : Partial<Todo>) :Promise<Todo>{
         await this.todoRepository.update(id,todo);
         return this.todoRepository.findOne({where : {id}});
    }
    delete(id: number) {
        this.todoRepository.delete(id);
    }
    async markDone(id: number){
       const todo  = await this.todoRepository.findOne({where: {id}});
       todo.isDone = true;
       await this.todoRepository.update(id, todo);
       return this.todoRepository.findOne({where : {id}})
    }

}
