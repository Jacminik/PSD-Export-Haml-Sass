MarkupExporter   ~ PSD Export Haml/ Sass ~
=====================

Photoshop内で簡単にWebサイトのマークアップを完了させるためのスクリプトです。

psdファイルのレイヤー構造を変更し、スクリプトを実行するだけで自動的にhaml/sassファイルがエクスポートされます。

![PSD and Pallette](https://dl.dropboxusercontent.com/u/15492792/github_resources/psd_and_palette_jp.png)
![Up to compile](https://dl.dropboxusercontent.com/u/15492792/github_resources/psd_to_compile.png)
![Exported files](https://dl.dropboxusercontent.com/u/15492792/github_resources/exported_files_jp.png)

# インストール方法:

* このページの右にある"Download ZIP"ボタンをクリックしてプロジェクトをダウンロードします。
* 解凍したフォルダ内にある`[+B]MarkupExporter.jsx` と `[+B]MarkupExporter.assets` フォルダをPhotoshopのScriptフォルダへ移動します。
	* Mac : 		`/Applications/Adobe Photoshop CC/Presets/Scripts`
	* Windows:	`C:\Program Files\Adobe\Adobe Photoshop CC\Presets\Scripts`
* 既にPhotoshopを起動していた場合はPhotoshopを再起動します。

## 使い方:
### 1. HAML記法に沿ってpsd内のレイヤー名を変更/追加する
Haml記法については本家サイト等を参照:
	Haml site -  [http://haml.info/](http:/haml.info/)
 
※ プロジェクトに含まれる `sample.psd` はHaml記法に沿ったレイヤー構造になっていますので参考にしてください。

#### 最上位のレイヤーグループ名を'%body'に。
まず始めにレイヤーグループを追加してグループ名を `%body` にします。この `%body` グループの外にあるレイヤーは処理されなくなります。

![Add body group](https://dl.dropboxusercontent.com/u/15492792/github_resources/add_body_jp.png)


#### テキストレイヤーについて
テキストレイヤーのレイヤー名には `%p` や `%a` 、`%h1` といった名称が利用出来ます。

テキストレイヤーに含まれる文字列は自動で取得されるため、その文字列をレイヤー名に追加する必要はありません。

文字列の改行も反映されます。

![textlayer names](https://dl.dropboxusercontent.com/u/15492792/github_resources/textlayer_jp.png)

#### 画像ファイル(<img>タグ)について
画像として利用したいレイヤーがある場合には `%~` や `%img` などを付けずに `logo.jpg` といったレイヤー名にします。


レイヤー名が画像用拡張子(.jpg, .png, .gif, .svg)で終わるレイヤーは画像として処理され、自動的に `src` と `alt` がソースに追加されます。

※ Photoshopの画像アセット(Generator)機能や [Slicy](http://macrabbit.com/slicy/) とも併用できます。

![imagelayer names](https://dl.dropboxusercontent.com/u/15492792/github_resources/imagelayer_jp.png)

#### 特定のレイヤーを処理から除外するには
スクリプトの処理から除外したいレイヤーがある場合には、そのレイヤー名の先頭に `-` (半角マイナス記号)を追加します。

![exclude symbol](https://dl.dropboxusercontent.com/u/15492792/github_resources/exclude_symbol_jp.png)

### 2. 'MarkupExporter' スクリプトを実行する
* Photoshopのスクリプトメニューからスクリプトを選択します: ファイル > スクリプト > [+B]MarkupExporter.
* 表示されるダイアログを利用してファイルの書き出し先のフォルダを選択します。


### 3. Haml/Sass ファイルの編集とコンパイル
書き出されたHaml/Sassファイルを編集します。それらをhtml/cssに変換するにはコンパイラを利用します。

ファイルのコンパイルには [CodeKit](https://incident57.com/codekit/) やその他のコンパイラやサービスを利用してください。

(※ MarkupExporterはCodeKitで動作確認されています)

### 4. ヘッダファイルのカスタマイズ
標準ではHamlの書き出しは、HTML 5 向けテンプレートになっています。

これを変更したい場合は `[+B]MarkupExporter.assets` フォルダ内の `haml_header.txt` を編集します。

このテキストファイルは Hamlのヘッダとして処理されるため、必ずHaml記法で記述してください。

# ライセンス

このプロジェクトは MITライセンスの元で公開されています。

※ プロジェクトに含まれる 'sample.psd' の作成には [WebZap](http://webzap.uiparade.com/) (by [UIParade](http://www.uiparade.com/)) を利用しました。
