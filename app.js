const PageComponent = Vue.component('page-component', {
    template: '<div>Page</div>',

    data: function () {
        return {

        }
    },


})


const CodeComponent = Vue.component('code-component', {
    template: '<div>Code</div>',

    data: function () {
        return {

        }
    },


})


const routes = [
    { path: '/home', component: PageComponent },
    { path: '/codes/:name' }
]


const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),

    data: () => ({
        drawer: null
    }),

    methods: {

    }
})