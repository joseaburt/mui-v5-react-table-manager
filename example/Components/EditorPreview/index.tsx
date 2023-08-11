import { useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown/';
import Typography from '@mui/material/Typography';
import { Box, SxProps, Theme } from '@mui/material';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import lightTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/vs';
import darkTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl';

type Props = {
  children: string;
  sx?: SxProps<Theme>;
  textSx?: SxProps<Theme>;
  codeSx?: SxProps<Theme>;
  textClassName?: string;
  codeTheme?: 'light' | 'dark';
};

export default function EditorPreview({ children, sx, codeSx, codeTheme, textSx }: Props): JSX.Element {
  const s = codeTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Box className="post-text" sx={sx}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: function Table({ children }) {
            const head = children[0];
            const body = children[1];

            return (
              <Box
                component="table"
                sx={{
                  width: '100%',
                  marginTop: '1.2rem',
                  textAlign: 'left',
                  borderRight: '1px solid #000 !important',
                  borderTop: '1px solid #000 !important',
                  '* tr': {
                    borderBottom: '1px solid #000 !important',
                  },
                  '* th': {
                    background: '#ccccd37e',
                    borderLeft: '1px solid #000 !important',
                    borderBottom: '1px solid #000 !important',
                  },
                  '* th, * td': {
                    padding: '0.6rem',
                    borderLeft: '1px solid #000 !important',
                    borderBottom: '1px solid #000 !important',
                  },
                }}
              >
                {head}
                {body}
              </Box>
            );
          },
          a: function Link({ children, href }) {
            return (
              <a className="underline text-blue-500" rel="noreferrer" href={href} target="_blank">
                {children[0]}
              </a>
            );
          },
          mark: function Mark({ children }) {
            return (
              <>
                <Box component="mark" sx={{ borderRadius: '4px' }}>
                  {children}
                </Box>
              </>
            );
          },
          ul({ children }) {
            return (
              <Box
                sx={{
                  '& li': {
                    fontSize: '1.2rem',
                    fontWeight: '500',
                  },
                }}
              >
                {children}
              </Box>
            );
          },
          h1({ children }) {
            return (
              <Typography variant="h1" fontSize="3.5rem" fontWeight="bolder">
                {String(children).replace(/\n$/, '')}
              </Typography>
            );
          },
          blockquote({ children }) {
            return (
              <Box sx={{ borderLeft: '4px solid #494c8f' }}>
                <Typography margin="40px 10px" variant="h1" fontSize="1.5rem" fontWeight="500" fontStyle="italic" color="#494c8f">
                  {children}
                </Typography>
              </Box>
            );
          },
          iframe({ src }) {
            if (src?.startsWith('https://codesandbox.io/embed')) {
              return <iframe width="100%" title={src} height="600px" src={src} style={{ top: 0, right: 10, border: 'none', borderRadius: 6 }} />;
            }

            return (
              <Box sx={{ borderRadius: 6, position: 'relative', paddingTop: '56.25%', margin: '1rem 0' }}>
                <iframe width="100%" title={src} height="100%" src={src} style={{ position: 'absolute', top: 0, left: 0, border: 'none', borderRadius: 6 }} />
              </Box>
            );
          },
          img({ src, alt, ...res }) {
            return (
              <Box sx={{ borderRadius: 6 }}>
                <img alt={alt} width="100%" height="100%" src={src} style={{ border: 'none', borderRadius: 6 }} />
              </Box>
            );
          },
          code({ node, inline, className, children, style, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Box
                sx={{
                  borderRadius: 2,
                  margin: '1rem 0',
                  '& *': {
                    borderRadius: '6px',
                    fontSize: '1rem !important',
                    lineHeight: '22px !important',
                    fontFamily: `'Fira Code', monospace`,
                    ...(codeSx as any),
                  },
                  '& div': {
                    padding: '0px 0px',
                    margin: '0 !important',
                  },
                }}
              >
                <SyntaxHighlighter PreTag="div" language={match[1]} style={s} {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          p({ children }: CodeProps) {
            const text: string = `${children[0]}`;
            return <Typography sx={textSx}>{text}</Typography>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
}

export type AnchorAPI = {
  id: string | undefined;
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
  handleClick: (event: any) => void;
};

export const useAnchor = (): AnchorAPI => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const open = Boolean(anchorEl);
  const id = open ? 'inlineselectPopover' : undefined;
  return { id, open, anchorEl, handleClick, handleClose };
};
