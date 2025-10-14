import "./AuthLayout.css"
function AuthLayout({title, footer, children}) {

    return (
        <div className="head">
            <h1>{title}</h1>
            <div className="auth-content">{children}</div>
            <div className='auth-footer'>{footer}</div>
        </div>)
}


export default AuthLayout;
