const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: HomeComponent
    },
    {
        path: '/pages/*',
        component: PageComponent
    },
    {
        path: '/codes/*',
        component: CodeComponent
    }
]


const router = new VueRouter({
    routes
})