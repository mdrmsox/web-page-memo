# Webページメモアプリ

## 概要
このアプリは、IndexedDBとReact、TypeScriptの学習を目的として作成しました。個人的にWebページを記録したいが、ブックマークするほどでもないということがよくあるので、このようなものがあると便利かと考えたのがきっかけです。学習のため、機能は単純にし、WebページのタイトルとURLの記録と削除、そして記録したページを簡単に開けるようにすることを目標としました。また、GitHub Pagesで公開できるように、IndexedDBを使用し、フロントエンドフレームワークのみで作成しました。簡単にWebページを記録できるように、ブックマークレットを使って目的のページを記録する機能を備える予定です。

## 主な機能

- ページの保存: タイトルとURLを保存できます。
- メモの削除: リストの削除ボタンからメモを削除できます。
- リスト表示: 保存したページがリスト表示されます。
- 新しいウィンドウで開く: リストの項目をクリックすると、新しいウィンドウでページが開きます。
- IndexedDB: データはブラウザのIndexedDBに保存されます。

## 使用技術一覧

- React
- Vite
- Pure.css
- IndexedDB
- TypeScript

## 使い方

1. アプリを開きます。
2. 「メモを追加」ボタンをクリックします。
3. WebページのタイトルとURLを入力します。
4. 「保存」ボタンをクリックします。
5. 保存されたページがリストに追加されます。
6. リストの項目をクリックすると、新しいウィンドウでページが開きます。
7. リストの削除ボタンをクリックすると、対応するメモが削除されます。

## ディレクトリ構成

```
.
├── LICENSE
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── app-icon.svg
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── CrudeDB.tsx.idea
│   ├── IDBWrapper.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## 今後の機能追加

- UIの改善
- ブックマークレット機能

## ライセンス

このアプリはMITライセンスの下で公開されています。詳細については、LICENSEファイルを参照してください。

