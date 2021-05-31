import {Router} from 'express';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/CreateSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes =Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationsController.handle);

export {specificationsRoutes};
