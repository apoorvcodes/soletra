export function codeblock(
    language:
        | "asciidoc"
        | "autohotkey"
        | "bash"
        | "coffeescript"
        | "cpp"
        | "cs"
        | "css"
        | "diff"
        | "fix"
        | "glsl"
        | "ini"
        | "json"
        | "md"
        | "ml"
        | "prolog"
        | "py"
        | "tex"
        | "xl"
        | "xml",
    code: string,
) {
    return `\`\`\`${language}\n${code}\`\`\``;
}