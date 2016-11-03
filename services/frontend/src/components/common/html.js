import React, { Component } from 'react';
import _ from 'underscore';

import { propTypes, defaultProps } from 'lib/decorators/generic';

import { ASSETS_FQDN, API_FQDN, WS_FQDN } from '../../../config/environment';

@propTypes(({ string, shape, arrayOf, element, object }) => ({
  title: string.isRequired,
  description: string.isRequired,
  image: string,
  icon: string,
  lang: string,
  twitter: shape({
    title: string,
    description: string,
    image: string,
    card: string,
    site: string,
    creator: string
  }),
  openGraph: shape({
    title: string,
    description: string,
    image: string,
    type: string,
    audio: string,
    video: string,
    locale: string,
    localeAlternates: arrayOf(string),
    siteName: string,
    url: string
  }),
  state: object.isRequired,
  content: string.isRequired,
  style: string.isRequired
}))
@defaultProps(() => ({
  title: 'Demo App',
  description: 'A demo application',
  lang: 'en-us',
  twitter: {},
  openGraph: {}
}))
export default class Html extends Component {
  constructor (props, context) {
    super(props, context);
  }
  _renderHead () {
    return (
      <head>
        {/* Main */}
        <meta charSet="utf-8" />
        <meta
          httpEquiv="content-type"
          content="text/html; charset=utf-8"
        />
        <meta
          httpEquiv="x-ua-compatible"
          content="ie=edge"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{this.props.title}</title>
        <meta
          name="description"
          content={this.props.description}
        />
        <link
          rel="icon"
          type="image/png"
          href={this.props.icon}
        />


        {/* Open Graph */}
        <meta
          name="og:title"
          property="og:title"
          content={this.props.openGraph.title || this.props.title}
        />
        <meta
          name="og:description"
          property="og:description"
          content={this.props.openGraph.description || this.props.description}
        />
        {this.props.openGraph.image || this.props.image ? (
        <meta
          name="og:image"
          property="og:image"
          content={this.props.openGraph.image || this.props.image}
        />
        ) : null}
        <meta
          name="og:type"
          property="og:type"
          content={this.props.openGraph.type || 'website'}
        />
        {this.props.openGraph.audio ? (
        <meta
          name="og:audio"
          property="og:audio"
          content={this.props.openGraph.audio}
        />
        ) : null}
        {this.props.openGraph.video ? (
        <meta
          name="og:video"
          property="og:video"
          content={this.props.openGraph.video}
        />
        ) : null}
        <meta
          name="og:locale"
          property="og:locale"
          content={this.props.openGraph.locale || 'en_US'}
        />
        {_.isArray(this.props.openGraph.localeAlternates) ? (
        this.props.openGraph.localeAlternates.map((locale) => (<meta
          name="og:locale:alternate"
          property="og:locale:alternate"
          content={locale}
        />))
      ) : null}
        <meta
          name="og:site_name"
          property="og:site_name"
          content={this.props.openGraph.siteName || this.props.title}
        />


        {/* Twitter */}
        <meta
          name="twitter:title"
          property="twitter:title"
          content={this.props.twitter.title || this.props.title}
        />
        <meta
          name="twitter:description"
          property="twitter:description"
          content={this.props.twitter.description || this.props.description}
        />
        {this.props.twitter.image || this.props.image ? (
        <meta
          name="twitter:image"
          property="twitter:image"
          content={this.props.twitter.image || this.props.image}
        />
        ) : null}
        {this.props.twitter.card ? (
        <meta
          name="twitter:card"
          property="twitter:card"
          content={this.props.twitter.card}
        />
        ) : null}
        {this.props.twitter.site ? (
        <meta
          name="twitter:site"
          property="twitter:site"
          content={this.props.twitter.site}
        />
        ) : null}
        {this.props.twitter.creator ? (
        <meta
          name="twitter:creator"
          property="twitter:creator"
          content={this.props.twitter.creator}
        />
        ) : null}


        {/* Preloads */}
        <style id="css" dangerouslySetInnerHTML={{__html: this.props.style}}/>
      </head>
    );
  }
  render () {
    console.log(ASSETS_FQDN);
    const js = `
      window.cfg = {
        API_FQDN: ${JSON.stringify(API_FQDN)},
        WS_FQDN: ${JSON.stringify(WS_FQDN)},
        ASSETS_FQDN: ${JSON.stringify(ASSETS_FQDN)}
      };
      window.__INITIAL_STATE__=${JSON.stringify(this.props.state)}
    `;
    return (
      <html
        lang={this.props.lang}>
        {this._renderHead()}
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: this.props.content }} />
          <script dangerouslySetInnerHTML={{ __html: js}}></script>
          <script src={`${ASSETS_FQDN}/client.js?t=${__BUILD_STAMP__}`}></script>
        </body>
      </html>
    );
  }
}
