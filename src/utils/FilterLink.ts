import { LinkType } from "@/types/ContextType";
export function filterLinksWithValue(LinkArray:LinkType[]) {
    // Use the filter method to create a new array with links that have a value for the 'link' property
    const filteredLinks = LinkArray.filter((linkItem) => linkItem.link !== '');
    return filteredLinks;
}