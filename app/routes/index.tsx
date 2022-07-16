import { useLoaderData } from "@remix-run/react";
import { getDOM, getHtml } from "./index.server";

export const loader = async () => {
  const anghamiProfileUrl = "https://play.anghami.com/profile/36944302";
  const html = await getHtml(anghamiProfileUrl);
  const dom = await getDOM(html);

  const firstRecentlyPlayed = dom.querySelector("#section-9 > anghami-list-section > div > div.container-table100 > div");
  const coverArt = firstRecentlyPlayed?.querySelector("a:nth-child(1) > .cell-coverart > div");
  const songName = firstRecentlyPlayed?.querySelector("a:nth-child(1) > .cell-title > span");
  const artist = firstRecentlyPlayed?.querySelector(".cell-artist > a:nth-child(2)");
  const lol1 = coverArt?.getAttribute("style");
  const lol2 = lol1?.replace("background-image: url(\"", "");
  const lol3 = lol2?.replace("\");", "");
  return { coverArt: lol3, songName: songName?.innerHTML, songAuthor: artist?.innerHTML}
};

export default function Index() {
  const res = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <img src={res.coverArt} alt={res.songName} />
      {res.songName}
      {res.songAuthor}
    </div>
  );
}
