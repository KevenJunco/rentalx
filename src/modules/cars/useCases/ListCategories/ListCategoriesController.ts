import { Request, Response } from "express";
import { container } from "tsyringe";
import {ListCategoriesUseCase} from './ListCategoriesUseCase';


class ListCategoriesController {
    handle(request: Request, response: Response): Response{
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase); 

        return response.json(listCategoriesUseCase);
    }
}

export {ListCategoriesController};
