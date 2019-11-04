
Vue.use(VueMarkdown);
Vue.use(window.VueCodemirror)

var app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify({
        icons: {
            iconfont: 'fa4',
        },
    }),

    data: () => ({
        drawer: null,
        siteTitle: 'CodeInstant Framework',
        themeColor: 'deep-purple',
        homeAlias: 'Home',
        pagesAlias: 'Pages',
        codesAlias: 'Codes',
        pageItems: [],
        codeItems: [],



    }),

    created: function () {     
        Vue.axios.get('data/app.config.json').then((response) => {
            try {
                var config = JSON.parse(JSON.stringify(response.data));
                if (config.siteTitle) {
                    this.siteTitle = config.siteTitle;
                }
                if (config.themeColor) {
                    this.themeColor = config.themeColor;
                }
                if (config.homeAlias) {
                    this.homeAlias = config.homeAlias;
                }
                if (config.pagesAlias) {
                    this.pagesAlias = config.pagesAlias;
                }
                if (config.codesAlias) {
                    this.codesAlias = config.codesAlias;
                }

            } catch {

            }

        }).catch((err) => {

        });

        Vue.axios.get('data/pages/page.config.json').then((response) => {
            try {
                var items = JSON.parse(JSON.stringify(response.data));
                this.pageItems = items;
            } catch {

            }

        }).catch((err) => {

        });

        Vue.axios.get('data/codes/code.config.json').then((response) => {
            try {
                var items = JSON.parse(JSON.stringify(response.data));
                this.codeItems = items;
            } catch {

            }

        }).catch((err) => {

        });
    },

    mounted: function () {

    },


    methods: {

    }
})