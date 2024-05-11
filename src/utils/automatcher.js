// criteria matcher
const isMatch = (criteria, userProfile) => {
	const gpaRequirementMatch = criteria.match(
		/(\b(?:maximum|minimum|of|or)\b)?\s+GPA\s+of\s+(\d+(?:\.\d+)?)\s*(?:or|and)?\s*(\b(?:above|below)?\b)?/i
	);

	// gpa matcher
	if (gpaRequirementMatch) {
		return gpaAnalyzer(gpaRequirementMatch, userProfile);
	}

	// add more matchers like program, achievements, interests, goals, characters, and other user data
	// e.g. if (criteria.toLowerCase().includes(userProfile.character.toLowerCase())) { return true; }
}

// GPA criteria
const gpaAnalyzer = (gpaRequirementMatch, userProfile) => {
	const gpaRequirement = gpaRequirementMatch ? parseFloat(gpaRequirementMatch[2]) : null;
	const operator = gpaRequirementMatch ? gpaRequirementMatch[1] || gpaRequirementMatch[3] : '';

	if (gpaRequirement) {
		switch (operator) {
			case 'minimum':
			case 'above':
				if (userProfile.GPA <= gpaRequirement) {
					return true;
				}
				return false;
			case 'maximum':
			case 'below':
				if (userProfile.GPA >= gpaRequirement) {
					return true;
				}
				return false;
		}
	}
}

// match scorer
const calculateMatchScore = (scholarship, userProfile) => {
	let match_score = 0;
	const criteriaList = scholarship.criteria.split('\n').map((x) => x.trim());

	criteriaList.forEach((criteria) => {
		if (isMatch(criteria, userProfile)) {
			match_score += 1;
		}
	});

	return match_score;
}

export default calculateMatchScore