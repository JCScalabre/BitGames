import axios from "axios";

export default {
	submitScore: function(scoreData) {
		return axios.post("/api/scores", scoreData)
	}
}