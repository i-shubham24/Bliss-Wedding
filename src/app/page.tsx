import { Hero } from "@/sections/home/Hero";
import { Legacy } from "@/sections/home/Legacy";
import { Signature } from "@/sections/home/Signature";
import { Ceremonies } from "@/sections/home/Ceremonies";
import { Services } from "@/sections/home/Services";
import { Reels } from "@/sections/home/Reels";
import { Process } from "@/sections/home/Process";
import { Destinations } from "@/sections/home/Destinations";
import { Reviews } from "@/sections/home/Reviews";
import { PlanBuilder } from "@/sections/home/PlanBuilder";
import { Faq } from "@/sections/home/Faq";
import { Closing } from "@/sections/home/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Legacy />
      <Signature />
      <Ceremonies />
      <Services />
      <Reels />
      <Process />
      <Destinations />
      <Reviews />
      <PlanBuilder />
      <Faq />
      <Closing />
    </>
  );
}
