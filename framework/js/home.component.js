var HomeComponent = Vue.component('home-component', {
    template: `
<div class="markdownDiv">
    <vue-markdown :source="content"></vue-markdown>
</div>`,

    data: function () {
        return {
            title: '',   
            homeThemeColor: '',        
            content: '',
        }
    },

    created: function () {
        Vue.axios.get('data/app.config.json').then((response) => {
            try {
                var config = JSON.parse(JSON.stringify(response.data));
                
                if (config.homeThemeColor) {
                    this.homeThemeColor = config.homeThemeColor;
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
            var url = 'data/home/index.md';
    
            Vue.axios.get(url).then((response) => {
                this.content = response.data
    
            }).catch((err) => {
                this.content = '';
            });
        }

    }


})
