# x-renderer

一个支持图表渲染的React Markdown渲染组件。

## 安装

```bash
npm install x-renderer
# 或
yarn add x-renderer
```

## 使用方法

```jsx
import { Xrenderer } from 'x-renderer';

function App() {
  const markdown = `
# 标题

这是一段普通的文本。

## 图表示例

\`\`\`chart
{
  "type": "line",
  "data": {
    "labels": ["一月", "二月", "三月", "四月", "五月"],
    "datasets": [{
      "label": "销售额",
      "data": [12, 19, 3, 5, 2]
    }]
  }
}
\`\`\`
  `;

  return (
    <div>
      <Xrenderer>{markdown}</Xrenderer>
    </div>
  );
}
```

## 特性

- 支持标准Markdown语法
- 支持图表渲染(基于@antv/gpt-vis)
- 支持自定义样式
- TypeScript支持

## 支持的图表类型

- Line (折线图)
- Bar (柱状图)
- Pie (饼图)
- Radar (雷达图)
- Treemap (树图)
- Area (面积图)

## Props

| 属性名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| children | string | 是 | Markdown文本内容 |
| className | string | 否 | 自定义CSS类名 |

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build
```

## License

MIT
