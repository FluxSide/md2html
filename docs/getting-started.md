# 初学者使用指南

本文给刚接触命令行的人解释每一步都在做什么，以及为什么要这样做。

## 1. 打开项目目录

先用终端进入项目文件夹，例如：

```powershell
cd E:\AI_Learn\md2html
```

> 建议：在项目文件夹空白处按住 `Shift` 并右键，选择“在终端中打开”会更方便。

## 2. 安装依赖

```powershell
npm install
```

这条命令会读取 `package.json`，下载项目需要的工具，例如：

- `marked`：把 Markdown 转成 HTML
- `chokidar`：监听文件变化
- `tsx`：让 Node.js 能直接运行 TypeScript 文件
- `typescript`：把 TypeScript 转成 JavaScript

如果你看到 `added X packages`，说明安装成功。

## 3. 运行测试

```powershell
npm test
```

这条命令会运行内置测试，帮你确认：

- Markdown 转 HTML 正常
- 命令行参数解析正常

如果看到解析结果和输出文件路径，说明测试通过。

## 4. 转换文件

### 方式一：使用 README 示例

```powershell
node --import tsx/esm src/index.ts README.md
```

它的意思是：

- `node`：运行 Node.js
- `--import tsx/esm`：先加载 tsx，再执行后面的脚本
- `src/index.ts`：项目入口文件
- `README.md`：你要转换的 Markdown 文件

运行成功后，会生成：

```powershell
README.html
```

打开它就能看到带样式的 HTML。

### 方式二：指定输出位置

```powershell
node --import tsx/esm src/index.ts README.md -o dist/README.html
```

这里 `-o` 表示“输出文件路径”。如果不加 `-o`，程序会默认把结果输出到同名 `.html` 文件。

### 方式三：监听文件变化

```powershell
node --import tsx/esm src/index.ts README.md --watch
```

加上 `--watch` 后，程序会持续监听 `README.md` 的变化。每次你修改并保存这个文件，它就会自动重新生成 HTML。

## 5. 其他常用命令

```powershell
# 构建项目
npm run build

# 用项目内置脚本转换
npm run md2html -- README.md

# 开发模式运行
npm run dev
```

## 6. 初学者常遇到的问题

- **提示 `Missing input markdown file.`**
  说明你没有传入输入文件，或传了多个文件。当前版本只支持一次转换一个文件。

- **提示 `ENOENT`**
  说明输入文件路径写错，或文件不存在。请确认文件名和路径正确。

- **路径带空格**
  请给路径加上引号，例如：
  - `node --import tsx/esm src/index.ts "E:\我的文件\测试.md"`

- **想停止 watch**
  在终端里按 `Ctrl + C` 即可停止监听。

## 7. 各脚本一览

| 命令 | 作用 |
| --- | --- |
| `npm install` | 安装依赖 |
| `npm test` | 运行测试 |
| `npm run build` | 编译 TypeScript |
| `npm run dev` | 开发模式运行入口 |
| `npm run md2html -- README.md` | 转换单个文件 |
| `node --import tsx/esm src/index.ts README.md` | 直接运行入口 |
| `node --import tsx/esm src/index.ts README.md --watch` | 监听文件变化 |
