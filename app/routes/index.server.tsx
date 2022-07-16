import { JSDOM } from "jsdom";
import playwright from "playwright";

const inMemoryCache: { [key: string]: string } = {};

const convertHtmlToJsDomDocument = async (html: string) =>
  new JSDOM(html).window.document;

export async function getDOM(html: string) {
  const dom = convertHtmlToJsDomDocument(html);
  return dom;
}

export async function getHtml(url: string) {
  const browser = await playwright.chromium.launch();

  console.log(inMemoryCache);
  if (!inMemoryCache[url]) {
    console.log("SCRAPING");
    const page = await browser.newPage();
    page.setViewportSize({ width: 600, height: 3000 });
    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForSelector("#section-9 > section-title > div > span > h2");

    const content = await page.content();

    inMemoryCache[url] = content;
    return content;
  } else {
    return inMemoryCache[url];
  }
}
