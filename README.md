# Webページメモアプリ

## 概要
このアプリは、IndexedDBとReact、TypeScriptの学習を目的として作成しました。個人的にWebページを保存したいが、ブックマークするほどでもないということがよくあるので、このようなものがあると便利かと考えたのがきっかけです。学習のため、機能は単純にし、WebページのタイトルとURLの保存と削除、および保存したページを簡単に開けるようにすることを目標としました。また、GitHub Pagesで公開できるように、IndexedDBを使用し、フロントエンドフレームワークのみで作成しました。また、ブックマークレットを使って簡単にWebページを保存できます。

このアプリは[https://mdrmsox.github.io/web-page-memo/](https://mdrmsox.github.io/web-page-memo/)で公開しています。

## 使い方

画面の下部にある「メモを追加」ボタンを押すとフォームが開きます。
フォームの「Webページのタイトル」「WebページのURL」にそれぞれタイトルとURLを入力し保存ボタンを押すと目的のWebページが保存され、画面上にそのタイトルがリストとして表示されます。
リストを選ぶと目的のページが新しいタブで表示されます。
リスト右側にある「削除」ボタンを押すとそのWebページアイテムを削除できます。
ブックマークレットを使用して簡単に目的のWebページを保存できます。アプリ内の「使い方」に書いてあるJavaScriptをブックマークに登録し、目的のWebページでそのブックマークを使用すればWebページのタイトルとURLを入力した状態でこのアプリが表示されます。その後、「保存」ボタンを押すだけで目的のページを保存できます。

## 主な機能

- ページの保存: WebページのタイトルとURLを保存できます。
- メモの削除: リストの削除ボタンからメモを削除できます。
- リスト表示: 保存したページがリスト表示されます。
- 新しいウィンドウで開く: リストの項目をクリックすると、新しいウィンドウでページが開きます。
- IndexedDB: データはブラウザのIndexedDBに保存されます。
- ブックマークレット機能: ブックマークレットを使用して、目的のWebページを簡単に保存できます。ブックマークレットを使うと、WebページのタイトルとURLが自動的に入力された状態でアプリが開きます。

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

## ライセンス

このアプリはMITライセンスの下で公開されています。詳細については、LICENSEファイルを参照してください。

