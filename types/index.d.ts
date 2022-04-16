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
  /** Labels to associate with this issue */
  labels?: (
    | string
    | {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string | null;
        color?: string | null;
        default?: boolean;
      }
  )[];
  created_at?: string;
  updated_at?: string;
};
