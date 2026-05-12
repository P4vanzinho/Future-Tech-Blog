import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/common/icons/ArrowUpRightIcon";
import { LinkedInIcon } from "@/components/common/icons/LinkedInIcon";
import { MediumIcon } from "@/components/common/icons/MediumIcon";
import { TwitterIcon } from "@/components/common/icons/TwitterIcon";

const footerColumns = [
  {
    title: "Home",
    links: [
      "Features",
      "Blogs",
      "Resources",
      "Testimonials",
      "Contact Us",
      "Newsletter",
    ],
  },
  {
    title: "News",
    links: [
      "Trending Stories",
      "Featured Videos",
      "Technology",
      "Health",
      "Politics",
      "Environment",
    ],
  },
  {
    title: "Podcasts",
    links: [
      "AI Revolution",
      "AI Revolution",
      "TechTalk AI",
      "AI Conversations",
    ],
  },
  {
    title: "Blogs",
    links: [
      "Quantum Computing",
      "AI Ethics",
      "Space Exploration",
      "Biotechnology",
      "Renewable Energy",
      "Biohacking",
    ],
  },
];

const resources = ["Whitepapers", "Ebooks", "Reports", "Research Papers"];

export function Footer() {
  return (
    <footer className="bg-dark-08 border-dark-15 mt-auto border-t px-4 py-10 lg:border-t-0 lg:px-20">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-10">
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <section key={column.title} className="flex flex-col gap-4">
              <h3 className="text-[1.25rem] leading-[130%] text-white">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link, index) => (
                  <li key={`${column.title}-${link}-${index}`}>
                    <Link
                      href="#"
                      className="text-dark-40 hover:text-grey-90 text-[0.875rem] leading-[150%] tracking-[-0.03em] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="col-span-2 flex flex-col gap-4 lg:col-span-1">
            <h3 className="text-[1.25rem] leading-[130%] text-white">
              Resources
            </h3>
            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-start">
              {resources.map((resource) => (
                <Link
                  key={resource}
                  href="#"
                  className="bg-dark-08 border-dark-15 text-grey-60 hover:text-grey-90 inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-[0.875rem] leading-[150%] tracking-[-0.03em] transition-colors"
                >
                  {resource}
                  <ArrowUpRightIcon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="border-dark-15 flex flex-col items-center gap-4 border-t pt-6 lg:flex-row lg:items-center lg:justify-between lg:pt-10">
          <div className="text-grey-60 order-2 flex items-center justify-center gap-4 text-[0.875rem] leading-[150%] tracking-[-0.03em] lg:order-1">
            <Link href="#" className="hover:text-grey-90 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:text-grey-90 transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="order-1 flex items-center justify-center gap-4 lg:order-2">
            <Link
              href="#"
              className="hover:text-grey-90 text-white transition-colors"
              aria-label="X"
            >
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-grey-90 text-white transition-colors"
              aria-label="Medium"
            >
              <MediumIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-grey-90 text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-grey-60 order-3 text-center text-[0.875rem] leading-[150%] tracking-[-0.03em] lg:text-right">
            © 2024 FutureTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
