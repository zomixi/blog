import { Octokit } from "@octokit/core";
import simpleGit from "simple-git";
import packageJson from "../package.json";

const git = simpleGit();

export async function getRepositoryInfo() {
  const remotes = await git.getRemotes(true);
  const remote = remotes[0]?.refs.fetch;
  const repositoryUrl =
    (packageJson as any).repository?.url || (packageJson as any).repository;

  let owner = "";
  let repo = "";

  if (remote && typeof remote === "string") {
    const slices = remote.split("/");
    owner = slices[slices.length - 2];
    repo = slices[slices.length - 1].replace(".git", "");
  }

  if (repositoryUrl && typeof repositoryUrl === "string") {
    const slices = repositoryUrl.split("/");
    owner = slices[slices.length - 2];
    repo = slices[slices.length - 1];
  }

  if (owner && repo) {
    return {
      owner,
      repo,
    };
  } else {
    return Promise.reject(new Error("can't found github info"));
  }
}

export async function getRepositoryIssues() {
  const octokit = new Octokit();
  const repository = await getRepositoryInfo();
  const { owner, repo } = repository;

  const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
  });

  return response.data;
}

export async function getRepositoryIssue(issueNumber: number) {
  const octokit = new Octokit();
  const repository = await getRepositoryInfo();
  const { owner, repo } = repository;

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}",
    {
      owner,
      repo,
      issue_number: issueNumber,
    }
  );

  return response.data;
}
