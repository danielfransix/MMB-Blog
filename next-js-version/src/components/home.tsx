import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Icon } from "@iconify/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export function Home() {
  return (
    <div className="flex flex-col items-start gap-y-10">
      <div className="w-full flex items-stretch justify-evenly">
        <NavigationMenu viewport={false} className="w-full">
          <div className="flex flex-col justify-between items-center gap-y-4 w-full">
            <div className="text-base">
              <link />
              <img src="https://wqnmyfkavrotpmupbtou.supabase.co/storage/v1/object/public/user-assets/1169/components/Ellipse5-VXn6niw0XcU.png" alt="MakeMeBeautiful blog logo" />
            </div>
            <div className="flex items-center gap-x-6">
              <div className="size-10 hover:text-[var(--hover-green)] transition-colors">
                <Icon icon="mingcute:facebook-line" className="h-full w-full" />
              </div>
              <div className="size-10 hover:text-[var(--hover-green)] transition-colors">
                <Icon icon="mingcute:social-x-line" className="h-full w-full" />
              </div>
              <div className="size-10 hover:text-[var(--hover-green)] transition-colors">
                <Icon icon="mingcute:mail-line" className="h-full w-full" />
              </div>
            </div>
            <hr className="w-full bg-black" />
            <NavigationMenuList className="justify-between items-center gap-x-8">
              <div className="flex justify-evenly items-center gap-x-8">
                <div className="flex items-center gap-x-1">
                  <p className="font-bold">MakeMeBeautiful</p>
                  <div className="w-2 h-2 bg-chart-2 rounded-full" />
                </div>
                <div className="flex">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/docs">Home</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/docs">About</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/docs">Contact</NavigationMenuLink>
                  </NavigationMenuItem>
                </div>
                <div />
                <div className="w-4" role="search">
                  <Icon icon="mingcute:search-line" className="w-full h-auto" />
                </div>
              </div>
            </NavigationMenuList>
            <hr className="w-full bg-black" />
          </div>
        </NavigationMenu>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="border-2 rounded-xs border-primary w-full h-150 overflow-clip">
          <img
            src="https://wqnmyfkavrotpmupbtou.supabase.co/storage/v1/object/public/user-assets/1169/components/HeroImage-zzRGYhaHYLm.png"
            className="w-full h-auto"
            alt="Featured blog post hero image"
          />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-3xl">This is a very nice blogpost</h2>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="flex items-center gap-x-1">
            <Icon icon="mingcute:tag-line" />
            Tag
          </div>
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="flex items-center gap-x-1">
            <Icon icon="mingcute:calendar-line" />
            February 12, 2025
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <hr className="w-full bg-black" />
        </div>
        <div>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </div>
        <div className="flex justify-between">
          <button className="flex items-center gap-x-1 hover:text-[var(--hover-green)] transition-colors">
            <p className="font-bold">Continue Reading</p>
            <Icon icon="mingcute:right-line" />
          </button>
          <div className="flex gap-x-2 items-center">
            <div className="flex items-center gap-x-1">
              <Icon icon="mingcute:thumb-up-line" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="flex items-center gap-x-1">
              <Icon icon="iconamoon:comment" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="flex items-center gap-x-1">
              <Icon icon="ic:baseline-share" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Popular Posts
        </h1>
        <div className="flex gap-x-2">
          <div className="flex flex-col items-center gap-y-2">
            <div className="w-full h-56 flex flex-col justify-start items-start overflow-clip">
              <img
                src="https://wqnmyfkavrotpmupbtou.supabase.co/storage/v1/object/public/user-assets/1169/components/HeroImage-5DJYGO1mbjl.png"
                className="w-full h-auto"
                alt="Popular blog post thumbnail"
              />
            </div>
            <h3 className="font-heading font-semibold text-2xl">This is a very nice blogpost</h3>
            <button className="flex items-center gap-x-1 hover:text-[var(--hover-green)] transition-colors">
              <p className="font-bold">Read Post</p>
              <Icon icon="mingcute:right-line" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <div className="w-full h-56 overflow-hidden flex flex-col justify-start items-start">
              <img
                src="https://wqnmyfkavrotpmupbtou.supabase.co/storage/v1/object/public/user-assets/1169/components/HeroImage-5DJYGO1mbjl.png"
                className="w-full h-auto"
                alt="Popular blog post thumbnail"
              />
            </div>
            <h3 className="font-heading font-semibold text-2xl">This is a very nice blogpost</h3>
            <button className="flex items-center gap-x-1 hover:text-[var(--hover-green)] transition-colors">
              <p className="font-bold">Read Post</p>
              <Icon icon="mingcute:right-line" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <div className="w-full h-56 overflow-hidden flex flex-col justify-start items-start">
              <img
                src="https://wqnmyfkavrotpmupbtou.supabase.co/storage/v1/object/public/user-assets/1169/components/HeroImage-5DJYGO1mbjl.png"
                className="w-full h-auto"
                alt="Popular blog post thumbnail"
              />
            </div>
            <h3 className="font-heading font-semibold text-2xl">This is a very nice blogpost</h3>
            <button className="flex items-center gap-x-1 hover:text-[var(--hover-green)] transition-colors">
              <p className="font-bold">Read Post</p>
              <Icon icon="mingcute:right-line" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="border-2 rounded-xs border-primary w-full h-150 overflow-clip">
          <img
            src="https://wqnmyfkavrotpmupbtou.supabase.co/storage/v1/object/public/user-assets/1169/components/HeroImage-zzRGYhaHYLm.png"
            className="w-full h-auto"
            alt="Blog post hero image"
          />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-3xl">This is a very nice blogpost</h2>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="flex items-center gap-x-1">
            <Icon icon="mingcute:tag-line" />
            Tag
          </div>
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="flex items-center gap-x-1">
            <Icon icon="mingcute:calendar-line" />
            February 12, 2025
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <hr className="w-full bg-black" />
        </div>
        <div>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </div>
        <div className="flex justify-between">
          <button className="flex items-center gap-x-1 hover:text-[var(--hover-green)] transition-colors">
            <p className="font-bold">Continue Reading</p>
            <Icon icon="mingcute:right-line" />
          </button>
          <div className="flex gap-x-2 items-center">
            <div className="flex items-center gap-x-1">
              <Icon icon="mingcute:thumb-up-line" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="flex items-center gap-x-1">
              <Icon icon="iconamoon:comment" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="flex items-center gap-x-1">
              <Icon icon="ic:baseline-share" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="border-2 rounded-xs border-primary w-full h-150 overflow-clip">
          <img
            src="https://wqnmyfkavrotpmupbtou.supabase.co/storage/v1/object/public/user-assets/1169/components/HeroImage-zzRGYhaHYLm.png"
            className="w-full h-auto"
            alt="Blog post hero image"
          />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-3xl">This is a very nice blogpost</h2>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="flex items-center gap-x-1">
            <Icon icon="mingcute:tag-line" />
            Tag
          </div>
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="flex items-center gap-x-1">
            <Icon icon="mingcute:calendar-line" />
            February 12, 2025
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <hr className="w-full bg-black" />
        </div>
        <div>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </div>
        <div className="flex justify-between">
          <button className="flex items-center gap-x-1 hover:text-[var(--hover-green)] transition-colors">
            <p className="font-bold">Continue Reading</p>
            <Icon icon="mingcute:right-line" />
          </button>
          <div className="flex gap-x-2 items-center">
            <div className="flex items-center gap-x-1">
              <Icon icon="mingcute:thumb-up-line" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="flex items-center gap-x-1">
              <Icon icon="iconamoon:comment" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="flex items-center gap-x-1">
              <Icon icon="ic:baseline-share" />
              <a className="hover:text-[var(--hover-green)] transition-colors">10</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem className="border-primary-foreground flex bg-[#00a86b]">
              <PaginationLink
                href="#"
                isActive
                className="text-primary-foreground flex justify-center items-center"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <hr className="w-full bg-black" />
      <div>
        <div className="flex items-center gap-x-1">
          <Icon icon="ic:outline-copyright" />
          <p>2025 MakeMeBeautiful</p>
        </div>
      </div>
    </div>
  );
}
