import PageMain from "src/pages/sv-app/page-main/PageMain";
import PageMovie from "src/pages/sv-app/page-movie/PageMovie";

const RoutesApp = [
    {
        path: '/app',
        children: [
            {
                path: 'main',
                element: <PageMain />,
            },
            {
                path: 'movie/:movieId',
                element: <PageMovie />,
            }
        ]
    }
];

export default RoutesApp;
