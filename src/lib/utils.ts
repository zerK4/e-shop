import anime from "animejs";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function switchPage({
  href,
  router,
  fromId,
}: {
  href: string;
  router: AppRouterInstance;
  fromId: string;
}) {
  const tl = anime.timeline();

  tl.add({
    targets: `#${fromId}`,
    translateX: [0, "-200vw"],
    opacity: 0,
    duration: 500,
    easing: "linear",
    complete: () => {
      router.push(href, {
        scroll: false,
      });
    },
  });
}
