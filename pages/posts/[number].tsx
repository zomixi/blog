import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/layout";
import { getRepositoryIssue, getRepositoryIssues } from "../../lib/github";
import { PostType } from "../../types";

const Post: NextPage<{ dataSource?: PostType }> = ({ dataSource }) => {
  if (!dataSource) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <Head>
        <title>{dataSource.title}</title>
        <meta name="description" content={dataSource.title} />
        <meta
          name="Keywords"
          content={dataSource.labels
            ?.map((label) => (typeof label === "string" ? label : label.name))
            .join(",")}
        />
      </Head>
      <article className="markdown-body">
        <h1>{dataSource.title}</h1>
        <ReactMarkdown>{dataSource.body || ""}</ReactMarkdown>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const issues = await getRepositoryIssues();

  return {
    paths: issues.map((issue) => ({
      params: { number: String(issue.number) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let post: PostType | null = null;

  if (params?.number) {
    const issue = await getRepositoryIssue(Number(params.number));

    const { number, title, url, created_at, updated_at, body, labels } = issue;

    post = {
      number,
      title,
      url,
      created_at,
      updated_at,
      labels,
      body,
    };
  }

  return {
    props: {
      dataSource: post,
    },
  };
};

export default Post;
