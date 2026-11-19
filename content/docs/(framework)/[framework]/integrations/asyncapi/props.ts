/** AsyncAPI 代码示例生成器上下文数据 */
export interface CodeUsageData {
  /** 目标频道名称 */
  channel: string;
  /** 操作类型（publish / subscribe / send / receive） */
  action: string;
  /** 示例消息负载 */
  payload?: unknown;
}

/** AsyncAPI 操作基础信息 */
export interface OperationInfo {
  /** 操作唯一标识 ID */
  id: string;
  /** 关联频道地址 */
  channel: string;
  /** 操作摘要 */
  summary?: string;
  /** 操作详细说明 */
  description?: string;
}

/** AsyncAPI 消息定义 */
export interface OperationMessage {
  /** 消息名称 */
  name?: string;
  /** 消息标题 */
  title?: string;
  /** 载荷内容格式（Content-Type） */
  contentType?: string;
  /** 载荷 JSON Schema 描述 */
  payload?: Record<string, unknown>;
}

/** WebSocket 调试台配置 */
export interface Playground {
  /** 是否启用交互式调试台 @defaultValue true */
  enabled?: boolean;
  /** 默认连接的服务器 URL */
  serverUrl?: string;
}

/** 调试台传输层适配器接口 */
export interface PlaygroundTransport {
  /** 建立连接并监听消息 */
  connect: (target: ConnectTarget) => void | Promise<void>;
  /** 发送测试消息负载 */
  send: (payload: string) => void | Promise<void>;
  /** 关闭连接 */
  disconnect: () => void;
}

/** WebSocket 连接目标信息 */
export interface ConnectTarget {
  /** 连接地址 URL */
  url: string;
  /** 协议名称（ws / wss） */
  protocol?: string;
  /** 自定义请求头或查询参数 */
  headers?: Record<string, string>;
}
