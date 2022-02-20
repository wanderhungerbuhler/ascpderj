import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Roboto:wght@400;900&display=swap" rel="stylesheet" />
          {/* <meta name="description" content="IR Cuidadores Valorizando os Cuidadores - visa visa garantir a Dedução do Imposto de Renda para as famílias que contratam Cuidadores de Idoso e Cuidadores de Pessoas com Deficiência." />

          <meta name="keywords" content="ir cuidadores, imposto de renda cuidadores, cuidadores rj, rio de janeiro
            cuidadores rio de janeiro, imposto de renda para cuidadores, rj cuidadores, ir cuidadores, valorizando os cuidadores" />
          <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />

          <meta name="author" content="WHF - Web Designer & Designer Gráfico" />
          <meta name="reply-to" content="contato@whfdev.com.br" />
          <meta property="business:contact_data:street_address" content="" />
          <meta property="business:contact_data:locality" content="" />
          <meta property="business:contact_data:postal_code" content="" />
          <meta name="author" content="Wander Hungerbühler" />

          <meta name="MobileOptimized" content="320" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="theme-color" content="#407BFF" />
          <meta name="msapplication-TileColor" content="#407BFF" />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="google" content="notranslate" />

          <meta property="og:title" content="IR Cuidadores Valorizando os Cuidadores" />
          <meta property="og:description" content="IR Cuidadores visa visa garantir a Dedução do Imposto de Renda para as famílias que contratam Cuidadores de Idoso e Cuidadores de Pessoas com Deficiência." />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="IR Cuidadores Valorizando os Cuidadores" />
          <meta property="og:image" content="" />
          <meta property="og:image:secure_url" content="" />
          <meta property="og:image:alt" content="Thumbnail" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:title" content="IR Cuidadores Valorizando os Cuidadores" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@otavioleite" />
          <meta name="twitter:creator" content="@otavioleite" />
          <meta name="twitter:image" content="" />
          <meta name="twitter:image:src" content="" />
          <meta name="twitter:image:alt" content="Thumbnail" />
          <meta name="twitter:image:width" content="1200" />
          <meta name="twitter:image:height" content="620" />

          <meta name="google-site-verification" content="4h8nn5QOEMPrrZxiZhx-WAySyr6IZmJa-qDLht3kZNs" />

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-195481928-1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-195481928-1');
              `
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
