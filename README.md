# template-basic
sada
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 解决scrollBar 导入报错问题
1. 在node_moodules/element-ui/types下面添加一个scrollbar.d.ts的文件
```js
import { VNodeDirective } from 'vue'

export interface ElScrollbar extends VNodeDirective {
  name: 'scrollbar',
  value: Function
}
```

2. 在node_moodules/element-ui/types/element-ui.d.ts的文件当中引入、并抛出
```js
import { ElScrollbar } from './ElScrollbar'

export const Scrollbar: PluginObject<ElScrollbar>
```

