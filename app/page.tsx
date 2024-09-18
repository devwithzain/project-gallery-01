"use client";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { project3, project4, project5, project6, project7 } from "@/public";

export default function App() {
	const isAnimating = useRef<boolean>(false);

	useEffect(() => {
		const splitTextIntoSpans = (selector: string) => {
			const elements = document.querySelectorAll<HTMLElement>(selector);

			elements.forEach((element) => {
				const text = element.innerText;
				// Ensure text is properly split into spans
				const splitText = text
					.split("")
					.map(
						(char: string) => `<span>${char === " " ? "&nbsp;" : char}</span>`,
					)
					.join("");
				element.innerHTML = splitText;
			});
		};

		const initializeCards = () => {
			const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
			gsap.to(cards, {
				y: (i) => -10 + 10 * i + "%",
				z: (i) => 15 * i,
				duration: 0.75,
				ease: "power1.out",
				stagger: -0.1,
			});
		};

		const handleCardClick = () => {
			if (isAnimating.current) return;
			isAnimating.current = true;

			const slider = document.querySelector<HTMLElement>(".slider");
			if (!slider) return;

			const cards = Array.from(slider.querySelectorAll<HTMLElement>(".card"));
			const lastCard = cards.pop();
			const nextCard = cards[cards.length - 1];

			if (lastCard) {
				gsap.to(lastCard.querySelectorAll("h1 span"), {
					y: 200,
					duration: 0.75,
					ease: "power1.out",
				});

				gsap.to(lastCard, {
					y: "+=150%",
					duration: 0.75,
					ease: "power1.out",
					onComplete: () => {
						if (lastCard) {
							slider.prepend(lastCard);
							initializeCards();
							gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });

							setTimeout(() => {
								isAnimating.current = false;
							}, 1000);
						}
					},
				});
			}

			if (nextCard) {
				gsap.to(nextCard.querySelectorAll("h1 span"), {
					y: 0,
					duration: 0.75,
					ease: "power1.out",
					stagger: 0.05,
				});
			}
		};

		splitTextIntoSpans(".copy h1");
		initializeCards();

		gsap.set("h1 span", { y: -200 });
		gsap.set(".slider .card:last-child h1 span", { y: 0 });

		document.addEventListener("click", handleCardClick);

		// Clean up event listener on component unmount
		return () => {
			document.removeEventListener("click", handleCardClick);
		};
	}, []);
	return (
		<>
			<nav className="w-full py-5 px-10 fixed top-0 left-0 bg-transparent z-20">
				<div className="w-full flex items-center justify-between gap-5">
					<div className="w-fit">
						<h1 className="text-[20px] font-medium tracking-tight leading-tight">
							Noir Wood
						</h1>
					</div>
					<div className="flex gap-5 w-fit">
						{["Film,", "Production,", "Info,", "Contact"].map((item, index) => (
							<Link
								key={index}
								href="/"
								className="text-[20px] font-medium tracking-tight leading-tight">
								{item}
							</Link>
						))}
					</div>
					<div className="flex gap-5 w-fit">
						{["Search", "Account", "Cart"].map((item, index) => (
							<Link
								key={index}
								href="/"
								className="text-[20px] font-medium tracking-tight leading-tight">
								{item}
							</Link>
						))}
					</div>
				</div>
			</nav>
			<footer className="w-full py-5 px-10 fixed bottom-0 left-0 bg-transparent z-20">
				<div className="w-full flex items-center justify-between gap-5">
					<h1 className="text-[20px] font-medium tracking-tight leading-tight">
						Showreel 2.0
					</h1>
					<h1 className="text-[20px] font-medium tracking-tight leading-tight">
						2024 / 2025
					</h1>
				</div>
			</footer>
			<div className="relative w-screen h-screen overflow-hidden bg-[#dfe1c8]">
				<div className="slider absolute top-[5vh] w-screen h-screen overflow-hidden pers">
					{[project3, project4, project5, project6, project7].map(
						(img, index) => (
							<div
								className="card absolute top-1/2 left-1/2 w-1/2 h-[500px] rounded-[15px] overflow-hidden bg-black tr3d"
								key={index}>
								<Image
									src={img}
									alt="airmax"
									className="w-full h-full object-cover absolute opacity-75"
								/>
								<div className="copy absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full clipPath">
									<h1 className="text-[6vw] font-medium tracking-tight leading-tight font-ppeditorialoldRegular uppercase text-[#dfe1c8] text-center">
										ethereal noir
									</h1>
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</>
	);
}
