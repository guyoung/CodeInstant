var PageComponent = Vue.component('page-component', {
    template: `
<div class="markdownDiv">
    <vue-markdown :source="content"></vue-markdown>
</div>`,

    data: function () {
        return {
            title: '',   
            themeColor: '',            
            content: '',
        }
    },

    created: function () {  
        Vue.axios.get('data/app.config.json').then((response) => {
            try {
                var config = JSON.parse(JSON.stringify(response.data));

                var content;

                for (var item of config.contents) {
                 
                    if (item.name == this.$route.name) {
                        content = item;
                    }
                }             
                if (content && content.themeColor) {
                    this.themeColor = content.themeColor;
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
