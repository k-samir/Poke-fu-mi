module MatchStatus {

  export enum StatusEnum {
    NO_PLAYER2,
    INVITE_PLAYER2_PENDING,
    NO_DECKS,
    READY_START,
    IN_PROGRESS,
    OVER
  }

  
    export function indxOf(value: string): StatusEnum {
      for (var i = 0; i < 7; i++) {
        if (StatusEnum[i] == value) {
          return i
        }
      }
    }

}

export default MatchStatus


