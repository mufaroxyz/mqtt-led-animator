import React from "react";

export default function PageWrapper({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <div className="flex-auto flex flex-col p-4">
      <p className="text-2xl font-bold">{header}</p>
      <div className="flex-auto p-1">{children}</div>
    </div>
  );
}
