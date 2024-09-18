import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";
import { CheckCircle2, Plus } from "lucide-react";
import { getSummary } from "../http/get-summary";
import { InOrbitIcon } from "./in-orbit-icon";
import { PendingGoals } from "./pending-goals";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";

//dayjs.locale(ptBR);

export function Summary() {
	const { data } = useQuery({
		queryKey: ["summary"],
		queryFn: getSummary,
		staleTime: 1000 * 60,
	});

	if (!data) {
		return null;
	}

	const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
	const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

	const percentage = Math.round((data.completed * 100) / data.total);

	return (
		<div className="py-10 px-5 flex flex-col max-w-[480px] mx-auto gap-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<InOrbitIcon></InOrbitIcon>
					<span className="text-lg font-semibold capitalize">
						{firstDayOfWeek} - {lastDayOfWeek}
					</span>
				</div>
				<DialogTrigger asChild>
					<Button size="sm">
						<Plus className="size-4" />
						Add goal
					</Button>
				</DialogTrigger>
			</div>
			<div className="flex flex-col gap-3">
				<Progress max={data?.total} value={data?.completed}>
					<ProgressIndicator
						style={{ width: `${percentage}%` }}
					></ProgressIndicator>
				</Progress>
				<div className="flex items-center justify-between text-xs text-zinc-400">
					<span className="">
						You completed{" "}
						<span className="text-zinc-100">{data?.completed}</span> out of{" "}
						<span className="text-zinc-100">{data?.total}</span> goals this
						week.
					</span>
					<span>{percentage}%</span>
				</div>
			</div>

			<Separator></Separator>

			<PendingGoals></PendingGoals>

			<div className="flex flex-col gap-6">
				<h2 className="text-xl font-medium">Your week</h2>


				{ data.goalsPerDay ? Object.entries(data.goalsPerDay).map(([date, goals]) => {
					const weekDay = dayjs(date).format("dddd");
					const formattedDate = dayjs(date).format("D [de] MMMM");

					return (
						<div key={date} className="flex flex-col gap-4">
							<h3 className="font-medium">
								<span className="capitalize">{weekDay} </span>
								<span className="text-zinc-400 text-xs">({formattedDate})</span>
							</h3>

							<ul className="flex flex-col gap-3">
								{goals.map((goal) => {
									const time = dayjs(goal.completedAt).format("HH:mm[h]");
									return (
										<li key={goal.id} className="flex items-center gap-2">
											<CheckCircle2 className="size-4 text-pink-500"></CheckCircle2>
											<span className="text-sm text-zinc-400">
												You completed "
												<span className="text-zinc-100">{goal.title}</span>" at{" "}
												<span className="text-zinc-100">{time}</span>
											</span>
										</li>
									);
								})}
							</ul>
						</div>
					);
				}) : <span className="text-sm text-zinc-400">Nothing completed yet.</span> }
			</div>
		</div>
	);
}
