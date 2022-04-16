import { Octokit } from "@octokit/core";
import simpleGit from "simple-git";

export async function getRepositoryInfo() {
  const git = simpleGit();
  const remotes = await git.getRemotes(true);
  const remote = remotes[0]?.refs.fetch;

  if (remote && typeof remote === "string") {
    const slices = remote.split("/");
    const owner = slices[slices.length - 2];
    const repo = slices[slices.length - 1].replace(".git", "");

    return {
      owner,
      repo,
    };
  }

  return Promise.reject(new Error("can't found repository info"));
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
