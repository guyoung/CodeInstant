var PageComponent = Vue.component('page-component', {
    template: `
<div class="markdownDiv">
    <vue-markdown :source="content"></vue-markdown>
</div>`,

    data: function () {
        return {
            title: '',           
            content: '',
        }
    },

    created: function () {
        Vue.axios.get('data/app.config.json').then((response) => {
            try {
                var config = JSON.parse(JSON.stringify(response.data));
                
                if (config.pageThemeColor) {
                    this.pageThemeColor = config.pageThemeColor;
                }
               

            } catch {

            }

        }).catch((err) => {

        });
    },

    mounted: function () {
        this.load();
    },

    updated: function () {

    },

    beforeRouteUpdate(to, from, next) {
        if (to.fullPath != from.fullPath) {
           
            next();

            this.load();
        }
    },


    methods: {
        load() {
            var url = 'data' + this.$route.path + '/index.md';
    
            Vue.axios.get(url).then((response) => {
                this.content = response.data
    
            }).catch((err) => {
                this.content = '';
            });
        }

    }


})
