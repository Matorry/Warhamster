import { PrismaClient } from "@prisma/client";
import cors from "cors";
import createDebug from "debug";
import express, { type Express } from 'express';
import morgan from "morgan";
import { ArmyListController } from "./controllers/armyList.controller.js";
import { MatchController } from "./controllers/match.controller.js"; // Importar MatchController
import { TournamentController } from "./controllers/tournament.controller.js";
import { UserController } from "./controllers/user.controller.js";
import { AuthInterceptor } from "./middleware/auth.interceptor.js";
import { ArmyListRepo } from "./repositories/armyList.repo.js";
import { MatchRepo } from "./repositories/match.repo.js"; // Importar MatchRepo
import { MatchParticipantRepo } from "./repositories/matchParticipant.repo.js"; // Importar MatchParticipantRepo
import { TournamentRepo } from "./repositories/tournament.repo.js";
import { TournamentParticipantRepo } from "./repositories/tournamentParticipant.repo.js";
import { UserRepo } from "./repositories/user.repo.js";
import { ArmyListRouter } from "./routers/armyList.router.js";
import { MatchRouter } from "./routers/match.router.js"; // Importar MatchRouter
import { TournamentRouter } from "./routers/tournament.router.js";
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

  const tournamentRepo = new TournamentRepo(prisma);
  const tournamentParticipantRepo = new TournamentParticipantRepo(prisma)
  const tournamentController = new TournamentController(tournamentRepo, tournamentParticipantRepo);
  const tournamentRouter = new TournamentRouter(
    tournamentController,
    authInterceptor,
  );
  app.use('/tournament', tournamentRouter.router);

  const matchRepo = new MatchRepo(prisma);
  const matchParticipantRepo = new MatchParticipantRepo(prisma);
  const matchController = new MatchController(matchRepo, matchParticipantRepo);
  const matchRouter = new MatchRouter(
    matchController,
    authInterceptor,
  );
  app.use('/matches', matchRouter.router);
};
