import { Body, ConsoleLogger, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuitentity';
import { TuitsService } from './tuits.service';


@Controller('tuits')
export class TuitsController {
    //va a recibir nuestro tuitservise como proveedor
    //privado por que nos aseguramos que el servicio sea consumido desde la clase
    //le asignamos un tipado para que nest resuelva las dependencias en tiempo de ejecucion
    constructor(private readonly tuitService: TuitsService){}

    @Get()
    getTuits(@Query() filterQuery): Tuit[] {
        const {searchTerm, orderBy}=filterQuery;
        return this.tuitService.getTuits();
    }

    @Get(':id') //tuits/1
    getTuit(@Param('id') id: string): Tuit{
        return this.tuitService.getTuit(id);
    }

    @Post()
    //@HttpCode(HttpStatus.NO_CONTENT)
    createTuit (@Body() message: CreateTuitDto): void{
        //lo que estamos enviando se castio a un DTO 
        console.log(message instanceof CreateTuitDto);
        return this.tuitService.createTuit(message);
    }

    @Patch(':id')
    updateTuit(@Param('id') id: string, @Body() tuit:UpdateTuitDto):Tuit{
        return this.tuitService.updateTuit(id, tuit);
    }

    @Delete(':id')
    removeTuit(@Param('id') id: string): void{
        return this.tuitService.removeTuit(id);
    }
}
