/** `githubReleases()` 查询选项 */
export interface GitHubReleasesOptions {
  /** GitHub 仓库所有者用户名或组织名 */
  owner: string;
  /** GitHub 仓库名称 */
  repo: string;
  /** GitHub API 访问令牌（建议设置以避免限流） */
  token?: string;
  /** 页码（从 1 开始） */
  page?: number;
  /** 每页返回的发布版本数量 @defaultValue 10 */
  perPage?: number;
}

/** 单条更新日志条目数据结构 */
export interface ChangelogEntry {
  /** 版本号或标题 */
  title: string;
  /** 发布日期 */
  date: Date | string;
  /** 渲染后的版本更新内容（React 节点或 Markdown） */
  content: unknown;
  /** 关联 Release 页面链接 */
  url?: string;
}
