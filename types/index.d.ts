import { Key } from "react";

export type IssueType = {
  /** Title of the issue */
  title: string;
  /** Number uniquely identifying the issue within its repository */
  number: number;
  /** URL for the issue */
  url?: string;
  /** Contents of the issue */
  body?: string | null;
  created_at?: string;
  updated_at?: string;
};
