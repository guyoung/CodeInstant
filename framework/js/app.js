Vue.use(VueMarkdown);
Vue.use(window.VueCodemirror)

const routes = [
    {
        path: '/',
        redirect: '/home'
    }]


const app = new Vue({
    el: '#app',
    router: new VueRouter({
        routes
    }),
    vuetify: new Vuetify({
        icons: {
            iconfont: 'fa4',
        },
    }),

    data: () => ({
        drawer: null,
        siteTitle: 'CodeInstant Framework',
        themeColor: 'deep-purple',
        contents: [],
        contentItems: {}


    }),

    created: function () {
       
        Vue.axios.get('data/app.config.json').then((response)=> {
            try {
                var config = JSON.parse(JSON.stringify(response.data));

                if (config.siteTitle) {
                    this.siteTitle = config.siteTitle;
                }
                if (config.themeColor) {
                    this.themeColor = config.themeColor;
                }
                if (config.contents) {
                    this.contents = config.contents;
                }

                let routes = [];

                for (let content of config.contents) {
                    let contentName = content.name;

                    let route = this.getRoute(content);

                    routes.push(route);

                    if (content.type != 'page') {
                        let url = 'data/' + content.name + '/sitemap.json';

                        Vue.axios.get(url).then((response) => {
                            try {
                                let items = JSON.parse(JSON.stringify(response.data));

                                this.contentItems[contentName] = items;

                                this.$forceUpdate();
                            } catch {

                            }

                          

                        }).catch((err) => {

                        });
                    }
                }

                this.$router.options.routes = routes;
                this.$router.addRoutes(routes);
            }
            catch (e) {
                console.log(e.message)
            }



        }).catch((err) => {

        });


    },

    mounted: function () {

    },


    methods: {
        getRoute: function (content) {
            if (content.type == 'page') {
                return {
                    name: 'page',
                    path: '/' + content.name,
                    component: PageComponent
                }
            }

            if (content.type == 'document') {
                return {
                    name: 'document',
                    path: '/' + content.name + '/*',
                    component: DocumentComponent
                }
            }
            if (content.type == 'code') {
                return {
                    name: 'code',
                    path: '/' + content.name + '/*',
                    component: CodeComponent
                }
            }


        }
    }
})