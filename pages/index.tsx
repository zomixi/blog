import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { OWNER } from "../config";
import { getRepositoryIssues } from "../lib/github";
import { PostType } from "../types";

const Home: NextPage<{ posts: PostType[]; owner: string }> = ({
  posts = [],
  owner = "",
}) => {
  return (
    <Layout>
      <Head>
        <title>{`${owner}'s blog`}</title>
        <meta name="description" content={`A blog site belong to ${owner}`} />
        <meta name="Keywords" content={[owner, "blog"].join(",")} />
      </Head>

      <article className="markdown-body">
        <div
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: 48,
            marginBottom: 48,
          }}
        >
          {`${owner}'s blog`}
        </div>

        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <Link href={`/posts/${post.number}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export const getStaticProps: GetStaticProps = async () => {
  const issues = await getRepositoryIssues();
  const posts: PostType[] = issues.map((issue) => {
    const { number, title } = issue;

    return {
      number,
      title,
    };
  });

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      owner: OWNER,
    },
  };
};

export default Home;
