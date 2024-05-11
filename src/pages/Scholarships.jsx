import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import calculateMatchScore from '../utils/automatcher';

const Scholarships = () => {
	const { data: user, isPending: userPending } = useFetch('http://localhost:8000/userprofile');
	const { data: scholarships, isPending: scholarshipsPending } = useFetch('http://localhost:8000/scholarships');
	// matcher threshold
	const automatcherThreshold = 1;

	return (
		<div style={{ padding: 10 }}>
			{/* User profile */}
			<h1 style={{ marginTop: 0 }}>User profile</h1>
			{userPending && <div>Loading...</div>}
			{
				user && (
					<div>
						<div>GPA: {user.GPA.toFixed(1)}</div>
						<div>Program: {user.program}</div>
						<div>Achievements: {user.achievements}</div>
						<div>Interests: {user.interests}</div>
						<div>Goals: {user.goals}</div>
					</div>
				)
			}
			{/* Scholarships posting */}
			<h1>Recommended Scholarships</h1>
			{scholarshipsPending && <div>Loading...</div>}
			{scholarships && (
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
					{/* calculate match score returns a match scores / number of criterias match; modify the threshold as per requirement */}
					{scholarships.filter(scholarship => calculateMatchScore(scholarship, user) >= automatcherThreshold).map((scholarship) => {
						return (
							<div key={scholarship.id} style={{ flexGrow: 1, width: 'calc(100% * (1/2) - 20px' }}>
								<div>ID: {scholarship.id}</div>
								<div>Criteria:</div>
								{scholarship.criteria.split('\n').map((criterion) => (
									<p style={{ margin: 0 }}>{criterion}</p>
								))}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Scholarships;
