import type { APIRoute } from 'astro';
import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

const server = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  // 中文内容默认使用简体中文分词（orama 对中文的英文模式仍可基础切分）
  language: 'multilingual',
});

export const GET: APIRoute = () => server.staticGET();
