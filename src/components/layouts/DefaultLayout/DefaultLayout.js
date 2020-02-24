/**
 * Default Layout component
 *
 */
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import {
  CssBaseline,
  Container,
  Grid
} from '@material-ui/core'

import { Banner } from '../Banner'
import { Header } from '../Header'
import { Footer } from '../Footer'

import PageToc from '../../navigation/PageToc'

import GlossaryDrawer from '../GlossaryDrawer/GlossaryDrawer'

const useStyles = makeStyles(theme => (
  {
    '@global': {
      p: {
        margin: '0.5rem 0rem'
      },
      hr: {
        borderWidth: '0px 0px 10px 0px',
        borderColor: theme.palette.secondary.main,
        marginBottom: '1rem',
      },
      ul: {
        paddingInlineStart: '22.5px'
      },
      'ul ul': {
        listStyleType: 'square'
      },
      a: {
        color: theme.palette.text.secondary,
        textDecoration: 'underline',
        '&:hover': {
          textDecoration: 'none',
        }
      },
      h1: { ...theme.typography.h1 },
      h2: { ...theme.typography.h2 },
      h3: { ...theme.typography.h3 },
      h4: { ...theme.typography.h4 },
      h5: { ...theme.typography.h5 },
      h6: { ...theme.typography.h6 },
    },
    img: {
      width: '100%'
    },
    skipNav: {
      position: 'absolute',
      top: '-1000px',
      left: '-1000px',
      height: '1px',
      width: '1px',
      textAlign: 'left',
      overflow: 'hidden',

      '&:active': {
        left: '0',
        top: '0',
        padding: '5px',
        width: 'auto',
        height: 'auto',
        overflow: 'visible'
      },
      '&:focus': {
        left: '0',
        top: '0',
        padding: '5px',
        width: 'auto',
        height: 'auto',
        overflow: 'visible'
      },
      '&:hover': {
        left: '0',
        top: '0',
        padding: '5px',
        width: 'auto',
        height: 'auto',
        overflow: 'visible'
      }
    }
  })
)

const DefaultLayout = ({ includeToc, children }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          version
        }
      }
    }
  `)

  console.log(includeToc)

  return (
    <React.Fragment>
      <a href="#main-content" className={classes.skipNav}>Skip to main content</a>
      <Banner />
      <Header siteTitle={data.site.siteMetadata.title} />
      <GlossaryDrawer />
      <CssBaseline />
      <main id='main-content'>
        {includeToc
          ? <Container maxWidth="lg" component="section">
            <Grid container>
              <Grid item xs={12} sm={3}>
                <PageToc scrollOffset={190}></PageToc>
              </Grid>
              <Grid item xs={12} sm={9}>
                {children}
              </Grid>
            </Grid>
          </Container>
          : <React.Fragment>{ children }</React.Fragment>
        }
      </main>
      <Footer version={data && data.site.siteMetadata.version} />
    </React.Fragment>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
