/** the source the figure edits: a component's props, `color` deprecated by the edit */
export const FILE = 'button.tsx';
export const EDIT = '  /** @deprecated Use `className`. */';
export const SOURCE = `export interface ButtonProps {
  /** The text inside the button. */
  label: string;
  /** Renders a link instead. */
  href?: string;
${EDIT}
  color?: string;
  /** Called when it is pressed. */
  onPress?: () => void;
}`;

/** the source as it was before the edit, and the line the edit adds */
export const BEFORE = SOURCE.replace(`${EDIT}\n`, '');
export const EDIT_LINE = SOURCE.split('\n').indexOf(EDIT);

/** the type's name in the source */
export const TYPE_NAME = 'ButtonProps';

/** the page the source documents */
export const PAGE = { title: 'Button', description: '按钮组件，传入 href 时渲染为链接。' };

/** the component's releases, newest first: the first ships the edit */
export const RELEASES = [
  { title: '2.0.0', description: '废弃 color 属性，请改用 className。' },
  { title: '1.2.0', description: '新增 href 属性以渲染链接。' },
];

/**
 * What the source makes, in the order its thread reaches them, one clockwise loop round the desk:
 * each window, its title, and the status it reports as it pops.
 */
export const OUTPUTS = [
  { id: 'props', title: 'ButtonProps', status: '正在生成 ButtonProps' },
  { id: 'page', title: 'button.mdx', status: '正在渲染 button.mdx' },
  { id: 'og', title: 'og.png', status: '正在绘制 og.png' },
  { id: 'llms', title: 'llms.txt', status: '正在写入 llms.txt' },
  { id: 'releases', title: '发布记录', status: '正在读取发布记录' },
] as const;

export type Output = (typeof OUTPUTS)[number]['id'];
