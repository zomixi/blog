import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/layout";
import { getRepositoryIssue, getRepositoryIssues } from "../../lib/github";
import { IssueType } from "../../types";

const Post: NextPage<{ dataSource?: IssueType }> = ({ dataSource }) => {
  return (
    <Layout>
      <ReactMarkdown>{dataSource?.body || ""}</ReactMarkdown>
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
  let post: IssueType | null = null;

  if (params?.number) {
    const issue = await getRepositoryIssue(Number(params.number));

    const { number, title, url, created_at, updated_at, body } = issue;

    post = {
      number,
      title,
      url,
      created_at,
      updated_at,
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
