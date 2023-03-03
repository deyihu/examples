如果需要从`ResourceManager`获取资源必须要使用 `$`符号来取值,且`$`必须是第一个字符  
当前例子静态资源根目录的结构,这里列出来只是方便理解下面的代码,具体项目里使用不做任何限制,只要你保证 `$` 取值文件的路径正确即可
```
├─index.html
├─svgs
|  ├─raw
|  |  ├─anjian.svg
|  |  ├─anquan.svg
|  |  ├─huiyuan.svg
|  |  └svg-collection.json
├─sprite
|   ├─raw
|   |  ├─sprite.json
|   |  └sprite.png
├─raw
|  └index.html
├─icons
|   ├─raw
|   |  ├─13678919.jfif
|   |  ├─13678959.png
|   |  └25998927.jfif
```