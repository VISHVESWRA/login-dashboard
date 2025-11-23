import { Menu } from "lucide-react";

export default function Header({ setOpen }) {
  return (
    <header className="h-14 bg-white shadow flex items-center px-4">
      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(true)} className="md:hidden text-gray-700">
        <Menu size={24} />
      </button>

      <h2 className="text-xl font-semibold ml-3">My Dashboard</h2>
    </header>
  );
}
