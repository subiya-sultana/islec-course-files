"use client";

import Link from "next/link";

export default function ActionButton({
  iconClass,
  title,
  onClick,
  href,
  asLink = false,
  color = "blue", // "blue", "green", "red", etc.
}) {
  const baseClasses =
    "p-1 rounded-md cursor-pointer hover:bg-opacity-80 transition-colors flex items-center justify-center";

  const colorClasses = {
    blue: "text-xl text-blue-600 bg-blue-100 hover:bg-blue-200",
    green: "text-3xl text-green-600 bg-green-100 hover:bg-green-200",
    red: "text-xl text-red-600 bg-red-100 hover:bg-red-200",
  };

  const classes = `${baseClasses} ${colorClasses[color] || colorClasses.blue}`;

  // Render as Link or Button based on asLink prop
  if (asLink && href) {
    return (
      <Link href={href} className={classes} title={title} aria-label={title}>
        <i className={iconClass}></i>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      title={title}
      aria-label={title}
    >
      <i className={iconClass}></i>
    </button>
  );
}
