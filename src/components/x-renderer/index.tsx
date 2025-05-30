import { memo } from 'react';
import { ChartType, GPTVis, Treemap, withChartCode } from '@antv/gpt-vis';
import type { ReactNode, HTMLAttributes, ComponentType } from 'react';
import Bar from '../charts/bar'
import Area from '../charts/area'
import Pie from '../charts/pie'
import Radar from '../charts/radar';
import Line from '../charts/line'
import './index.css'
export interface XrendererProps {
  children: string;
  className?: string;
}

interface MarkdownComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

const CodeComponent = withChartCode({
  components: {
    [ChartType.Line]: Line,
    [ChartType.Bar]: Bar,
    [ChartType.Pie]: Pie,
    [ChartType.Radar]: Radar,
    [ChartType.Treemap]: Treemap,
    [ChartType.Area]: Area,
  },
});

const CodeWrapper: ComponentType<MarkdownComponentProps> = (props) => {
  return CodeComponent ? <CodeComponent {...props} /> : <code {...props} />;
};

const NonMemoizedMarkdown = ({ children, className }: XrendererProps) => {
  const processedText = children
    .replace(/\\n/g, '\n')
    .replace(/\n\n/g, '\n \n')
    .replace(/(\w+)：\s*[`]([^`]+)[`]\s*[（(]([^）)]+)[）)]/g, '$1：`$2` ($3)');

  const contentWithFooter = `${processedText}`;

  const components: Record<string, ComponentType<MarkdownComponentProps>> = {
    h1: ({ ...props }) => (
      <h1
        className={className}
        style={{
          color: 'var(--strong-color)',
          borderBottom: '1px solid var(--h1-border-color)',
          paddingBottom: '0.3em',
          marginTop: '24px',
          marginBottom: '16px',
          fontSize: '2em',
          fontWeight: '600',
          lineHeight: '1.25',
        }}
        {...props}
      />
    ),
    h2: ({ ...props }) => (
      <h2
        className={className}
        style={{
          color: 'var(--strong-color)',
          borderBottom: '1px solid var(--h1-border-color)',
          paddingBottom: '0.3em',
          marginTop: '24px',
          marginBottom: '16px',
          fontSize: '1.5em',
          fontWeight: '600',
          lineHeight: '1.25',
        }}
        {...props}
      />
    ),
    h3: ({ ...props }) => (
      <h3
        className={className}
        style={{
          color: 'var(--strong-color)',
          marginTop: '24px',
          marginBottom: '16px',
          fontSize: '1.25em',
          fontWeight: '600',
          lineHeight: '1.25',
        }}
        {...props}
      />
    ),
    h4: ({ ...props }) => (
      <h4
        className={className}
        style={{
          color: 'var(--strong-color)',
          marginTop: '24px',
          marginBottom: '16px',
          fontSize: '1em',
          fontWeight: '600',
          lineHeight: '1.25',
        }}
        {...props}
      />
    ),
    h5: ({ ...props }) => (
      <h5
        className={className}
        style={{
          color: 'var(--strong-color)',
          marginTop: '24px',
          marginBottom: '16px',
          fontSize: '0.875em',
          fontWeight: '600',
          lineHeight: '1.25',
        }}
        {...props}
      />
    ),
    h6: ({ ...props }) => (
      <h6
        className={className}
        style={{
          color: 'var(--h6-color)',
          marginTop: '24px',
          marginBottom: '16px',
          fontSize: '0.85em',
          fontWeight: '600',
          lineHeight: '1.25',
        }}
        {...props}
      />
    ),
    p: ({ style, ...props }) => (
      <p
        className={className}
        style={{
          ...style,
        }}
        {...props}
      />
    ),
    strong: ({ ...props }) => (
      <strong
        className={className}
        style={{ color: 'var(--strong-color)', fontWeight: '600' }}
        {...props}
      />
    ),
    em: ({ ...props }) => <em className={className} {...props} />,
    a: ({ ...props }) => (
      <a
        className={className}
        style={{ color: 'var(--link-color)', textDecoration: 'none' }}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    ul: ({ ...props }) => (
      <ul
        className={className}
        style={{
          paddingLeft: '2em',
          marginBottom: '16px',
          listStyleType: 'disc',
        }}
        {...props}
      />
    ),
    ol: ({ ...props }) => (
      <ol
        className={className}
        style={{
          paddingLeft: '2em',
          marginBottom: '16px',
          listStyleType: 'decimal',
        }}
        {...props}
      />
    ),
    li: ({ ...props }) => (
      <li className={className} style={{ marginBottom: '4px' }} {...props} />
    ),
    pre: ({ ...props }) => (
      <pre
        className={className}
        style={{ marginTop: '0', marginBottom: '16px' }}
        {...props}
      />
    ),
    table: ({ ...props }) => (
      <div
        className={className}
        style={{
          width: '100%',
          overflowX: 'visible',
          marginBottom: '16px',
          borderRadius: '6px',
          border: '1px solid var(--td-border-color)',
        }}
      >
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            minWidth: '100%',
            fontSize: '0.9em',
            tableLayout: 'fixed',
          }}
          {...props}
        />
      </div>
    ),
    thead: ({ ...props }) => (
      <thead
        className={className}
        style={{
          backgroundColor: 'var(--thead-bg-color)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
        {...props}
      />
    ),
    tbody: ({ ...props }) => <tbody className={className} {...props} />,
    tr: ({ ...props }) => {
      const rowIndex = props.children && Array.isArray(props.children)
        ? parseInt(props.children[0]?.key?.toString().split('-tr-')[1] || '0')
        : 0;

      return (
        <tr
          className={className}
          style={{
            borderTop: '1px solid var(--tr-border-color)',
            backgroundColor: rowIndex % 2 === 1 ? 'var(--thead-bg-color)' : 'transparent',
          }}
          {...props}
        />
      );
    },
    th: ({ ...props }) => (
      <th
        className={className}
        style={{
          padding: '12px 16px',
          border: '1px solid var(--td-border-color)',
          fontWeight: '600',
          textAlign: 'left',
          whiteSpace: 'nowrap',
        }}
        {...props}
      />
    ),
    td: ({ ...props }) => (
      <td
        className={className}
        style={{
          padding: '10px 16px',
          border: '1px solid var(--td-border-color)',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: '1.5',
          wordBreak: 'break-word',
        }}
        {...props}
      />
    ),
    hr: ({ ...props }) => (
      <hr
        className={className}
        style={{
          height: '0.25em',
          padding: '0',
          margin: '24px 0',
          backgroundColor: 'var(--hr-color)',
          border: '0',
        }}
        {...props}
      />
    ),
    blockquote: ({ ...props }) => (
      <blockquote
        className={className}
        style={{
          padding: '0 1em',
          color: 'var(--blockquote-text-color)',
          borderLeft: '0.25em solid var(--blockquote-border-color)',
          margin: '0 0 16px 0',
        }}
        {...props}
      />
    ),
    code: CodeWrapper,
  };

  return (
    <GPTVis components={components}>
      {contentWithFooter}
    </GPTVis>
  );
};

export const Xrenderer = memo(NonMemoizedMarkdown, function arePropsEqual(prevProps, nextProps) {
  return prevProps.children === nextProps.children && prevProps.className === nextProps.className;
});
  