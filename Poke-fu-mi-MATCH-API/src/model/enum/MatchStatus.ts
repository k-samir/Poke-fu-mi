export enum MatchStatus {
  NO_PLAYER2,
  INVITE_PLAYER2_PENDING,
  NO_DECKS,
  READY_START,
  IN_PROGRESS,
  OVER,
  after
}


export function after(value: MatchStatus): MatchStatus {
        return value + 1;
}

