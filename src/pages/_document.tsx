import { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import Document from 'next/document';
import { enableNextSsr } from "@uniformdev/context-next";
import { createUniformContext } from "../lib/uniform/createUniformContext";

export default class MyDocument extends Document {
  // required to enable SSR personalization
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const serverTracker = createUniformContext(ctx);
    enableNextSsr(ctx, serverTracker);
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content="EcoQuest - Sustainable Travel Adventures" />
          <meta name="keywords" content="travel, eco-friendly, sustainable, adventure, tours" />
          <meta name="author" content="EcoQuest" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
