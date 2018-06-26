import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { theme, mediaQuery, Content } from '../styles'
import PhaseBanner from './PhaseBanner'
import PageHeader from './PageHeader'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import { ErrorBoundary } from '@cdssnc/gcui'
import { ErrorPageContent } from '../pages/ErrorPage'
import { initGA, logPageView } from '../utils/analytics'

injectGlobal`
  html, body {
    padding: 0;
    margin: 0;
    background: ${theme.colour.white};
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 18px;
    box-sizing: border-box;

    ${mediaQuery.sm(css`
      font-size: ${theme.font.md};
    `)};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul, span {
    margin: 0;
    padding: 0;
    line-height: 1.4;
  }

  .bannerLink:visited {
    color: white;
  }

  a:focus {
    outline-offset: 2px;
    outline: 3px solid #ffbf47;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  #paperFileNumber-details, #fullName-details {
   margin-top: 0rem;
  }

  hr {
   border: 0;
   height: 1px;
   background: #DBDBDB;
  }

  .chevron-link path {
    fill: #1c2bf0;
  }

  .chevron-link:visited path {
    fill: #572c94;
  }
`

class Layout extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production' && process.env.RAZZLE_GA_ID) {
      if (!window.GA_INITIALIZED) {
        initGA(process.env.RAZZLE_GA_ID)
        window.GA_INITIALIZED = true
      }
      logPageView()
    }
  }

  render() {
    return (
      <div>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            if (!window || !window.Raven) return
            window.Raven.captureException(error, {
              extra: errorInfo,
            })
          }}
          render={() => <ErrorPageContent />}
        >
          <FederalBanner />
          <div role="banner">
            <PageHeader headerClass={this.props.headerClass}>
              <PhaseBanner phase="beta" color="white">
                <Trans>
                  This is a new service, help us improve by{' '}
                  <a
                    className="bannerLink"
                    href="https://docs.google.com/forms/d/1a1bJDF4BmepyMJaYubOSg3IiW4kjCqFrAu_0QXLYQ8Q/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    sending your feedback
                  </a>
                </Trans>
              </PhaseBanner>
              <Trans>Request a new Canadian Citizenship appointment</Trans>
            </PageHeader>
          </div>
          <main role="main">
            <Content className={this.props.contentClass || ''}>
              {this.props.children}
            </Content>
          </main>
          <Footer topBarBackground="black" />
        </ErrorBoundary>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  contentClass: PropTypes.string,
  headerClass: PropTypes.string,
}

export default Layout
