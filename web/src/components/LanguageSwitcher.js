import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_LANGUAGE_QUERY, CHANGE_LANGUAGE_MUTATION } from '../queries'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import {
  theme,
  visuallyhidden,
  visuallyhiddenMobile,
  mediaQuery,
} from '../styles'

const link = css`
  font-size: ${theme.font.base};
  color: ${theme.colour.white};
  text-decoration: underline;
  &:visited {
    color: #7834bc;
  }
  &:hover {
    cursor: pointer;
  }
`

const hiddenOnDesktop = css`
  display: none;

  ${mediaQuery.sm(css`
    display: initial;
  `)};
`

export const LanguageSwitcher = () => (
  <section>
    <h2 className={visuallyhidden}>
      <Trans>Language Selection</Trans>
    </h2>
    <Query query={GET_LANGUAGE_QUERY}>
      {({ data: { language } }) => (
        <Mutation mutation={CHANGE_LANGUAGE_MUTATION}>
          {switchLanguage => (
            <a
              tabIndex="0"
              className={link}
              onClick={() => switchLanguage()}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  switchLanguage()
                }
              }}
            >
              {language === 'en' ? (
                <span>
                  <span className={visuallyhiddenMobile}>Français</span>
                  <span className={hiddenOnDesktop} aria-hidden="true">
                    FR
                  </span>
                </span>
              ) : (
                'English'
              )}
            </a>
          )}
        </Mutation>
      )}
    </Query>
  </section>
)
