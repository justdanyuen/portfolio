export default function Resume() {
  return (
    <div className="py-16 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Resume</h1>
      
      <a
        href="/resume.pdf"
        download
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download PDF
      </a>
      <iframe
        src="/resume.pdf"
        className="w-full h-[80vh] border rounded"
      />
    </div>
  );
}
