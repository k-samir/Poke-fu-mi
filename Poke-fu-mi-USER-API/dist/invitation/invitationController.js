"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinEmptyMatch = exports.acceptInvitation = exports.newInvitation = exports.clearDB = exports.listInvitation = void 0;
const invitationRepository_1 = __importDefault(require("./invitationRepository"));
const got_1 = __importDefault(require("got"));
const invitationRepository = new invitationRepository_1.default();
const listInvitation = (userId) => {
    return invitationRepository.getAllInvitations(userId);
};
exports.listInvitation = listInvitation;
const clearDB = () => {
    return invitationRepository.clearDB();
};
exports.clearDB = clearDB;
const newInvitation = (invite) => {
    var res = invitationRepository.createInvitation(invite.fromId, invite.fromName, invite.matchId, invite.invitRecipient);
    return res;
};
exports.newInvitation = newInvitation;
const acceptInvitation = (inviteId, myId) => __awaiter(void 0, void 0, void 0, function* () {
    //check if invite still exist
    var inviteExist = invitationRepository.inviteExist(inviteId, myId);
    console.log("EXIST : " + inviteExist);
    try {
        if (inviteExist) {
            // get matchId
            var res = invitationRepository.getMatchId(inviteId);
            console.log("res" + res);
            // update status if player 2 join in match
            const update = yield got_1.default.post('http://match:5000/acceptFromInvite', {
                json: { "matchId": res }
            });
            console.log(JSON.parse(update.body));
            // if match joined 
            if (JSON.parse(update.body)) {
                // delete invite in db
                invitationRepository.removeInvitation(inviteId);
                return "Match " + res + " joined and Invitation " + inviteId + " removed from available invites.";
            }
            else {
                return "Match " + res + " does not need a second player.";
            }
        }
        else {
            return "This invitation doesn't exist.";
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.acceptInvitation = acceptInvitation;
const joinEmptyMatch = (matchId, myId) => __awaiter(void 0, void 0, void 0, function* () {
    // check if matchOwner != myId
    const owner = yield got_1.default.post('http://match:5000/getMatchOwner', {
        json: {
            matchId: matchId
        }
    });
    if (JSON.parse(owner.body) != myId && JSON.parse(owner.body) != "null") {
        // update player 2 in match
        const update = yield got_1.default.post('http://match:5000/addPlayer2', {
            json: {
                id_player2: myId,
                matchId: matchId
            }
        });
        // if match found 
        if (JSON.parse(update.body)) {
            return "You succesfully joined the match " + matchId;
        }
        else {
            return "Match " + matchId + " does not need a second player.";
        }
    }
    else if (JSON.parse(owner.body) == myId) {
        return "You can't join a match against yourself";
    }
    else {
        return "Match not found";
    }
});
exports.joinEmptyMatch = joinEmptyMatch;
//# sourceMappingURL=invitationController.js.map