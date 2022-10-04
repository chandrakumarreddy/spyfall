import { Link } from "@remix-run/react";

export default function DefaultHeader({ children }) {
  return (
    <header>
      <nav>
        <img
          src="https://www.spyfall.app/assets/spy_black-917b12c1334faadf3cb4aab01573054ccc9e3d284d893c2b3f1bc1f257693682.png"
          alt="spyfall logo"
          width="40"
          height="auto"
        />
        {children}
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}
