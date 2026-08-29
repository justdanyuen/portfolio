export default function Projects() {
  return (
    <div className="py-16 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
        {/* short intro line about your projects, optional */}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Placeholder project card — duplicate this block per project,
            or replace with a real ProjectCard component + real data later */}
        <div className="border border-black/[.1] dark:border-white/[.15] rounded-lg p-5 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Project Name</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            One or two sentences on what this project is and why you built it.
          </p>
          <div className="flex gap-4 text-sm font-medium mt-2">
            <a href="#" className="underline">Code</a>
            <a href="#" className="underline">Live Demo</a>
          </div>
        </div>
      </div>
    </div>
  );
}