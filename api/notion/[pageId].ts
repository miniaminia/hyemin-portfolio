import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { pageId } = req.query;
  if (!pageId || typeof pageId !== "string") {
    return res.status(400).json({ error: "Missing pageId" });
  }

  try {
    const [page, blocks] = await Promise.all([
      notion.pages.retrieve({ page_id: pageId }),
      notion.blocks.children.list({ block_id: pageId, page_size: 100 }),
    ]);

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json({ page, blocks: blocks.results });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
