import { Octokit } from "@octokit/core";
import { OWNER, REPO } from "../config";

export async function getRepositoryIssues() {
  const octokit = new Octokit();

  const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: OWNER,
    repo: REPO,
  });

  return response.data;
}

export async function getRepositoryIssue(issueNumber: number) {
  const octokit = new Octokit();

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}",
    {
      owner: OWNER,
      repo: REPO,
      issue_number: issueNumber,
    }
  );

  return response.data;
}
