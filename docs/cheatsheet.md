# 命令速查卡

本文把最常用的命令集中在一起，方便快速复制和对照。

## 环境准备

```powershell
npm install
```

## 运行与测试

```powershell
npm test
```

```powershell
npm run build
```

## 基础转换

```powershell
node --import tsx/esm src/index.ts README.md
```

## 指定输出路径

```powershell
node --import tsx/esm src/index.ts README.md -o dist/README.html
```

## 监听文件变化

```powershell
node --import tsx/esm src/index.ts README.md --watch
```

## 常用脚本

```powershell
npm run md2html -- README.md
```

```powershell
npm run dev
```

## 快速对照

| 场景 | 命令 |
| --- | --- |
| 安装依赖 | `npm install` |
| 运行测试 | `npm test` |
| 编译项目 | `npm run build` |
| 转换文件 | `node --import tsx/esm src/index.ts README.md` |
| 指定输出 | `node --import tsx/esm src/index.ts README.md -o dist/README.html` |
| 监听变化 | `node --import tsx/esm src/index.ts README.md --watch` |
| 开发模式 | `npm run dev` |
