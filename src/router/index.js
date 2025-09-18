import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Register.vue'),
        meta: {
            title: 'Indição - Colégio Itaquá',
            description: 'Indique um amigo no Colégio Itaquá!',
        },
    },
    {
        path: '/completar/:id',
        name: 'Complete',
        component: () => import('@/views/Complete.vue'),
        props: true,
        meta: {
            title: 'Complete seu Cadastro - Colégio Itaquá',
            description: 'Complete seu cadastro para finalizar a inscrição na bolsa de estudos do Colégio Itaquá.',
        },
    },

    {
        path: '/sucesso/:id',
        name: 'Sucesso',
        component: () => import('@/views/Success.vue'),
        props: true,
        meta: {
            title: 'Cadastro Realizado com Sucesso - Colégio Itaquá',
            description: 'Seu cadastro foi realizado com sucesso!',
        },
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            title: 'Página não encontrada - Colégio Itaquá',
            description: 'A página que você tentou acessar não existe. Volte para o início.',
        },
    },
    {
        path: '/regulamento',
        name: 'regulamentoDownload',
        beforeEnter() {
            const link = document.createElement('a');
            link.href = 'https://tiagoandre.sfo2.digitaloceanspaces.com/regulamentos/regulamento-colegio-itaqua-2025.pdf';
            link.setAttribute('download', 'regulamento-colegio-itaqua-2025.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
    // {
    //     path: '/agenda/unavailable',
    //     name: 'ScheduleUnavailable',
    //     component: () => import('@/views/ScheduleUnavailable.vue'),
    //     props: route => ({ message: route.query.message }),
    //     meta: {
    //         title: 'Página não encontrada - Colégio Itaquá',
    //         description: 'A página que você tentou acessar não existe. Volte para o início.',
    //     },
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    const defaultTitle = 'Colégio Itaquá';
    const defaultDescription = 'Bolsa de estudos do Colégio Itaquá. Inscreva-se!';

    document.title = to.meta.title || defaultTitle;

    const description = to.meta.description || defaultDescription;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
        descriptionTag.setAttribute('content', description);
    } else {
        descriptionTag = document.createElement('meta');
        descriptionTag.setAttribute('name', 'description');
        descriptionTag.setAttribute('content', description);
        document.head.appendChild(descriptionTag);
    }
});

export default router;
