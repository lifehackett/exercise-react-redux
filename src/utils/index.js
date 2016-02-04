/**
 * Created by mikepugh on 1/22/16.
 */

export default {
	validateQuote(content) {
		if(!content || content.length < 10) {
			return "A quote needs at least 10 charachters to be worthy of sharing with the world!";
		}
	}
}
