import logo from "../assets/logo-in-orbit.svg";
import letsStart from "../assets/lets-start.svg";

import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function EmptyGoals() {
	return (
		<div className="h-screen flex flex-col items-center justify-center gap-8">
			<img src={logo} alt="in.orbit" />
			<img src={letsStart} alt="in.orbit" />
			<p className="text-zinc-300 leading-relaxed max-w-80 text-center">
				You didn't add any goal yet,<br></br> why not adding now?
			</p>

			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4" />
					Add goal
				</Button>
			</DialogTrigger>
		</div>
	);
}
