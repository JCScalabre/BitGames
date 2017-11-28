import axios from "axios";

export default {
	submitScore: function(scoreData) {
		return axios.post("/api/scores", scoreData)
	},
	getScores: function() {
		return axios.get("/api/scores")
	}
}