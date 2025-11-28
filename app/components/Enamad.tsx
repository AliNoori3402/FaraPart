"use client";

import { useEffect, useState } from "react";

export default function Enamad() {
  const [domain, setDomain] = useState<"ir" | "com" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;

      if (host.endsWith(".ir")) {
        setDomain("ir");
      } else if (host.endsWith(".com")) {
        setDomain("com");
      }
    }
  }, []);

  if (!domain) return null;

  const enamadData = {
    ir: {
      href: "https://trustseal.enamad.ir/?id=673138&Code=UcgUHxtBIRi7BnzYVhUzR7rd0jr9wZct",
      img: "https://trustseal.enamad.ir/logo.aspx?id=673138&Code=UcgUHxtBIRi7BnzYVhUzR7rd0jr9wZct",
    },
    com: {
      href: "https://trustseal.enamad.ir/?id=674123&Code=JJ8m09r6PWKkYvCARBlWQ1oRCNJOTwm9",
      img: "https://trustseal.enamad.ir/logo.aspx?id=674123&Code=JJ8m09r6PWKkYvCARBlWQ1oRCNJOTwm9",
    },
  };

  const item = enamadData[domain];

  return (
    <a href={item.href} target="_blank" referrerPolicy="origin">
      <img
        src={item.img}
        alt="Enamad"
        style={{ cursor: "pointer", width: "100px", height: "100px" }}
      />
    </a>
  );
}
