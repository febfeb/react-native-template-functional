import axios from "axios";
import qs from 'qs';
import { Platform } from "react-native";
import AppConfig from "../config/app";
import { store } from "../store";
import moment from 'moment';
import FormData from "form-data";

const request = () => {
	return axios.create({
		baseURL: AppConfig.BASE_URL,
		timeout: 10000,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		}
	});
}

const requestWithAuth = () => {
	let user = store.getState().user;

	console.log("Auth", user.token);

	return axios.create({
		baseURL: AppConfig.BASE_URL,
		timeout: 10000,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Token " + user.token
		}
	});
}

const requestMux = () => {
	const MUX_TOKEN_SECRET = 'JVuSAuN6ZaQdlRtLUgw77ngrBwazNZ8s+E+5w0LASVllMdbsIp9S7MJF0NUZnFPS/LNLOaVdocU'
	const MUX_TOKEN_ID = 'cc034ebc-3ef0-4841-9f93-28ed61752bbc'
	return axios.create({
		baseURL: 'https://api.mux.com/video/v1',
		timeout: appConfig.defaultTimeout,
		headers: {
			"Accept": "application/json",
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + btoa(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`)
		}
	});
}

export const HttpRequest = {
	registerDevice(name, token, device_id, user_id) {
		let data = {
			"name": name + "",
			"active": true,
			"device_id": device_id + "",
			"registration_id": token,
			"type": Platform.OS,
			"user": user_id
		};
		console.log("registerDevice", data)
		return requestWithAuth().post("/device-user/", data);
	},
	signup(data) {
		return request().post("/api/v1/signup/", data);
	},
	login(data) {
		return request().post("/api/v1/login/", data);
	},
	signupWithAppleId(data) {
		return request().post("/api/v1/apple-signup/", data);
	},
	logout(data) {
		return request().post("/logout/", data);
	},
	reset(data) {
		return request().post("/api/v1/reset/password/", data);
	},
	resetConfirm(data) {
		return request().post("/rest-auth/password/reset/confirm/", data);
	},

	/** Live Streaming */
	cretaeLiveStreaming() {
		return requestWithAuth().post("/api/v1/live-streaming/");
	},
	getAllUserLiveStreaming() {
		return requestWithAuth().get("/api/v1/live-streaming/");
	},

	/** Team and Player */
	addTeam(data) {
		return requestWithAuth().post("/api/v1/team/", data);
	},
	updateTeam(id, data) {
		return requestWithAuth().patch("/api/v1/team/" + id + "/", data);
	},
	searchTeam(data) {
		return requestWithAuth().get(`/api/v1/team/search?name=${data}`);
	},
	getTeam(id) {
		return requestWithAuth().get(`/api/v1/team/${id}/`);
	},
	getAllUserTeams(is_broadcasting = null) {
		let obj = {};
		if (is_broadcasting === true) {
			obj.is_broadcasting = "True";
		}
		if (is_broadcasting === false) {
			obj.is_broadcasting = "False";
		}
		return requestWithAuth().get("/api/v1/team/?" + qs.stringify(obj));
	},
	getAllBroadcastingTeam() {
		return requestWithAuth().get("/api/v1/team/broadcasting/?is_broadcasting=True");
	},
	startBroadcasting(team_id) {
		console.log("startBroadcasting /api/v1/team/" + team_id + "/")
		return requestWithAuth().patch("/api/v1/team/" + team_id + "/", {
			is_broadcasting: true
		});
	},
	stopBroadcasting(team_id) {
		console.log("stopBroadcasting /api/v1/team/" + team_id + "/")
		return requestWithAuth().patch("/api/v1/team/" + team_id + "/", {
			is_broadcasting: false
		});
	},
	createTeamPlayer(data) {
		return requestWithAuth().post("/api/v1/team-players/", data);
	},
	getSingleTeamPlayer(team_id) {
		return requestWithAuth().get(`/api/v1/team-players/get_single_team_players/?team_id=${team_id}`);
	},
	getAllTeamPlayer() {
		return requestWithAuth().get(`/api/v1/team-players/`);
	},
	addPlayerToAdmin(data) {
		return requestWithAuth().post(`/api/v1/team-admin/`, data);
	},
	modifyAdminPermission(admin_id, data) {
		return requestWithAuth().patch(`/api/v1/team-admin/${admin_id}/`, data);
	},
	getAllTeamAdmin(team_id) {
		return requestWithAuth().get(`/api/v1/team-admin/${team_id}/`);
	},
	getTeamByTeamId(team_id) {
		return requestWithAuth().get(`/api/v1/team-admin/${team_id}/`);
	},
	getFollowList() {
		return requestWithAuth().get("/api/v1/team-follower/");
	},
	followTeam(team_id) {
		let data = {
			follow: "True",
			team: team_id,
		};
		return requestWithAuth().post('/api/v1/team-follower/', data);
	},
	unfollowTeam(team_id) {
		let data = {
			follow: "False",
			team: team_id,
		};
		return requestWithAuth().post('/api/v1/team-follower/', data);
	},

	/** GAME */
	createGame(data) {
		return requestWithAuth().post('/api/v1/game/', data);
	},
	updateGameWithID(id) {
		return requestWithAuth().post(`/api/v1/game/${id}`, data);
	},
	getAllGame() {
		return requestWithAuth().get(`/api/v1/game/`);
	},
	getSpesificGameWithGameId(id) {
		return requestWithAuth().get(`/api/v1/game/${id}`);
	},
	deleteSpesificGameWithGameId(id) {
		return requestWithAuth().delete(`/api/v1/game/${id}`);
	},

	/** EVENT */
	createEvent(data) {
		return requestWithAuth().post('/api/v1/event/', data);
	},
	getAllEvent() {
		return requestWithAuth().get(`/api/v1/event/`);
	},
	getSpesificEvent(id) {
		return requestWithAuth().get(`/api/v1/event/${id}`);
	},
	getNextEvents() {
		return requestWithAuth().get(`/api/v1/event/next_events/`);
	},


	getUserProfile() {
		let user = store.getState().user;
		return requestWithAuth().get(`/api/v1/profile/${user.user.id}/`);
	},
	updateProfile(data) {
		let user = store.getState().user;
		return requestWithAuth().patch(`/api/v1/profile/${user.user.id}/`, data);
	},
	resetPassword(data) {
		return requestWithAuth().post("/api/v1/reset/password/", data);
	},
};

export const FormDataConverter = {
    convert(data) {
        let form_data = new FormData();

        for (let key in data) {
            form_data.append(key, data[key]);
        }

        return form_data;
    }
};

export const HttpResponse = {
	processMessage(msg, alternateMessage = "Error processing data") {
		if (msg) {
			let data = msg.data;
			let messages = [];
			Object.keys(data).forEach((key) => {
				let arr = data[key];
				if (Array.isArray(arr)) {
					messages.push(key + " - " + arr.join(" "));
				} else {
					messages.push(key + " - " + arr);
				}
			});
			if (messages.length == 0) {
				return alternateMessage;
			}
			return messages.join(" ");
		}
		return alternateMessage;
	}
};