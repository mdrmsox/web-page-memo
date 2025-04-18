# Webページメモアプリ

## 概要
このアプリは、IndexedDBとReact、TypeScriptの学習を目的として作成しました。個人的にWebページを記録したいが、ブックマークするほどでもないということがよくあるので、このようなものがあると便利かと考えたのがきっかけです。学習のため、機能は単純にし、WebページのタイトルとURLの記録と削除、そして記録したページを簡単に開けるようにすることを目標としました。また、GitHub Pagesで公開できるように、IndexedDBを使用し、フロントエンドフレームワークのみで作成しました。簡単にWebページを記録できるように、ブックマークレットを使って目的のページを記録する機能を備える予定です。

このアプリは[https://mdrmsox.github.io/web-page-memo/](https://mdrmsox.github.io/web-page-memo/)で公開しています。

## 使い方

画面の下部の「メモを追加」ボタンを押すとフォームが開きます。
フォームの「Webページのタイトル」「Webページのurl」にそれぞれタイトルとurlを入力し保存ボタンを押すと目的のWebページを保存でき、画面上にWebページのタイトルが書かれたリストとして表示されます。
リストを選ぶと目的のページが新しいタブで表示されます。
リスト右側にある「削除」ボタンを押すとそのWebページアイテムを削除できます。

## 主な機能

- ページの保存: WebページのタイトルとURLを保存できます。
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

## セットアップとビルド

1. リポジトリをクローンします。
2. npm installで依存関係をインストールします。
3. npm run devで開発サーバーを起動します。
4. npm run buildでビルドします。

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
│   └── icon.png
├── .github
│   └── workflows
│       └── deploy.yml
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── IDBWrapper.tsx
│   ├── assets
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

