import { PrismaClient } from "@prisma/client";
import cors from "cors";
import createDebug from "debug";
import express, { type Express } from 'express';
import morgan from "morgan";
import { ArmyListController } from "./controllers/armyList.controller.js";
import { MatchController } from "./controllers/match.controller.js";
import { TournamentController } from "./controllers/tournament.controller.js";
import { UserController } from "./controllers/user.controller.js";
import { AuthInterceptor } from "./middleware/auth.interceptor.js";
import { ArmyListRepo } from "./repositories/armyList.repo.js";
import { MatchRepo } from "./repositories/match.repo.js";
import { MatchParticipantRepo } from "./repositories/matchParticipant.repo.js";
import { TournamentRepo } from "./repositories/tournament.repo.js";
import { TournamentParticipantRepo } from "./repositories/tournamentParticipant.repo.js";
import { UserRepo } from "./repositories/user.repo.js";
import { ArmyListRouter } from "./routers/armyList.router.js";
import { MatchRouter } from "./routers/match.router.js";
import { TournamentRouter } from "./routers/tournament.router.js";
import { UserRouter } from "./routers/user.router.js";
import { RoundRobinService } from "./services/roundRobin.service.js";

const debug = createDebug('TFD:app');

export const createApp = () => {
  debug('Creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());

  const authInterceptor = new AuthInterceptor();

  const usersRepo = new UserRepo(prisma);
  const usersController = UserController.getInstance(usersRepo);
  const usersRouter = new UserRouter(usersController, authInterceptor);
  app.use('/user', usersRouter.router);

  const armyListRepo = new ArmyListRepo(prisma);
  const armyListController = ArmyListController.getInstance(armyListRepo);
  const armyListRouter = new ArmyListRouter(armyListController, authInterceptor);
  app.use('/armylist', armyListRouter.router);

  const matchRepo = new MatchRepo(prisma);
  const matchParticipantRepo = new MatchParticipantRepo(prisma);
  const matchController = MatchController.getInstance(matchRepo, matchParticipantRepo);
  const matchRouter = new MatchRouter(matchController, authInterceptor);
  app.use('/match', matchRouter.router);

  const tournamentRepo = new TournamentRepo(prisma);
  const tournamentParticipantRepo = new TournamentParticipantRepo(prisma);
  const roundService = new RoundRobinService(tournamentRepo, matchRepo);
  const tournamentController = TournamentController.getInstance(tournamentRepo, tournamentParticipantRepo, roundService);
  const tournamentRouter = new TournamentRouter(tournamentController, authInterceptor);
  app.use('/tournament', tournamentRouter.router);
};
