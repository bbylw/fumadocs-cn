import { source } from '@/lib/source';
import type { Graph } from '@/components/preview/graph-view';

/** Build an in-memory link graph of documentation pages for GraphView */
export async function buildGraph(): Promise<Graph> {
  const graph: Graph = { links: [], nodes: [] };
  const pages = source.getPages().filter((page) => {
    const fw = page.params?.framework;
    return fw === undefined || fw === 'next';
  });

  await Promise.all(
    pages.map(async (page) => {
      graph.nodes.push({
        id: page.url,
        url: page.url,
        text: page.data.title,
        description: page.data.description,
      });

      const data = page.data as { extractedReferences?: { href: string }[] };
      for (const ref of data.extractedReferences ?? []) {
        const refPage = source.getPageByHref(ref.href);
        if (!refPage) continue;

        graph.links.push({
          source: page.url,
          target: refPage.page.url,
        });
      }
    }),
  );

  return graph;
}
