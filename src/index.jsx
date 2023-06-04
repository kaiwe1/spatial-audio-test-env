import { createRoot } from 'react-dom/client'
import { useState } from "react"
import { Footer } from "@pmndrs/branding"
import App from './App'
import './styles.css'

function Overlay() {
    const [ready, set] = useState(false)
    return (
        <>
            <App/>
            <div className="dot" />
            <div className={`fullscreen bg ${ready && "clicked"}`}>
                <button onClick={() => set(true)}>Start</button>
                <Footer date="4. June" year="2023" />
            </div>
        </>
    )
}

createRoot(document.getElementById('root')).render(<Overlay />)
