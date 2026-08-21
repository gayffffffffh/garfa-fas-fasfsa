const CONFIG = {
  name: "Garfield",
  roles: ["Cybersecurity Enthusiast", "CTF Player", "OSINT"],
  description:
    "Exploring cybersecurity through CTF challenges, OSINT and hands-on labs.",

  typingLines: [
    "whoami",
    "cat /etc/roles",
    "nmap -sV target.local",
    "sherlock garfield",
  ],

  whatIDo: [
    {
      title: "CTF",
      text: "Practice cybersecurity through Capture The Flag challenges.",
    },
    {
      title: "OSINT",
      text: "Investigate publicly available information and connect digital clues.",
    },
    {
      title: "Cybersecurity",
      text: "Learn security through hands-on labs and personal projects.",
    },
  ],

  skills: [
    {
      id: "01",
      title: "CTF",
      items: [
        "Web Exploitation",
        "Cryptography",
        "Forensics",
        "Privilege Escalation",
        "Linux",
        "Network Security",
      ],
    },
    {
      id: "02",
      title: "OSINT",
      items: [
        "Username Investigation",
        "Social Media Research",
        "Image Analysis",
        "Metadata Analysis",
        "Geolocation",
        "Domain & DNS Reconnaissance",
      ],
    },
    {
      id: "03",
      title: "Tools",
      items: [
        "Nmap",
        "Burp Suite",
        "Wireshark",
        "Gobuster",
        "exiftool",
        "Sherlock",
      ],
    },
  ],

  projects: [
    {
      title: "GarfieldCTF",
      text: "Personal CTF platform and challenge collection.",
      tags: ["CTF", "Platform"],
    },
    {
      title: "CTF Challenges",
      text: "Writeups and solutions from challenges I have worked through.",
      tags: ["Writeups", "Web", "Crypto"],
    },
    {
      title: "OSINT Research Lab",
      text: "Notes and workflows for open source intelligence research.",
      tags: ["OSINT", "Research"],
    },
    {
      title: "Cybersecurity Lab",
      text: "Hands-on lab environment for practicing security fundamentals.",
      tags: ["Labs", "Linux"],
    },
  ],

  social: [
    { label: "Instagram", handle: "phuw4d0n._", url: "https://www.instagram.com/phuw4d0n._/" },
    { label: "Facebook", handle: "Garfield Phuwadon", url: "https://www.facebook.com/profile.php?id=61575418287655" },
  ],

  footer: {
    copyright: "© 2026 Garfield",
    tagline: "Cybersecurity • CTF • OSINT",
  },
};
