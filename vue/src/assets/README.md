
# ▼ SASSについて
----
## 基本
FLOCSSに従い管理しています。  
下記サイトを確認し、基本ルールを把握してください。
  
参考： [脱・CSS無法地帯。FLOCSSで指針のある設計を。](https://qiita.com/sueshin/items/dcbaf3d8a0adb6b087db)

----
## 独自ルール
* 命名規則  
単語はハイフンで連結　例：.c−text-box__inner--01

----
## ファイル解説
注意：  
アスタリスク（*）のついてるものは基本的に編集しないでください。
編集する場合は、管理者と相談してから方針を決めてください。

**foundation**

* _sanitize.scss*  
サニタイズCSS
* _base.scss  
html,bodyなどタグへの直接的に設定するスタイル
* _function.scss  
sassのfunctionを記載
* _mixin.scss  
sassのmixinを記載
* _var.scss  
変数管理

**layout**  
大きな共通要素や、独立したページのスタイルはlayoutディレクトリへ  
※ 現状これ以上増える予定はなし

* _footer.scss
* _header.scss
* _member.scss
* _root.scss
* _side-menu.scss
* _signIn.scss
* _single.scss
* _limited.scss  
※ 他のどこにも使用しないが、ファイルを作るほどではない特殊なレイアウトは上記へ（なるべく不使用で）

**object/component**  
**object/project**  
**object/utility**  

----
## 利用プラグイン
[Vue Select](http://sagalbot.github.io/vue-select/)
