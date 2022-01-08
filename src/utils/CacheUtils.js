import { store } from "../store";
import { setTeamList } from "../store/actions";
import { HttpRequest } from "./http"

export default {
    findTeam(id, dispatch) {
        let oldTeams = store.getState().teams;
        if (oldTeams[id] == null) {
            HttpRequest.getTeam(id).then((res) => {
                console.log("HttpRequest.getTeam", res.data);
                let allTeams = { ...store.getState().teams };

                let item = res.data;
                if (item.streaming_credentials.length > 0) {
                    item.streaming = item.streaming_credentials[0];
                } else {
                    item.streaming = null;
                }
                delete item.streaming_credentials;

                allTeams[id] = item;
                dispatch(setTeamList(allTeams));
            }).catch((error) => {
                console.log("HttpRequest.getTeam:err", error, error.response);
            });
        }
    },
}