export const truncateSentence = (sentence: string, maxLength = 48) => {
	if (sentence.length <= maxLength) {
		return sentence;
	}

	return sentence.slice(0, maxLength) + "...";
};