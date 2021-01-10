import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/layout";

const FirstPost = () => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <div>
        <h1>First Post</h1>
        Back to{" "}
        <Link href="/">
          <a>home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default FirstPost;
