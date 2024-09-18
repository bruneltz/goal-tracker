import { X } from "lucide-react";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalSchema = z.object({
	title: z.string().min(1, "Inform the goal you want to perform"),
	desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalSchema>;

export function CreateGoal() {
	const queryClient = useQueryClient();

	const { register, control, handleSubmit, formState, reset } =
		useForm<CreateGoalForm>({
			resolver: zodResolver(createGoalSchema),
		});

	async function handleCreateGoal(data: CreateGoalForm) {
		await createGoal({
			title: data.title,
			desiredWeeklyFrequency: data.desiredWeeklyFrequency,
		});

		queryClient.invalidateQueries({ queryKey: ["summary"] });
		queryClient.invalidateQueries({ queryKey: ["goals"] });

		reset();
	}

	return (
		<DialogContent>
			<div className="flex flex-col gap-6 h-full">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<DialogTitle>Add goal</DialogTitle>
						<DialogClose>
							<X className="size-5"></X>
						</DialogClose>
					</div>
					<DialogDescription>
						Add goals you want to perform every week.
					</DialogDescription>
				</div>
				<form
					action=""
					className="flex-1 flex flex-col justify-between"
					onSubmit={handleSubmit(handleCreateGoal)}
				>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Which goal?</Label>
							<Input
								id="title"
								autoFocus
								placeholder="Praticar exercícios, meditar, etc."
								//Applied in native HTML inputs
								{...register("title")}
							></Input>

							{formState.errors.title && (
								<p className="text-red-400 text-sm">
									{formState.errors.title.message}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">How many days per week?</Label>
							<Controller
								control={control}
								name="desiredWeeklyFrequency"
								defaultValue={3}
								render={({ field }) => {
									return (
										<RadioGroup
											onValueChange={field.onChange}
											value={String(field.value)}
										>
											<RadioGroupItem value="1">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													1x time
												</span>
												<span className="text-lg leading-none">🥱</span>
											</RadioGroupItem>
											<RadioGroupItem value="2">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													2x time
												</span>
												<span className="text-lg leading-none">🙂</span>
											</RadioGroupItem>
											<RadioGroupItem value="3">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													3x time
												</span>
												<span className="text-lg leading-none">😎</span>
											</RadioGroupItem>
											<RadioGroupItem value="4">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													4x time
												</span>
												<span className="text-lg leading-none">😜</span>
											</RadioGroupItem>

											<RadioGroupItem value="5">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													5x time
												</span>
												<span className="text-lg leading-none">🤨</span>
											</RadioGroupItem>

											<RadioGroupItem value="6">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													6x time
												</span>
												<span className="text-lg leading-none">🤯</span>
											</RadioGroupItem>

											<RadioGroupItem value="7">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													Everyday
												</span>
												<span className="text-lg leading-none">🔥</span>
											</RadioGroupItem>
										</RadioGroup>
									);
								}}
							/>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<DialogClose asChild>
							<Button className="flex-1" variant="secondary">
								Close
							</Button>
						</DialogClose>
						<Button className="flex-1">Save</Button>
					</div>
				</form>
			</div>
		</DialogContent>
	);
}
