# Утилиты для вёрстки / HTML/CSS/JS markup utils

Include для html. Однако это не полноценный Include, иначе придется реализовывать link[rel=import] функционал html5. Это только для удобства верстальщика шаблонов дизайна, чтобы избежать массированной копипасты да и наметить предварительное разбиение на компоненты. И кодерам вроде как так удобней.

`mr-include/mr-include.jquery.js` (самый свежий / most recent)

Include for html. It is not full-blown include, which require to implement smth like link[rel="import"] html5 functionality. Rather this is helper utility for development-only,  to provide html/css/js templates of design. The aim is to get rid of massive copypaste and as a bonus - logical componentization. Also coders seem to like it.


## Проблемы / Problems

Так как инклюды мы получаем по аякс, то все инициализации в "DOM Ready" идут к черту. Поэтому необходимо иметь свой include-ready - cкажем событие "mr-include-complete". И тогда каждую иницализацию нужно проводить два раза, один раз реальный - по dom ready, это будет работать на продакшне. А второй раз по mr-include-complete - это будет срабатывать на превьюхе вёрстки, когда она всё ещё содержит инклюды. Но нужно убедиться что не происходит инициализация два раза. Итого, обертка синтаксический сахар-обертка для инициализации того что раньше инициализировалось в dom ready:

`mr-component/mr-component.js`

We get includes through ajax, so all "dom ready" initializations go to hell. So we need our own "include ready" event, to write initializations inside it. But now we have neccessity to write initializations twice - one for production version of code inside "dom ready", and one for development preview of you markup - inside "include-ready". Also check and abort initialization if already done it (relevant only in dev version). This is what currently mr.component.init is for - syntactic shugar of initialization aware of our includes.

## Использование / How to use

В коде html пишем тег `<mr-include src="partial.html"></mr-include>` и броузер после загрузки автоматически заменит этот тег на содержимое файла `partial.html`.

Inside html code we write `<mr-include src="partial.html"></mr-include>` and browser will replace it with contents of `partial.html` file.

Если надо инициализировать карусель или ещё какой виджет, который находится внутри какого-то из инклюдов, то нужно задать его селектор, например `.myClassSelector` и затем внутри коллбека инициализировать:

If you need to init some carousel or masonry or other js-dependent stuff that is inside one of mr-includes, you need it's selector, e.g. `.myClassSelector` and then init it inside a mr-component callback:

```
mr.component(".myClassSelector").init(function ($widget) { 
    // initialization code
    // $widget - is jQuery element that match .myClassSelector
});
```


Заметьте, что два раза инициализировать не будет, там проверка есть. 

Note that it has a check against duplicate initialization, so feel free to go nuts.





