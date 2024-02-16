import { Link } from "react-router-dom";

export default function Footer() {
  const date = new Date();
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between whitespace-nowrap items-center gap-6">
        <span className="flex items-center justify-center text-white tracking-tight gap-1">
          <Link to="/">
            <p className="text-xl font-bold">Hotle-booking.com.</p>
          </Link>
          <p className="font-bold">
            All rights Reserved. &copy; {date.getFullYear()}
          </p>
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Team Service</p>
        </span>
      </div>
    </div>
  );
}
