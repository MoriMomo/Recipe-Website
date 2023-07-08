export default function (context) {
    console.log(context.store.state.token)
    if (!context.store.state.token) {

        context.redirect("/user/login")
    }
}