# MemoApp

就職用ポートフォリオの１つとして作成した Web アプリケーション [MemoApp](https://github.com/Taichiro-S/MemoApp-docker) のフロントエンドのソースコードです。言語は [TypeScript](https://www.typescriptlang.org/)を使用し、create-react-app により作成した React のプロジェクトテンプレートを使用しています。

アプリケーションとしての機能は[こちら](https://github.com/Taichiro-S/MemoApp-docker)にまとめてあります。

ここでは、

1. フロントエンドで特にこだわった点
2. フロントエンドで使用したライブラリ

について説明します。

## 1. フロントエンドで特にこだわった点

### データキャッシュ

TanStack Query というデータキャッシュのライブラリ ( 詳細は以下の説明を参照ください ) を利用して、データベースから取得したページごとのデータについて、前のページのデータをクライアントサイドでキャッシュしておくことでデータの再取得を減らし、また、次のページのデータをプリフェッチすることにより、ページのロード時間を短縮しています。

### コードの品質管理

ESLint, prettier, lint-staged, husky ( 詳細は以下の説明を参照ください ) といったライブラリを組み合わせて、コードのフォーマットおよび静的解析の自動化を実現し、コードの品質および可読性を向上させています。

## 2. フロントエンドで使用したライブラリ

- **_[Axios](https://github.com/axios/axios)_** ( 1.4.0 ) : Http クライアント
  ブラウザまたは Node サーバから Http リクエストを送信するためのライブラリです。通信を CSRF 攻撃から保護するための仕組みをサポートしています。ブラウザの標準ライブラリである [fetch](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch) よりも直感的に使いやすいという特徴があります。

- **_[TanStack Query](https://tanstack.com/query/latest)_** ( 4.29.5 ) : キャッシュデータの管理
  データベース等から取得したデータをキャッシュして管理するためのライブラリです。ページネーション、無限スクロール、プリフェッチ等多くの用途に対応しています。またデータ更新のためのフックも用意されています。

- **_[MUI](https://mui.com/)_** ( 5.13.2 ) : UI パーツ
  UI を構成するためのパーツのライブラリです。Web アプリケーションで使用する大体のコンポーネントを揃えており、また [styled](https://mui.com/system/styled/) を使用することで容易にカスタムが可能です。[Material-tailwind](https://www.material-tailwind.com/) というのもあるそうです（最近知りました...）。

- **_[zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)_** ( 4.1.4 ) : グローバルな状態管理
  コンパクトでシンプルな Store ベースの状態管理ライブラリです。

- **_[Tailwind CSS](https://tailwindcss.com/)_** ( 3.3.2 ) : CSS スタイリング
  ユーティリティクラスを組み合わせてスタイリングを行います。JSX コンポーネントに className という形でスタイルを直接当てることができ、また VSCode の拡張機能を使えばクラス名を自動補完できます。

- **_[ESlint](https://eslint.org/)_** ( 8.40.0 ) : コード品質チェック
  JavaScript の静的解析ツールです。プラグインを導入して TypeScript にも対応させることが可能です。コーディング規約を定めてコマンドを実行することでコードチェックできるため、チームでの開発において力を発揮します。後述の prettier でフォーマットのルールを定めて併用することが可能です。

- **_[prettier](https://prettier.io/)_** ( 2.8.8 ) : コードフォーマット
  定めたルールに基づいて、コードをフォーマットします。VSCode の設定で保存時に自動でフォーマットを実行することで、常にコードを美しく保つことができます。こちらもチームでの開発で力を発揮しそうです。

- **_[lint-staged](https://github.com/okonet/lint-staged)_** ( 13.2.2 ) + **_[husky](https://mswjs.io/)_** ( 8.0.3 ) : pre-commit ファイルのコードチェック
  git commit 実行時に ESLint によるコードチェックを自動で行うことができ、エラーの元となるコードがコミットされるのを防ぎます。コミットされるファイルのみチェックするので時間短縮にもなります。
- **_[React Hook Form](https://www.react-hook-form.com/)_** (7.43.9) : フォーム処理
  フォームに入力された値を一括で管理でき、後述の yup と組み合わせて詳細なバリデーションが可能です。

- **_[yup](https://github.com/jquense/yup/tree/master)_** ( 1.2.0 ) : フォームバリデーション
  React Hook Form と組み合わせて、フォームのバリデーションを行うことができます。React Hook Form よりも詳細なバリデーションルールの設定が可能です。
