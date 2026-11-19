/** 文档集合（docs collection）配置选项 */
export interface DocCollection {
  /** MDX 文档根目录，相对于项目根目录 */
  dir: string;
  /** 定义前置数据 (frontmatter) 的 Zod 校验 Schema */
  schema?: unknown;
  /** MDX 编译器模式：'unified'（默认）或 'satteri' */
  compiler?: 'unified' | 'satteri';
  /** 是否开启按需异步加载文档模块 */
  async?: boolean;
  /** 后处理提取选项（如生成预处理 Markdown 与提取引用链接） */
  postprocess?: {
    includeProcessedMarkdown?: boolean | Record<string, unknown>;
    extractLinkReferences?: boolean;
  };
  /** 单独覆盖该集合的 MDX 编译选项 */
  mdxOptions?: Record<string, unknown>;
}

/** 元数据集合（meta collection）配置选项 */
export interface MetaCollection {
  /** `meta.json` / `meta.ts` 根目录 */
  dir: string;
  /** 定义目录元数据的 Zod 校验 Schema */
  schema?: unknown;
}

/** `source.config.ts` 全局配置选项 */
export interface GlobalConfig {
  /** 默认使用的 MDX 编译器模式 */
  compiler?: 'unified' | 'satteri';
  /** 全局 MDX 处理选项（传给 unified 管线） */
  mdxOptions?: Record<string, unknown>;
  /** 全局 Sätteri 处理选项 */
  satteriOptions?: Record<string, unknown>;
  /** 启用的 Fumadocs MDX 插件列表（如 `lastModified`、`jsonSchema`） */
  plugins?: unknown[];
  /** 多工作区子目录配置 */
  workspaces?: Record<string, { dir: string; config?: unknown }>;
}
