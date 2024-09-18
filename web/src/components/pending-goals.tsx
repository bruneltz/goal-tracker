import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGoals } from "../http/get-goals";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["goals"],
		queryFn: getGoals,
		staleTime: 1000 * 60,
	});

	if (!data) {
		return null;
	}

	async function handleCompleteGoal(goalId: string) {
		await createGoalCompletion(goalId);
		queryClient.invalidateQueries({ queryKey: ["summary"] });
		queryClient.invalidateQueries({ queryKey: ["goals"] });
	}

	return (
		<div className="flex flex-wrap gap-3">
			{data.map((goal) => {
				return (
					<OutlineButton
						key={goal.id}
						disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
						onClick={() => handleCompleteGoal(goal.id)}
					>
						<Plus className="size-4 text-zinc-600" />
						{goal.title}
					</OutlineButton>
				);
			})}
		</div>
	);
}
