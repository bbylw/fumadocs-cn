/** OpenAPI API 页面组件属性 */
export interface PageOperationProps {
  /** 要展示的 API 路径（如 `/pets`） */
  path: string;
  /** HTTP 请求方法（如 `get`、`post`） */
  method: string;
  /** 是否以 Webhook 形式渲染 */
  isWebhook?: boolean;
}

/** OpenAPI 单个操作元数据 */
export interface OperationInfo {
  /** HTTP 方法（大写） */
  method: string;
  /** 接口路径 */
  path: string;
  /** 操作摘要标题 */
  summary?: string;
  /** 操作详细描述 */
  description?: string;
  /** 所属标签分类 */
  tags?: string[];
  /** 是否标记为已弃用 */
  deprecated?: boolean;
}

/** 用于文档展示的 Schema 结构数据 */
export interface SchemaData {
  /** Schema 节点类型（object、array、string 等） */
  type: string;
  /** 字段名称或标题 */
  title?: string;
  /** 字段描述信息 */
  description?: string;
  /** 是否为必填字段 */
  required?: boolean;
  /** 对象子属性映射 */
  properties?: Record<string, SchemaData>;
}
