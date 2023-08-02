export const LinkTypes = [
    { name: "github", color: "#1A1A1A" },
    { name: "frontendmentor", color: "#D9D9D9" },
    { name: "twitter", color: "#43B7E9" },
    { name: "youtube", color: "#EE3939" },
    { name: "linkedin", color: "#2D68FF" },
    { name: "facebook", color: "#2442AC" },
    { name: "twitch", color: "#EE3FC8" },
    { name: "devto", color: "#333" },
    { name: "codewars", color: "#8A1A50" },
    { name: "freecodecamp", color: "#302267" },
    { name: "gitlab", color: "#EB4925" },
    { name: "hashnode", color: "#0330D1" },
    { name: "stack-overflow", color: "#EC7100" },
  ];

  export function colorType(brand: string) {
    const foundType = LinkTypes.find((linkType) => linkType.name === brand);
    return foundType ? foundType.color : '#000000';
  }