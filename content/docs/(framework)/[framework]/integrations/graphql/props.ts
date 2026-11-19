/** GraphQL 代码示例数据 */
export interface CodeUsageData {
  /** GraphQL 查询或变更文档字符串 */
  query: string;
  /** 变量对象映射 */
  variables?: Record<string, unknown>;
}

/** GraphQL 操作详细信息 */
export interface OperationInfo {
  /** 操作类型（query / mutation / subscription） */
  type: 'query' | 'mutation' | 'subscription';
  /** 操作名称 */
  name: string;
  /** 操作描述文案 */
  description?: string;
  /** 是否已弃用 */
  deprecationReason?: string;
}

/** GraphQL 操作调用示例 */
export interface OperationExample {
  /** 示例名称 */
  name: string;
  /** 示例 GraphQL 查询语句 */
  code: string;
}

/** GraphQL 命名类型信息 */
export interface NamedTypeInfo {
  /** 类型名称 */
  name: string;
  /** 类型种类（OBJECT / INPUT_OBJECT / ENUM / SCALAR 等） */
  kind: string;
  /** 类型描述 */
  description?: string;
}

/** 类型在各操作中的引用关系 */
export interface TypeUsages {
  /** 引用该类型的操作列表 */
  operations: OperationInfo[];
  /** 引用该类型的字段列表 */
  fields: string[];
}

/** GraphQL 交互式调试台配置 */
export interface Playground {
  /** 是否启用调试台 @defaultValue true */
  enabled?: boolean;
  /** 请求服务端点 URL */
  endpoint?: string;
}

/** GraphQL Subscription 订阅事件处理器 */
export interface SubscriptionHandlers {
  /** 收到推送消息时的回调 */
  onData?: (data: unknown) => void;
  /** 发生传输错误时的回调 */
  onError?: (error: unknown) => void;
  /** 订阅结束回调 */
  onComplete?: () => void;
}
