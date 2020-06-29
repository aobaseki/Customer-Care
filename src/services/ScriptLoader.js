export default class ScriptLoader {
    constructor(url){
        let _loaded = {};

        if (!_loaded[url]) {
            var s = document.createElement('script');
            s.src = url;
            document.head.appendChild(s);
            _loaded[url] = true;
        }
    }
}
