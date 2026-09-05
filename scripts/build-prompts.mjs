// Build prompts/*.md (Obsidian notes) into a single prompts.json for the extension.
// Also acts as the gatekeeper: fails the build on malformed prompts so broken
// data never reaches the team.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PROMPTS_DIR = join(ROOT, "prompts");
const IMAGES_DIR = join(ROOT, "images");
const OUT = join(ROOT, "prompts.json");

const errors = [];
const warnings = [];

function parseFrontmatter(raw, file) {
  if (!raw.startsWith("---")) return [{}, raw];
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    errors.push(`${file}: frontmatter mở bằng --- nhưng không đóng`);
    return [{}, raw];
  }
  const head = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const meta = {};
  let lastKey = null;
  for (const line of head.split("\n")) {
    const item = line.match(/^\s*-\s+(.+)$/);
    if (item && lastKey) {
      if (!Array.isArray(meta[lastKey])) meta[lastKey] = [];
      meta[lastKey].push(item[1].trim());
      continue;
    }
    const m = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!m) continue;
    let [, key, value] = m;
    value = value.trim();
    lastKey = value === "" ? key : null;
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      meta[key] = value;
    }
  }
  return [meta, body];
}

function checkBraces(body, file) {
  let depth = 0;
  for (const ch of body) {
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth < 0) break;
  }
  if (depth !== 0) errors.push(`${file}: cú pháp biến {…} không đóng/mở cân`);
}

const files = readdirSync(PROMPTS_DIR).filter((f) => f.endsWith(".md"));
const seen = new Map();
const prompts = [];

for (const file of files.sort()) {
  const raw = readFileSync(join(PROMPTS_DIR, file), "utf8");
  const [meta, bodyRaw] = parseFrontmatter(raw, file);

  const embeds = [...bodyRaw.matchAll(/!\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
  const body = bodyRaw.replace(/!\[\[[^\]]+\]\]\n?/g, "").trim();

  const name = meta.name || basename(file, ".md");
  if (seen.has(name)) {
    errors.push(`${file}: trùng tên "${name}" với ${seen.get(name)}`);
  }
  seen.set(name, file);

  if (!body) {
    errors.push(`${file}: nội dung prompt trống`);
    continue;
  }
  checkBraces(body, file);

  let preview = meta.preview || "";
  if (!preview && embeds.length > 0) {
    preview = `images/${basename(embeds[0])}`;
  }
  if (preview) {
    if (!existsSync(join(ROOT, preview))) {
      warnings.push(`${file}: không tìm thấy ảnh preview "${preview}" — bỏ qua`);
      preview = "";
    }
  }

  const variables = [...body.matchAll(/\{([^{}]+)\}/g)]
    .map((m) => m[1].split("/").map((s) => s.trim()).filter(Boolean))
    .filter((opts) => opts.length > 1);

  // Gác cổng: phát hiện lựa chọn bị cắt vụn do dấu "/" lạc trong nhãn/giá trị
  // (dấu hiệu: ngoặc tròn mở/đóng lệch nhau, hoặc giá trị quá ngắn vô nghĩa)
  for (const opts of variables) {
    for (const opt of opts) {
      const open = (opt.match(/\(/g) || []).length;
      const close = (opt.match(/\)/g) || []).length;
      const value = opt.split("|")[0].trim();
      if (open !== close || value.length < 2) {
        errors.push(`${file}: lựa chọn khả nghi "${opt}" — nhãn/giá trị có thể bị cắt bởi dấu "/" lạc`);
      }
    }
  }

  prompts.push({
    id: basename(file, ".md"),
    name,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    note: meta.note || "",
    preview,
    variableCount: variables.length,
    body,
  });
}

for (const w of warnings) console.warn(`⚠️  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`❌ ${e}`);
  process.exit(1);
}

writeFileSync(OUT, JSON.stringify({ version: 1, prompts }, null, 2));
console.log(`✅ ${prompts.length} prompt → prompts.json`);
