import { PrismaClient } from "@prisma/client";
import cors from "cors";
import createDebug from "debug";
import express, { type Express } from 'express';
import morgan from "morgan";
import { ArmyListController } from "./controllers/armyList.controller.js";
import { UserController } from "./controllers/user.controller.js";
import { AuthInterceptor } from "./middleware/auth.interceptor.js";
import { ArmyListRepo } from "./repositories/armyList.repo.js";
import { UserRepo } from "./repositories/user.repo.js";
import { ArmyListRouter } from "./routers/armyList.router.js";
import { UserRouter } from "./routers/user.router.js";

const debug = createDebug('TFD:app')

export const createApp = () => {
  debug('Creating app');
  return express();
}

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());

  const authInterceptor = new AuthInterceptor();

  const usersRepo = new UserRepo(prisma);
  const usersController = new UserController(usersRepo);
  const usersRouter = new UserRouter(
    usersController,
    authInterceptor,
  );
  app.use('/users', usersRouter.router);

  const armyListRepo = new ArmyListRepo(prisma);
  const armyListController = new ArmyListController(armyListRepo);
  const armyListRouter = new ArmyListRouter(
    armyListController,
    authInterceptor,
  );
  app.use('/armylist', armyListRouter.router);
};
