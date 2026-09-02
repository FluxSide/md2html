# md2html

一个小型命令行工具，用于把 Markdown 文件转换成带样式的 HTML。

- [项目说明](docs/project.md)
- [初学者使用指南](docs/getting-started.md)
- [命令速查卡](docs/cheatsheet.md)

## 使用方式

```powershell
node --import tsx/esm src/index.ts README.md
node --import tsx/esm src/index.ts README.md -o dist/README.html
node --import tsx/esm src/index.ts README.md --watch
```

## 参数说明

- `-o <路径>` 或 `--output <路径>`：指定生成的 HTML 文件路径
- `--watch` 或 `-watch`：监听输入文件变化并自动重新转换
- 省略 `-o` 时，默认输出为输入文件所在目录下的同名 `.html` 文件

## 前置要求

- Node.js >= 18.19.0
- Windows PowerShell 或兼容终端

## 快速开始

```powershell
npm install
npm run md2html -- README.md
npm test
```

## 常见问题

- **为什么不能直接运行 `node src/index.ts ...`？**
  因为项目使用 TypeScript + ESM 导入方式运行，直接 `node src/index.ts` 会找不到 `./converter.js`。推荐使用：
  - `node --import tsx/esm src/index.ts README.md`
  - 或 `npm run md2html -- README.md`

- **提示 `Missing input markdown file.` 怎么办？**
  说明没有传入输入文件，或传入了多个输入文件。当前版本只支持一次转换一个 Markdown 文件。请只传一个文件路径。

- **提示 `ENOENT` 或找不到文件怎么办？**
  通常是因为输入文件路径错误、文件不存在、或路径写错。请确认文件存在且路径正确。

- **测试时报 `fs is not defined` 怎么办？**
  旧版本里存在这个问题。当前代码已经修复。如果仍遇到，请重新获取最新代码，或检查 `src/converter.ts` 是否已经改用 `node:fs`。

- **watch 模式停止后，文件被删除会报错退出？**
  这是预期行为。被监听的文件被删除时，工具会报错并退出，避免继续监听一个不存在的文件。

- **Windows 路径带空格怎么办？**
  如果路径包含空格，请用引号把路径包起来，例如：
  - `node --import tsx/esm src/index.ts "E:\我的文件\测试.md"`

## 文档与贡献

- 完整文档索引：[docs/README.md](docs/README.md)
- 贡献指南：[CONTRIBUTING.md](CONTRIBUTING.md)
- 行为准则：[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
