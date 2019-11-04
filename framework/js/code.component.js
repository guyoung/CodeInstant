var CodeComponent = Vue.component('code-component', {
    template: ` 
    <v-tabs fixed-tabs :backgroundColor="codeThemeColor" dark>
        <v-tab>
            Preview
        </v-tab>
        <v-tab-item>
            <v-card outlined>
                <div class="previewDiv" ref="previewDiv">
                    <iframe ref="previewFrame" v-bind:srcdoc="html" v-bind:width="frameWidth" v-bind:height="frameHeight"
                        frameborder="0">
                </div>
            </v-card>
        </v-tab-item>
        <v-tab>
            HTML
        </v-tab>
        <v-tab-item>
            <v-card outlined>
                <div class="htmlDiv" ref="htmlDiv">
                    <codemirror class="cm-s-default" ref="htmlEditor" v-model="htmlContent" :options="htmlEditorOptions" :style="{'width': editorWidth, 'height': editorHeight}"></codemirror>
                </div>
            </v-card>
        </v-tab-item>
        <v-tab>
            CSS
        </v-tab>
        <v-tab-item>
            <v-card outlined>
                <div class="styleDiv" ref="styleDiv">
                    <codemirror class="cm-s-default" ref="styleEditor" v-model="styleContent" :options="styleEditorOptions" :style="{'width': editorWidth, 'height': editorHeight}"></codemirror>
                </div>
            </v-card>
        </v-tab-item>
        <v-tab>
            Javascript
        </v-tab>
        <v-tab-item>
            <v-card outlined>
                <div class="javascriptDiv"  ref="javascriptDiv">
                    <codemirror class="cm-s-default" ref="javascriptEditor" v-model="javascriptContent" :options="javascriptEditorOptions" :style="{'width': editorWidth, 'height': editorHeight}"></codemirror>
                </div>
            </v-card>
        </v-tab-item>
    </v-tabs>`,

    data: function () {
        return {
            tab: null,
            codeThemeColor: '',
            title: '',           
            htmlContent: '',
            styleContent: '',
            javascriptContent: '',
            frameWidth: 0,
            frameHeight: 0,
            editorWidth: '100%',
            editorHeight: '100%',
            htmlEditorOptions: {               
                tabSize: 4,
                mode: "xml",
                htmlMode: true,
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,

            },
            styleEditorOptions: {               
                tabSize: 4,
                mode: "css",
                htmlMode: true,
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,

            },
            javascriptEditorOptions: {               
                tabSize: 4,
                mode: "javascript",
                htmlMode: true,
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,

            }
        }
    },
    watch: {

    },

    computed: {
        html:  function(){
            return this.htmlContent+'<style>'+this.styleContent+'</style><script>'+this.javascriptContent+'<\/script>'
        }

    },

    created: function () {
        Vue.axios.get('data/app.config.json').then((response) => {
            try {
                var config = JSON.parse(JSON.stringify(response.data));
                
                if (config.codeThemeColor) {
                    this.codeThemeColor = config.codeThemeColor;
                }
               

            } catch {

            }

        }).catch((err) => {

        });

    },

    mounted: function () {

        this.load();

        setTimeout(() => {
            

            this.frameWidth = this.$refs.previewDiv.offsetWidth;
            this.frameHeight = document.documentElement.clientHeight - 184

            this.editorWidth = this.$refs.previewDiv.offsetWidth + 'px';
            this.editorHeight = (document.documentElement.clientHeight - 184) + 'px'
            

        }, 500);

    },
    updated: function () {

    },

    beforeRouteUpdate(to, from, next) {
        if (to.fullPath != from.fullPath) {
           
            console.log(to, from)
            next();

            this.load();
        }

    },


    methods: {
        load() {
            var htmlUrl = '/data' + this.$route.path + '/index.html';
            var styleUrl = '/data' + this.$route.path + '/style.css';
            var javascriptUrl = '/data' + this.$route.path + '/main.js';

            Vue.axios.get(htmlUrl).then((response) => {
                this.htmlContent = response.data               
            }).catch((err) => {
                this.htmlContent = '';
            });

            Vue.axios.get(styleUrl).then((response) => {
                this.styleContent = response.data
            }).catch((err) => {               
                this.styleContent = '';
            });

            Vue.axios.get(javascriptUrl).then((response) => {
                this.javascriptContent = response.data
            }).catch((err) => {              
                this.javascriptContent = '';
            });

        }
    }


})