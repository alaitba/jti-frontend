export default function ({ $axios, redirect, app, store }) {
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        console.log(code, error);
        if (code === 400) {
            redirect("/400");
        }
        if (code === 401) {
            localStorage.clear();
            store.commit('resetState');
            redirect('/auth/signin')
        }
        // if (code === 403) {
            //   localStorage.clear();
            //   store.commit('resetState');
            //   redirect('/auth/signin')
        // }
    })
}
