import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getRepositoryInfo, getRepositoryIssues } from "../lib/github";
import { IssueType } from "../types";

const Home: NextPage<{ posts: IssueType[]; owner: string }> = ({
  posts = [],
  owner = "",
}) => {
  return (
    <Layout>
      <Head>
        <title>{`${owner}'s blog`}</title>
        <meta name="description" content={`A blog site belong to ${owner}`} />
        <meta name="Keywords" content={[owner, ""].join(",")} />
      </Head>

      <article className="markdown-body">
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
  const repository = await getRepositoryInfo();
  const issues = await getRepositoryIssues();
  const posts: IssueType[] = issues.map((issue) => {
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
      owner: repository.owner,
    },
  };
};

export default Home;
