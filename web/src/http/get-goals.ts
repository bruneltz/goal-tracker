type GoalsResponse = {
	id: string;
	title: string;
	desiredWeeklyFrequency: number;
	completionCount: number;
}[];

export async function getGoals(): Promise<GoalsResponse> {
	const response = await fetch("http://localhost:3333/goals");
	const data = await response.json();
	return data;
}
