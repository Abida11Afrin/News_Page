import Image from "next/image";

export default function Home() {
return (
  <main className="fixed inset-0 flex flex-col bg-gray-100">
    {/* Content Area */}
    <div className="flex-1 flex items-center justify-center overflow-y-auto pt-10">
      <div className="mt-5 flex items-center justify-center w-[1000px] h-[700px] bg-gray-200 rounded-2xl shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff,0_0_30px_rgba(169,169,169,0.5)]">
        {/* Your content here */}
      </div>
    </div>

    {/* Footer */}
    <footer className="border-t-2 border-blue-500 bg-white p-4 text-center">
      <p className="text-gray-600"> © ২০২৬ সর্বস্বত্ব স্বত্বাধিকার সংরক্ষিত</p>
    </footer>
  </main>
);
}

