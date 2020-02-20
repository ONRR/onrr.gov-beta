import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { MDXProvider } from '@mdx-js/react'
import * as components from './.cache/components'
import CodeBlock from './src/components/layouts/CodeBlock/CodeBlock.js'
import {
  Grid,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core'
import { Link } from 'gatsby'
import { client } from './src/apollo/client'
import { StoreProvider } from './src/store'
import { GlossaryProvider, DataFilterProvider } from './src/stores'

import ErrorBoundary from './src/components/ErrorBoundary'

const mdxComponents = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  Grid,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  a: props => (props.href &&
    (props.href.charAt(0) === '#' || props.href.includes('http') || props.href.includes('mailto'))) ? <a {...props} /> : <Link to={props.href} {...props} />,
  h1: props => <Typography variant="h1" {...props} />,
  h2: props => <Typography variant="h2" {...props} />,
  h3: props => <Typography variant="h3" {...props} />,
  p: props => <Typography variant="body1" paragraph={true} {...props} />,
  ul: props => <ul style={{ paddingInlineStart: '22.5px' }} {...props} />,
  li: props => <li style={{ fontSize: '1.375rem' }}><Typography variant='subtitle1' {...props} /></li>,
  ...components
}

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <DataFilterProvider>
        <GlossaryProvider>
          <StoreProvider>
            <MDXProvider components={ mdxComponents }>
              {element}
            </MDXProvider>
          </StoreProvider>
        </GlossaryProvider>
      </DataFilterProvider>
    </ApolloProvider>
  </ErrorBoundary>
)
