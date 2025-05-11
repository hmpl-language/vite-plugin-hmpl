import { Plugin } from "vite";

export interface HmplOptions {
  memo?: boolean;
  sanitize?: boolean;
  autoBody?: boolean | { formData?: boolean };
  allowedContentTypes?: string[] | ["*"];
  disallowedTags?: Array<"script" | "style" | "iframe">;

  /**
   * Glob patterns for files to include
   */
  include?: string | string[];

  /**
   * Glob patterns for files to exclude
   */
  exclude?: string | string[];
}

export default function hmplPlugin(options?: HmplOptions): Plugin;
