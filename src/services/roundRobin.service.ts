import { MatchRepo } from "../repositories/match.repo";
import { TournamentRepo } from "../repositories/tournament.repo";

export class RoundRobinService {

  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(private readonly tournamentRepo: TournamentRepo, private readonly matchRepo: MatchRepo) { }

  async createRoundRobinMatches(tournamentId: string) {
    const tournament = await this.tournamentRepo.readById(tournamentId);
    if (!tournament || !tournament.participants) {
      throw new Error('Tournament or participants not found');
    }

    const { participants } = tournament;
    const matches = [];

    for (let i = 0; i < participants.length; i++) {
      for (let j = i + 1; j < participants.length; j++) {
        matches.push({
          date: new Date(),
          result: '',
          details: 'First Leg',
          tournamentId,
          participants: [
            { userId: participants[i].user.id, armyId: participants[i].armyList.id },
            { userId: participants[j].user.id, armyId: participants[j].armyList.id },
          ],
        });
        matches.push({
          date: new Date(),
          result: '',
          details: 'Second Leg',
          tournamentId,
          participants: [
            { userId: participants[j].user.id, armyId: participants[j].armyList.id },
            { userId: participants[i].user.id, armyId: participants[i].armyList.id },
          ],
        });
      }
    }

    await this.matchRepo.createMany(matches);

    return matches;
  }
}
